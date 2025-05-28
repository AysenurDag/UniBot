//app/appointment/_layout.tsx
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <Slot />
    </SafeAreaView>
  );
}
