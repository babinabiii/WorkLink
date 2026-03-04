import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import COLORS from "../../../src/utils/colors";
import { getJobPosts } from "../../../src/firebase/jobService";

export default function JobDetailScreen() {
  const { jobId } = useLocalSearchParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      const jobs = await getJobPosts();
      const found = jobs.find((j) => j.id === jobId);
      setJob(found || null);
    };
    loadJob();
  }, [jobId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {job ? (
          <>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.company}>{job.companyName}</Text>
            <Text style={styles.location}>{job.locationText}</Text>
            <Text style={styles.badge}>{job.badgeText}</Text>
            <Text style={styles.body}>
              This is a placeholder job detail page. Later you can load full job
              descriptions from Firestore using the job ID.
            </Text>
          </>
        ) : (
          <Text style={styles.body}>Job not found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  badge: {
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: 16,
  },
  body: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});

