import GettingStartedModal from '@/components/Onboarding/Modals/GettingStartedModal';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { router } from '@inertiajs/react';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

describe('Getting Started modal', () => {

    test('should render modal certain paragraphs for onboarding is not prepared', () => {
        const modal = (
            <OnboardingProvider>
                <GettingStartedModal isOpen={true} closeModal={() => {}} />
            </OnboardingProvider>
        );

        render(modal);

        const title = screen.getByText(/Kom i gang med Familiehjælp/i);
        const description = screen.getByText(
            /For at sikre, at du får den bedst mulige oplevelse, har vi designet en onboarding-proces, der guider dig gennem de vigtigste funktioner og indstillinger i appen. Denne proces vil hjælpe dig med at konfigurere din konto, tilføje familiemedlemmer og forstå, hvordan du bedst kan bruge Familiehjælp til at støtte din familie./i,
        );
        const gettingStartedButton = screen.getByRole('button', { name: /lad os komme i gang/i });

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(gettingStartedButton).toBeInTheDocument();
    });

    test('should render preparing paragraphs when clicking getting started button', async () => {
        const user = userEvent.setup();

        const modal = (
            <OnboardingProvider>
                <GettingStartedModal isOpen={true} closeModal={() => {}} />
            </OnboardingProvider>
        );

        render(modal);

        const gettingStartedButton = screen.getByRole('button', { name: /Lad os komme i gang/i });
        await user.click(gettingStartedButton);

        expect(screen.getByText(/Klargøring i gang:/i)).toBeInTheDocument();
        expect(screen.getByText(/Vi klargør din onboarding-oplevelse. Dette kan tage et øjeblik. Tak for din tålmodighed!/i)).toBeInTheDocument();
    });

    test('should redirect to getting started page after 2 seconds when proceeding', async () => {
        const mockVisit = vi.spyOn(router, 'visit').mockImplementation(() => Promise.resolve());

        const user = userEvent.setup();
        render(
            <OnboardingProvider>
                <GettingStartedModal isOpen={true} closeModal={() => {}} />
            </OnboardingProvider>,
        );

        const gettingStartedButton = screen.getByRole('button', { name: /lad os komme i gang/i });
        await user.click(gettingStartedButton);

        // Verify button click worked - preparing state should show
        expect(screen.getByText(/Klargøring i gang:/i)).toBeInTheDocument();

        // Wait for the 2 second setTimeout to complete
        await new Promise((resolve) => setTimeout(resolve, 2000));

        expect(mockVisit).toHaveBeenCalledWith(route('getting-started'));
    });

    test('it renders specific texts and buttons if onboarding is in progress', () => {
        const { result } = renderHook(() => useOnboarding(), {
            wrapper: OnboardingProvider,
        });

        const {onboardingState} = result.current;
        onboardingState.progress = 'in_progress';

        expect(screen.queryByText("Start forfra"))
        expect(screen.queryByText("Fortsæt hvor du slap"))
    })
});
