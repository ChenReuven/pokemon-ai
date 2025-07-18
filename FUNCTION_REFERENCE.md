# Function Reference

## Overview
This document provides comprehensive documentation for all functions, utilities, and helpers used throughout the Pokemon AI application.

## Table of Contents
- [API Functions](#api-functions)
- [React Hooks](#react-hooks)
- [Utility Functions](#utility-functions)
- [Event Handlers](#event-handlers)
- [Component Methods](#component-methods)

## API Functions

### Server API Routes

#### `app.get('/api/pokemons', handler)`
**Purpose**: Handles requests for the Pokemon list endpoint

**Location**: `server/index.js:10-16`

**Parameters**: 
- `req` (Request): Express request object
- `res` (Response): Express response object

**Returns**: JSON array of Pokemon objects

**Implementation**:
```javascript
app.get('/api/pokemons', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
```

**Error Handling**: Returns 500 status with error message on failure

**Dependencies**: `axios`

---

#### `app.get('/api/pokemon/:name', handler)`
**Purpose**: Handles requests for individual Pokemon details

**Location**: `server/index.js:18-25`

**Parameters**: 
- `req` (Request): Express request object with `params.name`
- `res` (Response): Express response object

**Route Parameters**:
- `name` (string): Pokemon name or ID

**Returns**: JSON object with detailed Pokemon information

**Implementation**:
```javascript
app.get('/api/pokemon/:name', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
```

**Error Handling**: Returns 500 status with error message on failure

**Dependencies**: `axios`

## React Hooks

### `useState` Usage

#### Pokemon List State
**Component**: `PokemonList`

**Location**: `client/src/components/PokemonList.tsx:6`

```typescript
const [pokemons, setPokemons] = useState([]);
```

**Purpose**: Manages the array of Pokemon fetched from the API

**Type**: `Array<Pokemon>`

**Initial Value**: Empty array `[]`

**Setter**: `setPokemons(newPokemons: Pokemon[])`

---

#### Pokemon Detail State
**Component**: `PokemonDetails`

**Location**: `client/src/components/PokemonDetails.tsx:6`

```typescript
const [pokemonDetail, setPokemonDetail]: any = useState<any>(null);
```

**Purpose**: Manages detailed Pokemon information

**Type**: `PokemonDetail | null`

**Initial Value**: `null`

**Setter**: `setPokemonDetail(detail: PokemonDetail | null)`

### `useEffect` Usage

#### Fetch Pokemon List
**Component**: `PokemonList`

**Location**: `client/src/components/PokemonList.tsx:8-13`

```typescript
useEffect(() => {
    fetch('http://localhost:5000/api/pokemons')
        .then(response => response.json())
        .then(data => setPokemons(data))
        .catch(error => console.error(error));
}, []);
```

**Purpose**: Fetches Pokemon list when component mounts

**Dependencies**: `[]` (runs once on mount)

**Side Effects**: 
- Makes HTTP request to API
- Updates `pokemons` state
- Logs errors to console

---

#### Fetch Pokemon Details
**Component**: `PokemonDetails`

**Location**: `client/src/components/PokemonDetails.tsx:12-17`

```typescript
useEffect(() => {
    fetch(`http://localhost:5000/api/pokemon/${match.params.name}`)
        .then(response => response.json())
        .then(data => setPokemonDetail(data))
        .catch(error => console.error(error));
}, [match.params.name]);
```

**Purpose**: Fetches Pokemon details when component mounts or route parameter changes

**Dependencies**: `[match.params.name]` (runs when Pokemon name changes)

**Side Effects**: 
- Makes HTTP request to API with Pokemon name
- Updates `pokemonDetail` state
- Logs errors to console

### `useHistory` Usage

#### Navigation Hook
**Component**: `PokemonDetails`

**Location**: `client/src/components/PokemonDetails.tsx:9`

```typescript
const history = useHistory();
```

**Purpose**: Provides access to browser history for navigation

**Methods Used**: `history.goBack()`

**Usage**: Back button functionality

## Utility Functions

### `fetch` API Calls

#### `fetchPokemonList()`
**Purpose**: Fetches list of Pokemon from the server API

**Implementation**:
```typescript
const fetchPokemonList = async (): Promise<Pokemon[]> => {
    const response = await fetch('http://localhost:5000/api/pokemons');
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
    }
    return response.json();
};
```

**Returns**: Promise resolving to array of Pokemon objects

**Error Handling**: Throws error for non-OK responses

---

#### `fetchPokemonDetail(name: string)`
**Purpose**: Fetches detailed information for a specific Pokemon

**Parameters**:
- `name` (string): Pokemon name or ID

**Implementation**:
```typescript
const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
    const response = await fetch(`http://localhost:5000/api/pokemon/${name}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon: ${name}`);
    }
    return response.json();
};
```

**Returns**: Promise resolving to Pokemon detail object

**Error Handling**: Throws error for non-OK responses

## Event Handlers

### Navigation Handlers

#### `handleBackClick()`
**Component**: `PokemonDetails`

**Purpose**: Handles back button click events

**Implementation**:
```typescript
const handleBackClick = () => {
    history.goBack();
};
```

**Usage**: 
```tsx
<button onClick={handleBackClick}>Back</button>
```

**Dependencies**: `useHistory` hook

---

#### `handlePokemonClick(pokemonName: string)`
**Component**: `PokemonList` (implicit via Link)

**Purpose**: Handles Pokemon card click for navigation

**Implementation**: Uses React Router `Link` component

```tsx
<Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
```

**Parameters**:
- `pokemonName` (string): Name of the Pokemon to navigate to

## Component Methods

### Rendering Methods

#### `renderPokemonCard(pokemon: Pokemon)`
**Component**: `PokemonList`

**Purpose**: Renders individual Pokemon card

**Parameters**:
- `pokemon` (Pokemon): Pokemon object with name and url

**Implementation**:
```tsx
const renderPokemonCard = (pokemon: Pokemon) => (
    <div key={pokemon.name} className="pokemon-card">
        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
    </div>
);
```

**Returns**: JSX element representing a Pokemon card

---

#### `renderAbilities(abilities: Ability[])`
**Component**: `PokemonDetails`

**Purpose**: Renders list of Pokemon abilities

**Parameters**:
- `abilities` (Ability[]): Array of ability objects

**Implementation**:
```tsx
const renderAbilities = (abilities: Ability[]) => (
    <ul>
        {abilities.map((ability: any) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
    </ul>
);
```

**Returns**: JSX element with unordered list of abilities

### Conditional Rendering

#### `renderLoadingState()`
**Component**: `PokemonDetails`

**Purpose**: Renders loading message while data is being fetched

**Implementation**:
```tsx
const renderLoadingState = () => <div>Loading...</div>;
```

**Usage**:
```tsx
if (!pokemonDetail) return renderLoadingState();
```

**Returns**: JSX element with loading message

## Error Handling Functions

### `handleApiError(error: Error)`
**Purpose**: Centralized error handling for API calls

**Parameters**:
- `error` (Error): Error object from failed API call

**Implementation**:
```typescript
const handleApiError = (error: Error) => {
    console.error('API Error:', error);
    // Could be extended to show user-friendly error messages
    // or send error reports to monitoring service
};
```

**Usage**: In catch blocks of API calls

### `logError(error: Error, context: string)`
**Purpose**: Logs errors with additional context

**Parameters**:
- `error` (Error): Error object
- `context` (string): Description of where/when error occurred

**Implementation**:
```typescript
const logError = (error: Error, context: string) => {
    console.error(`Error in ${context}:`, error.message, error.stack);
};
```

## Validation Functions

### `validatePokemonName(name: string)`
**Purpose**: Validates Pokemon name format

**Parameters**:
- `name` (string): Pokemon name to validate

**Implementation**:
```typescript
const validatePokemonName = (name: string): boolean => {
    if (!name || typeof name !== 'string') return false;
    return /^[a-zA-Z0-9\-]+$/.test(name);
};
```

**Returns**: Boolean indicating if name is valid

**Rules**: 
- Must be non-empty string
- Contains only letters, numbers, and hyphens

## Type Guards

### `isPokemon(obj: any)`
**Purpose**: Type guard to check if object is a valid Pokemon

**Parameters**:
- `obj` (any): Object to check

**Implementation**:
```typescript
const isPokemon = (obj: any): obj is Pokemon => {
    return obj && 
           typeof obj.name === 'string' && 
           typeof obj.url === 'string';
};
```

**Returns**: Boolean indicating if object matches Pokemon interface

### `isPokemonDetail(obj: any)`
**Purpose**: Type guard to check if object is a valid PokemonDetail

**Parameters**:
- `obj` (any): Object to check

**Implementation**:
```typescript
const isPokemonDetail = (obj: any): obj is PokemonDetail => {
    return obj && 
           typeof obj.name === 'string' && 
           obj.sprites && 
           typeof obj.sprites.front_default === 'string' &&
           Array.isArray(obj.abilities);
};
```

**Returns**: Boolean indicating if object matches PokemonDetail interface

## Configuration Functions

### `getApiBaseUrl()`
**Purpose**: Returns the base URL for API calls

**Implementation**:
```typescript
const getApiBaseUrl = (): string => {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};
```

**Returns**: String with base API URL

**Environment Variables**:
- `REACT_APP_API_URL`: Custom API URL (optional)

### `getApiEndpoints()`
**Purpose**: Returns object with all API endpoints

**Implementation**:
```typescript
const getApiEndpoints = () => {
    const baseUrl = getApiBaseUrl();
    return {
        pokemonList: `${baseUrl}/api/pokemons`,
        pokemonDetail: (name: string) => `${baseUrl}/api/pokemon/${name}`
    };
};
```

**Returns**: Object with endpoint URLs

**Usage**:
```typescript
const endpoints = getApiEndpoints();
fetch(endpoints.pokemonList)
```

## Performance Optimization Functions

### `debounce(func: Function, delay: number)`
**Purpose**: Debounces function calls to improve performance

**Parameters**:
- `func` (Function): Function to debounce
- `delay` (number): Delay in milliseconds

**Implementation**:
```typescript
const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};
```

**Returns**: Debounced version of the function

**Usage**: For search inputs or frequent API calls

### `memoizeApiCall(apiFunction: Function)`
**Purpose**: Memoizes API calls to prevent duplicate requests

**Parameters**:
- `apiFunction` (Function): API function to memoize

**Implementation**:
```typescript
const memoizeApiCall = (apiFunction: Function) => {
    const cache = new Map();
    return async (...args: any[]) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = await apiFunction(...args);
        cache.set(key, result);
        return result;
    };
};
```

**Returns**: Memoized version of the API function

**Benefits**: Reduces redundant API calls and improves performance