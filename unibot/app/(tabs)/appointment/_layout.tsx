// unibot/app/(tabs)/appointment/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppointmentLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#FFF",
        headerTitleStyle: { fontWeight: "600" },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        animation: "slide_from_right",
      }}
    >
      {/* 1) /appointment rotası (yani ana rota) --> My Appointments sayfası olacak */}
      <Stack.Screen
        name="index" 
        options={({ navigation }) => ({
          title: "My Appointments", // Bu ekranın başlığı
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 12 }}
              onPress={() => navigation.goBack()} // Geri butonu
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      {/* 2) /appointment/advisors rotası --> Advisors List sayfası olacak */}
      <Stack.Screen
        name="advisors"  
        options={{
          title: "Advisors", // Bu ekranın başlığı
        }}
      />

      {/* 3) /appointment/[advisorId] rotası --> Randevu Oluşturma Detay sayfası */}
      <Stack.Screen
        name="[advisorId]"
        options={{
          title: "Book Appointment",
        }}
      />

      {/* 4) /appointment/confirmed rotası --> Randevu Onay sayfası */}
      <Stack.Screen
        name="confirmed"
        options={{
          title: "Confirmed",
        }}
      />
    </Stack>
  );
}