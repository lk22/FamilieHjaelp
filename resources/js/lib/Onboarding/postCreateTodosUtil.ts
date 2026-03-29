import { InitialOnboardingState } from "@/state/OnboardingState";

export const postCreateTodos = async ({state}: {state: typeof InitialOnboardingState}): Promise<Response> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            'X-Requested-With': 'XMLHttpRequest',
        };

        const response = await fetch(route('onboarding.process.complete.todos'), {
            method: 'POST',
            headers,
            body: JSON.stringify(state),
            credentials: 'same-origin',
        });
        console.log('Todo created successfully');
        return response;
    } catch (error) {
        console.error('Failed to create todo:', error);
        throw error;
    }
}