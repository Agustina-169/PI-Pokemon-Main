import React from 'react'
import './styles/Card.css'
export default function Card({name, image, types,fuerza}){
    
    return(
        <div className='Card'>
            <h2>{name}</h2>
            <img src={image} alt= 'img not found' whidt='200px' height='250px' />
           <h3>{fuerza}</h3>
           {types?.map(e=> typeof e === "string"? <h3> {e}</h3>:<h3>{e.nombre}</h3> )}
        </div>
    );
    
}