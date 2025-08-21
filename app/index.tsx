// app/index.tsx
import { Image, Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function LandingScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* HERO IMAGE */}
      <View className="flex-1 justify-center items-center px-6 mt-12">
        <Image
          source={require("../assets/images/icon.png")} // Replace with your own
          className="w-full h-64"
          resizeMode="contain"
        />

        {/* TITLE & SUBTITLE */}
        <Text className="text-3xl font-extrabold text-center text-gray-800 mt-8">
          Welcome to HRMS
        </Text>
        <Text className="text-base text-gray-500 text-center mt-2">
          Track attendance, manage leaves, and keep your work profile updated — all in one place.
        </Text>
      </View>

      {/* BUTTONS */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-xl mb-4 shadow-md"
        //   onPress={() => router.push("/login")}
        >
          <Text className="text-white text-center text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-blue-600 py-4 rounded-xl"
        //   onPress={() => router.push("/register")}
        >
          <Text className="text-blue-600 text-center text-lg font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
