import {test, describe, expect } from 'vitest';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import WantsContraceptionInformationStepForm from '@/pages/home/onboarding/abortion/form/WantsContraceptionInformationStepForm';

describe('WantsContraceptionInformationStepForm', () => {
  const contraceptionInfoList: string[] = [
    'P-piller',
    'Minispiral',
    'Vaginalring',
    'P-Sprøjte',
    'P-Stav',
    'P-Plaster',
    'Spiral',
    'Hormonspiral',
    'Kondom',
    'Pessar',
    'Sikre perioder',
    'Nødprævention (fortrydelsespille)',
  ];

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

    const component = (
      <>
        <OnboardingProvider>
            <WantsContraceptionInformationStepForm handleStepSubmit={() => {}} />
        </OnboardingProvider>
      </>
    );

    render(component);

    const wantsInfoCheckbox = screen.getByRole('checkbox', { name: /Ja jeg ønsker præventionsvejledning/i });
    await user.click(wantsInfoCheckbox);
    render(component)

    // rerender the component to reflect the state change
    expect(screen.getByText(/Her er en liste over præventionsmetoder du kan benytte./i)).toBeInTheDocument();
      contraceptionInfoList.forEach((method) => {
        expect(screen.getByText(method)).toBeInTheDocument();
      });
  });
});