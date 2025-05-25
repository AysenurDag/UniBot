import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/chatbot.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Student</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              style={styles.iconButton}
            >
              <FontAwesome name="user" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* İçerik */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/chatbot")}
          >
            <Text style={styles.cardTitle}>Ask a question to the chatbot</Text>
            <Text style={styles.cardDesc}>
              Courses, exams, internship, graduation — any subject you can't
              find the answer to.
            </Text>
            <Ionicons
              name="chatbubbles-outline"
              size={40}
              color="white"
              style={styles.cardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/appointment")}
          >
            <Text style={styles.cardTitle}>Make an appointment</Text>
            <Text style={styles.cardDesc}>
              Schedule a meeting with academic advisors.
            </Text>
            <Ionicons
              name="calendar-outline"
              size={40}
              color="white"
              style={styles.cardIcon}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // ikonlar arası boşluk
  },
  iconButton: {
    padding: 8,
  },
  greeting: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 370,
    paddingBottom: Platform.OS === "ios" ? 120 : 100,
  },
  card: {
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    position: "relative",
  },
  cardTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  cardDesc: { color: "white", fontSize: 14, marginTop: 8, width: "80%" },
  cardIcon: { position: "absolute", right: 16, top: 20 },
});
