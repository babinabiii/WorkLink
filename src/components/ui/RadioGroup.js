import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

const RadioGroup = ({ options, selected, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        const isSelected = selected === value;

        return (
          <TouchableOpacity
            key={value}
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => onChange?.(value)}
          >
            <View style={[styles.outerCircle, isSelected && styles.outerCircleActive]}>
              {isSelected && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  outerCircleActive: {
    borderColor: COLORS.primary,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
  },
});

export default RadioGroup;

