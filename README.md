# AI Story Game

An interactive AI-powered story generation game that uses prompt engineering to create unique stories and videos.

## Features

- **Story Generation**: Use the Gemini API to generate creative stories based on 5 random words and a custom prompt
- **Video Generation**: Create videos based on generated stories (currently using placeholder)
- **Interactive UI**: Clean, responsive interface built with React and TypeScript
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Error Handling**: Comprehensive error handling and validation
- **Accessibility**: ARIA labels and semantic HTML for better accessibility

## Good Coding Practices Implemented

### Project Structure
- **Modular Architecture**: Components, utilities, and types are properly separated
- **TypeScript**: Full type safety with proper interfaces and type definitions
- **Code Organization**: Logical folder structure for maintainability

### Code Quality
- **ESLint**: Configured with TypeScript-specific rules
- **Type Safety**: All components have proper TypeScript interfaces
- **Error Handling**: Comprehensive error handling with typed error responses
- **Validation**: Input validation with clear user feedback
- **Constants**: Extracted magic numbers and strings to constants file

### Component Design
- **Single Responsibility**: Each component has a clear, focused purpose
- **Reusable Components**: UI components are generic and reusable
- **Custom Hooks**: Business logic separated into custom hooks
- **Props Interfaces**: All components have properly typed props

### Accessibility
- **ARIA Labels**: Proper accessibility attributes
- **Semantic HTML**: Use of appropriate HTML elements
- **Focus Management**: Proper focus handling for interactive elements

### Performance
- **useCallback**: Memoized event handlers to prevent unnecessary re-renders
- **State Management**: Efficient state updates using React hooks

## Project Structure

```
src/
├── components/          # React components
│   ├── App.tsx         # Main application component
│   ├── APIKeyConfig.tsx # API key configuration
│   ├── StoryGeneration.tsx # Story input and generation
│   ├── StoryDisplay.tsx # Story display and video controls
│   ├── VideoGeneration.tsx # Video generation component
│   ├── WordsInput.tsx  # Words input component
│   └── UI.tsx          # Reusable UI components
├── hooks/              # Custom React hooks
│   └── useStoryGame.ts # Main application logic hook
├── types/              # TypeScript type definitions
│   └── index.ts        # All interface definitions
├── utils/              # Utility functions
│   └── index.ts        # API calls and validation functions
├── constants/          # Application constants
│   └── index.ts        # URLs, messages, and configuration
└── index.ts            # Main entry point
```

## Setup and Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Gemini API key in the application interface

### Development Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint and fix issues automatically
- `npm run lint:check` - Check code style without fixing
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest tests in watch mode

### Building for Production

```bash
npm run build
```

The compiled application will be output to the `dist/` directory, ready for deployment.

### Development

```bash
npm run dev
```

Starts the Vite development server at `http://localhost:3000/`

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing at `http://localhost:4173/`

## Deployment

### Vercel Deployment

This application is configured for seamless deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Automatic Deployment**: Vercel will automatically detect the Vite framework
3. **Build Configuration**: The `vercel.json` file contains optimized build settings
4. **Environment Variables**: Set up any required API keys in Vercel dashboard

The deployment configuration:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Manual Deployment

For other platforms, use the production build:

```bash
npm run build
npm run preview  # Test locally first
```

Then deploy the contents of the `dist/` directory to your hosting platform.

## API Integration

### Gemini API
The application integrates with Google's Gemini API for story generation. You need to:
1. Get an API key from Google AI Studio
2. Enter the key in the application interface
3. The key is stored locally in component state (not persisted)

### Random Words API
Uses the random-word-api.herokuapp.com service to fetch random words for story inspiration.

## Security Considerations

- API keys are handled in component state and not persisted
- Input validation prevents malicious input
- Error messages don't expose sensitive information
- HTTPS endpoints are used for all API calls

## Future Improvements

- Environment variable configuration for API keys
- Persistent storage for user preferences
- Real video generation API integration
- Unit and integration tests
- Progressive Web App (PWA) features
- Additional AI model support

## License

MIT License