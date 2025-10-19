import logo from '../assets/Logo.png'
import "./FlightPriceHeader.css"
export function FlightPriceHeader(){
  return(
    <div className="flexbox-container">
        <img className="logo" src={logo} alt="Logo" />
        <select id="currency" name="currency" defaultValue="eur">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>
  )
}