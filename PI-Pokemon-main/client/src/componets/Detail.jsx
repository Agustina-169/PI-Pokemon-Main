import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getDetail} from '../actions/index';
import {useEffect} from 'react';
import './styles/Detail.css'

export default function Detail(props){
 const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getDetail(props.match.params.id))
  },[dispatch,props.match.params.id])

 const myPokemon = useSelector((state)=> state.detail)
  console.log("myPokemon",myPokemon)
 return(
   <div>
    
     <Link to= '/'>
       <button  className='buttonVolver'>inicio</button>
     </Link>
     
    <Link to= '/home'>
       <button  className='buttonVolver'>Atras</button>
     </Link>

       
       <div >
         <h1>Soy {myPokemon.nombre}</h1>
         <img className='detail' src={myPokemon.imagen} alt='Imagen no encontrada' width='250px' height='175px'></img>
         <h2  className='desc'>FUERZA:{myPokemon.fuerza}</h2>
         <h2 className='desc'>VELOCIDAD:{myPokemon.velocidad}</h2>
         <h2 className='desc'>ALTURA:{myPokemon.altura}</h2>
         <h2 className='desc'>PESO:{myPokemon.peso}</h2>
         <h2 className='desc'>DEFENSA:{myPokemon.defensa}</h2>
         <h2 className='desc'>VIDA:{myPokemon.vida}</h2>
         <h2 className='desc'>TIPOS:{!myPokemon.bD? myPokemon.types+' ' : myPokemon.types.map(e=> e.nombre + (' '))}</h2>
         

        </div>
   
   </div>
 )
}