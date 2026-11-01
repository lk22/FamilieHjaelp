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

const translate = (key: string) => key;
const prefix = 'app.getting_started.parent_step';
const label = (name: string) => `${prefix}.${name}`;

const baseData: ParentStepData = {
  firstName: '',
  middleName: '',
  lastName: '',
  age: '',
  familyTitle: '',
  parentEmail: '',
  hasPartner: false,
  partnerFirstName: '',
  partnerMiddleName: '',
  partnerLastName: '',
  partnerAge: '',
  partnerFamilyTitle: '',
  partnerNeedsUser: false,
  partnerUserName: '',
  partnerUserEmail: '',
};

const partnerData: ParentStepData = {
  ...baseData,
  hasPartner: true,
  partnerFirstName: 'Bo',
  partnerLastName: 'Hansen',
  partnerAge: '36',
  partnerFamilyTitle: 'Far',
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
    render(
      <ParentStep
        defaultData={{ ...baseData, firstName: 'Anna', lastName: 'Hansen', age: '34', familyTitle: 'Mor' }}
        translate={translate}
      />,
    );

    expect(screen.getByLabelText(label('firstname_label'))).toHaveValue('Anna');
    expect(screen.getByLabelText(label('last_name_label'))).toHaveValue('Hansen');
    expect(screen.getByLabelText(label('age_label'))).toHaveValue('34');
    expect(screen.getByLabelText(label('family_title_label'))).toHaveValue('Mor');
  });

  test('typing into a field updates its value', () => {
    render(<ParentStep defaultData={baseData} translate={translate} />);

    const firstNameInput = screen.getByLabelText(label('firstname_label'));
    fireEvent.change(firstNameInput, { target: { value: 'Bo' } });

    expect(firstNameInput).toHaveValue('Bo');
  });

  test('does not render the partner section when the family has no partner by default', () => {
    render(<ParentStep defaultData={baseData} translate={translate} />);

    expect(screen.queryByText('Partner information')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: label('has_partner_no') })).toBeInTheDocument();
  });

  test('shows the partner section when clicking yes', () => {
    render(<ParentStep defaultData={baseData} translate={translate} />);

    fireEvent.click(screen.getByRole('button', { name: label('has_partner_yes') }));

    expect(screen.getByText('Partner information')).toBeInTheDocument();
    expect(screen.getByLabelText(label('partner_first_name_label'))).toHaveValue('');
  });

  test('renders pre-filled partner fields when the default data already has a partner', () => {
    render(<ParentStep defaultData={partnerData} translate={translate} />);

    expect(screen.getByLabelText(label('partner_first_name_label'))).toHaveValue('Bo');
    expect(screen.getByLabelText(label('partner_last_name_label'))).toHaveValue('Hansen');
    expect(screen.getByLabelText(label('partner_age_label'))).toHaveValue('36');
    expect(screen.getByLabelText(label('partner_family_title_label'))).toHaveValue('Far');
  });

  test('clicking no hides the partner section and clears the partner fields', () => {
    render(<ParentStep defaultData={partnerData} translate={translate} />);

    fireEvent.click(screen.getByRole('button', { name: label('has_partner_no') }));

    expect(screen.queryByText('Partner information')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: label('has_partner_yes') }));

    expect(screen.getByLabelText(label('partner_first_name_label'))).toHaveValue('');
    expect(screen.getByLabelText(label('partner_age_label'))).toHaveValue('');
    expect(screen.getByLabelText(label('partner_family_title_label'))).toHaveValue('');
  });

  test('does not render the partner email field when the partner does not need a user by default', () => {
    render(<ParentStep defaultData={{ ...partnerData }} translate={translate} />);

    expect(screen.queryByLabelText(label('partner_email_label'))).not.toBeInTheDocument();
  });

  test('shows the partner email field when the partner needs a user', () => {
    render(<ParentStep defaultData={partnerData} translate={translate} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Ja' })[0]);

    expect(screen.getByLabelText(label('partner_email_label'))).toBeInTheDocument();
  });

  test('clicking no under the partner user question hides and clears the partner email', () => {
    render(
      <ParentStep
        defaultData={{ ...partnerData, partnerNeedsUser: true, partnerUserEmail: 'bo@example.com' }}
        translate={translate}
      />,
    );

    expect(screen.getByLabelText(label('partner_email_label'))).toHaveValue('bo@example.com');

    fireEvent.click(screen.getByRole('button', { name: 'Nej' }));

    expect(screen.queryByLabelText(label('partner_email_label'))).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Ja' }));

    expect(screen.getByLabelText(label('partner_email_label'))).toHaveValue('');
  });

  test('links back to the family name step', () => {
    render(<ParentStep defaultData={baseData} translate={translate} />);

    expect(screen.getByRole('link', { name: label('previous_step_label') })).toHaveAttribute('href', '/onboarding.scenario.step');
    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step', { scenario: 'family', step: 'one' });
  });

  test('submits the form and requests the next step route', () => {
    render(<ParentStep defaultData={baseData} translate={translate} />);

    fireEvent.click(screen.getByRole('button', { name: label('next_step_label') }));

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
          'data.firstName': 'Fornavn er påkrævet',
          'data.age': 'Alder er påkrævet',
          'data.familyTitle': 'Familietitel er påkrævet',
          'data.hasPartner': 'Vælg om du har en partner',
        }),
      };
    });

    const { default: ParentStepWithErrors } = await import('@/pages/home/onboarding/family/steps/ParentStep');

    render(<ParentStepWithErrors defaultData={baseData} translate={translate} />);

    expect(screen.getByText('Fornavn er påkrævet')).toBeInTheDocument();
    expect(screen.getAllByText('Alder er påkrævet').length).toBeGreaterThan(0);
    expect(screen.getByText('Familietitel er påkrævet')).toBeInTheDocument();
    expect(screen.getByText('Vælg om du har en partner')).toBeInTheDocument();

    vi.doUnmock('@inertiajs/react');
  });
});
