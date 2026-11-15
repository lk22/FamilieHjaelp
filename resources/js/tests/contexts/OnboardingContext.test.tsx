import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext'

describe('OnboardingContext', () => {
    beforeEach(() => {
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

    it('should start onboarding process', () => {
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
})
