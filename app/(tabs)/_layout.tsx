import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function MainTabsLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: isDark ? "#60A5FA" : "#2563EB", // blue-400 / blue-600
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280", // gray-400 / gray-500
        tabBarStyle: {
          height: 68,
          borderTopWidth: 0,
          elevation: 12,
          backgroundColor: isDark ? "#18181B" : "white", // dark:bg-zinc-900 / light:bg-white
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, { active: any; inactive: any }> = {
            index: { active: "chatbubbles", inactive: "chatbubbles-outline" },
            status: { active: "aperture", inactive: "aperture-outline" },
            calls: { active: "call", inactive: "call-outline" },
            settings: { active: "settings", inactive: "settings-outline" },
          };

          const icon =
            icons[route.name as keyof typeof icons] ||
            { active: "ellipse", inactive: "ellipse-outline" };

          return (
            <Ionicons
              name={focused ? icon.active : icon.inactive}
              size={size + 2} // slightly larger for modern look
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Chats" }} />
      <Tabs.Screen name="status" options={{ title: "Status" }} />
      <Tabs.Screen name="calls" options={{ title: "Calls" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
