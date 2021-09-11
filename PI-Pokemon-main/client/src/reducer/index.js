const initialState = {
    pokemons : []
}

 function rootReducer(state = initialState, action){
    
    switch(action.type){
       
    case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }   
            case "GET_NAME_POKEMONS":
                return{
                    ...state,
                    pokemons: action.payload
                }
           
                    

            case 'FILTER_BY_TYPES':
                const filtroTipos = state.pokemons
                const  todoTypes = action.payload  === 'tipos'? todoTypes: 
                todoTypes.filter(e => e.types === action.payload) 
                console.log("soy",todoTypes.filter(e => e.types) )
                return{
                    ...state,
                     pokemons: filtroTipos.results.data
                }

            case 'ORDER_FUERZA':
                const fuerza = action.payload ==='max'? state.pokemons.sort((a,b)=>a.attack - b.attack):
                state.pokemons.sort((a,b)=> b.attack - a.attack)
                return{
                    ...state,
                    pokemons: fuerza
                } 

            case 'ORDER_BY_NAME':
                const sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })  :
                
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                })
                return{
                    ...state,
                    pokemons: sortedArr
                }
            default: 
            return state;
    }
}
export default rootReducer;