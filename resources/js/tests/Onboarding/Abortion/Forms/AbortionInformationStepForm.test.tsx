import { OnboardingProvider } from '@/contexts/OnboardingContext';
import AbortionInformationStepForm from '@/pages/home/onboarding/abortion/form/AbortionInformationStepForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

describe('AbortionInformationStepForm', () => {
    test('renders the week number label and input field depending on the defined gender in the first step of the scenario', () => {
        render(
            <OnboardingProvider>
                <AbortionInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>,
        );

        // expect the correct week number field to be rendered
        const weekNumberLabel = /Hvor mange uger er din partner i graviditeten/i;
        expect(screen.getByLabelText(weekNumberLabel)).toBeInTheDocument();

        expect(screen.getByLabelText(/Har du fået underskrevet en lægeerklæring/i)).toBeInTheDocument();
    });
    test('renders the form with correct input fields and submit button', () => {
        render(
            <OnboardingProvider>
                <AbortionInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>,
        );

        const weekNumberLabel = /Hvor mange uger er din partner i graviditeten ?/i;

        expect(screen.getByLabelText(weekNumberLabel)).toBeInTheDocument();
        expect(screen.getByLabelText(/Har du fået underskrevet en lægeerklæring ?/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hvilken metode ønsker du at benytte til din abort ?/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Har du været til konsultation hos en læge i forbindelse med din abort?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Næste/i })).toBeInTheDocument();
    });
    test('does show notics for changing week number to 22 or higher', async () => {
        const user = userEvent.setup();

        render(
            <OnboardingProvider>
                <AbortionInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>
        )
        const weekNumberInput = screen.getByLabelText(/Hvor mange uger er din partner i graviditeten/i);
        const weekNumberNotice = screen.queryByText("Bemærk: Da du er i uge 22 eller derover")
        await user.clear(weekNumberInput)
        await user.type(weekNumberInput, '22');

        await waitFor(() => {
            expect(weekNumberNotice).not.toBeInTheDocument()
        });
    });
    test('does not render notice for changing week number to 21 or below', async () => {
        const user = userEvent.setup();

        render(
            <OnboardingProvider>
                <AbortionInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>,
        );

        const weekNumberInput = screen.getByLabelText(/Hvor mange uger er din partner i graviditeten/i);
        const weekNumberNotice = screen.queryByText("Bemærk: Da du er i uge 22 eller derover")

        await user.clear(weekNumberInput);
        await user.type(weekNumberInput, '21');

        await waitFor(() => {
            expect(weekNumberNotice).not.toBeInTheDocument()
        })
    });
    test('renders the correct abortion method options in select input', async () => {
        render(
            <OnboardingProvider>
                <AbortionInformationStepForm handleStepSubmit={() => {}} />
            </OnboardingProvider>,
        );

        const abortionMethodSelect = screen.getByLabelText(/Hvilken metode ønsker du at benytte til din abort ?/i);

        expect(abortionMethodSelect).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /Medicinsk abort/i })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /Kirurgisk abort/i })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: /Anden metode/i })).toBeInTheDocument();
    });
});
