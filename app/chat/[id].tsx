import ChatBody from "@/components/chat/ChatBody";
import ChatHeader from "@/components/chat/ChatHeader";
import { useState } from "react";
import { View } from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey! How are you doing?",
      isMe: false,
      time: "10:30 AM",
    },
    {
      id: "2",
      text: "I’m good, just working on my new project 🚀",
      isMe: true,
      time: "10:32 AM",
    },
    {
      id: "3",
      text: "That’s awesome! What’s it about?",
      isMe: false,
      time: "10:33 AM",
    },
    {
      id: "4",
      text: "It’s a chat app I’m building with React Native and Tailwind 💬",
      isMe: true,
      time: "10:34 AM",
    },
    {
      id: "5",
      text: "Woah nice! Let me know if you need any help.",
      isMe: false,
      time: "10:36 AM",
    },
    {
      id: "6",
      text: "Sure! I’ll share it with you once it’s ready 🙌",
      isMe: true,
      time: "10:37 AM",
    },
  ]);

  const handleSend = (msg: string) => {
    if (!msg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: msg,
        isMe: true, // ✅ consistent with the rest of data
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <View className="flex-1">
      <ChatHeader />
      <ChatBody messages={messages} setMessages={setMessages} />
      {/* <ChatFooter onSend={handleSend} /> */}
    </View>
  );
}
