// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="chatbot" options={{ title: "Chatbot" }} />
      <Tabs.Screen name="appointment" options={{ title: "Appointments" }} />
      {/* vs */}
    </Tabs>
  );
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
