import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Image, Text, View } from "react-native";

type AvatarProps = {
  uri?: string;
  name: string;
  size?: number; // default 48px
};

export default function Avatar({ uri, name, size = 48 }: AvatarProps) {
  const [error, setError] = useState(false);
  const { colorScheme } = useColorScheme();

  const fallbackBg =
    colorScheme === "dark" ? "bg-gray-700" : "bg-gray-300";

  return (
    <View
      className={`rounded-full overflow-hidden justify-center items-center ${fallbackBg}`}
      style={{ width: size, height: size }}
    >
      {!error && uri ? (
        <Image
          source={{ uri }}
          className="w-full h-full"
          onError={() => setError(true)}
        />
      ) : (
        <Text className="text-4xl font-medium text-white">
          {name.charAt(0).toUpperCase()}
        </Text>
      )}
    </View>
  );
}
