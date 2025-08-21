import { useLocalSearchParams, useRouter } from "expo-router";
import { View, FlatList, TextInput, Pressable, Text } from "react-native";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "@/components/MessageBubble";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey!", sender: "me" },
    { id: "2", text: "Hello 👋", sender: "other" },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: false }), 0);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: input.trim(), sender: "me" }]);
    setInput("");
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="px-3 py-3 flex-row items-center gap-3">
        <Pressable onPress={() => router.back()} className="w-9 h-9 rounded-full items-center justify-center">
          <Text className="text-2xl">‹</Text>
        </Pressable>
        <View className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-violet-500" />
        <View className="flex-1">
          <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Chat {String(id)}</Text>
          <Text className="text-xs text-zinc-500">online</Text>
        </View>
        <Pressable className="w-9 h-9 rounded-full items-center justify-center"><Text>📞</Text></Pressable>
        <Pressable className="w-9 h-9 rounded-full items-center justify-center"><Text>🎥</Text></Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={{ padding: 12 }}
      />

      {/* Input */}
      <View className="flex-row items-center border-t border-zinc-200 dark:border-zinc-800 px-3 py-2 bg-white dark:bg-black">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message…"
          placeholderTextColor="#9ca3af"
          className="flex-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-zinc-100"
        />
        <Pressable onPress={sendMessage} className="ml-2 bg-brand-500 px-4 py-3 rounded-2xl">
          <Text className="text-white font-semibold">Send</Text>
        </Pressable>
      </View>
    </View>
  );
}
