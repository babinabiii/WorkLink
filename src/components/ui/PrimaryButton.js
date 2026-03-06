import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

const PrimaryButton = ({ label, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PrimaryButton;

