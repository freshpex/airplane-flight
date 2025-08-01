// A comprehensive database of major world airports
export interface Airport {
  iataCode: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  type: 'AIRPORT' | 'CITY';
}

export const airports: Airport[] = [
    // North America
    { iataCode: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "MIA", name: "Miami International Airport", city: "Miami", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "DEN", name: "Denver International Airport", city: "Denver", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "LAS", name: "Harry Reid International Airport", city: "Las Vegas", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", countryCode: "CA", type: "AIRPORT" },
    { iataCode: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada", countryCode: "CA", type: "AIRPORT" },
    { iataCode: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico", countryCode: "MX", type: "AIRPORT" },

    // Europe
    { iataCode: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom", countryCode: "GB", type: "AIRPORT" },
    { iataCode: "LGW", name: "London Gatwick Airport", city: "London", country: "United Kingdom", countryCode: "GB", type: "AIRPORT" },
    { iataCode: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", countryCode: "FR", type: "AIRPORT" },
    { iataCode: "ORY", name: "Paris Orly Airport", city: "Paris", country: "France", countryCode: "FR", type: "AIRPORT" },
    { iataCode: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", countryCode: "DE", type: "AIRPORT" },
    { iataCode: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", countryCode: "DE", type: "AIRPORT" },
    { iataCode: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands", countryCode: "NL", type: "AIRPORT" },
    { iataCode: "FCO", name: "Leonardo da Vinci International Airport", city: "Rome", country: "Italy", countryCode: "IT", type: "AIRPORT" },
    { iataCode: "MXP", name: "Milan Malpensa Airport", city: "Milan", country: "Italy", countryCode: "IT", type: "AIRPORT" },
    { iataCode: "BCN", name: "Josep Tarradellas Barcelona-El Prat Airport", city: "Barcelona", country: "Spain", countryCode: "ES", type: "AIRPORT" },
    { iataCode: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain", countryCode: "ES", type: "AIRPORT" },
    { iataCode: "LIS", name: "Humberto Delgado Airport", city: "Lisbon", country: "Portugal", countryCode: "PT", type: "AIRPORT" },
    { iataCode: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland", countryCode: "CH", type: "AIRPORT" },
    { iataCode: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria", countryCode: "AT", type: "AIRPORT" },
    { iataCode: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden", countryCode: "SE", type: "AIRPORT" },
    { iataCode: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", countryCode: "DK", type: "AIRPORT" },
    { iataCode: "OSL", name: "Oslo Airport, Gardermoen", city: "Oslo", country: "Norway", countryCode: "NO", type: "AIRPORT" },
    { iataCode: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland", countryCode: "FI", type: "AIRPORT" },

    // Asia
    { iataCode: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates", countryCode: "AE", type: "AIRPORT" },
    { iataCode: "AUH", name: "Abu Dhabi International Airport", city: "Abu Dhabi", country: "United Arab Emirates", countryCode: "AE", type: "AIRPORT" },
    { iataCode: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", countryCode: "QA", type: "AIRPORT" },
    { iataCode: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", countryCode: "CN", type: "AIRPORT" },
    { iataCode: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", countryCode: "CN", type: "AIRPORT" },
    { iataCode: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong", countryCode: "HK", type: "AIRPORT" },
    { iataCode: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", countryCode: "JP", type: "AIRPORT" },
    { iataCode: "HND", name: "Tokyo Haneda Airport", city: "Tokyo", country: "Japan", countryCode: "JP", type: "AIRPORT" },
    { iataCode: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore", countryCode: "SG", type: "AIRPORT" },
    { iataCode: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", countryCode: "KR", type: "AIRPORT" },
    { iataCode: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", countryCode: "TH", type: "AIRPORT" },
    { iataCode: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", countryCode: "MY", type: "AIRPORT" },
    { iataCode: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India", countryCode: "IN", type: "AIRPORT" },
    { iataCode: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", countryCode: "IN", type: "AIRPORT" },

    // Africa
    { iataCode: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa", countryCode: "ZA", type: "AIRPORT" },
    { iataCode: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa", countryCode: "ZA", type: "AIRPORT" },
    { iataCode: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", countryCode: "EG", type: "AIRPORT" },
    { iataCode: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria", countryCode: "NG", type: "AIRPORT" },
    { iataCode: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya", countryCode: "KE", type: "AIRPORT" },
    { iataCode: "CMN", name: "Mohammed V International Airport", city: "Casablanca", country: "Morocco", countryCode: "MA", type: "AIRPORT" },

    // Australia/Oceania
    { iataCode: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia", countryCode: "AU", type: "AIRPORT" },
    { iataCode: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", countryCode: "AU", type: "AIRPORT" },
    { iataCode: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia", countryCode: "AU", type: "AIRPORT" },
    { iataCode: "PER", name: "Perth Airport", city: "Perth", country: "Australia", countryCode: "AU", type: "AIRPORT" },
    { iataCode: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", countryCode: "NZ", type: "AIRPORT" },

    // South America
    { iataCode: "GRU", name: "São Paulo/Guarulhos International Airport", city: "São Paulo", country: "Brazil", countryCode: "BR", type: "AIRPORT" },
    { iataCode: "EZE", name: "Ministro Pistarini International Airport", city: "Buenos Aires", country: "Argentina", countryCode: "AR", type: "AIRPORT" },
    { iataCode: "SCL", name: "Santiago International Airport", city: "Santiago", country: "Chile", countryCode: "CL", type: "AIRPORT" },
    { iataCode: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru", countryCode: "PE", type: "AIRPORT" },
    { iataCode: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia", countryCode: "CO", type: "AIRPORT" },

    // Rare and remote airports
    { iataCode: "NRL", name: "North Ronaldsay Airport", city: "North Ronaldsay", country: "United Kingdom", countryCode: "GB", type: "AIRPORT" },
    { iataCode: "WLG", name: "Wellington International Airport", city: "Wellington", country: "New Zealand", countryCode: "NZ", type: "AIRPORT" },
    { iataCode: "INU", name: "Nauru International Airport", city: "Yaren", country: "Nauru", countryCode: "NR", type: "AIRPORT" },
    { iataCode: "FUN", name: "Funafuti International Airport", city: "Funafuti", country: "Tuvalu", countryCode: "TV", type: "AIRPORT" },
    { iataCode: "IPC", name: "Mataveri International Airport", city: "Easter Island", country: "Chile", countryCode: "CL", type: "AIRPORT" },
    { iataCode: "TRW", name: "Bonriki International Airport", city: "Tarawa", country: "Kiribati", countryCode: "KI", type: "AIRPORT" },
    { iataCode: "ANU", name: "V.C. Bird International Airport", city: "St. John's", country: "Antigua and Barbuda", countryCode: "AG", type: "AIRPORT" },
    { iataCode: "HLE", name: "Saint Helena Airport", city: "Jamestown", country: "Saint Helena", countryCode: "SH", type: "AIRPORT" },
    { iataCode: "SCY", name: "San Cristóbal Airport", city: "San Cristóbal", country: "Ecuador", countryCode: "EC", type: "AIRPORT" },
    { iataCode: "TBU", name: "Fuaʻamotu International Airport", city: "Nukuʻalofa", country: "Tonga", countryCode: "TO", type: "AIRPORT" },
    { iataCode: "GUM", name: "Antonio B. Won Pat International Airport", city: "Tamuning", country: "Guam", countryCode: "GU", type: "AIRPORT" },
    { iataCode: "PPG", name: "Pago Pago International Airport", city: "Pago Pago", country: "American Samoa", countryCode: "AS", type: "AIRPORT" },
    { iataCode: "YQY", name: "Sydney/J.A. Douglas McCurdy Airport", city: "Sydney", country: "Canada", countryCode: "CA", type: "AIRPORT" },
    { iataCode: "BGH", name: "Abbaye Airport", city: "Abbaye", country: "Mauritania", countryCode: "MR", type: "AIRPORT" },
    { iataCode: "BIE", name: "Beatrice Municipal Airport", city: "Beatrice", country: "United States", countryCode: "US", type: "AIRPORT" },
    { iataCode: "BQT", name: "Brest Airport", city: "Brest", country: "Belarus", countryCode: "BY", type: "AIRPORT" },
    { iataCode: "KSA", name: "Kosrae International Airport", city: "Kosrae", country: "Micronesia", countryCode: "FM", type: "AIRPORT" },
    { iataCode: "MUA", name: "Munda Airport", city: "Munda", country: "Solomon Islands", countryCode: "SB", type: "AIRPORT" },
    { iataCode: "YAM", name: "Sault Ste. Marie Airport", city: "Sault Ste. Marie", country: "Canada", countryCode: "CA", type: "AIRPORT" },
    { iataCode: "BTS", name: "Bratislava Airport", city: "Bratislava", country: "Slovakia", countryCode: "SK", type: "AIRPORT" },
    { iataCode: "TNR", name: "Ivato International Airport", city: "Antananarivo", country: "Madagascar", countryCode: "MG", type: "AIRPORT" },
    { iataCode: "BJL", name: "Banjul International Airport", city: "Banjul", country: "Gambia", countryCode: "GM", type: "AIRPORT" },
    { iataCode: "FIH", name: "N'djili Airport", city: "Kinshasa", country: "Democratic Republic of the Congo", countryCode: "CD", type: "AIRPORT" },
    { iataCode: "TMM", name: "Toamasina Airport", city: "Toamasina", country: "Madagascar", countryCode: "MG", type: "AIRPORT" },
    { iataCode: "BWN", name: "Brunei International Airport", city: "Bandar Seri Begawan", country: "Brunei", countryCode: "BN", type: "AIRPORT" },
    { iataCode: "TAS", name: "Tashkent International Airport", city: "Tashkent", country: "Uzbekistan", countryCode: "UZ", type: "AIRPORT" },
    { iataCode: "KBL", name: "Hamid Karzai International Airport", city: "Kabul", country: "Afghanistan", countryCode: "AF", type: "AIRPORT" },
    { iataCode: "PNH", name: "Phnom Penh International Airport", city: "Phnom Penh", country: "Cambodia", countryCode: "KH", type: "AIRPORT" },
    { iataCode: "TGD", name: "Podgorica Airport", city: "Podgorica", country: "Montenegro", countryCode: "ME", type: "AIRPORT" },
    { iataCode: "TLL", name: "Tallinn Airport", city: "Tallinn", country: "Estonia", countryCode: "EE", type: "AIRPORT" },
    { iataCode: "EVN", name: "Zvartnots International Airport", city: "Yerevan", country: "Armenia", countryCode: "AM", type: "AIRPORT" },
    { iataCode: "KIV", name: "Chișinău International Airport", city: "Chișinău", country: "Moldova", countryCode: "MD", type: "AIRPORT" },
    { iataCode: "TBS", name: "Tbilisi International Airport", city: "Tbilisi", country: "Georgia", countryCode: "GE", type: "AIRPORT" },
    { iataCode: "LUN", name: "Kenneth Kaunda International Airport", city: "Lusaka", country: "Zambia", countryCode: "ZM", type: "AIRPORT" },
    { iataCode: "WDH", name: "Hosea Kutako International Airport", city: "Windhoek", country: "Namibia", countryCode: "NA", type: "AIRPORT" },
    { iataCode: "MPM", name: "Maputo International Airport", city: "Maputo", country: "Mozambique", countryCode: "MZ", type: "AIRPORT" },
    { iataCode: "TNR", name: "Ivato International Airport", city: "Antananarivo", country: "Madagascar", countryCode: "MG", type: "AIRPORT" },
    { iataCode: "SEZ", name: "Seychelles International Airport", city: "Mahé", country: "Seychelles", countryCode: "SC", type: "AIRPORT" },
    { iataCode: "MRU", name: "Sir Seewoosagur Ramgoolam International Airport", city: "Port Louis", country: "Mauritius", countryCode: "MU", type: "AIRPORT" },
    { iataCode: "TMS", name: "São Tomé International Airport", city: "São Tomé", country: "São Tomé and Príncipe", countryCode: "ST", type: "AIRPORT" },
    { iataCode: "GBE", name: "Sir Seretse Khama International Airport", city: "Gaborone", country: "Botswana", countryCode: "BW", type: "AIRPORT" },
    { iataCode: "FIH", name: "N'djili Airport", city: "Kinshasa", country: "Democratic Republic of the Congo", countryCode: "CD", type: "AIRPORT" },
    { iataCode: "WDH", name: "Hosea Kutako International Airport", city: "Windhoek", country: "Namibia", countryCode: "NA", type: "AIRPORT" },
    { iataCode: "TNR", name: "Ivato International Airport", city: "Antananarivo", country: "Madagascar", countryCode: "MG", type: "AIRPORT" },
    { iataCode: "SEZ", name: "Seychelles International Airport", city: "Mahé", country: "Seychelles", countryCode: "SC", type: "AIRPORT" },
    { iataCode: "MRU", name: "Sir Seewoosagur Ramgoolam International Airport", city: "Port Louis", country: "Mauritius", countryCode: "MU", type: "AIRPORT" },
    { iataCode: "TMS", name: "São Tomé International Airport", city: "São Tomé", country: "São Tomé and Príncipe", countryCode: "ST", type: "AIRPORT" },
    { iataCode: "GBE", name: "Sir Seretse Khama International Airport", city: "Gaborone", country: "Botswana", countryCode: "BW", type: "AIRPORT" },
];

// Function to search airports based on user input
export const searchAirports = (query: string): Airport[] => {
  const lowerQuery = query.toLowerCase().trim();
  
  if (lowerQuery.length < 2) {
    return [];
  }
  
  return airports.filter(airport => {
    return (
      airport.iataCode.toLowerCase().includes(lowerQuery) ||
      airport.city.toLowerCase().includes(lowerQuery) ||
      airport.name.toLowerCase().includes(lowerQuery) ||
      airport.country.toLowerCase().includes(lowerQuery)
    );
  }).slice(0, 10); // Limit to 10 results for better performance
};

// Convert to format expected by your UI components
export const formatAirportForDisplay = (airport: Airport): string => {
  return `${airport.city} (${airport.iataCode})`;
};
