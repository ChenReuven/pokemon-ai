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
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/pokemons');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon data');
                }
                const data = await response.json();
                setPokemons(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="error-container">
                <div className="error-content">
                    <div className="error-icon">⚠️</div>
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <button 
                        className="retry-button" 
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pokemon-list-container">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Discover Amazing Pokémon</h1>
                    <p className="page-subtitle">
                        Explore the vast world of Pokémon and learn about their unique abilities
                    </p>
                </div>

                <div className="search-container">
                    <div className="search-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search Pokémon..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading Pokémon...</p>
                    </div>
                ) : (
                    <>
                        <div className="results-info">
                            <span className="results-count">
                                {filteredPokemons.length} Pokémon found
                            </span>
                        </div>

                        <div className="pokemon-grid">
                            {filteredPokemons.map((pokemon, index) => (
                                <Link 
                                    key={pokemon.name} 
                                    to={`/pokemon/${pokemon.name}`}
                                    className="pokemon-card-link"
                                >
                                    <div 
                                        className="pokemon-card fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="pokemon-card-header">
                                            <div className="pokemon-avatar">
                                                {pokemon.name.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="pokemon-card-body">
                                            <h3 className="pokemon-name">
                                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                            </h3>
                                            <div className="pokemon-card-footer">
                                                <span className="view-details">View Details →</span>
                                            </div>
                                        </div>
                                        <div className="pokemon-card-glow"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredPokemons.length === 0 && searchTerm && (
                            <div className="no-results">
                                <div className="no-results-icon">🔍</div>
                                <h3>No Pokémon found</h3>
                                <p>Try searching with a different name</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default PokemonList;
