import {
    render,
    screen
} from '@testing-library/react';
import { test, describe, expect } from 'vitest';

import ChildList from '@/components/Profile/Home/Parents/ChildList';

describe('Child List component', () => {
    describe('Rendering tests', () => {

        // TODO: refactor to use mock data
        test('renders the ChildList component', () => {
            render(<ChildList />);

            const childList = screen.getByText('Børn');
            expect(childList).toBeInTheDocument();

            const child1 = screen.getByText('Emma');
            expect(child1).toBeInTheDocument();

            const child2 = screen.getByText('Lucas');
            expect(child2).toBeInTheDocument();
        })
    });
})