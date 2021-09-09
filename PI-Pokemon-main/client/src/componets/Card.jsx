import React from 'react'

export default function Card({name, image, types}){
    return(
        <div>
            <h3>{name}</h3>
           {/*types?.map(e=> <h5>{e}</h5>)*/}
            <img src={image} alt= 'img not found' whidt='200px' height='250px' />
        </div>
    );
}