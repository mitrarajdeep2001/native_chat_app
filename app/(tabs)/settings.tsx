import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function Settings() {
  const [enabled, setEnabled] = useState(false);
  return (
    <View className="flex-1 bg-white dark:bg-black px-4">
      <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Settings</Text>
      <View className="flex-row items-center justify-between bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-3">
        <Text className="text-zinc-700 dark:text-zinc-200">Dark Mode (system-like)</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  );
}
