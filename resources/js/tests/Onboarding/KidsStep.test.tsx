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

import KidsStep from '@/pages/home/onboarding/family/steps/KidsStep';
import { type KidsStepData } from '@/types/onboarding';

const oneKid: KidsStepData = {
  kids: [{ gender: 'female', name: 'Ida', ageYears: '4', ageMonths: '2', ageWeeks: '1' }],
};

const twoKids: KidsStepData = {
  kids: [
    { gender: 'female', name: 'Ida', ageYears: '4', ageMonths: '2', ageWeeks: '1' },
    { gender: 'male', name: 'Emil', ageYears: '1', ageMonths: '6', ageWeeks: '0' },
  ],
};

describe('KidsStep', () => {
  let routeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    routeSpy = vi.fn((name: string) => `/${name}`);
    vi.stubGlobal('route', routeSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('renders a single empty kid by default when there is no default data', () => {
    render(<KidsStep defaultData={{ kids: [] }} />);

    expect(screen.getByText('Barn 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Navn')).toHaveValue('');
    expect(screen.getByLabelText('Køn')).toHaveValue('female');
  });

  test('renders each default kid pre-filled with its data', () => {
    render(<KidsStep defaultData={twoKids} />);

    expect(screen.getByText('Ida')).toBeInTheDocument();
    expect(screen.getByText('Emil')).toBeInTheDocument();

    const nameInputs = screen.getAllByLabelText('Navn');
    expect(nameInputs[0]).toHaveValue('Ida');
    expect(nameInputs[1]).toHaveValue('Emil');

    const genderSelects = screen.getAllByLabelText('Køn');
    expect(genderSelects[0]).toHaveValue('female');
    expect(genderSelects[1]).toHaveValue('male');

    expect(screen.getAllByLabelText('Alder (år)')[1]).toHaveValue(1);
    expect(screen.getAllByLabelText('Alder (måneder)')[1]).toHaveValue(6);
  });

  test('falls back to an empty string for missing kid age fields', () => {
    render(
      <KidsStep
        defaultData={{
          kids: [{ gender: 'other', name: 'Alex', ageYears: undefined as unknown as string, ageMonths: '0', ageWeeks: '0' }],
        }}
      />,
    );

    expect(screen.getByLabelText('Alder (år)')).toHaveValue(null);
  });

  test('typing into a kid field updates its value', () => {
    render(<KidsStep defaultData={oneKid} />);

    const nameInput = screen.getByLabelText('Navn');
    fireEvent.change(nameInput, { target: { value: 'Ida Marie' } });

    expect(nameInput).toHaveValue('Ida Marie');
    expect(screen.getByText('Ida Marie')).toBeInTheDocument();
  });

  test('changing the gender select updates its value', () => {
    render(<KidsStep defaultData={oneKid} />);

    fireEvent.change(screen.getByLabelText('Køn'), { target: { value: 'other' } });

    expect(screen.getByLabelText('Køn')).toHaveValue('other');
  });

  test('shows a placeholder label for a kid with no name yet', () => {
    render(<KidsStep defaultData={{ kids: [] }} />);

    expect(screen.getByText('Barn 1')).toBeInTheDocument();
  });

  test('adding a kid appends a new, expanded entry', () => {
    render(<KidsStep defaultData={oneKid} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tilføj barn' }));

    expect(screen.getByText('Barn 2')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Navn')).toHaveLength(2);
  });

  test('the remove button is disabled when only one kid remains', () => {
    render(<KidsStep defaultData={oneKid} />);

    expect(screen.getByRole('button', { name: 'Fjern barn 1' })).toBeDisabled();
  });

  test('removing a kid removes it from the list', () => {
    render(<KidsStep defaultData={twoKids} />);

    fireEvent.click(screen.getByRole('button', { name: 'Fjern barn 1' }));

    expect(screen.queryByText('Ida')).not.toBeInTheDocument();
    expect(screen.getByText('Emil')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Navn')).toHaveLength(1);
  });

  test('clicking a kid summary toggles its accordion open state', () => {
    render(<KidsStep defaultData={twoKids} />);

    const detailsElements = document.querySelectorAll('details');
    expect(detailsElements[0].open).toBe(true);
    expect(detailsElements[1].open).toBe(false);

    fireEvent.click(screen.getByText('Emil'));

    expect(detailsElements[1].open).toBe(true);
  });

  test('displays a general kids validation error', async () => {
    vi.resetModules();
    vi.doMock('@inertiajs/react', async () => {
      const actual = await vi.importActual('@inertiajs/react');
      return {
        ...actual,
        useForm: createStatefulUseForm({ 'data.kids': 'Tilføj mindst et barn' }),
      };
    });

    const { default: KidsStepWithErrors } = await import('@/pages/home/onboarding/family/steps/KidsStep');

    render(<KidsStepWithErrors defaultData={{ kids: [] }} />);

    expect(screen.getByText('Tilføj mindst et barn')).toBeInTheDocument();

    vi.doUnmock('@inertiajs/react');
  });

  test('displays per-field kid validation errors', async () => {
    vi.resetModules();
    vi.doMock('@inertiajs/react', async () => {
      const actual = await vi.importActual('@inertiajs/react');
      return {
        ...actual,
        useForm: createStatefulUseForm({ 'data.kids.0.name': 'Navn er påkrævet' }),
      };
    });

    const { default: KidsStepWithErrors } = await import('@/pages/home/onboarding/family/steps/KidsStep');

    render(<KidsStepWithErrors defaultData={oneKid} />);

    expect(screen.getByText('Navn er påkrævet')).toBeInTheDocument();

    vi.doUnmock('@inertiajs/react');
  });

  test('links back to the parent step', () => {
    render(<KidsStep defaultData={oneKid} />);

    expect(screen.getByRole('link', { name: 'Tilbage' })).toHaveAttribute('href', '/onboarding.scenario.step');
    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step', { scenario: 'family', step: 'two' });
  });

  test('submits the form and requests the complete step route', () => {
    render(<KidsStep defaultData={oneKid} />);

    fireEvent.click(screen.getByRole('button', { name: 'Gennemse svar' }));

    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step.submit', { scenario: 'family', step: 'three', nextStep: 'complete' });
  });
});
