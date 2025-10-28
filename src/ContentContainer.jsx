import './ContentContainer.css'
import { RadioGroup } from './inputs/RadioGroup'
import { DateBox } from './inputs/DateBox'
import { LoginCredentials } from './inputs/LoginCredentials'

export function ContentContainer({ flightData, setFlightData }){
  return(
    <div className="content-container">
        <p className="title">Flight Tickets:</p>
        <RadioGroup 
          tripType={flightData.tripType}
          setTripType={(type) => setFlightData({ ...flightData, tripType: type })}
          origin={flightData.origin}
          destination={flightData.destination}
          setOrigin={(origin) => setFlightData({ ...flightData, origin })}
          setDestination={(destination) => setFlightData({ ...flightData, destination })}
        />
        <DateBox 
          departureDate={flightData.departureDate}
          returnDate={flightData.returnDate}
          setDepartureDate={(date) => setFlightData({ ...flightData, departureDate: date })}
          setReturnDate={(date) => setFlightData({ ...flightData, returnDate: date })}
          tripType={flightData.tripType}
        />
        <LoginCredentials 
          adults={flightData.adults}
          setAdults={(adults) => setFlightData({ ...flightData, adults })}
          currency={flightData.currency}
          setCurrency={(currency) => setFlightData({ ...flightData, currency })}
        />
      </div>
  )
}