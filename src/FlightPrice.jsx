import './FlightPrice.css';
import { useState } from 'react';
import { ContentContainer } from './ContentContainer';
import { FlightPriceHeader } from './header/FlightPriceHeader';
import { NotifyButton } from './NotifyButton';
import { searchFlightOffers } from './services/amadeusService';

export function FlightPrice() {
  const [flightData, setFlightData] = useState({
    tripType: 'oneway',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    currency: 'USD',
  });
  
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!flightData.origin || !flightData.destination || !flightData.departureDate) {
      setError('Please fill in all required fields (Origin, Destination, and Departure Date)');
      setFlights([]);
      return;
    }

    if (flightData.origin.length !== 3 || flightData.destination.length !== 3) {
      setError('Airport codes must be exactly 3 letters (e.g., NYC, LAX, LON)');
      setFlights([]);
      return;
    }

    if (flightData.tripType === 'twoway' && !flightData.returnDate) {
      setError('Please select a return date for round trip');
      setFlights([]);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const departure = new Date(flightData.departureDate);
    
    if (departure < today) {
      setError('Departure date cannot be in the past');
      setFlights([]);
      return;
    }

    if (flightData.tripType === 'twoway' && flightData.returnDate) {
      const returnD = new Date(flightData.returnDate);
      if (returnD < departure) {
        setError('Return date must be after departure date');
        setFlights([]);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setFlights([]);
    
    try {
      const result = await searchFlightOffers({
        originLocationCode: flightData.origin.toUpperCase(),
        destinationLocationCode: flightData.destination.toUpperCase(),
        departureDate: flightData.departureDate,
        returnDate: flightData.tripType === 'twoway' ? flightData.returnDate : null,
        adults: flightData.adults,
        currency: flightData.currency,
        max: 10,
      });
      
      if (!result.data || result.data.length === 0) {
        setError('No flights found for the selected criteria. Please try different dates or airports.');
        setFlights([]);
      } else {
        setFlights(result.data);
        setError(null);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to search flights. Please check your input and try again.';
      setError(errorMessage);
      setFlights([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <FlightPriceHeader />
      <ContentContainer 
        flightData={flightData}
        setFlightData={setFlightData}
      />
      
      {!loading && (
        <NotifyButton 
          onSearch={handleSearch}
          loading={loading}
        />
      )}
      
      {error && (
        <div style={{ 
          color: '#d32f2f', 
          padding: '15px 20px', 
          margin: '10px 20px',
          backgroundColor: '#ffebee',
          border: '1px solid #ef5350',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '500',
          boxShadow: '0 2px 4px rgba(211, 47, 47, 0.1)',
          position: 'relative',
          zIndex: 1000
        }}>
          ⚠️ {error}
        </div>
      )}
      
      <Footer />
      
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          fontSize: '18px',
          color: '#1976d2',
          fontWeight: '500'
        }}>
          <div style={{ 
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #e3f2fd',
            borderTop: '4px solid #1976d2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '15px'
          }}></div>
          <div>Searching for flights...</div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      {!loading && flights.length > 0 && (
        <div style={{ padding: '20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#1976d2' }}>
            ✈️ Available Flights ({flights.length})
          </h2>
          {flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
}

function FlightCard({ flight }) {
  const firstSegment = flight.itineraries[0].segments[0];
  const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
  const duration = flight.itineraries[0].duration;
  const price = flight.price.total;
  const currency = flight.price.currency;
  
  const formatDuration = (dur) => {
    return dur.replace('PT', '').replace('H', 'h ').replace('M', 'm');
  };

  // Get airline name from carrier code
  const getAirlineName = (code) => {
    const airlines = {
      'AA': 'American Airlines',
      'DL': 'Delta Air Lines',
      'UA': 'United Airlines',
      'BA': 'British Airways',
      'LH': 'Lufthansa',
      'AF': 'Air France',
      'KL': 'KLM',
      'EK': 'Emirates',
      'QR': 'Qatar Airways',
      'SQ': 'Singapore Airlines',
      'AI': 'Air India',
      'UK': 'Vistara',
      '6E': 'IndiGo',
      'SG': 'SpiceJet',
    };
    return airlines[code] || code;
  };

  // Generate booking links for multiple platforms
  const generateBookingLinks = () => {
    const origin = firstSegment.departure.iataCode;
    const destination = lastSegment.arrival.iataCode;
    const departureDate = firstSegment.departure.at.split('T')[0];
    
    return [
      {
        name: 'Google Flights',
        url: `https://www.google.com/travel/flights?q=flights%20from%20${origin}%20to%20${destination}%20on%20${departureDate}`,
        icon: '🔍'
      },
      {
        name: 'Skyscanner',
        url: `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${departureDate.replace(/-/g, '')}/?adultsv2=1&cabinclass=economy&childrenv2=&inboundaltsenabled=false&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=0`,
        icon: '✈️'
      },
      {
        name: 'Kayak',
        url: `https://www.kayak.com/flights/${origin}-${destination}/${departureDate}?sort=bestflight_a`,
        icon: '🛫'
      },
      {
        name: 'Expedia',
        url: `https://www.expedia.com/Flights-Search?trip=oneway&leg1=from:${origin},to:${destination},departure:${departureDate}TANYT&passengers=adults:1,children:0,seniors:0,infantinlap:Y&mode=search`,
        icon: '🌐'
      }
    ];
  };

  const bookingLinks = generateBookingLinks();
  const airlineName = getAirlineName(firstSegment.carrierCode);
  
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      backgroundColor: 'white',
      boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
      transition: 'box-shadow 0.2s, border-color 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
      e.currentTarget.style.borderColor = '#1976d2';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.08)';
      e.currentTarget.style.borderColor = '#e0e0e0';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#1976d2' }}>
            {firstSegment.departure.iataCode} → {lastSegment.arrival.iataCode}
          </div>
          <div style={{ color: '#555', marginBottom: '6px', fontSize: '14px' }}>
            <strong>Departure:</strong> {new Date(firstSegment.departure.at).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div style={{ color: '#555', marginBottom: '6px', fontSize: '14px' }}>
            <strong>Arrival:</strong> {new Date(lastSegment.arrival.at).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div style={{ color: '#555', marginBottom: '6px', fontSize: '14px' }}>
            <strong>Duration:</strong> {formatDuration(duration)}
          </div>
          <div style={{ color: '#555', marginBottom: '6px', fontSize: '14px' }}>
            <strong>Stops:</strong> {flight.itineraries[0].segments.length - 1 === 0 ? '✈️ Non-stop' : `🛬 ${flight.itineraries[0].segments.length - 1} stop(s)`}
          </div>
          <div style={{ color: '#555', marginBottom: '10px', fontSize: '14px' }}>
            <strong>Airline:</strong> {airlineName} ({firstSegment.carrierCode} {firstSegment.number})
          </div>

          {/* Booking Links Section */}
          <div style={{ 
            marginTop: '15px', 
            paddingTop: '15px', 
            borderTop: '1px solid #e0e0e0' 
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              marginBottom: '10px', 
              color: '#333' 
            }}>
              🎫 Book on These Platforms:
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px' 
            }}>
              {bookingLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 14px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1565c0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1976d2';
                  }}
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1976d2',
          textAlign: 'right',
          minWidth: '150px',
          padding: '10px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px'
        }}>
          {currency} {parseFloat(price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '10px',
      marginTop: '10px',
      fontSize: '10px',
      color: '#666',
      backgroundColor: 'transparent'
    }}>
      <p style={{ margin: '0', backgroundColor: 'transparent' }}>
        🎓 A project by <strong style={{ backgroundColor: 'transparent' }}>Ankit</strong> & <strong style={{ backgroundColor: 'transparent' }}>Anish</strong> | Sharda University
      </p>
    </div>
  );
}
