import {vi, test, describe, expect} from 'vitest';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserInformationStepForm from '@/pages/home/onboarding/abortion/form/UserInformationStepForm';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import {configure} from '@testing-library/react';

vi.mock('@radix-ui/react-select', async () => {
    const actual = await vi.importActual('@radix-ui/react-select');
    return {
        ...actual,
        Root: ({ onValueChange, children, defaultValue}: {
            onValueChange: (value: string) => void;
            children: React.ReactNode,
            defaultValue?: string;
        }) => (
            <select
                defaultValue={defaultValue}
                onChange={(e) => onValueChange(e.target.value)}
                data-testid="select-root"
            >
                {children}
            </select>
        ),
        Trigger: () => null,
        Value: () => null,
        Content: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        Item: ({ value, children }: { value: string; children: React.ReactNode}) => (
            <option value={value} data-testid={`select-item-${value}`}>
                {children}
            </option>
        ),
        ItemText: ({ children }: any) => <>{children}</>,
        ItemIndicator: () => null,  // ← tilføj denne
        Group: ({ children }: any) => <>{children}</>,
        Label: ({ children }: any) => <>{children}</>,
        ScrollUpButton: () => null,
        ScrollDownButton: () => null,
        Viewport: ({ children }: any) => <>{children}</>,
        Portal: ({ children }: any) => <>{children}</>,
    }
});

configure({ testIdAttribute: 'data-testid' });


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

        const nameLabel = screen.getByLabelText(/Navn/i);
        // const genderLabel = screen.getByLabelText(/Hvad er dit køn ?/i);
        const genderField = screen.getByTestId('select-root');
        const ageLabel = screen.getByLabelText(/Hvor gammel er du ?/i);

        expect(nameLabel).toBeInTheDocument();
        expect(genderField).toBeInTheDocument();
        expect(ageLabel).toBeInTheDocument();

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

        const genderSelect = screen.getByTestId('select-root');
        const maleOption = screen.getByRole('option', { name: /Mand/i });

        await user.click(genderSelect);
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

        const comboboxGenderSelect = screen.getByTestId('select-root');
        const maleOptionField = screen.getByTestId('select-item-male');
        const femaleOptionField = screen.getByTestId('select-item-female');
        const otherOptionField = screen.getByTestId('select-item-other');

        expect(comboboxGenderSelect).toBeInTheDocument();

        await user.click(comboboxGenderSelect);

        expect(maleOptionField).toBeInTheDocument();
        expect(femaleOptionField).toBeInTheDocument();
        expect(otherOptionField).toBeInTheDocument();

        await user.selectOptions(comboboxGenderSelect, 'male');
        expect(screen.getByLabelText(/Hvor gammel er din partner ?/i)).toBeInTheDocument();

        await user.selectOptions(comboboxGenderSelect, 'female');
        expect(screen.queryByLabelText(/Hvor gammel er din partner ?/i)).not.toBeInTheDocument();
    })
})