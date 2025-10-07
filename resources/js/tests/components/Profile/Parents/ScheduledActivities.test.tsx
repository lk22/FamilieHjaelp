import {render, screen} from '@testing-library/react';
import { test, describe, expect, beforeEach } from 'vitest';

import ScheduledActivitiesList from '@/components/Profile/Home/Parents/ScheduledActivities';

// Test data is hardcoded in the component, so we test against the actual rendered content

describe('Scheduled activities List component', () => {
    describe('When the component renders', () => {
        beforeEach(() => {
            render(<ScheduledActivitiesList />);
        })

        test('it shows necessary values of an item in the list', () => {
            // Test that the expected event title exists
            expect(screen.getByText('Lægebesøg')).toBeInTheDocument();

            // Test that date information appears (both events have same date)
            const dateElements = screen.getAllByText((content) => {
                return content.includes('Dato:') && content.includes('2025-05-01');
            });
            expect(dateElements.length).toBeGreaterThan(0);
            
            // Test that description sections exist (check for the actual rendered descriptions)
            expect(screen.getByText(/Beskrivelse:.*Årligt tjek for Emma/)).toBeInTheDocument();
            expect(screen.getByText(/Beskrivelse:.*Skolehjem samtale med skole lærer for Emma/)).toBeInTheDocument();

            // Verify both events are present by their unique titles
            expect(screen.getByText('Skolehjem samtale')).toBeInTheDocument();
        });

        test('it renders multiple events correctly', () => {
            // Test that multiple events are rendered by checking for event containers
            const eventContainers = screen.getAllByRole('heading', { level: 3 });
            expect(eventContainers).toHaveLength(2);
             
            // Verify specific event titles exist
            expect(screen.getByText('Lægebesøg')).toBeInTheDocument();
            expect(screen.getByText('Skolehjem samtale')).toBeInTheDocument();
        });

        test('it shows navigation link', () => {
            const navigationLink = screen.getByText('Se planlagte');
            expect(navigationLink).toBeInTheDocument();
            expect(navigationLink.closest('a')).toHaveAttribute('href');
        });

        test('it displays proper structure with icons and accessibility', () => {
            // Test that screen reader content exists
            expect(screen.getAllByText('Begivenhed:', { selector: '.sr-only' })).toHaveLength(2);
            expect(screen.getAllByText('Dato:', { selector: '.sr-only' })).toHaveLength(2);
            // expect(screen.getAllByText('Barn:', { selector: '.sr-only' })).toHaveLength(2);
        });
    });
})

// Note: If you want to mock the entire ScheduledEventsList component in another test, you can do so like this:
// vi.mock('@/components/Profile/Home/Parents/SchedulesEventsList', () => ({
//     default: () => <div data-testid="mocked-scheduled-events">Mocked Events</div>
// }))
//
// Then in your test, you can render the parent component that includes ScheduledEventsList
// and verify that the mocked version is rendered instead.