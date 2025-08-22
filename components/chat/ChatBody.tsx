import MessageBubble from "@/components/MessageBubble";
import { FlatList, View } from "react-native";

export default function ChatBody({ messages }: { messages: any[] }) {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MessageBubble {...item} />}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
        // inverted // so latest messages show at bottom like WhatsApp/Telegram
      />
    </View>
  );
}
