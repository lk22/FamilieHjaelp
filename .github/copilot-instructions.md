# FamilieHjaelp - AI Coding Agent Instructions

## Architecture Overview

This is a Laravel + Inertia.js + React + TypeScript application for family support with a complex onboarding system that generates personalized content.

### Core Flow
1. **Guest users** start at `/getting-started` → multi-step onboarding
2. **Onboarding completion** triggers events that generate personalized todos/pages
3. **Authenticated users** access `/profile` with their generated content
4. **Non-onboarded users** are redirected back to onboarding

## Key Architectural Components

### Onboarding System (`resources/js/contexts/OnboardingContext.tsx`)
- **Dual persistence**: React Context + localStorage for cross-component sync
- **Event-driven**: Form submissions dispatch events, components auto-update
- **State structure**: 6 steps with progress tracking, data validation
- Steps collect: name, situation checks, partner status, dates, pregnancy info

### Event-Driven Content Generation
- `StoreUserPages`/`StoreUserTodos` events fired on onboarding completion
- `HandleStoreUserPages`/`HandleStoreUserTodos` listeners generate personalized content
- `GenerateProfilePages::run($checks)` action creates pages based on user selections

### Frontend State Management
```typescript
// Always use spread operator to preserve state
updateOnboardingState(prev => ({ 
    ...prev,  // Critical - don't lose existing state
    newProperty: value 
}))
```

## Development Workflows

### Testing
- **Frontend**: `npm run test` (Vitest + React Testing Library)
- **Backend**: `php artisan test`
- **Test structure**: Mock Inertia dependencies, not the components themselves
```typescript
// Correct mock approach
vi.mock('@inertiajs/react', () => ({
    usePage: vi.fn(),
    // ... other mocks
}))
```

### Build & Development
- `npm run dev` - Vite development server
- `npm run build` - Production build 
- `npm run build:ssr` - SSR build for production
- `php artisan serve` - Laravel development server

## Project-Specific Patterns

### Route/Controller Structure
- `/profile/overview/` → `ProfileOverviewController@index` (requires onboarding)
- API routes under `/api/` use `auth:sanctum` middleware
- Onboarding routes are guest-only, profile routes require auth + onboarding

### Component Architecture
- **Layouts**: `profile-layout.tsx` with `handlePageTitle()` function for dynamic headers
- **Forms**: Use `useForm` from Inertia with onboarding context integration
- **State**: OnboardingContext provides: `completeStep()`, `isStepCompleted()`, `getCurrentStepData()`

### TypeScript Conventions
- Interface naming: `OnboardingState`, `StepData`, `ProfileOverviewLayoutProps`
- Mock typing: Use `as unknown as ReturnType<typeof usePage>` for complex mocks
- Avoid `any` - use proper type assertions or `unknown` casting

### Laravel Specific
- Models use `isOnboarded()` method for checking completion status
- User relationships: `->load(['todos', 'pages'])` for efficient loading
- Events/Listeners pattern for content generation after onboarding

## Common Integration Points

### Inertia + React Testing
Always mock Inertia dependencies before component imports:
```typescript
const mockUsePage = vi.fn()
vi.mock('@inertiajs/react', () => ({ usePage: mockUsePage }))
import MyComponent from '@/components/MyComponent' // After mocks
```

### Authentication Flow
- Registration redirects to `getting-started` (or `redirect_to` parameter)
- `ProfileOverviewController` checks `isOnboarded()` before allowing access
- Non-onboarded users get redirected to onboarding flow

### State Persistence Strategy
- **localStorage**: Cross-page onboarding state persistence
- **React Context**: Real-time component updates
- **Backend**: Final storage via events after completion
- Always handle malformed JSON in localStorage gracefully

## File Structure Patterns
- `resources/js/pages/` - Page components (routes)
- `resources/js/layouts/` - Shared layout components  
- `resources/js/contexts/` - React contexts for state management
- `resources/js/state/` - TypeScript interfaces and initial state
- `app/Listeners/` - Event listeners for content generation
- `app/Actions/` - Business logic actions (e.g., `GenerateProfilePages`)