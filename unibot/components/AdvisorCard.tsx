import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export interface AdvisorCardProps {
  name: string;
  title?: string;
  description: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function AdvisorCard({
  name,
  title,
  description,
  onPress,
}: AdvisorCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <FontAwesome name="user-circle-o" size={40} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A6CF7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  title: {
    color: "#E0E0E0",
    fontSize: 14,
    marginBottom: 6,
  },
  description: {
    color: "#E0E0E0",
    fontSize: 12,
    lineHeight: 18,
  },
  icon: {
    color: "#FFFFFF",
  },
});
