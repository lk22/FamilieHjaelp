import { test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OnboardingProvider } from '@/contexts/OnboardingContext'
import WantsSupportConversationStepForm from '@/pages/home/onboarding/abortion/form/WantsSupportConversationStepForm'

describe('WantsSupportConversationStepForm', () => {
  test('renders the form with correct input fields and submit button', () => {
    const component = (
      <OnboardingProvider>
        <WantsSupportConversationStepForm handleStepSubmit={() => {}} />
      </OnboardingProvider>
    );
    render(component);

    expect(
      screen.getByRole('checkbox', { name: /Ja jeg ønsker en samtale med en støtteperson/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: /Nej jeg ønsker ikke en samtale med en støtteperson/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
  });
});