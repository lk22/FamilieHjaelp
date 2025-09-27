import {JSX} from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {test, describe, expect} from 'vitest';

import ProfileOverviewLayout from '@/layouts/profile/profile-layout'

interface TestProfileOverviewLayoutProps {
    children: React.ReactNode;
    title: string;
    headline?: string | JSX.Element;
}

// mock the ProfileOverviewLayout component
vi.mock('@/layouts/profile/profile-layout', () => ({
    default: ({children, title, headline}: TestProfileOverviewLayoutProps) => (
        <div data-testid="profile-layout">
            <div data-testid="title">{title}</div>
            <div data-testid="headline">{headline}</div>
            {children}
        </div>
    ),
}));

describe('ProfileOverviewHome', () => {
    const mockProps: TestProfileOverviewLayoutProps = {
        children: <div>Test Child</div>,
        title: 'Profile Home',
        headline: 'Welcome to your profile'
    }

    test('renders default welcome message when no headline provided', () => {
        render(
            <ProfileOverviewLayout title="Test Page">
                <div>Content</div>
            </ProfileOverviewLayout>

        )
        expect(screen.getByTestId('title')).toHaveTextContent('Test Page')
        expect(screen.getByTestId('headline')).toBeEmptyDOMElement();
    })

    test('renders ProfileOverviewLayout and TodoListSection', () => {
        render(<ProfileOverviewLayout {...mockProps} />);

        const layout = screen.getByTestId('profile-layout');
        expect(layout).toBeInTheDocument();
    })

    test('displays the correct title and headline', () => {
        render(<ProfileOverviewLayout {...mockProps} />);

        expect(screen.getByText('Profile Home')).toBeInTheDocument();
        expect(screen.getByText('Test Child')).toBeInTheDocument();
        expect(screen.getByText('Welcome to your profile')).toBeInTheDocument();
    });
})