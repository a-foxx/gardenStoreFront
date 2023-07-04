import { useLocation } from 'react-router';
import '../../stripe.css';
import { NavLink } from 'react-router-dom';

function Completion({data}) {
  const location = useLocation()
  // const [cart, setCart] = useState([]);
  console.log('location', location.state);

  return (
    <>
    <h2>Thank you! 🎉</h2>
    <NavLink to="/OrderHistory">Order history</NavLink>
    </>
  )
  }
  
  export default Completion;
  