# Amadeus API Integration - Flight Price Detector

## Overview
This application is integrated with the Amadeus Flight Booking API to search for real-time flight offers.

## Setup

### 1. Environment Variables
The API credentials are stored in the `.env` file:
```
VITE_AMADEUS_API_KEY=nXWKwhLpOGi9Cq9KU6EIr6uSiVh0KJVG
VITE_AMADEUS_API_SECRET=cv4JA4s3LWg6pjOn
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

## How to Use

### Search for Flights
1. **Select Trip Type**: Choose between "One Way" or "Two Way" (round trip)
2. **Enter Origin**: Enter the IATA airport code (e.g., NYC, LAX, LON)
3. **Enter Destination**: Enter the destination IATA airport code (e.g., PAR, JFK, DXB)
4. **Select Departure Date**: Choose your departure date
5. **Select Return Date**: (Only for round trips) Choose your return date
6. **Number of Adults**: Specify how many adults are traveling (1-9)
7. **Click "Search Flights"**: The app will search for available flights

### Common Airport Codes
- **New York**: JFK, LGA, EWR
- **Los Angeles**: LAX
- **London**: LHR, LGW, STN
- **Paris**: CDG, ORY
- **Dubai**: DXB
- **Tokyo**: NRT, HND
- **Sydney**: SYD
- **Singapore**: SIN
- **Hong Kong**: HKG
- **Amsterdam**: AMS

### Flight Results
The results will display:
- Flight route (origin → destination)
- Departure and arrival times
- Flight duration
- Number of stops
- Carrier information
- Price in the original currency

## API Features Used

### 1. Flight Offers Search
- **Endpoint**: `GET /v2/shopping/flight-offers`
- **Features**:
  - One-way and round-trip searches
  - Multiple passengers support
  - Real-time pricing
  - Flight details including stops and duration

### 2. Authentication
- Uses OAuth2 client credentials flow
- Automatically manages access tokens
- Tokens are cached and refreshed when expired

## Important Notes

### Testing Environment
The integration currently uses Amadeus **Test API** (`test.api.amadeus.com`). This means:
- You get test data, not real flight bookings
- Some searches may return limited or no results
- Perfect for development and testing

### Production Use
To switch to production:
1. Get production API credentials from Amadeus
2. Update the `.env` file with production keys
3. Change the API base URL in `src/services/amadeusService.js` from:
   - `https://test.api.amadeus.com` → `https://api.amadeus.com`

### IATA Codes
- Airport codes must be valid 3-letter IATA codes
- You can use city codes (e.g., NYC) which will search all airports in that city
- Invalid codes will result in an error

### Date Format
- Dates must be in the format: `YYYY-MM-DD`
- Departure date must be in the future
- Return date must be after departure date (for round trips)

## Troubleshooting

### No Flights Found
- Try different dates
- Check that airport codes are valid
- Try major airports/cities (JFK, LAX, LHR, etc.)
- Remember: This is test data, not all routes are available

### API Errors
- Check browser console for detailed error messages
- Verify API credentials in `.env` file
- Ensure you have internet connection
- Check Amadeus API status

### Common Errors
- **"Failed to get access token"**: Check API credentials
- **"No flights found"**: Try different search parameters
- **"Please fill in all required fields"**: Ensure origin, destination, and departure date are filled

## API Documentation
For more information about Amadeus APIs:
- [Amadeus for Developers](https://developers.amadeus.com/)
- [Flight Offers Search API](https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search)
