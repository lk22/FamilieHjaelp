import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act, renderHook } from '@testing-library/react'
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext'

describe('OnboardingContext', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        vi.clearAllMocks()
    })

    it('should provide initial onboarding state', () => {
        const { result } = renderHook(() => useOnboarding(), {
            wrapper: OnboardingProvider
        })

        const state = result.current.onboardingState;

        expect(state).toBeDefined()
        expect(state.currentStep).toBe(undefined)
        expect(state.currentScenario).toBe('')
    })

    it('should update current scenario', () => {
        const { result } = renderHook(() => useOnboarding(), {
            wrapper: OnboardingProvider
        })

        act(() => {
            result.current.updateCurrentScenario('abortion')
        })

        expect(result.current.onboardingState.currentScenario).toBe('abortion')
    })

    it('should start onboarding proccess', () => {
        const { result } = renderHook(() => useOnboarding() , {
            wrapper: OnboardingProvider
        });

        act(() => {
            result.current.startOnboarding();
        });

        expect(result.current.onboardingState.progress).toBe('in_progress');
    })

    it('should pause omboarding process', () => {
        const { result } = renderHook(() => useOnboarding(), {
            wrapper: OnboardingProvider
        })

        act(() => {
            result.current.pauseOnboarding()
        })

        expect(result.current.onboardingState.progress).toBe('paused')
    })

    it('should resume onboarding process', () => {
        const { result } = renderHook(() => useOnboarding(), {
            wrapper: OnboardingProvider
        })

        act(() => {
            result.current.resumeOnboarding()
        })

        expect(result.current.onboardingState.progress).toBe('in_progress')
    })

    // it('should handle scenario and step update together', () => {
    //     const { result } = renderHook(() => useOnboarding(), {
    //         wrapper: OnboardingProvider
    //     })

    //     act(() => {
    //         result.current.updateCurrentScenario('deathborn')
    //     })

    //     act(() => {
    //         result.current.updateCurrentStep('one')
    //     })

    //     expect(result.current.onboardingState.currentScenario).toBe('deathborn')
    //     expect(result.current.onboardingState.currentStep).toBe(1)
    //     expect(result.current.onboardingState.nextStep).toBe(1)
    // })

    // it('should complete step and update state', () => {
    //     const { result } = renderHook(() => useOnboarding(), {
    //         wrapper: OnboardingProvider
    //     })

    //     act(() => {
    //         result.current.completeStep(1, {
    //             stepOne: { name: 'Test User' }
    //         })
    //     })

    //     expect(result.current.onboardingState.completedSteps).toContain(1)
    //     expect(result.current.onboardingState.currentStep).toBe(2)
    //     expect(result.current.onboardingState.nextStep).toBe(2)
    // })

    // it('should not update step when step name is invalid', () => {
    //     const { result } = renderHook(() => useOnboarding(), {
    //         wrapper: OnboardingProvider
    //     })

    //     const initialStep = result.current.onboardingState.currentStep

    //     act(() => {
    //         result.current.updateCurrentStep('invalid-step')
    //     })

    //     expect(result.current.onboardingState.currentStep).toBe(initialStep)
    // })

    // it('should check if step is completed', () => {
    //     const { result } = renderHook(() => useOnboarding(), {
    //         wrapper: OnboardingProvider
    //     })

    //     act(() => {
    //         result.current.completeStep(1)
    //     })

    //     expect(result.current.isStepCompleted(1)).toBe(true)
    //     expect(result.current.isStepCompleted(2)).toBe(false)
    // })
})
