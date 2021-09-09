import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName,filterCreated} from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';



export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const[orden,setOrden] = useState('')
    const[currentPage, setCurrentPage] = useState(1)
    const[pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemons = currentPage * pokemonsPerPage
    const indexOfFistPokemons = indexOfLastPokemons - pokemonsPerPage
    console.log("soy all pokemons",allPokemons)
    const currentPokemons = allPokemons.slice(indexOfFistPokemons, indexOfLastPokemons)
    
    const paginado = (pageNumber) =>{
      setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
      dispatch(getPokemons()) 
  },[dispatch])
  
  function handleClick(e){
  e.preventDefault();
  dispatch(getPokemons());
  }
  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
  }
  return(
    <div>
    <Link to = '/pokemon'>crear pokemon</Link>
    <h1>Pokemones</h1>
    <button onClick={e=> {handleClick(e)}}>
      volver a cargar todos los pokemones
    </button>
    <div>

      <select onChange={e=>handleSort(e)}>
        <option value='asc'>Ascendente</option>
        <option value='desc'>Descendente</option>
      </select>
       <select>
         <option value='All'>Todos</option>
         <option value= 'Attack'>Fuerza</option>
         </select>
      <select onChange={e=>handleFilterCreated(e)}>
        <option value='All'>Todos</option>
       
        <option value='created'>Creados</option>
      </select>
     <Paginado
     pokemonsPerPage ={pokemonsPerPage}
     allPokemons= {allPokemons?.length}
     paginado={paginado}
     />

  { currentPokemons?.map((c)=>{ 
    console.log("soy current",currentPokemons)
      return(
        <div>
          <Link to ={'/home/' + c.id}>
            <Card name={c.name || c.nombre} image={c.image || c.imagen} types={c.types || c.tipos} />
          </Link>
        </div>
      );
    })
  }  
    </div>
    </div>
  )
}