import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Advisor } from "../services/appointmentService";
import AppointmentService from "../services/appointmentService";
import AdvisorCard from "../../components/AdvisorCard";
import { useRouter } from "expo-router";


export default function AppointmentPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    AppointmentService.getAdvisors()
      .then((data) => {
        setAdvisors(data);
      })
      .catch((err) => {
        console.error("Danışmanlar alınırken hata:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
     return <ScrollView style={styles.container} />;
   }

  return (
    <ScrollView style={styles.container}>
      {advisors.map((adv) => (
        <AdvisorCard
          key={adv.id}
          name={adv.name}
          title={adv.title}
          description={adv.info}
          onPress={() => {
            // Danışman kartına tıklandığında detay sayfasına yönlendir
               router.push(`/appointment/${adv.id}`);
   
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
});
