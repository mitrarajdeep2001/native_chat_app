import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

export default function BackButton() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "white" : "black";

  return (
    <Pressable onPress={() => router.back()} className="mr-3">
      <Ionicons name="chevron-back-outline" size={26} color={iconColor} />
    </Pressable>
  );
}
