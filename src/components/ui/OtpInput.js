import React, { useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

const CODE_LENGTH = 6;

const OtpInput = ({ value, onChange }) => {
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (text, index) => {
    const clean = text.replace(/[^0-9]/g, "");
    if (!clean) {
      updateCodeAtIndex("", index);
      return;
    }

    const char = clean[0];
    updateCodeAtIndex(char, index, true);
  };

  const updateCodeAtIndex = (char, index, moveNext = false) => {
    const codeArray = (value || "").split("");
    codeArray[index] = char;
    const newCode = codeArray.join("").slice(0, CODE_LENGTH);
    onChange?.(newCode);

    if (moveNext && index < CODE_LENGTH - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace") {
      if (!getCharAtIndex(index) && index > 0 && inputsRef.current[index - 1]) {
        inputsRef.current[index - 1].focus();
        updateCodeAtIndex("", index - 1);
      } else {
        updateCodeAtIndex("", index);
      }
    }
  };

  const getCharAtIndex = (index) => {
    const codeArray = (value || "").split("");
    return codeArray[index] || "";
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: CODE_LENGTH }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputsRef.current[index] = ref;
          }}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={getCharAtIndex(index)}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  input: {
    width: 44,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    fontSize: 18,
    color: COLORS.text,
  },
});

export default OtpInput;

