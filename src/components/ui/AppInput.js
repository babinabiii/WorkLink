import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../utils/colors";

const AppInput = ({
  label,
  secureTextEntry,
  containerStyle,
  ...textInputProps
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const showToggle = secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={isSecure}
          {...textInputProps}
        />
        {showToggle && (
          <TouchableOpacity onPress={toggleSecure} style={styles.eyeButton}>
            <Text style={styles.eyeText}>{isSecure ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  eyeButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  eyeText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
});

export default AppInput;

