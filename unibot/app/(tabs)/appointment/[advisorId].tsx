// app/(tabs)/appointment/[advisorId].tsx

import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useRouter, useLocalSearchParams } from 'expo-router'
import {
  Advisor,
  getAdvisors,
  getAvailability,
  bookAppointment,
} from '../../../services/appointmentService'

export default function AdvisorDetailPage() {
  const router = useRouter()
  const { advisorId } = useLocalSearchParams<{ advisorId: string }>()

  const [advisor, setAdvisor] = useState<Advisor | null>(null)
  const [loading, setLoading] = useState(true)

  // 🎯 yeni: kullanıcıdan alınacak reason alanı
  const [reason, setReason] = useState<string>('')

  // Takvim & slot seçimi
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [slots, setSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  // 1) Advisor’ı getir
  useEffect(() => {
    getAdvisors()
      .then(list => {
        setAdvisor(list.find(a => a.id === +advisorId) ?? null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [advisorId])

  // 2) Tarih veya advisor değişince availability’i çek
  useEffect(() => {
    if (!advisor) return
    const day = selectedDate.toISOString().split('T')[0] // "YYYY-MM-DD"
    getAvailability(advisor.id, day)
      .then(avails => {
        const computed: string[] = []
        avails.forEach(({ startTime, endTime }) => {
          const start = new Date(startTime)
          const end = new Date(endTime)
          const cur = new Date(start)
          while (cur < end) {
            computed.push(
              cur.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            )
            cur.setMinutes(cur.getMinutes() + 15)
          }
        })
        setSlots(computed)
        setSelectedSlot(null)
      })
      .catch(err => {
        console.error('Availability yüklenirken hata', err)
        setSlots([])
      })
  }, [advisor, selectedDate])

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    )
  if (!advisor)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Danışman bulunamadı.</Text>
      </View>
    )

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {advisor.firstName} {advisor.lastName}
      </Text>
      <Text style={styles.subheading}>{advisor.title}</Text>

      {/* Tarih seç */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.editIcon}>✎</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={date => {
          setSelectedDate(date)
          setShowDatePicker(false)
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Slot’lar */}
      <Text style={styles.subheading}>Available Times</Text>
      <View style={styles.slotsContainer}>
        {slots.length === 0 ? (
          <Text style={{ color: 'white' }}>No slots available</Text>
        ) : (
          slots.map(slot => {
            const isSelected = slot === selectedSlot
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
            )
          })
        )}
      </View>

      {/* 🎯 Reason alanı */}
      <Text style={styles.subheading}>Reason</Text>
      <TextInput
        style={styles.reasonInput}
        placeholder="Randevu sebebinizi yazın…"
        placeholderTextColor="#666"
        value={reason}
        onChangeText={setReason}
      />

      {/* Randevu oluştur */}
      <TouchableOpacity
        style={[
          styles.createButton,
          (!selectedSlot || !reason.trim()) && styles.createButtonDisabled,
        ]}
        disabled={!selectedSlot || !reason.trim()}
        onPress={async () => {
          const iso = new Date(
            `${selectedDate.toISOString().split('T')[0]}T${selectedSlot}:00`
          ).toISOString()

          const res = await bookAppointment(
            advisor.id,
            iso,
            reason.trim() || '–'
          )

          if (res.success) {
            router.push({
              pathname: '/appointment/confirmed',
              params: {
                advisorId: advisor.id.toString(),
                date: iso,
                slot: selectedSlot!,
              },
            })
          } else {
            
            Alert.alert(
              "Randevu Oluşturulamadı",
              res.message!,
              [{ text: "Tamam", onPress: () => {/* router.goBack() */ } }]
            );
          }
        }}
      >
        <Text style={styles.createButtonText}>Create Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A6CF7',
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  error: { color: 'white' },
  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  datePickerButton: {
    backgroundColor: '#E8E5F0',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: { fontSize: 18 },
  editIcon: { fontSize: 18 },
  subheading: {
    color: '#FFF',
    marginBottom: 8,
    fontSize: 14,
  },
  slotsContainer: {
    backgroundColor: '#E8E5F0',
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    marginBottom: 24,
  },
  slot: {
    borderWidth: 1,
    borderColor: '#4A6CF7',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 6,
  },
  slotSelected: {
    backgroundColor: '#4A6CF7',
  },
  slotText: {
    color: '#4A6CF7',
    fontSize: 12,
  },
  slotTextSelected: {
    color: '#FFF',
  },
  reasonInput: {
    backgroundColor: '#E8E5F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    color: '#000',
  },
  createButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    fontWeight: 'bold',
  },
})
