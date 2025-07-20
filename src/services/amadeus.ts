// Amadeus API Service
import axios from 'axios';

interface AmadeusTokenResponse {
  access_token: string;
  expires_in: number;
}

interface AirportLocation {
  id: string;
  iataCode: string;
  name: string;
  detailedName: string;
  subType: 'AIRPORT' | 'CITY';
  address?: {
    cityName: string;
    cityCode?: string;
    countryName: string;
    countryCode: string;
  };
  type: string;
}

interface AirportSearchResponse {
  data: AirportLocation[];
}

class AmadeusService {
  private apiKey: string;
  private apiSecret: string;
  private baseURL: string;
  private token: string | null = null;
  private tokenExpiration: number | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_AMADEUS_API_KEY || '';
    this.apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET || '';
    this.baseURL = 'https://test.api.amadeus.com/v1';
    
    // Debug log to check if API keys are loaded (showing only first few chars for security)
    console.log(`Amadeus API Key loaded: ${this.apiKey ? this.apiKey.substring(0, 4) + '...' : 'MISSING'}`);
    console.log(`Amadeus API Secret loaded: ${this.apiSecret ? '****' : 'MISSING'}`);
  }

  // Get access token
  private async getToken(): Promise<string> {
    // Check if we have a valid token
    if (this.token && this.tokenExpiration && Date.now() < this.tokenExpiration) {
      return this.token;
    }

    try {
      const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.apiKey,
        client_secret: this.apiSecret
      });
      
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data: AmadeusTokenResponse = response.data;
      this.token = data.access_token;
      // Set expiration time (a minute before actual expiration to be safe)
      this.tokenExpiration = Date.now() + (data.expires_in - 60) * 1000;
      return this.token;
    } catch (error) {
      // Better error logging with more details
      if (axios.isAxiosError(error) && error.response) {
        console.error('Amadeus authentication error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      } else {
        console.error('Error getting Amadeus token:', error);
      }
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }

  // Search airports by keyword
  async searchAirports(keyword: string): Promise<AirportLocation[]> {
    if (!keyword || keyword.length < 2) return [];
    
    try {
      const token = await this.getToken();
      
      const response = await axios.get(`${this.baseURL}/reference-data/locations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          subType: 'AIRPORT,CITY',
          keyword,
          'page[limit]': 10,
        },
      });
      
      const data: AirportSearchResponse = response.data;
      console.log('Amadeus API response data:', data);
      return data.data || [];
    } catch (error) {
      console.error('Error searching airports:', error);
      return [];
    }
  }
}

// Create a singleton instance
const amadeusService = new AmadeusService();
export default amadeusService;
