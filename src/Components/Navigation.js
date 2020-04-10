import React from "react";
import { NavLink } from 'react-router-dom'; 

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink><br/><br/>
      <NavLink to="/search">Search</NavLink><br></br>
      <NavLink to="/register"></NavLink><br></br>

    </div>
  );
};

export default Navigation;