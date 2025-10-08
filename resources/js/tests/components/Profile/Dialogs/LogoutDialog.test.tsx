import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { test, describe, expect } from "vitest";

import {LogoutDialog} from '@/components/Profile/Dialogs/LogoutDialog';

interface TestLogoutDialogProps {
    isLoggingOut: boolean;
    onClose: () => void;
    handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

describe('LogoutDialog', () => {
    const mockProps: TestLogoutDialogProps = {
        isLoggingOut: true,
        onClose: vi.fn(),
        handleLogout: vi.fn(),
        onConfirm: vi.fn(),
    }

    test('renders the LogoutDialog component with correct props', () => {
        const mockOnClose = vi.fn();
        const mockOnConfirm = vi.fn();

        render(
            <LogoutDialog
                isLoggingOut={true}
                handleLogout={mockOnConfirm}
                setIsLoggingOutDialog={mockOnClose}
            />
        )

        // get the dialog elements
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveClass('bg-slate-800 text-white');
    });

    test('renders the logout dialog with the correct text', () => {
        render(
            <LogoutDialog {...mockProps}/>
        );

        expect(screen.getByText('Er du sikker?')).toBeInTheDocument();
        expect(screen.getByText('Du er ved at logge ud. Er du sikker på, at du vil fortsætte?')).toBeInTheDocument();
        expect(screen.getByText('Annuller')).toBeInTheDocument();
        expect(screen.getByText('Log ud')).toBeInTheDocument();
    })

    test('calls onClose when the cancel button is clicked', () => {
        const mockOnClose = vi.fn();
        const mockOnConfirm = vi.fn();

        render(
            <LogoutDialog
                isLoggingOut={true}
                handleLogout={mockOnConfirm}
                setIsLoggingOutDialog={mockOnClose}
            />
        );

        const cancelButton = screen.getByText('Annuller');
        expect(cancelButton).toBeInTheDocument();

        // simulate click
        cancelButton.click();
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    })

    test('calls onConfirm when the confirm button is clicked', () => {
        const mockOnClose = vi.fn();
        const mockOnConfirm = vi.fn();

        render(
            <LogoutDialog
                isLoggingOut={true}
                handleLogout={mockOnConfirm}
                setIsLoggingOutDialog={mockOnClose}
            />
        );

        const confirmButton = screen.getByText('Log ud');
        expect(confirmButton).toBeInTheDocument();

        // simulate click
        confirmButton.click();
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    })
})