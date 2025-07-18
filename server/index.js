const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Security: Configure CORS properly
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// Security: Add basic security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Input validation function
const isValidPokemonName = (name) => {
    // Pokemon names should only contain letters, numbers, and hyphens
    return /^[a-zA-Z0-9-]+$/.test(name) && name.length > 0 && name.length <= 50;
};

app.get('/api/pokemons', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching pokemon list:', error.message);
        
        if (error.response) {
            // External API error
            res.status(502).json({ 
                message: 'External service unavailable',
                error: 'Unable to fetch pokemon data from external API'
            });
        } else if (error.request) {
            // Network error
            res.status(503).json({ 
                message: 'Network error',
                error: 'Unable to connect to pokemon service'
            });
        } else {
            // Server error
            res.status(500).json({ 
                message: 'Internal server error',
                error: 'An unexpected error occurred'
            });
        }
    }
});

app.get('/api/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase().trim();
    
    // Input validation
    if (!isValidPokemonName(pokemonName)) {
        return res.status(400).json({ 
            message: 'Invalid pokemon name',
            error: 'Pokemon name must contain only letters, numbers, and hyphens'
        });
    }
    
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching pokemon ${pokemonName}:`, error.message);
        
        if (error.response?.status === 404) {
            // Pokemon not found
            res.status(404).json({ 
                message: 'Pokemon not found',
                error: `No pokemon found with name: ${pokemonName}`
            });
        } else if (error.response) {
            // External API error
            res.status(502).json({ 
                message: 'External service unavailable',
                error: 'Unable to fetch pokemon data from external API'
            });
        } else if (error.request) {
            // Network error
            res.status(503).json({ 
                message: 'Network error',
                error: 'Unable to connect to pokemon service'
            });
        } else {
            // Server error
            res.status(500).json({ 
                message: 'Internal server error',
                error: 'An unexpected error occurred'
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
