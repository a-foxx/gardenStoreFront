import '../../stripe.css';
import Header from "../../util/header"
import NavBar from "../navigation/NavBar"
import { NavLink } from 'react-router-dom';

function Completion() {

  return (
    <>
    <Header />
      <nav>
        <NavBar/>
      </nav>
    <h2>Thank you! 🎉</h2>
    <NavLink to="/OrderHistory">Order history</NavLink>
    </>
  )
  }
  
  export default Completion;
  