import axios from 'axios'

export function getPokemons(){
    console.log("soy action")
    return async function(dispatch){
        var json= await axios.get("http://localhost:3001/pokemons")
        
        return dispatch({
         type: "GET_POKEMONS",
         payload: json.data
        })
    }
}
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}