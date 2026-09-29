import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { createStatefulUseForm, mockStatefulUseForm } from '../mocks/statefulInertia';

vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual('@inertiajs/react');
  return {
    ...actual,
    useForm: mockStatefulUseForm,
  };
});

import ParentStep from '@/pages/home/onboarding/family/steps/ParentStep';
import { type ParentStepData } from '@/types/onboarding';

const baseData: ParentStepData = {
  name: '',
  age: '',
  familyTitle: '',
  hasPartner: false,
  partnerNeedsUser: false,
};

describe('ParentStep', () => {
  let routeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    routeSpy = vi.fn((name: string) => `/${name}`);
    vi.stubGlobal('route', routeSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('renders the base fields pre-filled with the default data', () => {
    render(<ParentStep defaultData={{ ...baseData, name: 'Anna Hansen', age: '34', familyTitle: 'Mor' }} />);

    expect(screen.getByLabelText('Navn')).toHaveValue('Anna Hansen');
    expect(screen.getByLabelText('Alder')).toHaveValue('34');
    expect(screen.getByLabelText('Familietitel')).toHaveValue('Mor');
  });

  test('typing into a field updates its value', () => {
    render(<ParentStep defaultData={baseData} />);

    const nameInput = screen.getByLabelText('Navn');
    fireEvent.change(nameInput, { target: { value: 'Bo Hansen' } });

    expect(nameInput).toHaveValue('Bo Hansen');
  });

  test('does not render the partner section when the family has no partner by default', () => {
    render(<ParentStep defaultData={baseData} />);

    expect(screen.queryByText('Partner information')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nej' })).toBeInTheDocument();
  });

  test('shows the partner section when clicking Ja', () => {
    render(<ParentStep defaultData={baseData} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Ja' })[0]);

    expect(screen.getByText('Partner information')).toBeInTheDocument();
    expect(screen.getByLabelText('Partner navn')).toHaveValue('');
  });

  test('renders pre-filled partner fields when the default data already has a partner', () => {
    render(
      <ParentStep
        defaultData={{
          ...baseData,
          hasPartner: true,
          partnerName: 'Bo Hansen',
          partnerAge: '36',
          partnerFamilyTitle: 'Far',
        }}
      />,
    );

    expect(screen.getByLabelText('Partner navn')).toHaveValue('Bo Hansen');
    expect(screen.getByLabelText('Partner alder')).toHaveValue('36');
    expect(screen.getByLabelText('Partner familietitel')).toHaveValue('Far');
  });

  test('clicking Nej hides the partner section and clears the partner fields', () => {
    render(
      <ParentStep
        defaultData={{
          ...baseData,
          hasPartner: true,
          partnerName: 'Bo Hansen',
          partnerAge: '36',
          partnerFamilyTitle: 'Far',
        }}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Nej' })[0]);

    expect(screen.queryByText('Partner information')).not.toBeInTheDocument();

    // Re-opening the partner section should show cleared fields, proving the reset happened.
    fireEvent.click(screen.getAllByRole('button', { name: 'Ja' })[0]);

    expect(screen.getByLabelText('Partner navn')).toHaveValue('');
    expect(screen.getByLabelText('Partner alder')).toHaveValue('');
    expect(screen.getByLabelText('Partner familietitel')).toHaveValue('');
  });

  test('does not render the partner user fields when the partner does not need a user by default', () => {
    render(<ParentStep defaultData={{ ...baseData, hasPartner: true }} />);

    expect(screen.queryByLabelText('Partner bruger navn')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Partner email')).not.toBeInTheDocument();
  });

  test('shows the partner user fields when clicking Ja under "Skal din partner have en bruger?"', () => {
    render(<ParentStep defaultData={{ ...baseData, hasPartner: true }} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Ja' })[1]);

    expect(screen.getByLabelText('Partner bruger navn')).toBeInTheDocument();
    expect(screen.getByLabelText('Partner email')).toBeInTheDocument();
  });

  test('clicking Nej under "Skal din partner have en bruger?" hides and clears the partner user fields', () => {
    render(
      <ParentStep
        defaultData={{
          ...baseData,
          hasPartner: true,
          partnerNeedsUser: true,
          partnerUserName: 'Bo bruger',
          partnerUserEmail: 'bo@example.com',
        }}
      />,
    );

    expect(screen.getByLabelText('Partner bruger navn')).toHaveValue('Bo bruger');

    fireEvent.click(screen.getAllByRole('button', { name: 'Nej' })[1]);

    expect(screen.queryByLabelText('Partner bruger navn')).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Ja' })[1]);

    expect(screen.getByLabelText('Partner bruger navn')).toHaveValue('');
    expect(screen.getByLabelText('Partner email')).toHaveValue('');
  });

  test('links back to the family name step', () => {
    render(<ParentStep defaultData={baseData} />);

    expect(screen.getByRole('link', { name: 'Tilbage' })).toHaveAttribute('href', '/onboarding.scenario.step');
    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step', { scenario: 'family', step: 'one' });
  });

  test('submits the form and requests the next step route', () => {
    render(<ParentStep defaultData={baseData} />);

    fireEvent.click(screen.getByRole('button', { name: 'Næste' }));

    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step.submit', { scenario: 'family', step: 'two', nextStep: 'three' });
  });
});

describe('ParentStep validation errors', () => {
  beforeEach(() => {
    vi.stubGlobal('route', vi.fn((name: string) => `/${name}`));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('renders field level validation errors', async () => {
    vi.resetModules();
    vi.doMock('@inertiajs/react', async () => {
      const actual = await vi.importActual('@inertiajs/react');
      return {
        ...actual,
        useForm: createStatefulUseForm({
          'data.name': 'Navn er påkrævet',
          'data.age': 'Alder er påkrævet',
          'data.familyTitle': 'Familietitel er påkrævet',
          'data.hasPartner': 'Vælg om du har en partner',
        }),
      };
    });

    const { default: ParentStepWithErrors } = await import('@/pages/home/onboarding/family/steps/ParentStep');

    render(<ParentStepWithErrors defaultData={baseData} />);

    expect(screen.getByText('Navn er påkrævet')).toBeInTheDocument();
    expect(screen.getByText('Alder er påkrævet')).toBeInTheDocument();
    expect(screen.getByText('Familietitel er påkrævet')).toBeInTheDocument();
    expect(screen.getByText('Vælg om du har en partner')).toBeInTheDocument();

    vi.doUnmock('@inertiajs/react');
  });
});
