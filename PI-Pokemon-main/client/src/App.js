import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componets/LandingPage';
import Home from './componets/Home'
import { PokemonsCreate } from './componets/PokemonCreate';
import Detail from './componets/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path = '/' component={LandingPage}/>
      <Route exact path = '/home' component={Home}/>
      <Route exact path = '/pokemons' component={PokemonsCreate}/>
      <Route exact path = '/home/:id' component={Detail}/>
          </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
