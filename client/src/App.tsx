import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={PokemonList} />
          <Route path="/pokemon/:name" component={PokemonDetails} />
        </Switch>
      </Router>
  );
}

export default App;
