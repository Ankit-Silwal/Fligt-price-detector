// Amadeus API Service
const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

let accessToken = null;
let tokenExpiry = null;

// Get access token
async function getAccessToken() {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: AMADEUS_API_KEY,
    client_secret: AMADEUS_API_SECRET,
  });

  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    accessToken = data.access_token;
    // Set expiry to 30 minutes from now (tokens typically last 30 mins)
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Search for flight offers
export async function searchFlightOffers({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate = null,
  adults = 1,
  currency = 'USD',
  travelClass = 'ECONOMY',
  nonStop = false,
  max = 10,
}) {
  try {
    const token = await getAccessToken();
    
    const params = new URLSearchParams({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: adults.toString(),
      currencyCode: currency,
      travelClass,
      nonStop: nonStop.toString(),
      max: max.toString(),
    });

    // Add return date for round trips
    if (returnDate) {
      params.append('returnDate', returnDate);
    }

    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.errors?.[0]?.detail || 'Failed to fetch flight offers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
}

// Get airport/city suggestions
export async function searchLocations(keyword) {
  try {
    const token = await getAccessToken();
    
    const params = new URLSearchParams({
      keyword,
      subType: 'AIRPORT,CITY',
    });

    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}
