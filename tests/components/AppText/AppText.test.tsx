import React from 'react';
import { render } from '@testing-library/react-native';

import AppText from '../../../src/components/AppText';

describe('AppText', () => {
  it('renders the provided text content', () => {
    const { getByText } = render(<AppText>Recipe App</AppText>);

    expect(getByText('Recipe App')).toBeTruthy();
  });
});
