import { test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OnboardingProvider } from '@/contexts/OnboardingContext'
import KnowsConfidentialityRightsStepForm from '@/pages/home/onboarding/abortion/form/KnowsConfidentialityRightsStepForm'

describe('KnowsConfidentialityRightsStepForm', () => {
  test('renders the form with correct input fields and submit button', () => {
    render(
      <OnboardingProvider>
        <KnowsConfidentialityRightsStepForm handleStepSubmit={() => {}} />
      </OnboardingProvider>
    );

    expect(
      screen.getByRole('checkbox', { name: /Ja, jeg kender mine rettigheder i forhold til fortrolighed/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: /Nej, jeg kender ikke mine rettigheder i forhold til fortrolighed/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
  });
});