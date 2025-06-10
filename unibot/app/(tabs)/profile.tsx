// app/(tabs)/profile.tsx
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    router.replace("/login");
  };

  useEffect(() => {
    AsyncStorage.getItem("jwtToken")
      .then((token) => {
        if (token) {
          const decoded = jwtDecode<JwtPayload>(token);
          setFullName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
          setEmail(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "");
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.name}>{fullName}</Text>
        </View>
        <Ionicons name="person" size={64} color="white" />
      </View>

      {/* E-posta */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{email}</Text>
      </View>

      {/* Exit butonu */}
      <TouchableOpacity
        style={[styles.infoBox, styles.exitButton]}
        onPress={handleLogout}
      >
        <Text style={styles.infoText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  name: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
  },
  infoBox: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "rgba(59,130,246,0.05)",
  },
  infoText: {
    fontSize: 18,
    color: "white",
  },
  exitButton: {
    backgroundColor: "transparent",
  },
});
