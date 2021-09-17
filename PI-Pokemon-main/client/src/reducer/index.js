const initialState = {
    pokemons : [],
    detail:[],
    allPokemons : [],
    tipos: []
}

 function rootReducer(state = initialState, action){
    
    switch(action.type){
       
    case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                allPokemons : action.payload
            }   
            case "GET_NAME_POKEMONS":
                return{
                    ...state,
                    pokemons: action.payload
                }
            
            case 'GET_TIPOS':
                return{
                    ...state,
                    tipos: action.payload
                }
            case 'POST_POKEMONS':
                return{
                    ...state
                }
            case 'FILTER_CREATED':
             const createdFilter = action.payload === 'created'? state.allPokemons.filter(e=> !!e.bD) :
             action.payload === 'api'? state.allPokemons.filter(e=> !e.bD) : state.allPokemons
              return{
                  ...state,
                  pokemons:  createdFilter
              }
    

            case 'FILTER_BY_TYPES':
                const allPokemons = state.allPokemons
                const  todoTypes = action.payload  === 'all'? allPokemons:
              allPokemons.filter(e => e.types.includes(action.payload)
              || e.types.some(t => t.nombre === action.payload)) 
                return{
                    ...state,
                    pokemons: todoTypes
                }

            case 'ORDER_FUERZA':
                const fuerza = action.payload ==='max'? state.pokemons.sort((a,b)=>b.fuerza - a.fuerza  ):
                state.pokemons.sort((a,b)=> a.fuerza- b.fuerza )
                return{
                    ...state,
                    pokemons: fuerza
                } 

            case 'ORDER_BY_NAME':
                const sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a,b){
                    if(a.nombre > b.nombre){
                        return 1;
                    }
                    if(b.nombre > a.nombre){
                        return -1;
                    }
                    return 0;
                }):
                
                state.pokemons.sort(function(a,b){
                    if(a.nombre > b.nombre){
                        return -1;
                    }
                    if(b.nombre > a.nombre){
                        return 1;
                    }
                })
                return{
                    ...state,
                    pokemons: sortedArr
                }

                case 'GET_DETAILS':
                return{
                    ...state,
                  detail: action.payload
                }
            default: 
            return state;
    }
}
export default rootReducer;