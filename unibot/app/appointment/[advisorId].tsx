//appointment/%5BadvisorId%5D.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppointmentService, { Advisor } from "../services/appointmentService";
import AdvisorCard from "../../components/AdvisorCard";
import { Alert } from "react-native";

export default function AdvisorDetailPage() {
  const router = useRouter();
  const { advisorId } = useLocalSearchParams<{ advisorId: string }>();
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [loading, setLoading] = useState(true);

  // Tarih & saat seçim state’leri
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ];

  useEffect(() => {
    AppointmentService.getAdvisors()
      .then((list) => {
        const found = list.find((a) => a.id === Number(advisorId));
        setAdvisor(found || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [advisorId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }
  if (!advisor) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Danışman bulunamadı.</Text>
      </View>
    );
  }

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Advisors</Text>
        <AdvisorCard
          name={advisor.name}
          title={advisor.title}
          description={advisor.info}
          onPress={() => {}}
        />

        {/* ── Tarih seçmek için button ── */}
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>

        {/* ── Modal Date Picker ── */}
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={(date) => {
            setSelectedDate(date);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        {/* ── Saat slot’ları ── */}
        <Text style={styles.subheading}>Enter Time</Text>
        <View style={styles.slotsContainer}>
          {timeSlots.map((slot) => {
            const isSelected = slot === selectedSlot;
            return (
              <TouchableOpacity
                key={slot}
                style={[styles.slot, isSelected && styles.slotSelected]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text
                  style={[
                    styles.slotText,
                    isSelected && styles.slotTextSelected,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Randevu oluştur ── */}
        <TouchableOpacity
          style={[
            styles.createButton,
            !selectedSlot && styles.createButtonDisabled,
          ]}
          disabled={!selectedSlot}
          onPress={() =>
            Alert.alert(
              "Create an Appointment",
              "Your appointment will be created, do you confirm?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Confirm",
                  onPress: async () => {
                    const res = await AppointmentService.bookAppointment(
                      advisor.id,
                      selectedDate.toISOString()
                    );
                    if (res.success) {
                      router.push({
                        pathname: "/appointment/confirmed",
                        params: {
                          advisorId: advisor.id.toString(),
                          date: selectedDate.toISOString(),
                          slot: selectedSlot!,
                        },
                      });
                    } else {
                      console.warn(res.message);
                    }
                  },
                },
              ]
            )
          }
        >
          <Text style={styles.createButtonText}>Create Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4A6CF7",
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  error: { color: "white" },
  heading: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  datePickerButton: {
    backgroundColor: "#E8E5F0",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: { fontSize: 18 },
  editIcon: { fontSize: 18 },
  subheading: {
    color: "#FFF",
    marginBottom: 8,
    fontSize: 14,
  },
  slotsContainer: {
    backgroundColor: "#E8E5F0",
    borderRadius: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    marginBottom: 24,
  },
  slot: {
    borderWidth: 1,
    borderColor: "#4A6CF7",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 6,
  },
  slotSelected: {
    backgroundColor: "#4A6CF7",
  },
  slotText: {
    color: "#4A6CF7",
    fontSize: 12,
  },
  slotTextSelected: {
    color: "#FFF",
  },
  createButton: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    fontWeight: "bold",
  },
});
