import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getDetail} from '../actions/index';
import {useEffect} from 'react';

export default function Detail(props){
 const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getDetail(props.match.params.id))
  },[dispatch,props.match.params.id])

 const myPokemon = useSelector((state)=> state.detail)
  console.log("myPokemon",myPokemon)
 return(
   <div>
    
       
       <div>
         <h1>Soy {myPokemon.nombre}</h1>
         <img src={myPokemon.imagen} alt='Imagen no encontrada' width='250px' height='175px'></img>
         <h2>fuerza:{myPokemon.fuerza}</h2>
         <h2>velocidad:{myPokemon.velocidad}</h2>
         <h2>altura:{myPokemon.altura}</h2>
         <h2>peso:{myPokemon.peso}</h2>
         <h2>defensa:{myPokemon.defensa}</h2>
         <h2>vida:{myPokemon.vida}</h2>
         <h4>types:{!myPokemon.bD? myPokemon.types+' ' : myPokemon.types.map(e=> e.nombre + (' '))}</h4>
         

        </div>
   
     <Link to= '/home'>
       <button>Volver</button>
     </Link>

   </div>
 )
}