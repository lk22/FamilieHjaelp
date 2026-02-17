import {test, describe, expect } from 'vitest';
import { render, screen, waitFor} from '@testing-library/react';
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
    expect(screen.getByText(/Læs om de forskellige præventionsmetoder og find den, der passer bedst til dig:/i)).toBeInTheDocument();
  });

  test('allows the form to not render contraception information when the user selects that they do not want contraception information', async () => {
    const user = userEvent.setup();

    const component = (
      <OnboardingProvider>
          <WantsContraceptionInformationStepForm handleStepSubmit={() => {}} />
      </OnboardingProvider>
    )

    render(component);

    const doesWantInfoCheck = screen.getByRole('checkbox', { name: /Ja jeg ønsker præventionsvejledning/i });
    const doesNotWantInfoCheck = screen.getByRole('checkbox', { name: /Nej jeg ønsker ikke præventionsvejledning/i });

    // ensure that the contraception information is shown when the user clicks the "wants info" checkbox
    await user.click(doesWantInfoCheck);
    await waitFor(() => {
      expect(screen.getByText(/Læs om de forskellige præventionsmetoder og find den, der passer bedst til dig:/i)).toBeInTheDocument();
    })

    // ensure that the contraception information is not shown when the user clicks the "does not want info" checkbox
    await user.click(doesNotWantInfoCheck);
    await waitFor(() => {
      expect(screen.queryByText(/Læs om de forskellige præventionsmetoder og find den, der passer bedst til dig:/i)).not.toBeInTheDocument();
    })
  });
});