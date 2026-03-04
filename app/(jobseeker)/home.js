import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import useUserRole from "../../src/hooks/useUserRole";
import { getJobPosts } from "../../src/firebase/jobService";
import JobCard from "../../src/components/cards/JobCard";
import TrainingCard from "../../src/components/cards/TrainingCard";
import AICard from "../../src/components/cards/AICard";
import PrimaryButton from "../../src/components/ui/PrimaryButton";

export default function JobseekerHomeScreen() {
  const router = useRouter();
  const { role, loading: loadingRole } = useUserRole();
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobPosts();
        setJobs(data || []);
      } finally {
        setLoadingJobs(false);
      }
    };
    loadJobs();
  }, []);

  const recommendedJobs = useMemo(() => {
    if (!role) return [];
    const seekerRoles = ["PWD", "Student/Youth", "Senior Citizen"];
    if (!seekerRoles.includes(role)) {
      return [];
    }
    return jobs.filter(
      (job) => job.isActive && Array.isArray(job.targetRoles) && job.targetRoles.includes(role)
    );
  }, [jobs, role]);

  const loading = loadingRole || loadingJobs;

  const handleSeeAll = () => {
    router.push("/(jobseeker)/jobs");
  };

  const handleBrowseJobs = () => {
    router.push("/(jobseeker)/jobs");
  };

  const trainingItems = [
    {
      id: "t1",
      title: "Advanced React Patterns",
      description: "Master modern React hooks and patterns.",
    },
    {
      id: "t2",
      title: "Leadership Workshop",
      description: "Develop essential soft skills for growth.",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <TouchableOpacity style={styles.bell}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search jobs...</Text>
        </View>

        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Recommended Jobs</Text>
              <TouchableOpacity onPress={handleSeeAll}>
                <Text style={styles.sectionLink}>See all</Text>
              </TouchableOpacity>
            </View>

            {recommendedJobs.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {recommendedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onPress={() =>
                      router.push({
                        pathname: "/(jobseeker)/jobs/[jobId]",
                        params: { jobId: job.id },
                      })
                    }
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  No recommended jobs yet for your profile.
                </Text>
                <View style={styles.emptyButtonWrapper}>
                  <PrimaryButton
                    label="Browse Jobs"
                    onPress={handleBrowseJobs}
                  />
                </View>
              </View>
            )}

            <View style={styles.sectionSpacing} />

            <Text style={styles.sectionTitle}>Training Suggestions</Text>
            <View style={styles.trainingList}>
              {trainingItems.map((item) => (
                <TrainingCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  onPress={() => {}}
                />
              ))}
            </View>

            <View style={styles.sectionSpacing} />

            <Text style={styles.sectionTitle}>AI Career Tip</Text>
            <AICard onPress={() => {}} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grayLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  bell: {
    padding: 6,
  },
  bellIcon: {
    fontSize: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  loadingWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  sectionLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
  horizontalList: {
    paddingVertical: 8,
  },
  emptyState: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyButtonWrapper: {
    width: "60%",
  },
  sectionSpacing: {
    height: 24,
  },
  trainingList: {
    marginTop: 8,
  },
});

