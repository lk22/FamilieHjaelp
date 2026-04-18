import {test,describe,expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import NeedsInterpreterStepForm from '@/pages/home/onboarding/abortion/form/NeedsInterpreterStepForm';

describe('NeedsInterpreterStepForm', () => {
    test('renders the form with correct input fields and submit button', () => {
        render(
            <OnboardingProvider>
                <NeedsInterpreterStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>
        );

        expect(
          screen.getByRole('checkbox', { name: /Ja, jeg har brug for en tolk/i })
        ).toBeInTheDocument();

        expect(
          screen.getByRole('checkbox', { name: /Nej, jeg har ikke brug for en tolk/i })
        ).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
    })
});