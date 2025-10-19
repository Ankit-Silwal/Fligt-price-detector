import './FlightPrice.css';
import logo from './assets/Logo.png'

export function FlightPrice() {
  return (
    <div className="main-container">
      <div className="flexbox-container">
        <img className="logo" src={logo} alt="Logo" />
        <select id="currency" name="currency" defaultValue="eur">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>

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

      <div className="button-container">
        <button className="notify-btn">Notify Me</button>
      </div>
    </div>
  );
}
