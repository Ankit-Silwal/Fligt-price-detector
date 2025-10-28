import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png'
import "./FlightPriceHeader.css"

export function FlightPriceHeader(){
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };
  
  return(
    <div className="flexbox-container">
        <img 
          className="logo" 
          src={logo} 
          alt="Logo" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
  )
}