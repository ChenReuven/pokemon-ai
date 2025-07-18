# Component Documentation

## Overview
This document provides comprehensive documentation for all React components in the Pokemon application. The frontend is built with React, TypeScript, and React Router.

## Table of Contents
- [App Component](#app-component)
- [PokemonList Component](#pokemonlist-component)
- [PokemonDetails Component](#pokemondetails-component)
- [Type Definitions](#type-definitions)
- [Styling](#styling)

## App Component

### Description
The main application component that handles routing and renders the appropriate component based on the current route.

### Location
`client/src/App.tsx`

### Props
None

### State
None (stateless component)

### Dependencies
- `react`
- `react-router-dom`
- `PokemonList` component
- `PokemonDetails` component

### Routes
- `/` - Renders `PokemonList` component
- `/pokemon/:name` - Renders `PokemonDetails` component with Pokemon name parameter

### Usage Example
```tsx
import React from 'react';
import App from './App';

// App is typically rendered at the root level
function Root() {
  return <App />;
}
```

### Code Structure
```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={PokemonList} />
          <Route path="/pokemon/:name" component={PokemonDetails} />
        </Switch>
      </Router>
  );
}

export default App;
```

---

## PokemonList Component

### Description
Displays a list of Pokemon fetched from the API. Each Pokemon is rendered as a clickable card that navigates to the detail page.

### Location
`client/src/components/PokemonList.tsx`

### Props
None

### State
- `pokemons`: Array of Pokemon objects containing name and URL

### State Type
```typescript
interface Pokemon {
  name: string;
  url: string;
}

const [pokemons, setPokemons] = useState<Pokemon[]>([]);
```

### Dependencies
- `react` (useState, useEffect)
- `react-router-dom` (Link)
- `./PokemonList.css`

### API Calls
- **GET** `http://localhost:5000/api/pokemons` - Fetches list of Pokemon

### Lifecycle
1. **Component Mount**: `useEffect` triggers API call to fetch Pokemon list
2. **Data Received**: Updates `pokemons` state with fetched data
3. **Render**: Maps through Pokemon array and renders clickable cards

### Features
- Fetches Pokemon data on component mount
- Displays Pokemon in a grid layout
- Each Pokemon card is clickable and navigates to detail page
- Error handling for failed API requests

### Usage Example
```tsx
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div>
      <PokemonList />
    </div>
  );
}
```

### Code Structure
```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';

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
```

### Error Handling
- API request failures are logged to console
- No specific error UI is displayed to user

---

## PokemonDetails Component

### Description
Displays detailed information about a specific Pokemon including image, abilities, and navigation controls.

### Location
`client/src/components/PokemonDetails.tsx`

### Props
- `match`: React Router match object containing route parameters
  - `match.params.name`: String - The name of the Pokemon to display

### Props Type
```typescript
interface RouteParams {
  name: string;
}

interface MatchProps {
  params: RouteParams;
}

interface Props {
  match: MatchProps;
}
```

### State
- `pokemonDetail`: Object containing detailed Pokemon information or null

### State Type
```typescript
interface PokemonDetail {
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

const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
```

### Dependencies
- `react` (useState, useEffect)
- `react-router-dom` (useHistory)
- `./PokemonDetails.css`

### API Calls
- **GET** `http://localhost:5000/api/pokemon/:name` - Fetches detailed Pokemon data

### Lifecycle
1. **Component Mount**: `useEffect` triggers API call with Pokemon name from route params
2. **Route Change**: When `match.params.name` changes, new API call is made
3. **Data Received**: Updates `pokemonDetail` state
4. **Render**: Displays Pokemon details or loading message

### Features
- Fetches detailed Pokemon data based on route parameter
- Displays Pokemon image (sprite)
- Lists Pokemon abilities
- Back button navigation using browser history
- Loading state while data is being fetched
- Responsive to route parameter changes

### Usage Example
```tsx
import { Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Route path="/pokemon/:name" component={PokemonDetails} />
  );
}
```

### Code Structure
```tsx
import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails({ match }: any) {
    const [pokemonDetail, setPokemonDetail]: any = useState<any>(null);
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
```

### Error Handling
- API request failures are logged to console
- Loading state prevents rendering errors when data is null
- No specific error UI is displayed to user

---

## Type Definitions

### Recommended Type Interfaces
While the current implementation uses `any` types, here are recommended TypeScript interfaces:

```typescript
// Pokemon list item
interface Pokemon {
  name: string;
  url: string;
}

// Detailed Pokemon data
interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default?: string;
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats?: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types?: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

// Route parameters
interface RouteParams {
  name: string;
}

// React Router match object
interface MatchProps {
  params: RouteParams;
}
```

---

## Styling

### CSS Files
- `client/src/components/PokemonList.css` - Styles for the Pokemon list component
- `client/src/components/PokemonDetails.css` - Styles for the Pokemon details component
- `client/src/App.css` - Global application styles
- `client/src/index.css` - Root element styles

### Key CSS Classes
- `.header` - Header styling for main page title
- `.pokemon-list` - Container for Pokemon grid layout
- `.pokemon-card` - Individual Pokemon card styling
- `.header-pokemon-detail-name` - Pokemon name header on detail page

---

## Development Setup

### Prerequisites
- Node.js (version specified in `.nvmrc`)
- npm or yarn package manager

### Installation
```bash
cd client
npm install
```

### Development Server
```bash
npm start
```
The application will run on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

---

## Dependencies

### Production Dependencies
- **react**: ^18.2.0 - Core React library
- **react-dom**: ^18.2.0 - React DOM rendering
- **react-router-dom**: ^5.3.3 - Client-side routing
- **typescript**: ^4.9.5 - TypeScript support
- **web-vitals**: ^2.1.4 - Performance monitoring

### Development Dependencies
- **@testing-library/jest-dom**: ^5.17.0 - Testing utilities
- **@testing-library/react**: ^13.4.0 - React testing utilities
- **@testing-library/user-event**: ^13.5.0 - User event simulation
- **@types/react**: ^18.2.20 - React TypeScript types
- **@types/react-dom**: ^18.2.7 - React DOM TypeScript types
- **@types/react-router-dom**: ^5.3.3 - React Router TypeScript types
- **react-scripts**: 5.0.1 - Build scripts and configuration