import {
    render, screen
} from '@testing-library/react';

import { vi, test, describe, expect } from 'vitest';
import { ToggleTodoDialog } from '@/components/Profile/Dialogs/ToggleTodoDialog';

interface ToggleTodoDialogProps {
    isPromptOpen: boolean;
    setIsPromptOpen: (open: boolean) => void;
    handleCompleteToggle: () => void;
}

describe("Todo Toggle Dialog", () => {
    const mockProps: ToggleTodoDialogProps = {
        isPromptOpen: true,
        setIsPromptOpen: vi.fn(),
        handleCompleteToggle: vi.fn(),
    }

    // Basic render test to ensure component mounts without crashing
    test("Renders the toggle dialog with correct props", () => {
        const mockSetIsPromptOpen = vi.fn();
        const mockHandleCompleteToggle = vi.fn();

        render(
            <ToggleTodoDialog
                isPromptOpen={true}
                setIsPromptOpen={mockSetIsPromptOpen}
                handleCompleteToggle={mockHandleCompleteToggle}
            />
        );
    })

    // Test that the dialog renders with correct text and buttons
    test("Renders the dialog with correct text and buttons", () => {
        render(<ToggleTodoDialog {...mockProps} />);

        expect(screen.getByText('Er du sikker?')).toBeInTheDocument();
        expect(screen.getByText('Du har allerede markeret denne opgave som fuldført. Er du sikker på, at du vil ændre status?')).toBeInTheDocument();
        expect(screen.getByText('Annuller')).toBeInTheDocument();
        expect(screen.getByText('Bekræft')).toBeInTheDocument();
    })

    // test that clicking buttons calls the appropriate handlers
    test("Calls appropriate handlers on cancel button clicks", () => {
        const mockSetIsPromptOpen = vi.fn();
        const mockHandleCompleteToggle = vi.fn();
        
        render(
            <ToggleTodoDialog
                isPromptOpen={true}
                setIsPromptOpen={mockSetIsPromptOpen}
                handleCompleteToggle={mockHandleCompleteToggle}
            />
        );

        // Simulate clicking the cancel button
        const cancelButton = screen.getByText('Annuller');
        cancelButton.click();
        expect(mockSetIsPromptOpen).toHaveBeenCalledWith(false);
    })

    test("Calls appropriate handlers on confirm button clicks", () => {
        const mockSetIsPromptOpen = vi.fn();
        const mockHandleCompleteToggle = vi.fn();
        
        render(
            <ToggleTodoDialog
                isPromptOpen={true}
                setIsPromptOpen={mockSetIsPromptOpen}
                handleCompleteToggle={mockHandleCompleteToggle}
            />
        );

        const confirmButton = screen.getByText('Bekræft');
        confirmButton.click();
        expect(mockHandleCompleteToggle).toHaveBeenCalledTimes(1);
        expect(mockSetIsPromptOpen).not.toHaveBeenCalled();
    })
})