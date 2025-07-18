# API Documentation

## Overview
This document provides comprehensive documentation for the Pokemon API server. The server is built with Express.js and acts as a proxy to the PokeAPI, providing endpoints to fetch Pokemon data.

## Base URL
```
http://localhost:5000
```

## Authentication
No authentication is required for these endpoints.

## Error Handling
All endpoints return standard HTTP status codes:
- `200`: Success
- `500`: Internal Server Error

Error responses follow this format:
```json
{
  "message": "Server error"
}
```

## Endpoints

### GET /api/pokemons
Retrieves a list of Pokemon from the PokeAPI.

**Description:** Fetches the first 100 Pokemon from the PokeAPI and returns their basic information including name and URL.

**Parameters:** None

**Response:**
```json
[
  {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    "name": "ivysaur", 
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
  }
]
```

**Example Request:**
```bash
curl -X GET http://localhost:5000/api/pokemons
```

**Example Response:**
```json
[
  {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    "name": "ivysaur",
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
  }
]
```

### GET /api/pokemon/:name
Retrieves detailed information for a specific Pokemon.

**Description:** Fetches complete Pokemon data including stats, abilities, sprites, and other detailed information for the specified Pokemon.

**Parameters:**
- `name` (string, required): The name or ID of the Pokemon to retrieve

**Response:**
```json
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "abilities": [
    {
      "ability": {
        "name": "overgrow",
        "url": "https://pokeapi.co/api/v2/ability/65/"
      },
      "is_hidden": false,
      "slot": 1
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
  },
  "stats": [
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    }
  ],
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "grass",
        "url": "https://pokeapi.co/api/v2/type/12/"
      }
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET http://localhost:5000/api/pokemon/bulbasaur
```

**Example Response:**
```json
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "abilities": [
    {
      "ability": {
        "name": "overgrow",
        "url": "https://pokeapi.co/api/v2/ability/65/"
      },
      "is_hidden": false,
      "slot": 1
    },
    {
      "ability": {
        "name": "chlorophyll",
        "url": "https://pokeapi.co/api/v2/ability/34/"
      },
      "is_hidden": true,
      "slot": 3
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
  }
}
```

## Dependencies
- **express**: Web framework for Node.js
- **axios**: HTTP client for making requests to PokeAPI
- **cors**: Enable CORS for cross-origin requests

## Server Configuration
- Port: 5000
- CORS: Enabled for all origins
- Content-Type: application/json

## Development
To start the server:
```bash
cd server
npm install
npm start
```

The server will run on `http://localhost:5000`