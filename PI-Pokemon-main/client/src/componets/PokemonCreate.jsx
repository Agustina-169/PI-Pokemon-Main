import React , {useState,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postPokemons,getTipos} from '../actions/index'
import { useDispatch,useSelector } from "react-redux";
import  './styles/PokemonCreate.css'

function validate(input){
    let errors= {};
    if(!input.nombre){ 
        errors.nombre=  "se requiere un nombre";
    }else if(!input.imagen){
        errors.imagen = "agregar imagen";
    }else if(!input.vida){
        errors.vida = "agregar vida ";
    }else if(!input.fuerza){
        errors.fuerza ="agregar fuerza";
    }else if(!input.velocidad){
        errors.velocidad= "agregar velocidad";
    }else if(!input.altura){
        errors.altura = "agregar altura";
    }else  if(!input.peso){
            errors.peso ="agregar peso";
       
    }else{
        if(!input.defensa){
            errors.defensa ="agregar defensa"
        }
    }
    
    return errors 
  
  
}

export  function PokemonsCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
     dispatch(getTipos())
 },[dispatch]);
    const tipos = useSelector((state)=> state.tipos)
    const [errors,setErrors] = useState({})

const[input,setInput] = useState({
    nombre: "",
    types: [],
    imagen: "",
    vida:"",
    fuerza:"",
    velocidad:"",
    altura:"",
    peso:"",
    defensa:""

 })

function handleChange(e){
     setInput({
         ...input,
         [e.target.name]: e.target.value
     })
     setErrors(validate({
         ...input,
         [e.target.name]: e.target.value
     }))
     console.log("input",input)
 }



function handleSelect(e){
    setInput({
        ...input,
         types: [...input.types,e.target.value]
    })
}
function handleDelete(el){
     setInput({
         ...input,
        types: input.types.filter(type => type !== el)
     })
 }
 function handleSubmit(e){
     e.preventDefault();
     dispatch(postPokemons(input))
     alert("pokemon creado con exito!")
     setInput({
    nombre: "",
    types: [],
    imagen: "",
    vida:"",
    fuerza:"",
    velocidad:"",
    altura:"",
    peso:"",
    defensa:""
     })
     history.push("/home")
 }
 
 

 return(
     <div >
           <Link to = '/home'><button className='buttonVolver'>Atras </button ></Link>
         <h1>Crea tu pokemon!</h1>
         <form onSubmit={(e)=>handleSubmit(e)}>
            
             <div  >
                 <label><h3>Nombre</h3></label>
                 <input className='text'
                 type="text"
                 value={input.nombre}
                 name="nombre"
                 onChange={(e)=>handleChange(e)}
                 />
                 {errors.nombre &&(
                     <p className='error'>{errors.nombre}</p>
                 )}
             </div>
            
             <div>
                 <label><h3>Imagen</h3></label>
                 <input className='text'
                    type= "text"
                    value={input.imagen}
                    name="imagen"
                  onChange={(e)=>handleChange(e)}
                 />
                  {errors.imagen &&(
                     <p className='error'>{errors.imagen}</p>
                      )}
             </div>

             <div>
                 <label><h3>Vida</h3></label>
                 <input
                 type="number"
                 value={input.vida}
                 name="vida"
                onChange={(e)=>handleChange(e)}
                 />
                  {errors.vida &&(
                     <p className='error'>{errors.vida}</p>
                      )}
             </div>

             <div>
                 <label><h3>Fuerza</h3></label>
                 <input
                 type="number"
                 value={input.fuerza}
                 name="fuerza"
                 onChange={(e)=>handleChange(e)}
                 />
                  {errors.fuerza &&(
                     <p className='error'>{errors.fuerza}</p>
                      )}
             </div>


              <div>
                 <label><h3>Velocidad</h3></label>
                 <input
                 type="number"
                 value={input.velocidad}
                 name="velocidad"
                 onChange={(e)=>handleChange(e)}
                 />
                  {errors.velocidad &&(
                     <p className='error'>{errors.velocidad}</p>
                      )}
             </div>
             
              <div>
                 <label><h3>Altura</h3></label>
                 <input
                 type="number"
                 value={input.altura}
                 name="altura"
                onChange={(e)=>handleChange(e)}
                 />
                  {errors.altura &&(
                     <p className='error'>{errors.altura}</p>
                      )}
             </div>
             
              <div>
                 <label><h3>Peso</h3></label>
                 <input
                 type="number"
                 value={input.peso}
                 name="peso"
               onChange={(e)=>handleChange(e)}
                 />
                  {errors.peso &&(
                     <p className='error'>{errors.peso}</p>
                  )}
             </div>
                <div>
                 <label><h3>Defensa</h3></label>
                 <input
                 type="number"
                 value={input.defensa}
                 name="defensa"
                onChange={(e)=>handleChange(e)}
                 />
                  {errors.defensa &&(
                     <p className='error'>{errors.defensa}</p>
                      )}
             </div>
              
              
                <select className='otro'onChange={(e)=>handleSelect(e)}>
                    {tipos?.map((type)=>
                        <option value={type}>{type}</option>
                    )}
                </select>
                 
                 
           
            <ul><li>{input.types.map(el => el + " ,")}</li></ul>

            <button className='buttonVolver' type='submit'>Crear pokemon</button>


         </form>

         {input.types.map(el=>
          <div className ="divTi">
          <p >{el}</p>
          <button className='botonX' onClick={()=>handleDelete(el)}>x</button>
          </div>
         )}

     </div>
 )
}