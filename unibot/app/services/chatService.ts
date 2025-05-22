// app/services/chatService.ts
export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
}

// Örnek: backend’e POST atıp cevabı döndüren fonksiyon
export async function sendMessageToBot(userText: string): Promise<string> {
  try {
    const res = await fetch("https://your-api-endpoint.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });
    const json = await res.json();
    return json.reply as string;
  } catch (err) {
    console.error(err);
    return "Sorry, something went wrong.";
  }
}
