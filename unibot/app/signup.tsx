// app/signup.tsx
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function SignupPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kaydol</Text>
      {/* Buraya kayıt formu gelecek */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
  },
});
