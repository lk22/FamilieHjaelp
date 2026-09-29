import React from 'react';
import { vi } from 'vitest';

/**
 * Creates a stateful replacement for Inertia's `useForm`, backed by real React
 * state so that `setData` calls actually re-render components with the
 * updated data. Optionally fixes `errors`/`processing` for asserting on
 * validation and submitting UI states, since the real Inertia form state for
 * those is outside the component's control.
 */
export function createStatefulUseForm(errors: Record<string, string> = {}, processing = false) {
    return function useFormMock<T extends Record<string, unknown>>(initialData: T) {
        const [data, setDataState] = React.useState<T>(initialData);

        const setData = (key: keyof T, value: unknown) => {
            setDataState((previous) => ({ ...previous, [key]: value }));
        };

        return {
            data,
            setData,
            errors,
            processing,
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
            reset: vi.fn(),
        };
    };
}

export const mockStatefulUseForm = createStatefulUseForm();

