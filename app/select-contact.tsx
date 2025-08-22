import Avatar from "@/components/Avatar"; // Reusable avatar component
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function SelectContact() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setPermissionGranted(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data.sort((a, b) => (a.name || "").localeCompare(b.name || "")));
        }
      }
    })();
  }, []);

  const filteredContacts = useMemo(() => {
    if (!q) return contacts;
    return contacts.filter((c) =>
      (c.name || "").toLowerCase().includes(q.toLowerCase())
    );
  }, [q, contacts]);

  if (!permissionGranted) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <Text className="text-red-500 text-lg">
          Permission to access contacts is required.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <View className="flex-row items-center justify-start">
          <BackButton />
          <View>
            <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Select Contact
            </Text>
            <Text className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {contacts.length} contacts
            </Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View
        className="
          flex-row items-center gap-2 rounded-full px-4 py-2 m-4
          bg-zinc-100 dark:bg-zinc-900
        "
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
          placeholder="Search contacts"
          placeholderTextColor="#9ca3af"
          value={q}
          onChangeText={setQ}
          className="flex-1 text-base text-zinc-900 dark:text-zinc-100"
        />
      </View>

      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id ?? ""}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <Avatar
              name={item.name || "?"}
              uri={item.imageAvailable ? item.image?.uri ?? undefined : undefined}
            />
            <View className="ml-3">
              <Text className="text-zinc-900 dark:text-zinc-100 text-base font-medium">
                {item.name}
              </Text>
              {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {item.phoneNumbers[0].number}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}
