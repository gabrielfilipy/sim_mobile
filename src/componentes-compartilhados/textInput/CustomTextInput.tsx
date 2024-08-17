import React from "react";
import { StyleSheet, TextInput as RNTextInput, TextInputProps } from "react-native";

interface CustomTextInputProps extends TextInputProps {
}

export function CustomTextInput(props: CustomTextInputProps) {
  return (
    <RNTextInput
      placeholderTextColor="#727272"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderColor: '#1D013F',
    paddingHorizontal: 8,
    color: '#000',
    borderWidth: 1,
    width: '95%',
    height: 50,
    marginBottom: 16,
  },
});
