import { InitialOnboardingState } from "@/state/OnboardingState";
export const postCreatePages = async ({state}: {state: typeof InitialOnboardingState}): Promise<Response> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        'X-Requested-With': 'XMLHttpRequest',
      }

        const response = await fetch(route('onboarding.process.complete.pages'), {
            method: 'POST',
            headers,
            body: JSON.stringify(state),
            credentials: 'same-origin',
        });
        console.log('Page created successfully');
        return response;
    } catch (error) {
      console.error('Failed to create page:', error);
        throw error;
    }
}