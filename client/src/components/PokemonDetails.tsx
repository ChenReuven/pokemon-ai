import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './PokemonDetails.css';

interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}

interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface PokemonSprites {
    front_default: string;
    front_shiny?: string;
    back_default?: string;
}

interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: PokemonAbility[];
    types: PokemonType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}

function PokemonDetails({ match }: any) {
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showShiny, setShowShiny] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/pokemon/${match.params.name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon details');
                }
                const data = await response.json();
                setPokemonDetail(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [match.params.name]);

    const getTypeColor = (type: string): string => {
        const typeColors: { [key: string]: string } = {
            fire: '#FF5733',
            water: '#3498DB',
            grass: '#27AE60',
            electric: '#F1C40F',
            psychic: '#E91E63',
            ice: '#85C1E9',
            dragon: '#8E44AD',
            dark: '#34495E',
            fairy: '#FF69B4',
            fighting: '#E74C3C',
            poison: '#9B59B6',
            ground: '#D4AC0D',
            flying: '#AED6F1',
            bug: '#58D68D',
            rock: '#85929E',
            ghost: '#BB8FCE',
            steel: '#85929E',
            normal: '#95A5A6'
        };
        return typeColors[type] || '#95A5A6';
    };

    const formatStatName = (statName: string): string => {
        return statName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading Pokémon details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-content">
                    <div className="error-icon">⚠️</div>
                    <h2>Failed to Load Pokémon</h2>
                    <p>{error}</p>
                    <button className="retry-button" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!pokemonDetail) return null;

    return (
        <div className="pokemon-details-container">
            <div className="container">
                <div className="navigation-header">
                    <button className="back-button" onClick={() => history.goBack()}>
                        <span className="back-arrow">←</span>
                        Back to List
                    </button>
                </div>

                <div className="pokemon-details-card fade-in">
                    <div className="pokemon-header">
                        <div className="pokemon-info">
                            <h1 className="pokemon-title">
                                {pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)}
                            </h1>
                            <div className="pokemon-id">#{pokemonDetail.id.toString().padStart(3, '0')}</div>
                        </div>
                        <div className="pokemon-types">
                            {pokemonDetail.types.map((typeInfo) => (
                                <span 
                                    key={typeInfo.type.name}
                                    className="type-badge"
                                    style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
                                >
                                    {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pokemon-content">
                        <div className="pokemon-image-section">
                            <div className="image-container">
                                <img 
                                    src={showShiny ? pokemonDetail.sprites.front_shiny || pokemonDetail.sprites.front_default : pokemonDetail.sprites.front_default}
                                    alt={pokemonDetail.name} 
                                    className="pokemon-image"
                                />
                                <div className="image-controls">
                                    {pokemonDetail.sprites.front_shiny && (
                                        <button 
                                            className={`shiny-toggle ${showShiny ? 'active' : ''}`}
                                            onClick={() => setShowShiny(!showShiny)}
                                        >
                                            ✨ {showShiny ? 'Normal' : 'Shiny'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pokemon-info-section">
                            <div className="info-grid">
                                <div className="info-card">
                                    <h3 className="info-title">Physical Stats</h3>
                                    <div className="physical-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Height</span>
                                            <span className="stat-value">{(pokemonDetail.height / 10).toFixed(1)} m</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Weight</span>
                                            <span className="stat-value">{(pokemonDetail.weight / 10).toFixed(1)} kg</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3 className="info-title">Abilities</h3>
                                    <div className="abilities-list">
                                        {pokemonDetail.abilities.map((abilityInfo, index) => (
                                            <div key={index} className="ability-item">
                                                <span className="ability-name">
                                                    {abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}
                                                </span>
                                                {abilityInfo.is_hidden && (
                                                    <span className="hidden-ability-badge">Hidden</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="stats-section">
                                <h3 className="section-title">Base Stats</h3>
                                <div className="stats-grid">
                                    {pokemonDetail.stats.map((statInfo, index) => (
                                        <div key={index} className="stat-row">
                                            <div className="stat-info">
                                                <span className="stat-name">{formatStatName(statInfo.stat.name)}</span>
                                                <span className="stat-number">{statInfo.base_stat}</span>
                                            </div>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill"
                                                    style={{ 
                                                        width: `${(statInfo.base_stat / 255) * 100}%`,
                                                        backgroundColor: statInfo.base_stat > 100 ? '#10b981' : statInfo.base_stat > 60 ? '#f59e0b' : '#ef4444'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;
