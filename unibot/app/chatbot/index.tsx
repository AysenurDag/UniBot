// app/chatbot/index.tsx
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function ChatbotPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chatbot Screen</Text>
      {/* Buraya chatbot UI’nı ekleyebilirsin */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { color: "white", fontSize: 24, fontWeight: "bold" },
});
