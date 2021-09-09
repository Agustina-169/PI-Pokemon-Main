import React from 'react';

export default function  Paginado({pokemonsPerPage, allPokemons,paginado}){
    const pageNumber =[]
    
    for (let i = 1; i<=Math.ceil(allPokemons / pokemonsPerPage); i++){
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumber &&
                pageNumber.map(number=>(
                    
                    <button onClick={()=>paginado(number)}>{number}</button>
                   
                ))}
            </ul>
        </nav>
    )
}