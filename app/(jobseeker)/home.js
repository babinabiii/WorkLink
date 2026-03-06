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
  
  // State
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [userData, setUserData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch User Profile for initials and name
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }

        // 2. Fetch Job Posts
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

  // Helpers
  const getInitials = () => {
    if (!userData) return "??";
    const f = userData.firstName ? userData.firstName[0] : "";
    const l = userData.lastName ? userData.lastName[0] : "";
    return (f + l).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuVisible(false);
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  const recommendedJobs = useMemo(() => {
    if (!role) return [];
    const seekerRoles = ["PWD", "Student/Youth", "Senior Citizen"];
    if (!seekerRoles.includes(role)) return [];
    
    return jobs.filter(
      (job) => job.isActive && Array.isArray(job.targetRoles) && job.targetRoles.includes(role)
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
        
        {/* --- Header --- */}
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

        {/* --- Profile Modal --- */}
        <Modal
          transparent={true}
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
                {userData ? `${userData.firstName} ${userData.lastName}` : "User"}
              </Text>
              <Text style={styles.userEmail}>{userData?.email || auth.currentUser?.email}</Text>
              
              <View style={styles.menuDivider} />
              
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* --- Search Bar --- */}
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
            {/* Recommended Jobs */}
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

            {/* Training Suggestions */}
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

            {/* AI Career Tip */}
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
    borderWidth: 1,
    borderColor: COLORS.primary + "20", // Suble border using primary color with transparency
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  bell: {
    padding: 6,
  },
  bellIcon: {
    fontSize: 20,
  },
  // Modal Styles
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
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginBottom: 12,
  },
  logoutButton: {
    paddingVertical: 8,
  },
  logoutText: {
    color: "#FF3B30",
    fontWeight: "600",
    fontSize: 15,
  },
  // Original Styles
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