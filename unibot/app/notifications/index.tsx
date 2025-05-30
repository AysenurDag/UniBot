// app/notifications/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { getNotifications, Notification } from "../../services/studentService";

export default function NotificationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNotifications()
      .then(setNotifications)
      .catch((err) => {
        console.error(err);
        setError("Bildirimler yüklenemedi.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Yeni bildirim yok.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>
            {new Date(item.createdAt).toLocaleString("tr-TR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  list: {
    backgroundColor: "#121212",
    padding: 16,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    color: "#888",
    fontSize: 12,
    textAlign: "right",
  },
  empty: {
    color: "#888",
    fontSize: 16,
  },
  error: {
    color: "#f87171",
    fontSize: 16,
  },
});
