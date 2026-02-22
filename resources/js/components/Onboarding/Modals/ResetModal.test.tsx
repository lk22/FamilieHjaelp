import ResetModal from '@/components/Onboarding/Modals/ResetModal';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { router } from '@inertiajs/react';
import { render, screen, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

describe('Reset Modal component', () => {
  test('it renders with correct content', () => {
    const modal = (
      <OnboardingProvider>
        <ResetModal isOpen={true} />
      </OnboardingProvider>
    )

    render(modal)

    const title = screen.queryByText("Du er igang med at besvare vores spørgsmål");
    const p1 = screen.getByText(/Det ser ud til du er igang med at besvare vores spørgsmål./i)
    const p2 = screen.getByText(/Vi gemmer din fremgang, så du kan fortsætte senere./i)
    const continueButton = screen.getByRole('button', {name: 'Fortsæt'})
    const resetButton = screen.getByRole('button', {name: 'Afslut og gå til forsiden'})

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(p1).toBeInTheDocument()
    expect(p2).toBeInTheDocument()
    expect(continueButton).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
  })

  test('it resets state and redirects to getting started page', async () => {
    const mockVisit = vi.spyOn(router, 'visit').mockImplementation(() => Promise.resolve())
    const user = userEvent.setup()
    const modal = (
      <OnboardingProvider>
        <ResetModal isOpen={true} />
      </OnboardingProvider>
    )
    const {result} = renderHook(() => useOnboarding(), {
      wrapper: OnboardingProvider
    })
    const {onboardingState} = result.current;

    render(modal)
    const resetButton = screen.getByRole('button', {name: /Afslut og gå til forsiden/i})
    await user.click(resetButton)

    act(() => {
      onboardingState.progress = "not_started"
    })

    expect(onboardingState.progress).contain('not_started')
    expect(mockVisit).toHaveBeenCalledWith(route('getting-started'))
  })
})