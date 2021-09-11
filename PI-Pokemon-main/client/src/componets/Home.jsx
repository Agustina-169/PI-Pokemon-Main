import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName,orderByFuerza, filterByTypes} from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';



export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const[orden,setOrden] = useState('')
    const[currentPage, setCurrentPage] = useState(1)
    const[pokemonsPerPage,setPokemonsPerPage] = useState(12)
    const indexOfLastPokemons = currentPage * pokemonsPerPage
    const indexOfFistPokemons = indexOfLastPokemons - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFistPokemons, indexOfLastPokemons)
    
   
    const paginado = (pageNumber) =>{
      setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
    dispatch(getPokemons()) 
}, [dispatch])
  
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

  
  function handleOrderByFuerza(e){
    e.preventDefault(e)
    dispatch(orderByFuerza(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleFilterByTypes(e){
    dispatch(filterByTypes(e.target.value))
  }
  return(
    <div>
    <Link to = '/pokemon'>CREAR POKEMON</Link>
    <h1>Pokemones</h1>
    <button onClick={e=> {handleClick(e)}}>
      volver a cargar todos los pokemones
    </button>
    <div>
   
    <select onChange={e=>{handleSort(e)}}>
      <option value='asc'>Ascendente</option>
      <option value='desc'>Descendente</option>
    </select>
    
    <select onChange={e=>handleFilterByTypes(e)}>
      <option value='tipos'>Tipos</option>
      <option value='normal'>Normal</option>
      <option value='poison'>Poison</option>
      <option value='fire'>Fire</option>
      <option value='flying'>Flying</option>
      <option value='water'>Water</option>
      <option value='bug'>Bug</option>
      <option value='electric'>Electric</option>
      <option value='grass'>Grass</option>
      <option value='ground'>Ground</option>
      <option value='fairy'>Fairy</option>
      </select>
     <select onChange={e=>handleOrderByFuerza(e)}> 
       <option value='max'>Mayor fuerza</option>
       <option value='min'>Menor fuerza</option>
       </select>
      
    <select >
      <option value='api'>Api</option>
      <option value='created'>Creados</option>
    </select>

   <Paginado
   pokemonsPerPage ={pokemonsPerPage}
   allPokemons= {allPokemons?.length}
   paginado={paginado}
    />
    
  <SearchBar/>

{currentPokemons?.map((c)=>{ 
      return(
        <div>
          <Link to ={'/home/' + c.id}>
            <Card name={c.name || c.nombre} image={c.image || c.imagen} types={c.types || c.tipos} attack={c.attack} />
          </Link>
        </div>
      );
    })
  }  
    </div>
    </div>
  )
}