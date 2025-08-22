import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
// ✅ Reanimated version (fixes deprecation)
import Avatar from "@/components/Avatar";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  pinned?: boolean;
  unread?: number;
};

const INITIAL: Chat[] = [
  {
    id: "1",
    name: "Ava Stone",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "Let’s meet at 6?",
    time: "2:45 PM",
    pinned: true,
    unread: 2,
  },
  {
    id: "2",
    name: "Dev Team",
    avatar: "https://i",
    lastMessage: "Ship day 🚀",
    time: "1:35 PM",
    unread: 0,
  },
  {
    id: "3",
    name: "Mom",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Call me when free",
    time: "10:02 AM",
    unread: 5,
  },
  {
    id: "4",
    name: "Mom",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Call me when free",
    time: "10:02 AM",
    unread: 5,
  },
  {
    id: "5",
    name: "Mom",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Call me when free",
    time: "10:02 AM",
    unread: 5,
  },
  {
    id: "6",
    name: "Mom",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Call me when free",
    time: "10:02 AM",
    unread: 5,
  },
];

export default function Chats() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [chats, setChats] = useState<Chat[]>(INITIAL);
  const swipeRef = useRef<any>(null);

  const filtered = useMemo(() => {
    const f = chats.filter((c) =>
      c.name.toLowerCase().includes(q.toLowerCase())
    );
    return [...f.filter((c) => c.pinned), ...f.filter((c) => !c.pinned)];
  }, [q, chats]);

  const onCall = (chat: Chat) => {
    Alert.alert("Call", `Calling ${chat.name}…`);
  };

  const onDelete = (id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
  };

  const LeftActions = (
    progress: Animated.SharedValue<number>,
    _translation: Animated.SharedValue<number>
  ) => {
    const aStyle = useAnimatedStyle(() => ({
      transform: [{ scale: interpolate(progress.value, [0, 1], [0.9, 1]) }],
      opacity: interpolate(progress.value, [0, 1], [0.4, 1]),
    }));
    return (
      <Animated.View
        className="flex-row items-center justify-start px-5 bg-green-500 h-full rounded-r-2xl"
        style={aStyle}
      >
        <Ionicons name="call" size={24} color="white" />
        <Text className="ml-2 text-white font-medium">Call</Text>
      </Animated.View>
    );
  };

  const RightActions = (
    progress: Animated.SharedValue<number>,
    _translation: Animated.SharedValue<number>
  ) => {
    const aStyle = useAnimatedStyle(() => ({
      transform: [{ scale: interpolate(progress.value, [0, 1], [0.9, 1]) }],
      opacity: interpolate(progress.value, [0, 1], [0.4, 1]),
    }));
    return (
      <Animated.View
        className="flex-row items-center justify-end px-5 bg-red-500 h-full rounded-l-2xl"
        style={aStyle}
      >
        <Text className="mr-2 text-white font-medium">Delete</Text>
        <Ionicons name="trash" size={24} color="white" />
      </Animated.View>
    );
  };

  const renderRow = ({ item }: { item: Chat }) => {

    return (
      <ReanimatedSwipeable
        ref={swipeRef}
        // swipe RIGHT → show LeftActions → Call
        renderLeftActions={LeftActions}
        // swipe LEFT → show RightActions → Delete
        renderRightActions={RightActions}
        friction={2}
        leftThreshold={60}
        rightThreshold={60}
        overshootLeft={false}
        overshootRight={false}
        onSwipeableOpen={(direction) => {
          if (direction === "right") {
            onCall(item);
          } else if (direction === "left") {
            onDelete(item.id);
          }
          swipeRef.current?.close();
        }}
        childrenContainerStyle={{
          borderRadius: 16,
          overflow: "hidden",
        }}
        containerStyle={{
          // needed so rounded corners look good over the actions
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <Pressable
          onPress={() => router.push(`/chat/${item.id}`)}
          android_ripple={{ color: "#e5e7eb" }}
          className="flex-row items-center px-3 py-3 bg-white dark:bg-black"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: Platform.OS === "android" ? 1 : 0,
          }}
        >
          {/* <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full mr-3" /> */}
          <Avatar uri={item.avatar} name={item.name} size={48} />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center justify-between w-full">
              <Text className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {item.name}
              </Text>
              <View className="ml-2 min-w-[22px] py-0.5 rounded-full bg-green-500 items-center justify-center">
                <Text className="text-[11px] text-white text-center">
                  {item.time}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-0.5">
              <Text
                className="flex-1 text-sm text-zinc-600 dark:text-zinc-400"
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
              {item.unread ? (
                <View className="ml-2 min-w-[22px] p-0.5 rounded-full bg-blue-500 items-center justify-center">
                  <Text className="text-sm text-white font-medium">
                    {item.unread}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </Pressable>
      </ReanimatedSwipeable>
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-black px-4">
      {/* Header */}
      <Text className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-5">
        Chats
      </Text>

      {/* Search Bar */}
      <View
        className="flex-row items-center gap-2 rounded-full px-4 py-2 mb-4 bg-zinc-100 dark:bg-zinc-900"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: Platform.OS === "android" ? 2 : 0,
        }}
      >
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          placeholder="Search chats"
          placeholderTextColor="#9ca3af"
          value={q}
          onChangeText={setQ}
          className="flex-1 text-base text-zinc-900 dark:text-zinc-100"
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        // ItemSeparatorComponent={() => (
        //   <View className="h-[1px] bg-zinc-200 dark:bg-zinc-800 ml-14" />
        // )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Action Button */}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 items-center justify-center shadow-lg"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: 5,
        }}
        onPress={() => router.push("/select-contact")}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="white" />
      </Pressable>

    </View>
  );
}
