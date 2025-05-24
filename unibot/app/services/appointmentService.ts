//app/services/appointmentService.ts
import axios from "axios";

export interface Advisor {
  id: number;
  name: string;
  title?: string;
  info: string;
  avatarUrl?: string;
}

const USE_MOCK = true;

const mockAdvisors: Advisor[] = [
  {
    id: 1,
    name: "Prof. Dr. Alper Bilge ",
    title: "Computer Science",
    info: "Uzman yapay zeka ve dağıtık sistemler.",
    avatarUrl: undefined,
  },
  {
    id: 2,
    name: "Dr. Öğr. Üyesi Murat AK ",
    title: "Computer Science",
    info: "Information security and network security.",
    avatarUrl: undefined,
  },
  // …başka mock veriler
];

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Backend API URL
  headers: { "Content-Type": "application/json" },
});

export default class AppointmentService {
  /**
   * Danışman listesini döner.
   * Şu anda mock data kullanıyor; backend bağlandığında
   * USE_MOCK = false yapıp gerçek endpoint’ kullanılacak
   */
  static async getAdvisors(): Promise<Advisor[]> {
    if (USE_MOCK) {
      return Promise.resolve(mockAdvisors);
    }
    const { data } = await api.get<Advisor[]>("/getAllAcademician");
    return data;
  }

  /**
   * Seçilen danışman için randevu oluşturur.
   * @param advisorId Danışman ID
   * @param date      ISO formatlı tarih stringi
   */
  static async bookAppointment(
    advisorId: number,
    date: string
  ): Promise<{ success: boolean; message?: string }> {
    if (USE_MOCK) {
      console.log(`Mock booking: advisor ${advisorId} at ${date}`);
      return Promise.resolve({
        success: true,
        message: "Mock randevu oluşturuldu.",
      });
    }
    const payload = {
      academicianId: advisorId,
      appointmentDate: date,
    };
    const { data } = await api.post<{ success: boolean; message?: string }>(
      "/bookAppointment",
      payload
    );
    return data;
  }
}
