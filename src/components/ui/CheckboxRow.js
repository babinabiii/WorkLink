import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

const CheckboxRow = ({ checked, onToggle }) => {
  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.8}
      onPress={onToggle}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked ? <View style={styles.checkboxInner} /> : null}
      </View>
      <Text style={styles.text}>
        Remember this device. <Text style={styles.link}>Learn more</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: COLORS.background,
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
  },
});

export default CheckboxRow;

