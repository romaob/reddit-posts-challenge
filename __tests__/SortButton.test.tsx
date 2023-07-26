import React from 'react';
import SortButton from '../src/components/SortButton';

import {fireEvent, render} from '@testing-library/react-native';
import colors from '../src/values/colors';

const TEST_LABEL = 'Test Label';
const TEST_ON_PRESS = jest.fn();

describe('Testing the SortButton Component', () => {
  it('should render correctly', () => {
    const rendered = render(
      <SortButton label={TEST_LABEL} onPress={TEST_ON_PRESS} />,
    );

    expect(rendered).toBeDefined();
    expect(rendered.getByTestId('sort-button-component')).toBeDefined();
    expect(rendered.getByTestId('sort-button-label')).toBeDefined();
    expect(rendered.getByTestId('sort-button-label').props.children).toBe(
      TEST_LABEL,
    );
    const {backgroundColor} = rendered.getByTestId('sort-button-component')
      .props.style;
    expect(backgroundColor).toBe(colors.primary);
  });

  it('should render correctly when active', () => {
    const rendered = render(
      <SortButton label={TEST_LABEL} active onPress={TEST_ON_PRESS} />,
    );

    expect(rendered).toBeDefined();
    expect(rendered.getByTestId('sort-button-component')).toBeDefined();
    expect(rendered.getByTestId('sort-button-label')).toBeDefined();
    expect(rendered.getByTestId('sort-button-label').props.children).toBe(
      TEST_LABEL,
    );
    const {backgroundColor} = rendered.getByTestId('sort-button-component')
      .props.style;
    expect(backgroundColor).toBe(colors.secondary);
  });

  it('should call the onPress function when pressed', () => {
    const rendered = render(
      <SortButton label={TEST_LABEL} onPress={TEST_ON_PRESS} />,
    );

    fireEvent.press(rendered.getByTestId('sort-button-component'));
    expect(TEST_ON_PRESS).toHaveBeenCalled();
  });
});
