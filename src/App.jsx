import { Routes, Route } from 'react-router-dom';
import { FlightPrice } from "./FlightPrice";

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<FlightPrice />} />
      <Route path="/search" element={<FlightPrice />} />
    </Routes>
  )
}