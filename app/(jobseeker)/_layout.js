import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const ACTIVE_COLOR = "#2563EB";
const INACTIVE_COLOR = "#6B7280"; 

export default function JobseekerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 65, 
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 9, 
          fontWeight: "600",
        },
      }}
    >
      {/* 1. home.js is a direct file, so "home" is correct */}
      <Tabs.Screen
        name="home"
        options={{
          title: "HOME",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />

      {/* 2. For folders, use the folder/index pattern seen in your logs */}
      <Tabs.Screen
        name="jobs/index"
        options={{
          title: "JOBS",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "briefcase" : "briefcase-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="training/index"
        options={{
          title: "TRAIN",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "school" : "school-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="community/index"
        options={{
          title: "SOCIAL",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chatbot/index"
        options={{
          title: "AI CHAT",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "PROFILE",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
          ),
        }}
      />

      {/* 3. Hide the job detail page so it doesn't show up as a tab */}
      <Tabs.Screen
        name="jobs/[jobId]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}