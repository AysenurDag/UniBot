// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Slot, Redirect, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        // token yoksa /login'e gönder
        router.replace("/login");
      }
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex:1,justifyContent:"center",alignItems:"center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // eğer /login veya /signup rotasındaysak orayı göster, 
  // aksi halde /(tabs) alt routing'e (Slot) izin ver
  return <Slot />;
}





// //app/(tabs)/_layout.tsx
// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: "#3b82f6",
//         tabBarStyle: {
//           backgroundColor: "#1e1e1e",
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           //headerShown: false,
//           title: "Home Page",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="chatbot"
//         options={{
//           title: "Chatbot",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="chatbubbles-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="appointment"
//         options={{
//           title: "Appointment",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
