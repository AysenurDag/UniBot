//app/services/appointmentService.ts
import axios from "axios";
import api from './apiClient'
import { Alert } from "react-native";
import { router } from "expo-router";
export interface Advisor { /* … */ }

export interface Advisor {
  id: number;
  firstName: string;
  lastName: string;
  title:      string;
  department: string;
   
}
export interface Availability {
  startTime: string  // ISO string
  endTime:   string
}

const USE_MOCK = false;
 

/** Seçilen akademisyen ve güne ait availability bloklarını döner */
export async function getAvailability(
  advisorId: number,
  date: string       // "YYYY-MM-DD"
): Promise<Availability[]> {
  const { data } = await api.get<Availability[]>(
    `/Availability/${advisorId}/${date}`
  );
  return data;
}

// Danışman listesini  API’dan çeker
export async function getAdvisors(): Promise<Advisor[]> {
  // GET /api/Academician/GetAll
  const { data } = await api.get<Advisor[]>('/Academician/GetAll')
  return data
}

/**
 * Yeni randevu oluşturur.
 * Body şeması CreateAppointmentDto:
 * {
 *   startTime:    string; // ISO formatlı tarih
 *   reason:       string;
 *   academicianId: number;
 * }
 */
export async function bookAppointment(
  advisorId: number,
  isoDate: string,
  reason = "No reason provided"
): Promise<{ success: boolean; message?: string }> {
  const payload = {
    startTime: isoDate,
    reason,
    academicianId: advisorId,
  };
  try {
    const { data } = await api.post<{
      success: boolean;
      message?: string;
    }>("/Appointment", payload);
    return data;
  } catch (err: any) {
  //     Alert.alert(
  //   "Randevu Oluşturulamadı",
  //   err.message,              
  //   [
  //     { text: "Tamam", onPress: () => router.replace("/") }
  //   ]
  // );
  

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Booking failed",
    };
  }
}
