import React from 'react'
import { NavLink } from "react-router-dom";
import '../pages/Home.css';
const Navbar = () => {
  return (
<>
          <nav className="navigation">
            <ul>
              <li><NavLink to="/">Inicio</NavLink></li>
              <li><NavLink to="/agregar">Registro</NavLink></li>
              <li><NavLink to="/participantes">Participantes</NavLink></li>
            </ul>
          </nav>
</>
 )
}

export default Navbar