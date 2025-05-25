//app/(tabs)/index.tsx
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const role = "student";
  const studentId = "20xx0808xxx";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={24} color="white" />
        <View style={styles.userInfo}>
          <Text style={styles.userId}>{studentId}</Text>
          <Text style={styles.roleText}>
            {role === "student" ? "Student" : "Advisor"}
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <FontAwesome name="user" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* İçerik scrollable */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          Hello, {role === "student" ? "Student" : "Advisor"}
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/chatbot")}
        >
          <Text style={styles.cardTitle}>Ask a question to the chatbot</Text>
          <Text style={styles.cardDesc}>
            Courses, exams, internship, graduation — any subject you can't find
            the answer to.
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 120 : 100, // Tab bar + swipe line için boşluk 💅
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userId: { color: "white", fontSize: 14, marginRight: 8 },
  roleText: { color: "white", fontSize: 16, fontWeight: "bold" },
  greeting: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
