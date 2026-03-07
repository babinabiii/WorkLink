import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getJobPosts } from "../../../src/firebase/jobService";
import COLORS from "../../../src/utils/colors";

export default function JobsIndexScreen() {
  const { jobId } = useLocalSearchParams();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await getJobPosts();
      setJobs(data || []);
    };
    loadJobs();
  }, []);

  // open job automatically if jobId is passed
  useEffect(() => {
    if (jobId && jobs.length > 0) {
      const found = jobs.find((j) => j.id === jobId);
      if (found) {
        setSelectedJob(found);
      }
    }
  }, [jobId, jobs]);

  const handleApply = () => {
    alert("Application sent successfully!");
  };

  const goBack = () => {
    setSelectedJob(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* JOB LIST */}
        {!selectedJob && (
          <>
            <Text style={styles.title}>Job Listing</Text>

            <TextInput
              placeholder="Search job title or company..."
              style={styles.search}
            />

            {jobs.map((job) => (
              <TouchableOpacity
                key={job.id}
                style={styles.card}
                onPress={() => setSelectedJob(job)}
              >
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.company}>{job.companyName}</Text>
                <Text style={styles.location}>{job.locationText}</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{job.badgeText}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* JOB DETAIL VIEW */}
        {selectedJob && (
          <>
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.back}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.detailTitle}>{selectedJob.title}</Text>
            <Text style={styles.company}>{selectedJob.companyName}</Text>

            <Text style={styles.salary}>Salary $120k - $160k</Text>

            <Text style={styles.section}>Description</Text>
            <Text style={styles.body}>
              {selectedJob.description ||
                "We are looking for a talented designer to help build the future of our product."}
            </Text>

            <Text style={styles.section}>Responsibilities</Text>
            <Text style={styles.body}>
              • Lead end-to-end design projects{"\n"}• Collaborate with product
              managers{"\n"}• Conduct usability testing{"\n"}• Mentor junior
              designers
            </Text>

            <Text style={styles.section}>Requirements</Text>
            <Text style={styles.body}>
              • 5+ years product design experience{"\n"}• Strong portfolio{"\n"}
              • Proficiency in Figma{"\n"}• Excellent communication skills
            </Text>

            <View style={styles.accessibilityBox}>
              <Text style={styles.accessibilityTitle}>
                Accessibility & Accommodations
              </Text>

              <Text style={styles.accessibilityItem}>
                ✓ Screen reader compatible tools
              </Text>
              <Text style={styles.accessibilityItem}>
                ✓ Flexible work hours
              </Text>
              <Text style={styles.accessibilityItem}>
                ✓ Closed captioning for meetings
              </Text>
              <Text style={styles.accessibilityItem}>
                ✓ Ergonomic equipment allowance
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveText}>Save Job</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </>
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
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  search: {
    backgroundColor: "#F3F3F3",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  company: {
    color: "#666",
    marginTop: 4,
  },

  location: {
    color: "#888",
    marginTop: 4,
  },

  badge: {
    marginTop: 10,
    backgroundColor: "#E6EEFF",
    padding: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  badgeText: {
    fontSize: 12,
    color: "#3B6EF6",
  },

  back: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.primary,
  },

  detailTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  salary: {
    color: "#3B6EF6",
    marginTop: 6,
    marginBottom: 10,
  },

  section: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
  },

  body: {
    marginTop: 6,
    lineHeight: 22,
    color: "#555",
  },

  accessibilityBox: {
    marginTop: 20,
    backgroundColor: "#EEF3FF",
    padding: 16,
    borderRadius: 12,
  },

  accessibilityTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },

  accessibilityItem: {
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  saveBtn: {
    borderWidth: 1,
    borderColor: "#3B6EF6",
    padding: 14,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },

  saveText: {
    color: "#3B6EF6",
    fontWeight: "600",
  },

  applyBtn: {
    backgroundColor: "#3B6EF6",
    padding: 14,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "700",
  },
});
