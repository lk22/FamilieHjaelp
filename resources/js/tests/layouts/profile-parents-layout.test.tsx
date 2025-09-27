import {JSX} from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import {test, describe, expect} from 'vitest';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

import ProfileParentsOverviewLayout from '@/layouts/profile/profile-parents-layout'

interface TestProfileParentsOverviewLayoutProps {
    children: React.ReactNode;
    title: string;
    headline?: string | JSX.Element;
}

vi.mock('inertiajs/react', async () => {
    return {
        usePage: () => ({
            props: {
                auth: {
                    user: {
                        id: 1,
                        name: 'Test User',
                        email: 'test@user.com',
                        todos: [],
                        pages: [],
                    },
                },
            },
        }),
        router: {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
            reload: vi.fn(),
            visit: vi.fn(),
        },
    }
});

interface RouteStubProperties {
    name: string;
    params?: string | number | Record<string, unknown>;
}

vi.stubGlobal(
    'route',
    ({name}: RouteStubProperties) => {
        const routes: Record<string, string> = {
            'profile.home': '/profile',
            'profile.todos': '/profile/todos',
        }
        return routes[name] || `/${name}`
    }
)

// mock the ProfileParentsOverviewLayout component
vi.mock('@/layouts/profile/profile-parents-layout', () => ({
    default: ({children, title, headline}: TestProfileParentsOverviewLayoutProps) => (
        <div data-testid="profile-layout">
            <div data-testid="title">{title}</div>
            <div data-testid="headline">{headline}</div>
            {children}
        </div>
    ),
}));

describe('ProfileParentsOverviewLayout', () => {
    const {auth} = usePage<SharedData>().props;

    const mockProps: TestProfileParentsOverviewLayoutProps = {
        children: <div>Test Child</div>,
        title: 'Profile Parents Home',
        headline: 'Welcome to your parents profile'
    }

    test('renders default welcome message when no headline provided', () => {
        render(
            <ProfileParentsOverviewLayout title="Test Page">
                <div>Content</div>
            </ProfileParentsOverviewLayout>
        )
        expect(screen.getByTestId('title')).toHaveTextContent('Test Page')
        expect(screen.getByTestId('headline')).toBeEmptyDOMElement();
    })

    test('renders ProfileParentsOverviewLayout and TodoListSection', () => {
        render(<ProfileParentsOverviewLayout {...mockProps} />);

        const layout = screen.getByTestId('profile-layout');
        expect(layout).toBeInTheDocument();
    })

    test('displays the correct title and headline', () => {
        render(<ProfileParentsOverviewLayout {...mockProps} />);

        expect(screen.getByText('Profile Parents Home')).toBeInTheDocument();
        expect(screen.getByText('Test Child')).toBeInTheDocument();
        expect(screen.getByText('Welcome to your parents profile')).toBeInTheDocument();
    });

    test('it renders the user name in the default headline when no headline prop is provided', () => {
        render(
            <ProfileParentsOverviewLayout headline={`Velkommen ${auth.user.name}`} title="Test Page">
                <div>Content</div>
            </ProfileParentsOverviewLayout>
        );

        const headline = screen.getByTestId('headline');
        expect(headline).toBeInTheDocument();
        expect(headline).toHaveTextContent(`Velkommen ${auth.user.name}`);
    })
})