import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../values/colors';
import font from '../values/font';

export interface SortButtonProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

export default function SortButton({
  label,
  active,
  onPress,
}: SortButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      testID="sort-button-component"
      style={{
        ...styles.touchable,
        ...(active ? styles.touchableActive : {}),
      }}
      onPress={onPress}
      disabled={active}>
      <Text testID="sort-button-label" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    minWidth: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 10,
  },
  touchableActive: {
    backgroundColor: colors.secondary,
  },
  label: {
    color: 'white',
    fontSize: font.large,
  },
});
