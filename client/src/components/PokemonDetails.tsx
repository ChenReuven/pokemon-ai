import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './PokemonDetails.css';

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
}

function PokemonDetails() {
    const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        if (!name) return;
        
        setLoading(true);
        setError(null);
        
        fetch(`http://localhost:5000/api/pokemon/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPokemonDetail(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pokemon details:', error);
                setError('Failed to load pokemon details. Please try again.');
                setLoading(false);
            });
    }, [name]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pokemonDetail) return <div>Pokemon not found</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>

            <h2 className="header-pokemon-detail-name">{pokemonDetail.name}</h2>
            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} width={250}/>
            <h3>Abilities</h3>
            <ul>
                {pokemonDetail.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonDetails;
