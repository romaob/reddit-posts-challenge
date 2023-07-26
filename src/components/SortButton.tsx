import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

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
      style={{
        ...styles.touchable,
        ...(active ? styles.touchableActive : {}),
      }}
      onPress={onPress}
      disabled={active}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    minWidth: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00F',
    padding: 5,
    borderRadius: 10,
  },
  touchableActive: {
    backgroundColor: '#F00',
  },
  label: {
    color: 'white',
    fontSize: 18,
  },
});
