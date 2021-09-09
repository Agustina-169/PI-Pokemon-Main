const initialState = {
    pokemons : []
}

function rootReducer(state = initialState, action){
    console.log("soy reducer")
    switch(action.type){
       
    case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }   
            case 'FILTER_CREATED':
                const allPokemons = state.pokemons
                const createdFilter = action.payload  === 'created'? allPokemons?.filter(el => el.bD) :allPokemons?.filter(el => !el.bD)
                console.log(allPokemons?.filter(el => el.bD) )
                return{
                    ...state,
                    pokemons: action.payload === 'All' ? allPokemons : createdFilter
                    
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