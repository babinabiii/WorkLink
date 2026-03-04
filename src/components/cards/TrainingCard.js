import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../utils/colors";
import PrimaryButton from "../ui/PrimaryButton";

const TrainingCard = ({ title, description, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>📘</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: COLORS.background,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.grayLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  startButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E0EAFF",
  },
  startText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

export default TrainingCard;

