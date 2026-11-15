import { InitialOnboardingState } from "@/state/OnboardingState";
export const postCmpleteOnboardingProcess = async ({state}: {state: typeof InitialOnboardingState}): Promise<Response> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            'X-Requested-With': 'XMLHttpRequest',
        };

        const response = await fetch(route('onboarding.process.complete'), {
            method: 'POST',
            headers,
            body: JSON.stringify(state),
            credentials: 'same-origin',
        });
        console.log('Onboarding process completed successfully');

        return response;
    } catch (error) {
        console.error('Failed to complete onboarding process:', error);
        throw error;
    }
};