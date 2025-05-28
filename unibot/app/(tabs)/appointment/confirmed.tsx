// app/appointment/confirmed.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function ConfirmedPage() {
  const router = useRouter()
  const { advisorId, date, slot } = useLocalSearchParams<{
    advisorId: string
    date: string
    slot: string
  }>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your appointment is confirmed!</Text>
      <Text style={styles.detail}>
        Advisor: {advisorId}
      </Text>
      <Text style={styles.detail}>
        When: {new Date(date).toLocaleDateString()} @ {slot}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#4A6CF7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
