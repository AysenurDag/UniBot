// app/(tabs)/chatbot.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { askChatGpt } from "../../services/chatService";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", sender: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  // Yeni mesaj eklenince listeyi en alta kaydır
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const send = async () => {
    const text = inputText.trim();
    if (!text) return;

    // Kullanıcının mesajını ekle
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInputText("");
    Keyboard.dismiss();
    setLoading(true);

    try {
      // API’dan bot cevabını al
      const botText = await askChatGpt(text);
      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), sender: "bot", text: botText },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 2).toString(),
          sender: "bot",
          text: "Üzgünüm, bir hata oluştu.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.bubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.select({ ios: 90, android: 80 })}
      >
        {/* Mesajlar */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          style={styles.flex}
          keyboardShouldPersistTaps="handled"
        />

        {/* Loading indicator */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#888" />
          </View>
        )}

        {/* Input satırı */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Mesajınızı yazın..."
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={send} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 8,
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userBubble: {
    backgroundColor: "#3b82f6",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#333",
    alignSelf: "flex-start",
  },
  bubbleText: {
    color: "white",
    fontSize: 16,
  },
  loadingOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#333",
    padding: 8,
    backgroundColor: "#1e1e1e",
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 22,
    paddingHorizontal: 16,
    color: "white",
    backgroundColor: "#2a2a2a",
  },
  sendButton: {
    marginLeft: 8,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
});







// // app/chatbot/index.tsx
// import React, { useState, useRef, useEffect } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// interface Message {
//   id: string;
//   sender: "user" | "bot";
//   text: string;
// }

// const localQA = [
//   { question: "Merhaba", answer: "Merhaba, nasıl yardımcı olabilirim?" },
//   { question: "Nasilsin?", answer: "İyiyim, teşekkür ederim. Siz nasılsınız?" },
//   {
//     question:
//       "60 günlük stajımı iki  farklı şirkette mi yapmalıyım yoksa tek şirkette de yapabilir miyim?",
//     answer: "Evet, isterseniz tek şirkette de yapabilirsiniz.",
//   },
//   {
//     question: "Adin ne?",
//     answer: "Adım Unibot. Size nasıl yardımcı olabilirim?",
//   },
// ];

// const normalize = (str: string) =>
//   str
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9ğüşöçıİ\s]/g, "")
//     .trim();

// export default function ChatbotPage() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "0",
//       sender: "bot",
//       text: "Merhaba! Size nasıl yardımcı olabilirim?",
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const flatListRef = useRef<FlatList<Message>>(null);

//   const handleSend = (overrideText?: string) => {
//     const text = overrideText?.trim() ?? inputText.trim();
//     if (!text) return;

//     const userMsg: Message = {
//       id: Date.now().toString(),
//       sender: "user",
//       text,
//     };
//     setMessages((prev) => [...prev, userMsg]);
//     setInputText("");

//     const found = localQA.find(
//       (qa) => normalize(qa.question) === normalize(text)
//     );
//     const reply = found
//       ? found.answer
//       : "Üzgünüm, bu soruya dair kayıtlı bir yanıt bulunamadı.";

//     const botMsg: Message = {
//       id: (Date.now() + 1).toString(),
//       sender: "bot",
//       text: reply,
//     };
//     setTimeout(() => {
//       setMessages((prev) => [...prev, botMsg]);
//     }, 300);
//   };

//   useEffect(() => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   const renderItem = ({ item }: { item: Message }) => {
//     if (item.sender === "bot") {
//       return (
//         <View style={styles.botContainer}>
//           <Image
//             source={require("../../assets/images/chatbotIcon.png")}
//             style={styles.avatar}
//           />
//           <View style={[styles.bubble, styles.botBubble]}>
//             <Text style={styles.bubbleText}>{item.text}</Text>
//           </View>
//         </View>
//       );
//     } else {
//       return (
//         <View style={[styles.bubble, styles.userBubble]}>
//           <Text style={styles.bubbleText}>{item.text}</Text>
//         </View>
//       );
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.chatContainer}
//       />

//       <View style={styles.chipContainer}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {localQA.map((qa) => (
//             <TouchableOpacity
//               key={qa.question}
//               style={styles.chip}
//               onPress={() => handleSend(qa.question)}
//             >
//               <Text style={styles.chipText}>{qa.question}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.select({ ios: "padding", android: undefined })}
//         keyboardVerticalOffset={80}
//       >
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Mesajınızı yazın..."
//             placeholderTextColor="#888"
//             value={inputText}
//             onChangeText={setInputText}
//           />
//           <TouchableOpacity
//             onPress={() => handleSend()}
//             style={styles.sendButton}
//           >
//             <Ionicons name="send" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#121212" },
//   chatContainer: { padding: 16 },
//   bubble: {
//     maxWidth: "80%",
//     padding: 12,
//     borderRadius: 12,
//     marginVertical: 6,
//   },
//   userBubble: {
//     alignSelf: "flex-end",
//     backgroundColor: "#3b82f6",
//   },
//   botContainer: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     marginRight: 8,
//     borderRadius: 18,
//   },
//   botBubble: {
//     alignSelf: "flex-start",
//     backgroundColor: "#333",
//   },
//   bubbleText: { color: "white", fontSize: 16 },
//   chipContainer: {
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderColor: "#333",
//     backgroundColor: "#1e1e1e",
//   },
//   chip: {
//     backgroundColor: "#333",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     marginHorizontal: 6,
//   },
//   chipText: { color: "white", fontSize: 14 },
//   inputRow: {
//     flexDirection: "row",
//     padding: 8,
//     borderTopWidth: 1,
//     borderColor: "#333",
//     backgroundColor: "#1e1e1e",
//   },
//   input: {
//     flex: 1,
//     height: 48,
//     borderWidth: 1,
//     borderColor: "#444",
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     color: "white",
//   },
//   sendButton: {
//     width: 48,
//     height: 48,
//     marginLeft: 8,
//     borderRadius: 24,
//     backgroundColor: "#3b82f6",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
