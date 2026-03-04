import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../utils/colors";

const JobCard = ({ job, onPress }) => {
  if (!job) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.thumbnail} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{job.badgeText}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {job.title}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {job.companyName}
        </Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>
            {job.locationText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    padding: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.grayLight,
    marginBottom: 8,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#E0EAFF",
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "600",
  },
  info: {
    marginTop: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default JobCard;

