import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

const UploadBox = ({
  label,
  primaryText,
  secondaryText,
  value,
  onChange,
}) => {
  const handlePress = () => {
    if (onChange) {
      // Placeholder: set a dummy file name to simulate upload selection
      onChange("uploaded-id.png");
    }
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.box}
        onPress={handlePress}
      >
        <Text style={styles.primaryText}>{primaryText}</Text>
        <Text style={styles.secondaryText}>{secondaryText}</Text>
        {value ? <Text style={styles.fileText}>{value}</Text> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 8,
  },
  box: {
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
    textAlign: "center",
  },
  secondaryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  fileText: {
    marginTop: 12,
    fontSize: 13,
    color: COLORS.primary,
  },
});

export default UploadBox;

