import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AppointmentConfirmed() {
  const { advisorId, date, slot } = useLocalSearchParams<{
    advisorId: string;
    date: string;
    slot: string;
  }>();

  // Eğer gerekirse, advisor detayını yeniden çekebiliriz
  // Şimdilik mock isim kullanıyorum:
  const advisorName = `Advisor #${advisorId}`;

  const dt = new Date(date);
  const day = dt.getDate();
  const month = dt.toLocaleString("en-US", { month: "short" });

  // Mock öğrenci bilgisi; gerçek kullanıcıdan çekebiliriz
  const studentName = "Student Name";
  const studentSurname = "Surname";

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Bar: Öğrenci Adı + Avatar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.studentName}>{studentName}</Text>
          <Text style={styles.studentName}>{studentSurname}</Text>
        </View>
        <View style={styles.avatarPlaceholder} />
      </View>

      {/* Onaylandıktan Sonra Gösterilecek Kart */}
      <View style={styles.card}>
        <View style={styles.dateBox}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.advisorName}>{advisorName}</Text>
          <Text style={styles.slotText}>{slot}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  studentName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
  },

  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  dateBox: {
    backgroundColor: "#4A6CF7",
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
    alignItems: "center",
  },
  dateDay: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  dateMonth: {
    color: "#FFF",
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  advisorName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  slotText: {
    color: "#E0E0E0",
    fontSize: 14,
  },
});
