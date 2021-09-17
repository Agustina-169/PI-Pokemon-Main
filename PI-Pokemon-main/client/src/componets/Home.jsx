import React from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName,orderByFuerza, filterByTypes,filterCreated,getTipos} from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './styles/Home.css';

export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const[,setOrden] = useState('')
    const[currentPage, setCurrentPage] = useState(1)
    const[pokemonsPerPage,] = useState(9)
    const indexOfLastPokemons = currentPage * pokemonsPerPage
    const indexOfFistPokemons = indexOfLastPokemons - pokemonsPerPage
    const currentPokemons = allPokemons?.slice(indexOfFistPokemons, indexOfLastPokemons)
    console.log(allPokemons)
   
    const tipos = useSelector((state)=> state.tipos)
    const paginado = (pageNumber) =>{
      setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
    dispatch(getPokemons()) 
}, [dispatch])

 useEffect(()=>{
     dispatch(getTipos())
 },[dispatch]);

 function handleClick(e){
  e.preventDefault();
  dispatch(getPokemons());
  }
   function handleFilterCreated(e){
     dispatch(filterCreated(e.target.value))
   }

  function handleFilterByTypes(e){
    dispatch(filterByTypes(e.target.value))
  }
  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  
  function handleOrderByFuerza(e){
    e.preventDefault()
    console.log("s", e.target.value)
    dispatch(orderByFuerza(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }
  return(
    <div className='container'>
      
    <Link to = '/pokemons'>CREAR POKEMON</Link>
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
     <option value="all">Todos</option>
     {tipos?.map((type)=>
      <option value={type}>{type}</option>
       )}
      </select>
     <select onChange={e=>handleOrderByFuerza(e)}> 
       <option value='max'>Mayor fuerza</option>
       <option value='min'>Menor fuerza</option>
       </select>
      
    <select onChange={e=>handleFilterCreated(e)}>
      <option value='todos'>Todos</option> 
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
        <div className='card'>
          <Link to ={'/home/' + c.id}>
            <Card name={c.name || c.nombre} image={c.image? c.image: c.imagen} types={c.types || c.tipos}fuerza={c.fuerza}
            />
          </Link>
        </div>
      );
    })
  }  
    </div>
    </div>
  )
}