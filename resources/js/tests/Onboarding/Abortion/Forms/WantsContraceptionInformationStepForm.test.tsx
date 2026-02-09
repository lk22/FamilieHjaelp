import {test, describe, expect } from 'vitest';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import WantsContraceptionInformationStepForm from '@/pages/home/onboarding/abortion/form/WantsContraceptionInformationStepForm';

describe('WantsContraceptionInformationStepForm', () => {
  test('renders the form with correct input fields and submit button', () => {
    render(
        <OnboardingProvider>
            <WantsContraceptionInformationStepForm handleStepSubmit={() => {}} />
        </OnboardingProvider>
    );

    expect(
      screen.getByRole('checkbox', { name: /Ja jeg ønsker præventionsvejledning/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: /Nej jeg ønsker ikke præventionsvejledning/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
  });

  test('allows the form to render contraception information when the user selects that they want contraception information', async () => {
    const user = userEvent.setup();

    render(
        <OnboardingProvider>
            <WantsContraceptionInformationStepForm handleStepSubmit={() => {}} />
        </OnboardingProvider>
    );

    const wantsInfoCheckbox = screen.getByRole('checkbox', { name: /Ja jeg ønsker præventionsvejledning/i });
    await user.click(wantsInfoCheckbox);

    expect(screen.getByText(/Da du har angivet, at du ønsker præventionsvejledning, vil du modtage information om forskellige præventionsmetoder, deres effektivitet og hvordan du kan få adgang til dem efter din abort.\./i)).toBeInTheDocument();
  });

  test('does not render contraception information when the user selects that they do not want contraception information', async () => {
    const user = userEvent.setup();
    render(
        <OnboardingProvider>
            <WantsContraceptionInformationStepForm handleStepSubmit={() => {}} />
        </OnboardingProvider>
    );

    const doesNotWantInfoCheckbox = screen.getByRole('checkbox', { name: /Nej jeg ønsker ikke præventionsvejledning/i });
    await user.click(doesNotWantInfoCheckbox);

    expect(screen.queryByText(/Da du har angivet, at du ønsker præventionsvejledning, vil du modtage information om forskellige præventionsmetoder, deres effektivitet og hvordan du kan få adgang til dem efter din abort\./i)).not.toBeInTheDocument();
  });
});