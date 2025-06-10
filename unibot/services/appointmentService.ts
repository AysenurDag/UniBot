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
  title: string;
  department: string;

}
export interface Availability {
  startTime: string  // ISO string
  endTime: string
}

interface AppointmentDto {
  id: number;
  startTime: string;
  endTime: string;
  reason: string;
  status: number;
  studentId: number;
  academicianId: number;
  academicianName: string;
  studentName: string;
}

export interface AppointmentSummary {
  id: number;
  startTime: string;
  endTime: string;
  studentName: string;
  academicianName: string;
  status: number;
  reason?: string;
}

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
    // Eğer HTTP 2xx geldiyse catch tetiklenmez:
    await api.post("/Appointment", payload);
    return { success: true };
  } catch (err: any) {
    // Hata kodu gelirse burası çalışır
    const message =
      err.response?.data?.message ||
      err.response?.data ||
      err.message ||
      "Booking failed";
    return { success: false, message };
  }
}


export async function getMyAppointments(): Promise<AppointmentSummary[]> {
  // 1) önce tam DTO’yu çek
  const { data } = await api.get<AppointmentDto[]>("/Appointment/me");

  // yalnızca ihtiyacımız olan alanları dön
  return data.map((a) => ({
    id: a.id,
    startTime: a.startTime,
    endTime: a.endTime,
    studentName: a.studentName,
    academicianName: a.academicianName,
    status: a.status,
    reason: a.reason || "No reason provided",
  }));

}
