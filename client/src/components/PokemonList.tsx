import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';

interface Pokemon {
    name: string;
    url: string;
}

function PokemonList() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetch('http://localhost:5000/api/pokemons')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: Pokemon[]) => {
                setPokemons(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pokemon list:', error);
                setError('Failed to load pokemon list. Please try again.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div>
                <h2 className="header">Pokemon List</h2>
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2 className="header">Pokemon List</h2>
                <div>Error: {error}</div>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="header">Pokemon List</h2>
            <div className="pokemon-list">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.name} className="pokemon-card">
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
