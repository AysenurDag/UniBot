// app/login.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService, { LoginRequest } from "../../services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Eksik alan", "Email ve şifre doldurulmalı");
      return;
    }

      // Burada body’yi logluyoruz:
  console.log("LOGIN BODY:", { email, password, role: "Student" });
    setLoading(true);
  try {
  const req: LoginRequest = { email, password, role: "Student" };
  const token = await AuthService.login(req);
  console.log("🎉 Got token:", token);
  await AsyncStorage.setItem("jwtToken", token);
  router.replace("/(tabs)");
} catch (err: any) {
  console.error("LOGIN ERROR:", err.response?.data ?? err.message);
  Alert.alert("Giriş Hatası", err.response?.data ?? err.message);
} finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in…" : "Log In"}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={[styles.footerText, styles.link]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "white",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#bbb",
    fontSize: 14,
  },
  link: {
    color: "#3b82f6",
    fontWeight: "bold",
  },
});














































