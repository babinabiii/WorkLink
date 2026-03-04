import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../src/utils/colors";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import PaginationDots from "../../src/components/ui/PaginationDots";

const { width } = Dimensions.get("window");

export default function Onboarding3() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.illustrationContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/images/OS/4.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        <PaginationDots activeIndex={2} total={3} />

        <Text style={styles.title}>AI Job Matching</Text>
        <Text style={styles.description}>
          Smart job recommendations powered by AI Get matched with
          opportunities that fit your skills and preferences
        </Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton label="Next" onPress={handleNext} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageWrapper: {
    width: "100%",
    maxWidth: 360,
    aspectRatio: 4 / 3,
    borderRadius: 24,
    backgroundColor: COLORS.grayLight,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "left",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: "left",
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

