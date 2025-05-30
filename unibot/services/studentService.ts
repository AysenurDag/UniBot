// app/services/studentService.ts
import api from "./apiClient";

export interface Notification {
  id: number;
  message: string;
  createdAt: string;
}

export async function getNotifications(): Promise<Notification[]> {
  const { data } = await api.get<Notification[]>("/Student/notifications");
  return data;
}
