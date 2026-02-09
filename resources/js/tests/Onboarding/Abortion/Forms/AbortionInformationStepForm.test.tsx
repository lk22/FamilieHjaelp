import {test, describe, expect} from 'vitest';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import AbortionInformationStepForm from '@/pages/home/onboarding/abortion/form/AbortionInformationStepForm';

describe('AbortionInformationStepForm', () => {
  test('renders the week number label and input field depending on the defined gender in the first step of the scenario', () => {
      render(
          <OnboardingProvider>
              <AbortionInformationStepForm handleStepSubmit={() => {}} />
          </OnboardingProvider>
      )

      // expect the correct week number field to be rendered
      const weekNumberLabel = /Hvor mange uger er din partner i graviditeten/i;
      expect(screen.getByLabelText(weekNumberLabel)).toBeInTheDocument();

      expect(screen.getByLabelText(/Har du fået underskrevet en lægeerklæring/i)).toBeInTheDocument();
  });
  test('renders the form with correct input fields and submit button', () => {
      render(
        <OnboardingProvider>
              <AbortionInformationStepForm handleStepSubmit={() => {}} />
          </OnboardingProvider>
      )

      const weekNumberLabel = /Hvor mange uger er din partner i graviditeten ?/i;

      expect(screen.getByLabelText(weekNumberLabel)).toBeInTheDocument();
      expect(screen.getByLabelText(/Har du fået underskrevet en lægeerklæring ?/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Hvilken metode ønsker du at benytte til din abort ?/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Har du været til konsultation hos en læge i forbindelse med din abort?/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
  });

  test('does not render notice for changing week number to 21 or below', async () => {
    const user = userEvent.setup();

    render(
        <OnboardingProvider>
            <AbortionInformationStepForm handleStepSubmit={() => {}} />
        </OnboardingProvider>
    );

    const weekNumberInput = screen.getByLabelText(/Hvor mange uger er din partner i graviditeten/i);

    await user.clear(weekNumberInput);
    await user.type(weekNumberInput, '21');

    expect(
        screen.queryByText(
            /Bemærk: Da du er i uge 22 eller derover, er der nogle yderligere krav og overvejelser, du skal være opmærksom på\. Det anbefales, at du søger rådgivning hos en læge for at få mere information om dine muligheder og de nødvendige skridt fremad\./i
        )
    ).not.toBeInTheDocument();
  });
  test('renders the correct abortion method options in select input', async () => {
    render(
        <OnboardingProvider>
            <AbortionInformationStepForm handleStepSubmit={() => {}} />
        </OnboardingProvider>
    )

    const abortionMethodSelect = screen.getByLabelText(/Hvilken metode ønsker du at benytte til din abort ?/i);

    expect(abortionMethodSelect).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Medicinsk abort/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Kirurgisk abort/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Anden metode/i })).toBeInTheDocument();
  });
});