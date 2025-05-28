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
      {/* 1) /appointment → Advisors list */}
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Advisors",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 12 }}
              onPress={() => navigation.goBack()}  
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      {/* 2) /appointment/[advisorId] → Book Appointment */}
      <Stack.Screen
        name="[advisorId]"
        options={{
          title: "Book Appointment",
          // built-in back button kullanılacak
        }}
      />

      {/* 3) /appointment/confirmed → Confirmed */}
      <Stack.Screen
        name="confirmed"
        options={{
          title: "Confirmed",
          // built-in back button kullanılacak
        }}
      />
    </Stack>
  );
}
