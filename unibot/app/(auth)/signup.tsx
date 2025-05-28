// app/signup.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignupPage() {
  const router = useRouter();

  // Rol seçimi: öğrenci mi, danışman mı?
  const [role, setRole] = useState<"student" | "advisor">("student");

  // Form alanları
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // TODO: validation + API çağrısı
    // Başarılıysa login sayfasına veya ana sekmeye yönlendirme
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Rol seçimi */}
      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "student" && styles.roleButtonActive,
          ]}
          onPress={() => setRole("student")}
        >
          <Text
            style={[
              styles.roleText,
              role === "student" && styles.roleTextActive,
            ]}
          >
            Student
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "advisor" && styles.roleButtonActive,
          ]}
          onPress={() => setRole("advisor")}
        >
          <Text
            style={[
              styles.roleText,
              role === "advisor" && styles.roleTextActive,
            ]}
          >
            Advisor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ortak alanlar */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Sadece öğrenci rolünde */}
      {role === "student" && (
        <TextInput
          style={styles.input}
          placeholder="Student Number"
          placeholderTextColor="#888"
          value={studentNumber}
          onChangeText={setStudentNumber}
          keyboardType="number-pad"
        />
      )}

      {/* Ortak alanlar */}
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

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={[styles.footerText, styles.link]}>Log In</Text>
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
  roleSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  roleText: {
    color: "#bbb",
    fontSize: 16,
  },
  roleTextActive: {
    color: "white",
    fontWeight: "bold",
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
