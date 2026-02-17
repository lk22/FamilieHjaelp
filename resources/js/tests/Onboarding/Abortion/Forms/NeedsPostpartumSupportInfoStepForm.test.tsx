import {test,describe,expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import NeedsPostpartumSupportInfoStepForm from '@/pages/home/onboarding/abortion/form/NeedsPostpartumSupportInfoStepForm';

describe('NeedsPostpartumSupportInfoStepForm', () => {
    test('renders the form with correct input fields and submit button', () => {
        render(
            <OnboardingProvider>
                <NeedsPostpartumSupportInfoStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>
        );

        expect(
          screen.getByRole('checkbox', { name: /Ja, jeg ønsker information om efterfødselsstøtte/i })
        ).toBeInTheDocument();

        expect(
          screen.getByRole('checkbox', { name: /Nej, jeg har ikke brug for information om efterfødselsstøtte/i })
        ).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
    })
});