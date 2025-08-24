import MessageBubble from "@/components/MessageBubble";
import { FlatList, View } from "react-native";
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper";
import ChatFooter from "./ChatFooter";

export default function ChatBody({
  messages,
  setMessages,
}: {
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const handleSend = (msg: string) => {
    if (!msg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: msg,
        isMe: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* ✅ Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageBubble {...item} />}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      />

      {/* ✅ Footer sticks above keyboard */}
      <KeyboardAvoidingWrapper>
        <ChatFooter onSend={handleSend} />
      </KeyboardAvoidingWrapper>
    </View>
  );
}
