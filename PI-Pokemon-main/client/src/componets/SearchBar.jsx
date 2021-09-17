import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const[name,setName] = useState("")

function handleImputChange(e){
    e.preventDefault()
    setName(e.target.value)

}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getNamePokemons(name))
    setName({
        name: ""
    })
}
    return(
        <div>
            <input
            type = "text"
            value = {name.name}
            placeholder = "Buscar..."
            onChange = {(e)=> handleImputChange(e)}
            />
            <button type= "submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}