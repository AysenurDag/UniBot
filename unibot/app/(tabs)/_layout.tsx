// unibot/app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={20} color={color} />,
        }}
      />
      {/* BURASI SADECE `appointment` KLASÖRÜNE GİDECEK */}
      <Tabs.Screen
        name="appointment" //  Çünkü index.tsx (My Appointments) varsayılan olacak.
        options={{
          title: "My Appointments", // Footer'da bu başlık görünecek
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />,
        }}
      />
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
