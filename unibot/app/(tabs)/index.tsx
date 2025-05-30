import { FontAwesome, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import {
  Animated,
  Easing,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();
  const handleLogout = async () => {
  await AsyncStorage.removeItem("jwtToken");
  router.replace("/login");    // Auth stack’ine gidiyor
};

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 60000, // 1 tur = 60 saniye
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Star Background */}
      <Animated.Image
        source={require("../../assets/images/star-bg.png")}
        style={[styles.stars, { transform: [{ rotate: spin }] }]}
        resizeMode="cover"
      />
      {/* Lottie Background */}
      <LottieView
        source={require("../../assets/animations/robot-wave.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      {/* Dark Overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.95)"]}
        style={styles.overlay}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons
                  name="notifications-outline"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
           onPress={handleLogout}
                style={styles.iconButton}
              >
                <FontAwesome name="user" size={28} color="white" />
              </TouchableOpacity> */}
            </View>
          </View>

          {/* İçerik */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animatable.View animation="pulse" iterationCount="infinite">
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/chatbot")}
              >
                <Text style={styles.cardTitle}>
                  Ask a question to the chatbot
                </Text>
                <Text style={styles.cardDesc}>
                  Courses, exams, internship, graduation — any subject you can't
                  find the answer to.
                </Text>
                <Ionicons
                  name="chatbubbles-outline"
                  size={40}
                  color="white"
                  style={styles.cardIcon}
                />
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              delay={1000}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push("/appointment/advisors")}
              >
                <Text style={styles.cardTitle}>Make an appointment</Text>
                <Text style={styles.cardDesc}>
                  Schedule a meeting with academic advisors.
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={40}
                  color="white"
                  style={styles.cardIcon}
                />
              </TouchableOpacity>
            </Animatable.View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  stars: {
    position: "absolute",
    width: "200%",
    height: "200%",
    top: -200,
    left: -100,
    opacity: 0.05,
    zIndex: 0,
  },
  lottie: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    width: "100%",
    height: 400,
    zIndex: 1, // -1'di, 1 yaptık ki üstte kalsın
    opacity: 1, // görünmezse diye 1 yaptık
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  greeting: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 400,
    paddingBottom: Platform.OS === "ios" ? 120 : 100,
  },
  card: {
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDesc: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
    width: "80%",
  },
  cardIcon: {
    position: "absolute",
    right: 16,
    top: 20,
  },
});
