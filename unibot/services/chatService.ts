// app/services/chatService.ts


import apiClient from "./apiClient";

export interface ChatGptResponse {
  response: string;        
}

export async function askChatGpt(userMessage: string): Promise<string> {
  const { data } = await apiClient.post<ChatGptResponse>(
    "/chatgpt/ask",
    { userMessage }
  );
  return data.response;     
}






