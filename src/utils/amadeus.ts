import axios from "axios";

export interface AmadeusTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface AirportLocation {
  id: string;
  iataCode: string;
  name: string;
  detailedName: string;
  subType: "AIRPORT" | "CITY";
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
    this.apiKey = import.meta.env.VITE_AMADEUS_API_KEY || "";
    this.apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET || "";
    this.baseURL = "https://test.api.amadeus.com/v1";

    // Debug log to check if API keys are loaded (showing only first few chars for security)
    console.log(
      `Amadeus API Key loaded: ${this.apiKey ? this.apiKey.substring(0, 4) + "..." : "MISSING"}`,
    );
    console.log(
      `Amadeus API Secret loaded: ${this.apiSecret ? "****" : "MISSING"}`,
    );
  }

  // Get access token
  private async getToken(): Promise<string> {
    // Check if we have a valid token
    if (
      this.token &&
      this.tokenExpiration &&
      Date.now() < this.tokenExpiration
    ) {
      return this.token;
    }

    try {
      const params = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.apiKey,
        client_secret: this.apiSecret,
      });

      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const data: AmadeusTokenResponse = response.data;
      this.token = data.access_token;
      // Set expiration time (a minute before actual expiration to be safe)
      this.tokenExpiration = Date.now() + (data.expires_in - 60) * 1000;
      return this.token;
    } catch (error) {
      // Better error logging with more details
      if (axios.isAxiosError(error) && error.response) {
        console.error("Amadeus authentication error:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else {
        console.error("Error getting Amadeus token:", error);
      }
      throw new Error("Failed to authenticate with Amadeus API");
    }
  }

  // Mock airport data for fallback
  private mockAirportData(keyword: string): AirportLocation[] {
    // Common airports for fallback
    const airports = [
      {
        id: "JFK",
        iataCode: "JFK",
        name: "John F. Kennedy International Airport",
        detailedName: "New York, NY (JFK)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "New York",
          cityCode: "NYC",
          countryName: "United States",
          countryCode: "US",
        },
        type: "location",
      },
      {
        id: "LHR",
        iataCode: "LHR",
        name: "London Heathrow Airport",
        detailedName: "London, England (LHR)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "London",
          cityCode: "LON",
          countryName: "United Kingdom",
          countryCode: "GB",
        },
        type: "location",
      },
      {
        id: "LAX",
        iataCode: "LAX",
        name: "Los Angeles International Airport",
        detailedName: "Los Angeles, CA (LAX)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "Los Angeles",
          cityCode: "LAX",
          countryName: "United States",
          countryCode: "US",
        },
        type: "location",
      },
      {
        id: "DXB",
        iataCode: "DXB",
        name: "Dubai International Airport",
        detailedName: "Dubai (DXB)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "Dubai",
          cityCode: "DXB",
          countryName: "United Arab Emirates",
          countryCode: "AE",
        },
        type: "location",
      },
      {
        id: "LGW",
        iataCode: "LGW",
        name: "London Gatwick Airport",
        detailedName: "London, England (LGW)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "London",
          cityCode: "LON",
          countryName: "United Kingdom",
          countryCode: "GB",
        },
        type: "location",
      },
      {
        id: "LOS",
        iataCode: "LOS",
        name: "Murtala Muhammed International Airport",
        detailedName: "Lagos (LOS)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "Lagos",
          cityCode: "LOS",
          countryName: "London",
          countryCode: "NG",
        },
        type: "location",
      },
      {
        id: "CDG",
        iataCode: "CDG",
        name: "Charles de Gaulle Airport",
        detailedName: "Paris (CDG)",
        subType: "AIRPORT" as const,
        address: {
          cityName: "Paris",
          cityCode: "PAR",
          countryName: "France",
          countryCode: "FR",
        },
        type: "location",
      },
    ];

    const lowercaseKeyword = keyword.toLowerCase();
    return airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(lowercaseKeyword) ||
        airport.address.cityName.toLowerCase().includes(lowercaseKeyword) ||
        airport.iataCode.toLowerCase().includes(lowercaseKeyword),
    );
  }

  // Search airports by keyword with fallback to mock data
  async searchAirports(keyword: string): Promise<AirportLocation[]> {
    if (!keyword || keyword.length < 2) return [];

    try {
      // Rate limiting prevention
      await new Promise((resolve) => setTimeout(resolve, 300));

      const token = await this.getToken();

      const response = await axios.get(
        `${this.baseURL}/reference-data/locations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            subType: "AIRPORT,CITY",
            keyword,
            "page[limit]": 10,
          },
        },
      );

      const data: AirportSearchResponse = response.data;
      return data.data || [];
    } catch (error) {
      console.warn("Using mock airport data due to API error:", error);

      // If API fails, use mock data
      return this.mockAirportData(keyword);
    }
  }
}

// Create a singleton instance
export const amadeusService = new AmadeusService();
