// app/(tabs)/appointment/confirmed.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ConfirmedPage() {
  const router = useRouter();
  const { advisorId, academicianName, date, slot } =
    useLocalSearchParams<{
      advisorId: string;
      academicianName?: string;
      date: string;
      slot: string;
    }>();

  const displayName = academicianName ?? `ID: ${advisorId}`;
  const displayDate = new Date(date).toLocaleDateString("tr-TR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Randevun Başarıyla Oluşturuldu!</Text>

      <View style={styles.details}>
        <Text style={styles.detailLabel}>Danışman</Text>
        <Text style={styles.detailValue}>{displayName}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailLabel}>Tarih & Saat</Text>
        <Text style={styles.detailValue}>
          {displayDate} @ {slot}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/appointment")}
      >
        <Text style={styles.buttonText}>Randevuları Gör</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#3b82f6",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  details: {
    width: "100%",
    marginBottom: 12,
  },
  detailLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  detailValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
});
