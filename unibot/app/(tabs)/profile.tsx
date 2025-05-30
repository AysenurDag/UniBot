// app/(tabs)/profile.tsx
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
  await AsyncStorage.removeItem("jwtToken");
  router.replace("/login");    // Auth stack’ine gidiyor
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>Student Name</Text>
            <Text style={styles.name}>Surname</Text>
          </View>
          <Ionicons name="person" size={64} color="white" />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>20xx0808xxx</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Computer Engineering</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>4th Year</Text>
        </View>

        <TouchableOpacity
          style={[styles.infoBox, styles.exitButton]}
             onPress={handleLogout}
        >
          <Text style={styles.infoText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  card: {
    flex: 1, // ✨ Tüm ekranı kapla
    backgroundColor: "#121212",
    padding: 24,
    borderRadius: 0, 
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
    backgroundColor: "rgba(59,130,246,0.05)", // soft blue background
  },
  infoText: {
    fontSize: 18,
    color: "white",
  },
  exitButton: {
    backgroundColor: "transparent",
  },
});
