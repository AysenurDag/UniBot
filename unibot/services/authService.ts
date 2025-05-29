// app/services/authService.ts
import apiClient from "./apiClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  studentNumber: string;
  email: string;
  password: string;
}

export default class AuthService {
  /** Log in as a Student  */
  static async login(req: LoginRequest): Promise<string> {
    const payload = { ...req, role: "Student" as const };
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/login",
      payload
    );
    return data.accessToken;
  }

  /** Register a new Student */
  static async register(req: RegisterRequest): Promise<void> {
    await apiClient.post("/auth/register", req);
  }
}



