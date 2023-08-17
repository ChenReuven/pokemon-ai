import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './PokemonDetails.css';  // Import the CSS file

function PokemonDetails({ match }: any) {
    const [pokemonDetail, setPokemonDetail]: any = useState<any>(null);

    // Use the useHistory hook here
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/api/pokemon/${match.params.name}`)
            .then(response => response.json())
            .then(data => setPokemonDetail(data))
            .catch(error => console.error(error));
    }, [match.params.name]);

    if (!pokemonDetail) return <div>Loading...</div>;

    return (
        <div>
            {/* Add the Back button here */}
            <button onClick={() => history.goBack()}>Back</button>

            <h2 className="header-pokemon-detail-name">{pokemonDetail.name}</h2>
            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} width={250}/>
            <h3>Abilities</h3>
            <ul>
                {pokemonDetail.abilities.map((ability: any) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonDetails;
