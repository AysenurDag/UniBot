// app/services/authService.ts
import apiClient from "./apiClient";

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}
// Backend response şöyle gözüküyor:
// {
//   "accessToken": "...",
//   "refreshToken": "…"
// }
export interface LoginResponse {
  accessToken: string;
  // eğer lazım olursa refreshToken da ekleyebilirsiniz
  refreshToken?: string;
}

export default class AuthService {
  static async login(req: LoginRequest): Promise<string> {
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/login",
      req
    );
    // Önceden data.token diyor olabilir, ama Swagger'da accessToken dönüyor:
    return data.accessToken;
  }
}