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
import { type Kid, type KidsStepData } from '@/types/onboarding';

const translate = (key: string) => key;
const prefix = 'app.getting_started.kids_step';
const label = (name: string) => `${prefix}.${name}`;

const ida: Kid = {
  gender: 'female',
  firstName: 'Ida',
  middleName: '',
  lastName: '',
  ageYears: '4',
  ageMonths: '2',
  ageWeeks: '1',
  needsUserLogin: false,
  userEmail: '',
};

const emil: Kid = {
  gender: 'male',
  firstName: 'Emil',
  middleName: '',
  lastName: '',
  ageYears: '1',
  ageMonths: '6',
  ageWeeks: '0',
  needsUserLogin: false,
  userEmail: '',
};

const oneKid: KidsStepData = { kids: [ida] };
const twoKids: KidsStepData = { kids: [ida, emil] };

function renderStep(defaultData: KidsStepData) {
  return render(<KidsStep defaultData={defaultData} translate={translate} locale="da" />);
}

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
    renderStep({ kids: [] });

    expect(screen.getByText('Antal børn: 1')).toBeInTheDocument();
    expect(screen.getByLabelText(label('child_firstname_label'))).toHaveValue('');
    expect(screen.getByLabelText(label('child_gender_label'))).toHaveValue('female');
  });

  test('renders each default kid pre-filled with its data', () => {
    renderStep(twoKids);

    expect(screen.getByText(/Ida/)).toBeInTheDocument();
    expect(screen.getByText(/Emil/)).toBeInTheDocument();

    const firstNameInputs = screen.getAllByLabelText(label('child_firstname_label'));
    expect(firstNameInputs[0]).toHaveValue('Ida');
    expect(firstNameInputs[1]).toHaveValue('Emil');

    const genderSelects = screen.getAllByLabelText(label('child_gender_label'));
    expect(genderSelects[0]).toHaveValue('female');
    expect(genderSelects[1]).toHaveValue('male');

    expect(screen.getAllByLabelText(label('child_age_label_years'))[1]).toHaveValue(1);
    expect(screen.getAllByLabelText(label('child_age_label_months'))[1]).toHaveValue(6);
  });

  test('falls back to an empty string for missing kid age fields', () => {
    renderStep({
      kids: [{ ...ida, gender: 'other', firstName: 'Alex', ageYears: undefined as unknown as string, ageMonths: '0', ageWeeks: '0' }],
    });

    expect(screen.getByLabelText(label('child_age_label_years'))).toHaveValue(null);
  });

  test('typing into a kid field updates its value and summary', () => {
    renderStep(oneKid);

    const firstNameInput = screen.getByLabelText(label('child_firstname_label'));
    fireEvent.change(firstNameInput, { target: { value: 'Ida Marie' } });

    expect(firstNameInput).toHaveValue('Ida Marie');
    expect(screen.getByText(/Ida Marie/)).toBeInTheDocument();
  });

  test('changing the gender select updates its value', () => {
    renderStep(oneKid);

    fireEvent.change(screen.getByLabelText(label('child_gender_label')), { target: { value: 'other' } });

    expect(screen.getByLabelText(label('child_gender_label'))).toHaveValue('other');
  });

  test('shows only the gender in the summary for a kid with no name yet', () => {
    renderStep({ kids: [] });

    expect(screen.getByText('Pige - -')).toBeInTheDocument();
  });

  test('adding a kid appends a new entry', () => {
    renderStep(oneKid);

    fireEvent.click(screen.getByRole('button', { name: label('add_child_button_label') }));

    expect(screen.getByText('Antal børn: 2')).toBeInTheDocument();
    expect(screen.getAllByLabelText(label('child_firstname_label'))).toHaveLength(2);
  });

  test('the remove button is disabled when only one kid remains', () => {
    renderStep(oneKid);

    expect(screen.getByRole('button', { name: 'Fjern barn 1' })).toBeDisabled();
  });

  test('removing a kid removes it from the list', () => {
    renderStep(twoKids);

    fireEvent.click(screen.getByRole('button', { name: 'Fjern barn 1' }));

    expect(screen.queryByText(/Ida/)).not.toBeInTheDocument();
    expect(screen.getByText(/Emil/)).toBeInTheDocument();
    expect(screen.getAllByLabelText(label('child_firstname_label'))).toHaveLength(1);
  });

  test('clicking a kid summary toggles its accordion open state', () => {
    renderStep(twoKids);

    const detailsElements = document.querySelectorAll('details');
    expect(detailsElements[0].open).toBe(true);
    expect(detailsElements[1].open).toBe(false);

    fireEvent.click(screen.getByText(/Emil/));

    expect(detailsElements[1].open).toBe(true);
  });

  test('shows the email field only for kids aged 15 or older who need a login', () => {
    renderStep({ kids: [{ ...ida, ageYears: '16' }] });

    expect(screen.queryByLabelText(label('child_user_email_label'))).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(label('child_needs_user_login_label')));

    expect(screen.getByLabelText(label('child_user_email_label'))).toBeInTheDocument();
  });

  test('does not offer a login to kids younger than 15', () => {
    renderStep(oneKid);

    expect(screen.queryByLabelText(label('child_needs_user_login_label'))).not.toBeInTheDocument();
  });

  test('displays per-field kid validation errors', async () => {
    vi.resetModules();
    vi.doMock('@inertiajs/react', async () => {
      const actual = await vi.importActual('@inertiajs/react');
      return {
        ...actual,
        useForm: createStatefulUseForm({ 'data.kids.0.firstName': 'Fornavn er påkrævet' }),
      };
    });

    const { default: KidsStepWithErrors } = await import('@/pages/home/onboarding/family/steps/KidsStep');

    render(<KidsStepWithErrors defaultData={oneKid} translate={translate} locale="da" />);

    expect(screen.getByText('Fornavn er påkrævet')).toBeInTheDocument();

    vi.doUnmock('@inertiajs/react');
  });

  test('links back to the parent step', () => {
    renderStep(oneKid);

    expect(screen.getByRole('link', { name: label('previous_step_label') })).toHaveAttribute('href', '/onboarding.scenario.step');
    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step', { scenario: 'family', step: 'two' });
  });

  test('submits the form and requests the complete step route', () => {
    renderStep(oneKid);

    fireEvent.click(screen.getByRole('button', { name: label('next_step_label') }));

    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step.submit', { scenario: 'family', step: 'three', nextStep: 'complete' });
  });
});
