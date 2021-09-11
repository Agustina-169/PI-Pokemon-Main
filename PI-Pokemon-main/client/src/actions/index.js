import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        var json= await axios.get("http://localhost:3001/pokemons")
        
        return dispatch({
         type: "GET_POKEMONS",
         payload: json.data
        })
    }

}
export function getNamePokemons(name){
    return async function(dispatch){
      try{
        var json = await axios.get("http://localhost:3001/pokemons?name="+ name);
        console.log("soy el json",json.data)
        return dispatch({
            type: "GET_NAME_POKEMONS",
            payload: json.data
        })
      }catch(error){
        console.log(error)
       }
    }
}



export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function postPokemons(payload){
    return async function (dispatch){
     const response= await axios.post('http://localhost:3001/pokemons', payload)
     return response;
    }
    
}
export function orderByFuerza(payload){
    return{
        type: 'ORDER_FUERZA',
        payload
    }
}

export function filterByTypes(payload){
    return{
        type: 'FILTER_BY_TYPES',
        payload
    }
}