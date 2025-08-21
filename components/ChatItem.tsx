import { View, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export default function ChatItem({ chat }: { chat: any }) {
  return (
    <Animated.View
      entering={FadeInRight.duration(250)}
      className="flex-row items-center py-3 px-1 rounded-2xl mb-2 bg-gray-50 dark:bg-zinc-900"
    >
      <View className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-violet-500 mr-3" />
      <View className="flex-1">
        <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{chat.name}</Text>
        <Text className="text-zinc-500 dark:text-zinc-400">{chat.lastMessage}</Text>
      </View>
      <Text className="text-[11px] text-zinc-400">{chat.time}</Text>
    </Animated.View>
  );
}
