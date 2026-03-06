import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";

export default function VerificationStatusScreen() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Verification Submitted</Text>
        <Text style={styles.message}>
          Our team is reviewing your submitted ID. This may take 24–48 hours.
        </Text>
        <View style={styles.buttonWrapper}>
          <PrimaryButton label="Back to Login" onPress={handleBackToLogin} />
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonWrapper: {
    marginHorizontal: 16,
  },
});

