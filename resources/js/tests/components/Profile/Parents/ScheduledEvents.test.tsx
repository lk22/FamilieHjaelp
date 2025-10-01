import { screen, render } from '@testing-library/react';
import {vi} from 'vitest';
import { test, describe, expect, beforeEach } from 'vitest';

import ScheduledEventsList from '@/components/Profile/Home/Parents/SchedulesEventsList';


type ScheduledEventProps = {
    id: number;
    title: string;
    date: string;
    description: string;
    child: {
        id: number;
        name: string;
        age: number;
        school: string;
    }
}
const mockedEvent: ScheduledEventProps = {
    id: 1,
    title: 'Lægebesøg',
    date: "2025-05-01",
    description: 'Årlig kontrol hos lægen',
    child: {
        id: 1,
        name: 'Emma',
        age: 10,
        school: 'Skole A'
    }
}

vi.mock('@/components/Profile/Home/Parents/SchedulesEventsList', () => ({
    __esModule: true,
    default: () => (
        <div>
            <h3>
                <span>Begivenhed: </span>
                {mockedEvent.title}
            </h3>
            <p>
                <span>Dato:</span>
                Dato: {mockedEvent.date}
            </p>
            <p>
                <span>Barn:</span>
                Barn: {mockedEvent.child.name}
            </p>
        </div>
    ),

}));


describe('Scheduled Events List component', () => {
    describe('When the component renders', () => {
        beforeEach(() => {
            render(<ScheduledEventsList />);
        })

        // TODO: figure out why the test below is not working as expected
        // currently it fails because the text content includes whitespaces and new lines
        // which makes the exact text match fail
        test('it shows neccesary values of a item in the list', () => {
            const eventTitle = screen.getByText(mockedEvent.title);
            expect(eventTitle).toBeInTheDocument();

            const eventDate = screen.getByText(`Dato: ${mockedEvent.date}`);
            expect(eventDate).toBeInTheDocument();

            const eventChild = screen.getByText(`Barn: ${mockedEvent.child.name}`);
            expect(eventChild).toBeInTheDocument();
        });
    })
})