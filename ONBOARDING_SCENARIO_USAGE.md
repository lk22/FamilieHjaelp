# OnboardingContext Usage Examples

## Overview
This document demonstrates how to use the `updateCurrentScenario` and `updateCurrentStep` functions to fix the state synchronization issue when selecting a scenario.

## Problem
When selecting a scenario, the state does not update consistently when moving forward to the first step in the onboarding process.

## Solution
The `OnboardingContext` now provides `updateCurrentScenario` and `updateCurrentStep` functions that properly sync state changes.

## Example: Scenario Selection Handler

```tsx
import { useCallback } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

function ScenarioSelection() {
    const { updateCurrentScenario, updateCurrentStep } = useOnboarding();

    // Handler for scenario change
    const handleScenarioChange = useCallback((selectedScenario: string) => {
        // Update the current scenario in the onboarding state
        updateCurrentScenario(selectedScenario);
        
        // Move to the first step of the onboarding process
        updateCurrentStep('one');
    }, [updateCurrentScenario, updateCurrentStep]);

    return (
        <div>
            <button onClick={() => handleScenarioChange('abortion')}>
                Abortion Scenario
            </button>
            <button onClick={() => handleScenarioChange('deathborn')}>
                Deathborn Scenario
            </button>
            <button onClick={() => handleScenarioChange('parents')}>
                Parents Scenario
            </button>
        </div>
    );
}
```

## Complete Example: Getting Started Page

```tsx
import { useCallback } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router } from '@inertiajs/react';

function GettingStartedPage() {
    const { onboardingState, updateCurrentScenario, updateCurrentStep } = useOnboarding();

    const handleScenarioChange = useCallback((selectedScenario: string) => {
        // Update scenario in state
        updateCurrentScenario(selectedScenario);
        
        // Set current step to 'one'
        updateCurrentStep('one');
        
        // Navigate to the onboarding step
        router.visit(route('onboarding.step', { step: 'one' }));
    }, [updateCurrentScenario, updateCurrentStep]);

    return (
        <div>
            <h1>Getting Started</h1>
            <p>Current Scenario: {onboardingState.currentScenario || 'None selected'}</p>
            <p>Current Step: {onboardingState.currentStep}</p>
            
            <div className="scenario-buttons">
                <button onClick={() => handleScenarioChange('abortion')}>
                    Select Abortion Scenario
                </button>
                <button onClick={() => handleScenarioChange('deathborn')}>
                    Select Deathborn Scenario
                </button>
            </div>
        </div>
    );
}
```

## Key Features

### `updateCurrentScenario(selectedScenario: string)`
- Updates the `currentScenario` field in the onboarding state
- Properly syncs with both localStorage and Inertia.js state
- Logs the update for debugging

### `updateCurrentStep(stepName: string)`
- Updates both `currentStep` and `nextStep` in the onboarding state
- Accepts step names like 'one', 'two', 'three', etc.
- Finds the step by name and updates to its ID
- Properly syncs with both localStorage and Inertia.js state

## State Structure

The onboarding state now includes:
```typescript
{
    onboardingCompleted: boolean;
    currentStep: number;
    completedSteps: number[];
    nextStep: number;
    currentScenario: string; // NEW: tracks the selected scenario
    steps: Step[];
}
```

## Benefits

1. **Consistent State Updates**: Both functions use the same `updateOnboardingState` mechanism
2. **Proper Dependencies**: Functions include all necessary dependencies in their `useCallback` hooks
3. **Cross-Component Sync**: Changes are automatically synced to localStorage and all components
4. **Type Safety**: Full TypeScript support with proper type definitions
5. **Debugging Support**: Console logs help track state changes

## Testing

All functionality is tested with 7 comprehensive tests:
- Initial state validation
- Scenario updates
- Step updates by name
- Combined scenario and step updates
- Step completion
- Invalid step name handling
- Step completion checks
