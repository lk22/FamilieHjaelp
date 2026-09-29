import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import CompleteStep from '@/pages/home/onboarding/family/steps/CompleteStep';
import { type KidsStepData, type ParentStepData } from '@/types/onboarding';

const parentWithoutPartner: ParentStepData = {
  name: 'Anna Hansen',
  age: '34',
  familyTitle: 'Mor',
  hasPartner: false,
  partnerNeedsUser: false,
};

const parentWithPartner: ParentStepData = {
  name: 'Anna Hansen',
  age: '34',
  familyTitle: 'Mor',
  hasPartner: true,
  partnerName: 'Bo Hansen',
  partnerAge: '36',
  partnerFamilyTitle: 'Far',
  partnerNeedsUser: false,
};

const noKids: KidsStepData = { kids: [] };

const twoKids: KidsStepData = {
  kids: [
    { gender: 'female', name: 'Ida', ageYears: '4', ageMonths: '2', ageWeeks: '1' },
    { gender: 'male', name: 'Emil', ageYears: '1', ageMonths: '6', ageWeeks: '0' },
  ],
};

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
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    expect(screen.getByText('Bekræft familien')).toBeInTheDocument();
    expect(screen.getByText('Hansen')).toBeInTheDocument();
    expect(screen.getByText(/Anna Hansen/)).toBeInTheDocument();
    expect(screen.getByText(/Mor/)).toBeInTheDocument();
    expect(screen.getByText('Nej')).toBeInTheDocument();
  });

  test('does not render partner name when the family has no partner', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    expect(screen.queryByText('Partner navn:')).not.toBeInTheDocument();
  });

  test('renders partner name when the family has a partner', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithPartner} kidsData={noKids} />);

    expect(screen.getByText('Ja')).toBeInTheDocument();
    expect(screen.getByText('Partner navn:')).toBeInTheDocument();
    expect(screen.getByText('Bo Hansen')).toBeInTheDocument();
  });

  test('renders the kid count and each kid summary', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={twoKids} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(/Ida/)).toBeInTheDocument();
    expect(screen.getByText(/\(female\)/)).toBeInTheDocument();
    expect(screen.getByText(/Emil/)).toBeInTheDocument();
    expect(screen.getByText(/\(male\)/)).toBeInTheDocument();
  });

  test('renders a zero kid count when there are no kids', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('falls back to empty strings when optional parent fields are missing', () => {
    const parentWithMissingFields = {
      name: undefined as unknown as string,
      age: '34',
      familyTitle: undefined as unknown as string,
      hasPartner: false,
      partnerNeedsUser: false,
    } as ParentStepData;

    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithMissingFields} kidsData={noKids} />);

    expect(screen.getByText(/Onboarder:/)).toBeInTheDocument();
  });

  test('enables the submit button when a session token is present', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    expect(screen.getByRole('button', { name: 'Fuldfør onboarding' })).toBeEnabled();
    expect(screen.queryByText('Sessionen mangler. Start onboarding forfra for at fuldføre.')).not.toBeInTheDocument();
  });

  test('disables the submit button and shows a warning when the session token is missing', () => {
    render(<CompleteStep token={null} familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    expect(screen.getByRole('button', { name: 'Fuldfør onboarding' })).toBeDisabled();
    expect(screen.getByText('Sessionen mangler. Start onboarding forfra for at fuldføre.')).toBeInTheDocument();
  });

  test('links back to the kids step', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    expect(routeSpy).toHaveBeenCalledWith('onboarding.scenario.step', { scenario: 'family', step: 'three' });
    expect(screen.getByRole('link', { name: 'Tilbage' })).toHaveAttribute('href', '/onboarding.scenario.step');
  });

  test('submits the form and requests the onboarding.completed route', () => {
    render(<CompleteStep token="session-token" familyName="Hansen" parentData={parentWithoutPartner} kidsData={noKids} />);

    fireEvent.click(screen.getByRole('button', { name: 'Fuldfør onboarding' }));

    expect(routeSpy).toHaveBeenCalledWith('onboarding.completed');
  });
});
