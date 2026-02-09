import {test, describe, expect} from 'vitest';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserInformationStepForm from '@/pages/home/onboarding/abortion/form/UserInformationStepForm';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

type MockedUserInformationStepFormProps = {
  name: string;
  age: string;
  ageOfPartner: string;
  gender: string;
}

describe('UserInformationStepForm', () => {
    const mockProps: MockedUserInformationStepFormProps = {
        name: 'Test Name',
        age: '30',
        ageOfPartner: '32',
        gender: 'female'
    }

    test('renders the form with correct input fields and submit button', () => {
        render(
            <OnboardingProvider>
                <UserInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>
        );

        // check for name input
        expect(screen.getByLabelText(/Navn/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Køn/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hvor gammel er du ?/i)).toBeInTheDocument();

        // check for correct input fields based on default rendering
        expect(screen.queryByLabelText(/Hvor gammel er din partner ?/i)).not.toBeInTheDocument();

        // check for submit button
        expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
    })

    test('expects the form to render the age field and age of partner field when gender is male', async () => {
        const user = userEvent.setup();

        render(
            <OnboardingProvider>
                <UserInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>
        );

        const genderSelect = screen.getByLabelText(/Hvad er dit Køn ?/i);
        await user.selectOptions(genderSelect, 'male');

        expect(screen.getByLabelText(/Hvor gammel er du ?/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hvor gammel er din partner ?/i)).toBeInTheDocument();
    })

    test('it removes the age of partner field when switching gender back to female', async () => {
        const user = userEvent.setup();

        render(
            <OnboardingProvider>
                <UserInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>
        );

        expect(screen.getByLabelText(/Hvor gammel er du ?/i)).toBeInTheDocument();

        const genderSelect = screen.getByLabelText(/Hvad er dit Køn ?/i);
        await user.selectOptions(genderSelect, 'male');
        expect(screen.getByLabelText(/Hvor gammel er din partner ?/i)).toBeInTheDocument();

        await user.selectOptions(genderSelect, 'female');
        expect(screen.queryByLabelText(/Hvor gammel er din partner ?/i)).not.toBeInTheDocument();
    })
})