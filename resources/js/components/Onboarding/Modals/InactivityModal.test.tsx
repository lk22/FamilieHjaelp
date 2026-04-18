import InactivityModal from '@/components/Onboarding/Modals/InactivityModal';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { render, screen, renderHook, act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Inactivity Modal component', () => {

  test('it renders if the progress state is paused', () => {
    let isOpen = false;

    const { result } = renderHook(() => useOnboarding(), {
      wrapper: OnboardingProvider
    })

    const {onboardingState} = result.current;


    act(() => {
      result.current.onboardingState.progress = "paused"
      console.log(onboardingState.progress)
      isOpen = true
    })

    expect(onboardingState.progress).contain('paused');

    const modal = (
      <OnboardingProvider>
        <InactivityModal isOpen={isOpen} />
      </OnboardingProvider>
    )

    render(modal)
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  })

  test('it renders with correct title and text', () => {
    const modal = (
      <OnboardingProvider>
        <InactivityModal isOpen={true} />
      </OnboardingProvider>
    )

    render(modal)

    const title = screen.getByText(/Sat på pause/i);
    expect(screen.getByText(/Det ser ud til, at du har været inaktiv i et stykke tid. For at beskytte dine oplysninger har vi sat din onboarding-session på pause./i))
    expect(screen.getByText(/bevæg musen for at fortsætte din session/i))

    expect(title).toBeInTheDocument()
  })
})