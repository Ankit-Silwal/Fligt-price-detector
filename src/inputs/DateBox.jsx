import './DateBox.css'

export function DateBox({ departureDate, returnDate, setDepartureDate, setReturnDate, tripType }){
  return(
    <div className="date-box-container">
      <input 
        className="date-box" 
        type="date" 
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />
      {tripType === 'twoway' && (
        <input 
          className="date-box" 
          type="date" 
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={departureDate || new Date().toISOString().split('T')[0]}
        />
      )}
    </div>
  )
}