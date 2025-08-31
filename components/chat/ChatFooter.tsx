import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import EmojiPicker, { EmojiType } from "rn-emoji-keyboard";

export default function ChatFooter({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("😊");

  const handlePick = (emojiObject: EmojiType) => {
    setSelectedEmoji(emojiObject.emoji); // use the actual emoji
  };
  let colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <View className="flex-row items-center px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      {/* Emoji Picker */}
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        theme={{
          // backdrop: isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)",
          knob: isDark ? "#666" : "#ccc",
          search: {
            background: isDark ? "#222" : "#f0f0f0",
            icon: isDark ? "#fff" : "#000",
            placeholder: isDark ? "#aaa" : "#555",
          },
          container: isDark ? "#111" : "#fff",
          header: isDark ? "#fff" : "#000",
          skinTonesContainer: isDark ? "#333" : "#e6e6e6",
          category: {
            icon: isDark ? "#bbb" : "#444",
            // iconActive: isDark ? "#fff" : "#000",
            container: isDark ? "#222" : "#f7f7f7",
          },
        }}
        enableSearchBar
        enableRecentlyUsed
        expandable={true} // set true if you want expandable like WhatsApp
      />

      <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
        <Ionicons
          name={showEmojiPicker ? "close" : "happy-outline"}
          size={28}
          color={isDark ? "#fff" : "#000"}
          style={{ marginRight: 8 }}
        />
      </TouchableOpacity>

      {/* Input field */}
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        placeholderTextColor={isDark ? "#fff" : "#000"}
        className="flex-1 px-4 py-2 h-14 text-2xl rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
      />

      {/* Send button */}
      <TouchableOpacity
        onPress={handleSend}
        className="ml-2 p-3 rounded-full bg-zinc-100 dark:bg-zinc-800"
      >
        <Ionicons name="send" size={26} color={isDark ? "#fff" : "#000"} />
      </TouchableOpacity>
    </View>
  );
}
