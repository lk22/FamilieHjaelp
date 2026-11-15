import { test, describe, expect, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import CompletedModal from '@/components/Onboarding/Modals/CompletedModal';
import { router } from '@inertiajs/react'

vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual('@inertiajs/react');
  return {
    ...actual,
    router: {
      visit: vi.fn(),
    },
  };
});

describe('CompletedModal Component', () => {
  test('renders the modal with correct title, description and buttons', () => {
    const modal = (
      <OnboardingProvider>
        <CompletedModal isOpen={true}/>
      </OnboardingProvider>
    );

    render(modal);

    expect(screen.getByRole('heading', { name: /Du har udfyldt spørgeskemaet/i })).toBeInTheDocument();
    expect(screen.getByText(/Tak fordi du tog dig tid til at gennemføre vores onboarding! Vi håber, at det har givet dig en klar forståelse af, hvordan du kan bruge vores platform til at få den støtte og information, du har brug for./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Gå til bekræftelsessiden/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start forfra/i })).toBeInTheDocument();
  })

  test('calls resetOnboarding and navigates to getting-started when pressing the reset button', async () => {
    const user = userEvent.setup();

    const CompletedModalMock = () => {
      return (
        <CompletedModal isOpen={true} closeModal={() => {}} />
      )
    }

    const modal = (
      <OnboardingProvider>
        <CompletedModalMock />
      </OnboardingProvider>
    );

    render(modal);

    const resetButton = screen.getByRole('button', { name: /Start forfra/i });
    await user.click(resetButton);

    expect(vi.mocked(router).visit).toHaveBeenCalledWith(expect.stringContaining('getting-started'))
  })

  test('Moving forwards to confirmation page when clicking the go to confirmation button', async () => {
    const CompletedModalMock = () => {
      return (
        <CompletedModal isOpen={true} closeModal={() => {}} />
      )
    }

    const modal = (
      <OnboardingProvider>
        <CompletedModalMock />
      </OnboardingProvider>
    );

    render(modal);

    const confirmationButton = screen.getByRole('link', { name: /Gå til bekræftelsessiden/i });
    expect(confirmationButton).toHaveAttribute('href', expect.stringContaining('onboarding.confirmation'));
  })
});