// app/(auth)/_layout.tsx
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLayout() {
  const router = useRouter();
  useEffect(() => {
    AsyncStorage.getItem("jwtToken").then(token => {
      if (token) {
        router.replace("/");  // Root (tabs) sayfasına
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
