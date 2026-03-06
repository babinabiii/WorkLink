import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebase/firebaseConfig";

import AppInput from "../../src/components/ui/AppInput";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import COLORS from "../../src/utils/colors";

export default function LoginScreen() {
  const router = useRouter();
  
  // State
  const [email, setEmail] = useState(""); // Changed from emailOrPhone for Firebase Auth clarity
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Handlers ---

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Success: Navigate to jobseeker home
      router.replace("/(jobseeker)/home");
    } catch (error) {
      console.error(error);
      let message = "An unexpected error occurred.";
      
      if (error.code === "auth/invalid-credential") {
        message = "Invalid email or password. Please try again.";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      }
      
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert(
        "Email Required", 
        "Please enter your email address first so we can send you a reset link."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Reset Link Sent", 
        "Check your inbox! We've sent an email to help you reset your password."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

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
          <View>
            <View style={styles.header}>
              <Image
                source={require("../../assets/images/LOGO/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.tagline}>Built for Everyone</Text>
            </View>

            <View style={styles.form}>
              <AppInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AppInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity 
                style={styles.forgotButton} 
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              <PrimaryButton 
                label={loading ? "Signing In..." : "Sign In"} 
                onPress={handleSignIn} 
                disabled={loading}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
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
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "space-between", // Keeps footer at the bottom
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  form: {
    marginBottom: 24,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
