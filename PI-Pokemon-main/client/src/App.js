import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './componets/LandingPage';
import Home from './componets/Home'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path = '/' component={LandingPage}/>
      <Route path = '/home' component={Home}/>
     
          </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
