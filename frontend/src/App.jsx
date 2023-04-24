import { Outlet, useLocation  } from "react-router-dom"
import './index.css';

// Components
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/register' || location.pathname === '/login';
  const hideFooter = location.pathname === '/register' || location.pathname === '/login';


  return (
    <>
      {hideNavbar ? null : <Navbar />}
      <Outlet />
      {hideFooter ? null : <Footer />}
    </>
  )
}

export default App
