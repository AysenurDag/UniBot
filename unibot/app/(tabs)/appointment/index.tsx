import React, { useEffect, useState, useRef } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  PanResponder,
} from 'react-native'
import { useRouter } from 'expo-router'
import AdvisorCard from '../../../components/AdvisorCard'
import { getAdvisors, Advisor } from '../../../services/appointmentService'

export default function AppointmentList() {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string|null>(null)
  const router = useRouter()

  // ➊ PanResponder ayarı: sağa kaydırınca anasayfaya dön
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 20 && Math.abs(gesture.dy) < 20
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 50) {
          router.push('/')      
        }
      },
    })
  ).current

  useEffect(() => {
    getAdvisors()
      .then(setAdvisors)
      .catch(e => {
        console.error(e)
        setError('Danışmanlar yüklenemedi.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    )

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white' }}>{error}</Text>
      </View>
    )

  return (
    // ➋ panHandlers ekledik
    <ScrollView
      style={styles.container}
      {...panResponder.panHandlers}
    >
      {advisors.map(a => (
        <AdvisorCard
          key={a.id}
          name={a.firstName + ' ' + a.lastName}
          title={a.title ?? a.department}
          description={a.department}
          onPress={() => router.push(`/appointment/${a.id}`)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#121212' },
  center:    { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#121212' }
})
