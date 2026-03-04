import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import AppInput from "../../src/components/ui/AppInput";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import RadioGroup from "../../src/components/ui/RadioGroup";

export default function SignUpScreen() {
  const router = useRouter();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleNext = () => {
    if (
      !lastName ||
      !firstName ||
      !birthDay ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !selectedRole
    ) {
      Alert.alert("Missing information", "Please complete all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match");
      return;
    }

    router.push({
      pathname: "/(auth)/otp",
      params: {
        method: "email",
        role: selectedRole,
        lastName,
        firstName,
        birthDay,
        email,
        phone,
      },
    });
  };

  const handleSignIn = () => {
    router.push("/(auth)/login");
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/LOGO/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Create your account</Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <AppInput
                  label="Last Name"
                  placeholder="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <View style={styles.halfInput}>
                <AppInput
                  label="First Name"
                  placeholder="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            <AppInput
              label="Birth Day"
              placeholder="DD/MM/YY"
              value={birthDay}
              onChangeText={setBirthDay}
            />

            <AppInput
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AppInput
              label="Phone Number"
              placeholder="+63 XXX XXX XXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <AppInput
              label="Create Password"
              placeholder="Create a strong password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <AppInput
              label="Confirm Password"
              placeholder="Create a strong password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={styles.roleSection}>
              <Text style={styles.roleLabel}>Select Role</Text>
              <RadioGroup
                selected={selectedRole}
                onChange={setSelectedRole}
                options={["PWD", "Student/Youth", "Senior Citizen", "Employer"]}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <PrimaryButton label="Next" onPress={handleNext} />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.footerLink}>Sign In</Text>
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
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 24,
  },
  form: {
    borderRadius: 16,
    backgroundColor: COLORS.background,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
  },
  roleSection: {
    marginTop: 8,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 8,
  },
  buttonWrapper: {
    marginTop: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

