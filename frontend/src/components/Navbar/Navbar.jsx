import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
   return (
      <nav className="navbar">
         <div className="navbar-logo-container">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Freela For Devs</span>
        </div>
         <ul className="navbar-nav">
            <li className="nav-item">
               <NavLink exact to="/" className="nav-link" activeClassName="active">
                  Home
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink to="/login" className="nav-link" activeClassName="active">
                  Login
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink to="/register" className="nav-link" activeClassName="active">
                  Cadastre-se
               </NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar