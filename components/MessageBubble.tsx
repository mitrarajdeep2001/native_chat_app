// components/MessageBubble.tsx
import { Text, View } from "react-native";

type MessageBubbleProps = {
  text: string;
  isMe?: boolean; // true = current user, false = other user
  time?: string;
};

export default function MessageBubble({
  text,
  isMe = false,
  time,
}: MessageBubbleProps) {
  return (
    <View
      className={`flex-row mb-2 px-3 ${isMe ? "justify-end" : "justify-start"}`}
    >
      <View
        className={`max-w-[75%] px-3 py-2 rounded-2xl shadow-sm ${
          isMe
            ? "bg-blue-500 rounded-br-none"
            : "bg-zinc-200 dark:bg-zinc-800 rounded-bl-none"
        }`}
      >
        <Text
          className={`text-base ${
            isMe ? "text-white" : "text-black dark:text-white"
          }`}
        >
          {text}
        </Text>
        {time && (
          <Text
            className={`text-xs mt-1 ${
              isMe ? "text-blue-100" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {time}
          </Text>
        )}
      </View>
    </View>
  );
}
