import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";
import PrimaryButton from "../ui/PrimaryButton";

const AICard = ({ onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.sparkle}>✨</Text>
        <Text style={styles.title}>Career Coach AI</Text>
      </View>
      <Text style={styles.body}>
        “Updating your skills section with 'React Native' could increase your
        profile views by 40% based on recent job trends”
      </Text>
      <View style={styles.buttonWrapper}>
        <PrimaryButton label="Ask AI" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: "#E5F0FF",
    padding: 16,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sparkle: {
    fontSize: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  body: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  buttonWrapper: {
    alignSelf: "stretch",
  },
});

export default AICard;

