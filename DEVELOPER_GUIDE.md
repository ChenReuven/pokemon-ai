# Developer Guide

## Overview
This developer guide provides comprehensive information for setting up, developing, and maintaining the Pokemon AI application. The project demonstrates AI-driven development capabilities and showcases a complete full-stack application.

## Table of Contents
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Project Architecture

### Overview
The Pokemon AI project follows a client-server architecture with clear separation of concerns:

```
pokemon-ai/
├── client/          # React TypeScript frontend
├── server/          # Node.js Express backend
├── assets/          # Static assets (images, docs)
└── README.md        # Project overview
```

### Technology Stack

#### Frontend (Client)
- **Framework**: React 18.2.0
- **Language**: TypeScript 4.9.5
- **Routing**: React Router DOM 5.3.3
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest, React Testing Library

#### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **HTTP Client**: Axios 1.4.0
- **CORS**: Enabled for cross-origin requests

#### External APIs
- **PokeAPI**: https://pokeapi.co/ - Source of Pokemon data

### Data Flow
1. Client requests data from local Express server
2. Express server proxies requests to PokeAPI
3. Server processes and returns data to client
4. Client renders Pokemon information using React components

## Getting Started

### Prerequisites
- **Node.js**: Version specified in `.nvmrc` file
- **npm**: Latest stable version
- **Git**: For version control

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd pokemon-ai
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the development servers**
   
   Terminal 1 (Server):
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:5000`
   
   Terminal 2 (Client):
   ```bash
   cd client
   npm start
   ```
   Client will run on `http://localhost:3000`

### Verification
- Navigate to `http://localhost:3000`
- You should see the Pokemon list page
- Click on any Pokemon to view details
- Use the back button to return to the list

## Development Workflow

### Project Structure

#### Server Structure
```
server/
├── package.json         # Dependencies and scripts
├── package-lock.json    # Locked dependency versions
├── index.js            # Main server file with API routes
└── .gitignore          # Git ignore patterns
```

#### Client Structure
```
client/
├── public/             # Static files
├── src/
│   ├── components/     # React components
│   │   ├── PokemonList.tsx
│   │   ├── PokemonList.css
│   │   ├── PokemonDetails.tsx
│   │   └── PokemonDetails.css
│   ├── App.tsx         # Main app component
│   ├── App.css         # App styles
│   ├── index.tsx       # Entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── .gitignore          # Git ignore patterns
```

### Development Commands

#### Server Commands
```bash
# Start development server
npm start

# No additional build step required for development
```

#### Client Commands
```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Eject (not recommended)
npm run eject
```

### API Development

#### Adding New Endpoints
1. Open `server/index.js`
2. Add new route handler:
   ```javascript
   app.get('/api/new-endpoint', async (req, res) => {
       try {
           // Your logic here
           res.json(result);
       } catch (error) {
           res.status(500).json({ message: 'Server error' });
       }
   });
   ```

#### Error Handling Pattern
```javascript
app.get('/api/endpoint', async (req, res) => {
    try {
        const response = await axios.get('external-api-url');
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
```

### Component Development

#### Creating New Components
1. Create component file in `client/src/components/`
2. Create corresponding CSS file
3. Follow naming convention: `ComponentName.tsx` and `ComponentName.css`

#### Component Template
```tsx
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

interface Props {
  // Define props here
}

function ComponentName({ prop1, prop2 }: Props) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        // Side effects here
    }, [dependencies]);

    return (
        <div className="component-name">
            {/* Component JSX */}
        </div>
    );
}

export default ComponentName;
```

## Testing

### Running Tests

#### Client Tests
```bash
cd client
npm test                    # Run tests once
npm test -- --watch        # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage report
```

#### Testing Best Practices
1. **Component Testing**: Test component rendering and user interactions
2. **API Testing**: Mock API calls using Jest
3. **Integration Testing**: Test component interactions
4. **Snapshot Testing**: Capture component output for regression testing

#### Example Test
```tsx
import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';

test('renders pokemon list header', () => {
  render(<PokemonList />);
  const headerElement = screen.getByText(/Pokemon List/i);
  expect(headerElement).toBeInTheDocument();
});
```

## Deployment

### Production Build

#### Client Build
```bash
cd client
npm run build
```
This creates a `build/` directory with optimized production files.

#### Server Deployment
The server is ready for deployment as-is. Ensure environment variables are configured:
- `PORT`: Server port (defaults to 5000)
- `NODE_ENV`: Set to 'production'

### Deployment Options

#### Option 1: Separate Deployment
- Deploy client build to static hosting (Netlify, Vercel, S3)
- Deploy server to cloud platform (Heroku, AWS, DigitalOcean)
- Update API URLs in client to point to deployed server

#### Option 2: Combined Deployment
- Serve client build from Express server
- Single deployment to cloud platform

#### Environment Configuration
```javascript
// server/index.js
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({
    origin: CORS_ORIGIN
}));
```

## Best Practices

### Code Quality

#### TypeScript Usage
- Define interfaces for all data structures
- Avoid `any` types where possible
- Use strict TypeScript configuration

#### Component Best Practices
- Keep components small and focused
- Use functional components with hooks
- Implement proper error boundaries
- Handle loading and error states

#### API Best Practices
- Implement proper error handling
- Use consistent response formats
- Add request validation
- Implement rate limiting for production

### Performance Optimization

#### Client Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Optimize bundle size with code splitting
- Use lazy loading for routes

#### Server Optimization
- Implement caching for API responses
- Use compression middleware
- Add request logging
- Implement health check endpoints

### Security Considerations
- Validate all user inputs
- Implement CORS properly
- Use HTTPS in production
- Keep dependencies updated
- Implement proper error handling (don't expose internal errors)

## Troubleshooting

### Common Issues

#### CORS Errors
**Problem**: Client cannot access server API
**Solution**: 
```javascript
// Ensure CORS is properly configured in server/index.js
app.use(cors({
    origin: 'http://localhost:3000'
}));
```

#### Port Already in Use
**Problem**: Cannot start server on port 5000
**Solution**:
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 [PID]

# Or use different port
PORT=5001 npm start
```

#### TypeScript Errors
**Problem**: Type-related compilation errors
**Solution**: 
- Check `tsconfig.json` configuration
- Add proper type definitions
- Update `@types/*` packages

#### API Connection Issues
**Problem**: Cannot fetch data from PokeAPI
**Solution**:
- Check internet connection
- Verify PokeAPI status
- Check server logs for detailed error messages

### Debug Mode

#### Enable Debug Logging
```javascript
// server/index.js
const DEBUG = process.env.DEBUG || false;

if (DEBUG) {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
}
```

#### Client Debug Mode
```bash
# Start with additional logging
REACT_APP_DEBUG=true npm start
```

### Performance Monitoring

#### Client Performance
- Use React DevTools Profiler
- Monitor bundle size with webpack-bundle-analyzer
- Check Lighthouse scores

#### Server Performance
- Monitor response times
- Check memory usage
- Monitor API rate limits

## Contributing

### Code Standards
- Follow existing code style
- Add TypeScript types for new code
- Include tests for new features
- Update documentation

### Pull Request Process
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request with description

### Development Environment
- Use consistent Node.js version (check `.nvmrc`)
- Install recommended VS Code extensions
- Follow commit message conventions

## Resources

### Documentation Links
- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)

### Useful Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Postman](https://www.postman.com/) - API testing
- [VS Code](https://code.visualstudio.com/) - Recommended editor