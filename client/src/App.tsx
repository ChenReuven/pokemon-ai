import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <span className="logo-icon">⚡</span>
                <span className="logo-text">PokéDex AI</span>
              </div>
              <nav className="nav">
                <div className="nav-item">Explore Pokémon</div>
              </nav>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Switch>
            <Route path="/" exact component={PokemonList} />
            <Route path="/pokemon/:name" component={PokemonDetails} />
          </Switch>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2024 PokéDex AI - Powered by AI-Driven Development</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
