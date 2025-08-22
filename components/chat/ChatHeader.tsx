import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Avatar from "../Avatar";
import BackButton from "../BackButton";

export default function ChatHeader() {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      {/* Left Section */}
      <View className="flex-row items-center">
        <BackButton />
        <Avatar uri="" name="John Doe" size={40} />
        <View className="ml-3">
          <Text className="text-lg font-semibold text-black dark:text-white">
            John Doe
          </Text>
          <Text className="text-sm text-zinc-500 dark:text-zinc-400">
            Online
          </Text>
        </View>
      </View>

      {/* Right Section */}
      <View className="flex-row items-center gap-4 space-x-4">
        <Pressable
          className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800"
          onPress={() => console.log("Voice Call")}
        >
          <Ionicons name="call" size={22} color="green" />
        </Pressable>
        <Pressable
          className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800"
          onPress={() => console.log("Video Call")}
        >
          <Ionicons name="videocam" size={22} color="green" />
        </Pressable>
      </View>
    </View>
  );
}
