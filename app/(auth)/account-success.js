import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";

export default function AccountSuccessScreen() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/LOGO/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>

          <Text style={styles.title}>Account created Successfully!</Text>
          <Text style={styles.description}>
            Congratulations! Your account has been created. Please log in with
            your credentials to get started.
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            label="Login to get Started"
            onPress={handleGoToLogin}
          />
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
    paddingTop: 16,
    paddingBottom: 32,
  },
  logoWrapper: {
    alignItems: "flex-start",
    marginBottom: 32,
  },
  logo: {
    width: 52,
    height: 52,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  checkIcon: {
    fontSize: 64,
    color: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonWrapper: {
    marginTop: 24,
  },
});

