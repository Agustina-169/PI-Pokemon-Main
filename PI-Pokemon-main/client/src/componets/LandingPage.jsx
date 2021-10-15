import React from 'react';
import {Link} from 'react-router-dom';
import './styles/LandingPage.css'
export default function LandingPage(){
    return(
        <div>
            <h1 className='pokemones'>BIENVENIDOS A POKEMONS APP </h1>
            <Link to = '/home'>
        <button className='button1'> INGRESAR </button>
            </Link>
        </div>
    )
}