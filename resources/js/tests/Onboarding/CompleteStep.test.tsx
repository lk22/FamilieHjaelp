import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import CompleteStep from '@/pages/home/onboarding/family/steps/CompleteStep';
import { type KidsStepData, type ParentStepData } from '@/types/onboarding';

const translate = (key: string) => key;
const prefix = 'app.getting_started.confirmation_step';

const parentWithoutPartner: ParentStepData = {
  firstName: 'Anna',
  middleName: '',
  lastName: 'Nielsen',
  age: '34',
  familyTitle: 'Mor',
  parentEmail: 'anna@example.com',
  hasPartner: false,
  partnerNeedsUser: false,
};

const parentWithPartner: ParentStepData = {
  ...parentWithoutPartner,
  hasPartner: true,
  partnerFirstName: 'Bo',
  partnerMiddleName: '',
  partnerLastName: 'Jensen',
  partnerAge: '36',
  partnerFamilyTitle: 'Far',
};

const noKids: KidsStepData = { kids: [] };

const twoKids: KidsStepData = {
  kids: [
    {
      gender: 'female',
      firstName: 'Ida',
      middleName: '',
      lastName: 'Nielsen',
      ageYears: '4',
      ageMonths: '2',
      ageWeeks: '1',
      needsUserLogin: false,
      userEmail: '',
    },
    {
      gender: 'male',
      firstName: 'Emil',
      middleName: '',
      lastName: 'Nielsen',
      ageYears: '1',
      ageMonths: '6',
      ageWeeks: '0',
      needsUserLogin: false,
      userEmail: '',
    },
  ],
};

function renderStep(overrides: Partial<React.ComponentProps<typeof CompleteStep>> = {}) {
  return render(
    <CompleteStep
      token="session-token"
      familyName="Hansen"
      parentData={parentWithoutPartner}
      kidsData={noKids}
      translate={translate}
      locale="da"
      {...overrides}
    />,
  );
}

describe('CompleteStep', () => {
  let routeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    routeSpy = vi.fn((name: string) => `/${name}`);
    vi.stubGlobal('route', routeSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('renders the family name, onboarder and partner summary', () => {
    renderStep();

    expect(screen.getByText(`${prefix}.heading`)).toBeInTheDocument();
    expect(screen.getByText('Hansen')).toBeInTheDocument();
    expect(screen.getByText(/Anna.*Nielsen.*\(Mor\)/)).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getByText(`${prefix}.has_partner_no`)).toBeInTheDocument();
  });

  test('does not render partner details when the family has no partner', () => {
    renderStep();

    expect(screen.queryByText(`${prefix}.partner_name_label:`)).not.toBeInTheDocument();
  });

  test('renders partner details when the family has a partner', () => {
    renderStep({ parentData: parentWithPartner });

    expect(screen.getByText(`${prefix}.has_partner_yes`)).toBeInTheDocument();
    expect(screen.getByText(`${prefix}.partner_name_label:`)).toBeInTheDocument();
    expect(screen.getByText('Bo Jensen')).toBeInTheDocument();
    expect(screen.getByText('36')).toBeInTheDocument();
  });

  test('renders the kid count and each kid summary', () => {
    renderStep({ kidsData: twoKids });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Ida Nielsen')).toBeInTheDocument();
    expect(screen.getByText(/\(female\)/)).toBeInTheDocument();
    expect(screen.getByText('Emil Nielsen')).toBeInTheDocument();
    expect(screen.getByText(/\(male\)/)).toBeInTheDocument();
  });

  test('renders a zero kid count when there are no kids', () => {
    renderStep();

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('falls back to empty strings when optional parent fields are missing', () => {
    const parentWithMissingFields = {
      ...parentWithoutPartner,
      firstName: undefined as unknown as string,
      lastName: undefined as unknown as string,
      familyTitle: undefined as unknown as string,
    } as ParentStepData;

    renderStep({ parentData: parentWithMissingFields });

    expect(screen.getByText(`${prefix}.onboarder_name_label:`)).toBeInTheDocument();
  });

  test('enables the submit button when a session token is present', () => {
    renderStep();

    expect(screen.getByRole('button', { name: 'app.complete_onboarding' })).toBeEnabled();
    expect(screen.queryByText('app.session_missing')).not.toBeInTheDocument();
  });

  test('disables the submit button and shows a warning when the session token is missing', () => {
    renderStep({ token: null });

    expect(screen.getByRole('button', { name: 'app.complete_onboarding' })).toBeDisabled();
    expect(screen.getByText('app.session_missing')).toBeInTheDocument();
  });

  test('links back to the kids step', () => {
    renderStep();

    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step', { scenario: 'family', step: 'three' });
    expect(screen.getByRole('link', { name: 'app.back' })).toHaveAttribute('href', '/onboarding.scenario.step');
  });

  test('submits the form and requests the onboarding.completed route', () => {
    renderStep();

    fireEvent.click(screen.getByRole('button', { name: 'app.complete_onboarding' }));

    expect(routeSpy).toHaveBeenCalledWith('onboarding.completed');
  });
});
