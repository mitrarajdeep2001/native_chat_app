import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function ChatFooter({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");
  const theme = useTheme();

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <View className="flex-row items-center px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        placeholderTextColor={theme.dark ? "#aaa" : "#888"}
        className="flex-1 px-4 py-2 h-14 text-2xl rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
      />
      <TouchableOpacity
        onPress={handleSend}
        className="ml-2 p-2 bg-brand-500 rounded-full"
      >
        <Ionicons
          name="send"
          size={30}
          color={theme.dark ? "#fff" : "#000"} // 👈 dynamic color
        />
      </TouchableOpacity>
    </View>
  );
}
