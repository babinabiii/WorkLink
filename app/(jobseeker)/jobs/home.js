import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebase/firebaseConfig";

import AICard from "../../src/components/cards/AICard";
import JobCard from "../../src/components/cards/JobCard";
import TrainingCard from "../../src/components/cards/TrainingCard";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import { getJobPosts } from "../../src/firebase/jobService";
import useUserRole from "../../src/hooks/useUserRole";
import COLORS from "../../src/utils/colors";

export default function JobseekerHomeScreen() {
  const router = useRouter();
  const { role, loading: loadingRole } = useUserRole();

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [userData, setUserData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        // Fetch user profile
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }

        // Fetch jobs
        const data = await getJobPosts();
        setJobs(data || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchData();
  }, []);

  // User initials
  const getInitials = () => {
    if (!userData) return "??";
    const f = userData.firstName ? userData.firstName[0] : "";
    const l = userData.lastName ? userData.lastName[0] : "";
    return (f + l).toUpperCase();
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuVisible(false);
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  // Filter recommended jobs
  const recommendedJobs = useMemo(() => {
    if (!role) return [];

    const seekerRoles = ["PWD", "Student/Youth", "Senior Citizen"];

    if (!seekerRoles.includes(role)) return [];

    return jobs.filter(
      (job) =>
        job.isActive &&
        Array.isArray(job.targetRoles) &&
        job.targetRoles.includes(role),
    );
  }, [jobs, role]);

  const loading = loadingRole || loadingJobs;

  const handleSeeAll = () => router.push("/(jobseeker)/jobs");
  const handleBrowseJobs = () => router.push("/(jobseeker)/jobs");

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
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bell}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* PROFILE MODAL */}
        <Modal
          transparent
          visible={menuVisible}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menuContainer}>
              <Text style={styles.userName}>
                {userData
                  ? `${userData.firstName} ${userData.lastName}`
                  : "User"}
              </Text>

              <Text style={styles.userEmail}>
                {userData?.email || auth.currentUser?.email}
              </Text>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* SEARCH BAR */}
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
            {/* RECOMMENDED JOBS */}
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
                    // IMPORTANT FIX
                    onPress={() =>
                      router.push({
                        pathname: "/(jobseeker)/jobs",
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

            {/* TRAINING */}
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

            {/* AI TIP */}
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
    justifyContent: "space-between",
    marginBottom: 16,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontWeight: "700",
    color: COLORS.primary,
  },

  bellIcon: {
    fontSize: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  menuContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "70%",
  },

  userName: {
    fontSize: 18,
    fontWeight: "700",
  },

  userEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  menuDivider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginVertical: 12,
  },

  logoutText: {
    color: "#FF3B30",
    fontWeight: "600",
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

  scrollContent: {
    paddingBottom: 24,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  sectionLink: {
    color: COLORS.primary,
  },

  horizontalList: {
    paddingVertical: 8,
  },

  emptyState: {
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.textSecondary,
    marginBottom: 12,
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

  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
