import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="chat/[id]" />
        </Stack>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
