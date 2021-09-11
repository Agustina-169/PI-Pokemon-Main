import React from 'react'

export default function Card({name, image, types,attack}){
    return(
        <div>
            
            <h3>{name}</h3>
            <img src={image} alt= 'img not found' whidt='200px' height='250px' />
           <h6>{attack}</h6>
           {types.map(e=> <h5>{e}</h5>)}
        </div>
    );
}