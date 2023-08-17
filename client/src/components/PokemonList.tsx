import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';  // Import the CSS file

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/pokemons')
            .then(response => response.json())
            .then(data => setPokemons(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2 className="header">Pokemon List</h2>
            <div className="pokemon-list">
                {pokemons.map((pokemon: any) => (
                    <div key={pokemon.name} className="pokemon-card">
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
