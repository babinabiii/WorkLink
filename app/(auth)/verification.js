import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import AppInput from "../../src/components/ui/AppInput";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import UploadBox from "../../src/components/ui/UploadBox";

const getConfigForRole = (roleRaw) => {
  const role = typeof roleRaw === "string" ? roleRaw : "";

  if (role === "PWD") {
    return {
      key: "pwd",
      title: "PWD Verification",
      field1Label: "PWD ID number",
      field1Placeholder: "Enter your PWD ID",
      field2Label: "Enter disability type (Optional)",
      field2Placeholder: "example physical",
      field2Optional: true,
      uploadLabel: "Upload PWD ID",
      uploadPrimaryText: "Tap to upload PWD ID",
      uploadSecondaryText: "(JPG, PNG – Max 5MB)",
    };
  }

  if (role === "Senior Citizen") {
    return {
      key: "senior",
      title: "Senior Citizen Verification",
      field1Label: "Senior Citizen Verification",
      field1Placeholder: "Enter your ID",
      field2Label: "Birthdate",
      field2Placeholder: "DD/MM/YY",
      field2Optional: false,
      uploadLabel: "Upload Senior Citizen ID",
      uploadPrimaryText: "Tap to upload Senior Citizen ID",
      uploadSecondaryText: "(JPG, PNG – Max 5MB)",
    };
  }

  if (role === "Student/Youth") {
    return {
      key: "student",
      title: "Student Verification",
      field1Label: "School Name",
      field1Placeholder: "Enter your school",
      field2Label: "Year Level / Graduate",
      field2Placeholder: "Enter your year level",
      field2Optional: false,
      uploadLabel: "Upload School ID",
      uploadPrimaryText: "Tap to upload Student ID",
      uploadSecondaryText: "(JPG, PNG – Max 5MB)",
    };
  }

  if (role === "Employer") {
    return {
      key: "employer",
      title: "Company Verification",
      field1Label: "Company Name",
      field1Placeholder: "Enter your company",
      field2Label: "Business Permit Number",
      field2Placeholder: "Enter your Permit",
      field2Optional: false,
      uploadLabel: "Upload School ID",
      uploadPrimaryText: "Tap to upload Business Permit",
      uploadSecondaryText: "(JPG, PNG – Max 5MB)",
    };
  }

  return {
    key: "unknown",
    title: "Verification",
    field1Label: "Reference ID",
    field1Placeholder: "Enter your ID",
    field2Label: "Additional Details (Optional)",
    field2Placeholder: "Any extra information",
    field2Optional: true,
    uploadLabel: "Upload ID",
    uploadPrimaryText: "Tap to upload ID",
    uploadSecondaryText: "(JPG, PNG – Max 5MB)",
  };
};

export default function VerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const roleParam = params.role;
  const verifiedMethodParam =
    typeof params.verifiedMethod === "string" ? params.verifiedMethod : "";

  const config = useMemo(() => getConfigForRole(roleParam), [roleParam]);

  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [uploadedName, setUploadedName] = useState("");

  const handleSubmit = () => {
    if (!field1.trim()) {
      Alert.alert("Missing information", `Please fill in ${config.field1Label}.`);
      return;
    }

    if (!config.field2Optional && !field2.trim()) {
      Alert.alert("Missing information", `Please fill in ${config.field2Label}.`);
      return;
    }

    if (!uploadedName) {
      Alert.alert("Missing upload", "Please upload your ID before submitting.");
      return;
    }

    router.replace("/(auth)/account-success");
  };

  const isSenior = config.key === "senior";

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
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/LOGO/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {verifiedMethodParam ? (
            <Text style={styles.verifiedText}>
              Verified via{" "}
              <Text style={styles.verifiedTextBold}>
                {verifiedMethodParam === "mobile" ? "Mobile" : "Email"}
              </Text>
            </Text>
          ) : null}

          <Text style={styles.title}>{config.title}</Text>

          <View style={styles.form}>
            <AppInput
              label={config.field1Label}
              placeholder={config.field1Placeholder}
              value={field1}
              onChangeText={setField1}
            />

            {isSenior ? (
              <View style={styles.customInputContainer}>
                <Text style={styles.customLabel}>{config.field2Label}</Text>
                <View style={styles.customInputRow}>
                  <TextInput
                    style={styles.customTextInput}
                    placeholder={config.field2Placeholder}
                    placeholderTextColor={COLORS.textSecondary}
                    value={field2}
                    onChangeText={setField2}
                  />
                  <Text style={styles.calendarIcon}>📅</Text>
                </View>
              </View>
            ) : (
              <AppInput
                label={config.field2Label}
                placeholder={config.field2Placeholder}
                value={field2}
                onChangeText={setField2}
              />
            )}

            <UploadBox
              label={config.uploadLabel}
              primaryText={config.uploadPrimaryText}
              secondaryText={config.uploadSecondaryText}
              value={uploadedName}
              onChange={setUploadedName}
            />

            <Text style={styles.helperText}>
              Your ID is securely stored and used only for verification
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton label="Submit to Review" onPress={handleSubmit} />
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
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  verifiedText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  verifiedTextBold: {
    fontWeight: "600",
    color: COLORS.primary,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 24,
  },
  form: {
    marginBottom: 32,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  buttonWrapper: {
    marginTop: "auto",
  },
  customInputContainer: {
    marginBottom: 16,
  },
  customLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
    marginBottom: 6,
  },
  customInputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },
  customTextInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  calendarIcon: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
});

