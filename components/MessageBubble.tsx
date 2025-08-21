import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function MessageBubble({ message }: { message: any }) {
  const isMe = message.sender === "me";
  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      className={`max-w-[78%] px-3 py-2 my-1 rounded-2xl ${isMe ? "self-end bg-brand-500" : "self-start bg-zinc-200 dark:bg-zinc-800"}`}
    >
      <Text className={isMe ? "text-white" : "text-zinc-900 dark:text-zinc-100"}>{message.text}</Text>
      <Text className={`text-[10px] mt-1 ${isMe ? "text-white/80" : "text-zinc-500 dark:text-zinc-400"}`}>now</Text>
    </Animated.View>
  );
}
