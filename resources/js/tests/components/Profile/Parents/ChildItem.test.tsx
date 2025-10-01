import { screen, render } from '@testing-library/react';

import { test, describe, expect, beforeEach } from 'vitest';

import ChildItem from '@/components/Profile/Home/Parents/ChildItem';

type ChildProps = {
    id: number;
    name: string;
    age: number;
    school: string;
}

describe('Child Item component', () => {
    describe('When the component renders', () => {

        beforeEach(() => {
            const mockedChild: ChildProps = {
                id: 1,
                name: 'Emma',
                age: 8,
                school: 'Skole A'
            }
            render(<ChildItem child={mockedChild} />);
        });

        test('it shows neccesary values of a item in the list', () => {
            const childName = screen.getByText('Emma');
            expect(childName).toBeInTheDocument();

            const childAge = screen.getByText('Alder: 8');
            expect(childAge).toBeInTheDocument();

            const childSchool = screen.getByText('Skole: Skole A');
            expect(childSchool).toBeInTheDocument();
        })
    });
})