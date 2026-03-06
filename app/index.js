import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../src/utils/colors";

const PROGRESS_DURATION = 6000;

export default function SplashScreen() {
  const router = useRouter();
  const progress = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: PROGRESS_DURATION,
      useNativeDriver: false,
    }).start();

    const timeout = setTimeout(() => {
      router.replace("/(auth)/onboarding-1");
    }, PROGRESS_DURATION);

    return () => clearTimeout(timeout);
  }, [router, progress]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "60%"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/LOGO/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Built for Everyone</Text>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: widthInterpolation }]} />
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 24,
  },
  progressTrack: {
    width: "60%",
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.grayLight,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
});

