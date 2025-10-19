import './ContentContainer.css'
export function ContentContainer(){
  return(
    <div className="content-container">
        <p className="title">Flight Tickets:</p>

        <div className="radio-group">
          <label>
            <input type="radio" name="choice" value="oneway" defaultChecked />
            One Way
          </label>
          <label>
            <input type="radio" name="choice" value="twoway" />
            Two Way
          </label>
        </div>

        <input className="placeholder-box" type="text" placeholder="From" />
        <input className="placeholder-box" type="text" placeholder="To" />

        <div className="date-box-container">
          <input className="date-box" type="date" />
          <input className="date-box" type="date" />
        </div>

        <input className="placeholder-box" type="email" placeholder="Your Email" />
        <input className="placeholder-box" type="tel" placeholder="Your Phone Number" />
        <input className="placeholder-box" type="text" placeholder="Expected Price" />
      </div>

  )
}