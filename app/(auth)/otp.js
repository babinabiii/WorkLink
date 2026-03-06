import { useLocalSearchParams, useRouter } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../src/firebase/firebaseConfig";

import CheckboxRow from "../../src/components/ui/CheckboxRow";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import COLORS from "../../src/utils/colors";

const EMAIL_DURATION_SECONDS = 600;

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [rememberDevice, setRememberDevice] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(EMAIL_DURATION_SECONDS);

  const email = typeof params.email === "string" ? params.email : "";
  const phone = typeof params.phone === "string" ? params.phone : "";

  const role = typeof params.role === "string" ? params.role : "";
  const firstName = typeof params.firstName === "string" ? params.firstName : "";
  const lastName = typeof params.lastName === "string" ? params.lastName : "";
  const birthDay = typeof params.birthDay === "string" ? params.birthDay : "";

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const displayTime = formatTime(secondsLeft);

  const handleVerify = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "No user session found.");
        return;
      }

      await user.reload();

      if (user.emailVerified) {
        router.replace({
          pathname: "/(auth)/verification",
          params: {
            role,
            email,
            phone,
            firstName,
            lastName,
            birthDay,
            verifiedMethod: "email",
          },
        });
      } else {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email first by clicking the link sent to your email."
        );
      }
    } catch (error) {
      Alert.alert("Verification Error", error.message);
    }
  };

  const handleResend = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "No user session found.");
        return;
      }

      await sendEmailVerification(user);

      setSecondsLeft(EMAIL_DURATION_SECONDS);

      Alert.alert(
        "Email Sent",
        "A new verification email has been sent."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationIcon}>✉️</Text>
            </View>
          </View>

          <Text style={styles.title}>Verify Your Email</Text>

          <Text style={styles.subtitle}>
            A verification email has been sent to{" "}
            <Text style={styles.subtitleBold}>{email}</Text>
          </Text>

          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              • The verification link expires in{" "}
              <Text style={styles.infoBold}>{displayTime}</Text>
            </Text>

            <Text style={styles.infoText}>
              • Didn't receive the email?{" "}
              <Text style={styles.link} onPress={handleResend}>
                Resend
              </Text>
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton label="I've Verified My Email" onPress={handleVerify} />

            <CheckboxRow
              checked={rememberDevice}
              onToggle={() => setRememberDevice((prev) => !prev)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  illustration: {
    alignItems: "center",
    marginBottom: 24,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationIcon: {
    fontSize: 52,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  subtitleBold: {
    fontWeight: "600",
    color: COLORS.text,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "500",
  },
  infoSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoBold: {
    fontWeight: "600",
    color: COLORS.text,
  },
  buttonWrapper: {
    marginTop: 8,
  },
});
