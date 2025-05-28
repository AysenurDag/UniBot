// app/appointment/index.tsx
import React, { useEffect, useState } from 'react'
import { ScrollView, ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import AdvisorCard from '../../../components/AdvisorCard'
import { getAdvisors, Advisor } from '../../../services/appointmentService'
import { useRouter } from 'expo-router'

export default function AppointmentList() {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string|null>(null)
  const router = useRouter()

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
    <ScrollView style={styles.container}>
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
