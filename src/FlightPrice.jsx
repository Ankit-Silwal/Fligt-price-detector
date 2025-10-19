import './FlightPrice.css';
import { ContentContainer } from './ContentContainer';
import { FlightPriceHeader } from './header/FlightPriceHeader';
import { NotifyButton } from './NotifyButton';
// import logo from './assets/Logo.png'

export function FlightPrice() {
  return (
    <div className="main-container">
      <FlightPriceHeader />
      <ContentContainer />
      <NotifyButton />
    </div>
  );
}
