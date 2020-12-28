import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return(
    <div className="navbar-container" data-testid="navbar">
      <ul>
        <li><Link to="/"><img alt="home" src="https://icons.getbootstrap.com/icons/house-door-fill.svg"/></Link></li>
        <li><Link to="/pokemon-list/generation-1" data-testid="pokemon-list-button"><img alt="pokemon list" src="/pokemon-silhoutte.png"/></Link></li>
        <li><Link to="/my-pokemons"><img alt="my pokemon" src="/pokeball.png"/></Link></li>
      </ul>
    </div>
  )
}