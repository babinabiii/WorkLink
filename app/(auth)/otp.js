import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import OtpInput from "../../src/components/ui/OtpInput";
import CheckboxRow from "../../src/components/ui/CheckboxRow";

const EMAIL_DURATION_SECONDS = 600; // 10:00
const MOBILE_DURATION_SECONDS = 360; // 6:00
const SIMULATED_OTP = "123456";

const getInitialMethod = (methodParam) => {
  if (methodParam === "mobile" || methodParam === "phone") return "mobile";
  return "email";
};

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialMethod = getInitialMethod(params.method);

  const [method, setMethod] = useState(initialMethod);
  const [code, setCode] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    initialMethod === "email" ? EMAIL_DURATION_SECONDS : MOBILE_DURATION_SECONDS
  );
  const [email, setEmail] = useState(
    typeof params.email === "string" ? params.email : ""
  );
  const [phone, setPhone] = useState(
    typeof params.phone === "string" ? params.phone : ""
  );

  const role = typeof params.role === "string" ? params.role : "";
  const firstName = typeof params.firstName === "string" ? params.firstName : "";
  const lastName = typeof params.lastName === "string" ? params.lastName : "";
  const birthDay = typeof params.birthDay === "string" ? params.birthDay : "";

  useEffect(() => {
    setSecondsLeft(
      method === "email" ? EMAIL_DURATION_SECONDS : MOBILE_DURATION_SECONDS
    );
    setCode("");
  }, [method]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const isEmail = method === "email";

  const title = isEmail ? "Verify Your Email" : "Verify your Mobile Number";
  const displayTarget = isEmail ? email || "example@gmail.com" : phone || "+63 9777000665";
  const expiryLabel = isEmail ? "9:59" : "5:59"; // matches mockup text, though actual timer is live

  const handleResend = () => {
    setSecondsLeft(isEmail ? EMAIL_DURATION_SECONDS : MOBILE_DURATION_SECONDS);
    setCode("");
  };

  const handleSwitchMethod = () => {
    setMethod(isEmail ? "mobile" : "email");
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      Alert.alert("Incomplete code", "Please enter the 6-digit OTP code.");
      return;
    }
    if (code !== SIMULATED_OTP) {
      Alert.alert("Invalid OTP code", "The code you entered is incorrect.");
      return;
    }

    router.replace({
      pathname: "/(auth)/verification",
      params: {
        role,
        email,
        phone,
        firstName,
        lastName,
        birthDay,
        verifiedMethod: method,
      },
    });
  };

  const methodSwitchText = isEmail ? "Send to Mobile" : "Send to Email";

  const timerTextPrefix = "The OTP will be Expired in";
  const displayTime = formatTime(secondsLeft);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.illustration}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustrationIcon}>{isEmail ? "✉️" : "📱"}</Text>
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            An 6-digit code has been set to{" "}
            <Text style={styles.subtitleBold}>{displayTarget}</Text>{" "}
            <Text style={styles.link}>Change</Text>
          </Text>

          <OtpInput value={code} onChange={setCode} />

          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              • {timerTextPrefix}{" "}
              <Text style={styles.infoBold}>{expiryLabel}</Text> ({displayTime})
            </Text>
            <Text style={styles.infoText}>
              • Didn&apos;t receive the code?{" "}
              <Text style={styles.link} onPress={handleResend}>
                Resend
              </Text>{" "}
              or{" "}
              <Text style={styles.link} onPress={handleSwitchMethod}>
                {methodSwitchText}
              </Text>
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton label="Verify" onPress={handleVerify} />
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

