import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import FamilyNameStep from '@/pages/home/onboarding/family/steps/FamilyNameStep';

describe('FamilyNameStep', () => {
  test('renders family name step form', () => {
    const familyName = 'TestFamily';
    const translate = (key: string) =>
      ({
        'app.getting_started.family_name.form_field.label': 'Familienavn',
      })[key] ?? key;

    render(<FamilyNameStep defaultFamilyName={familyName} translate={translate} />);

    expect(screen.getByLabelText('Familienavn')).toBeInTheDocument();
    expect(screen.getByTestId('family-name-input')).toBeInTheDocument();
  });
});