import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getMyAppointments, AppointmentSummary } from "../../../services/appointmentService";  

// Randevu durumları için etiketler
const statusLabels = ["Pending", "Approved", "Rejected"];

export default function MyAppointmentsPage() {
    const [items, setItems] = useState<AppointmentSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API'den randevuları çek
        getMyAppointments()
            .then(setItems) // Randevular başarıyla çekilirse state'i güncelle
            .catch(err => console.error("Randevular yüklenirken hata oluştu:", err)) // Hata durumunda konsola yaz
            .finally(() => setLoading(false)); // Yükleme durumunu bitir
    }, []); // Sadece bir kere çalışması için boş dependency array

    // Yükleme durumunda ActivityIndicator göster
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    // Hiç randevu yoksa mesaj göster
    if (items.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.empty}>Henüz randevunuz yok.</Text>
            </View>
        );
    }

    // Randevular varsa FlatList ile listele
    return (
        <FlatList
            data={items} // Listelenecek veri
            keyExtractor={item => item.id.toString()}  
              style={{ flex:1, backgroundColor:'#121212' }}
            contentContainerStyle={styles.list} // Listeye stil
            renderItem={({ item }) => ( // Her bir randevu öğesini render et

                <View style={styles.card}>
                    <Text style={styles.title}>{item.academicianName}</Text>

                    {/* Tek Text içinde hem tarih, hem saat, hem dash */}
                    <Text style={styles.cardText}>
                        {new Date(item.startTime).toLocaleDateString()}{" "}
                        {new Date(item.startTime).toLocaleTimeString()}{" "}
                        –{" "}
                        {new Date(item.endTime).toLocaleTimeString()}
                    </Text>

                    <Text style={styles.cardText}>
                        Status: {statusLabels[item.status]}
                    </Text>
                    <Text style={styles.cardText}>
                        Reason: {item.reason}
                    </Text>
                </View>

            )}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Arka plan rengini 
    },
    empty: {
        color: "#888",
        fontSize: 16,
    },
    list: {
        padding: 16,
        backgroundColor: "#121212", // Listeye arka plan rengi  
    },
    card: {
        backgroundColor: "#1e1e1e", // Kartın arka planı
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000", // Shadow ekledim
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    cardText: {
        color: "#ccc", // Karttaki yazıların rengi 
        fontSize: 14,
        marginBottom: 2,
    }
});