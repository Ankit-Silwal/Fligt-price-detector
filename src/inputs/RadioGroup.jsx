import './RadioGroup.css'

export function RadioGroup({ tripType, setTripType, origin, destination, setOrigin, setDestination }){
  return(
    <>
      <div className="radio-group">
        <label>
          <input 
            type="radio" 
            name="choice" 
            value="oneway" 
            checked={tripType === 'oneway'}
            onChange={(e) => setTripType(e.target.value)}
          />
          One Way
        </label>
        <label>
          <input 
            type="radio" 
            name="choice" 
            value="twoway"
            checked={tripType === 'twoway'}
            onChange={(e) => setTripType(e.target.value)}
          />
          Two Way
        </label>
      </div>
      <input 
        className="placeholder-box" 
        type="text" 
        placeholder="From (e.g., NYC, LON)" 
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input 
        className="placeholder-box" 
        type="text" 
        placeholder="To (e.g., LAX, PAR)" 
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
    </>
  )
}