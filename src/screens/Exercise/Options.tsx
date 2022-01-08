import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../utils';

type OptionsProps = {
  text: string;
  isSelected: boolean;
  disabled: boolean;
  onTap: () => void;
};

const Option = ({text, isSelected, disabled, onTap}: OptionsProps) => {
  const selectedStyles = [
    {opacity: isSelected ? 0.3 : 1},
    {opacity: isSelected ? 0 : 1},
  ];

  return (
    <View style={selectedStyles[0]}>
      <TouchableOpacity
        disabled={disabled}
        style={optionStyles.option}
        onPress={onTap}>
        <Text style={[optionStyles.text, selectedStyles[1]]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const optionStyles = StyleSheet.create({
  option: {
    display: 'flex',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    backgroundColor: colors.white,
  },
  text: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default Option;
