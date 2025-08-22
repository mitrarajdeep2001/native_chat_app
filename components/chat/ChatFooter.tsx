import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatFooter({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View className="flex-row items-center px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          className="flex-1 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 p-2 bg-brand-500 rounded-full"
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
