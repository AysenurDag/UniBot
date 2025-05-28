// app/services/apiClient.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../constants/api";
import { router } from "expo-router"; // response interceptor’da kullanacağız

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — her isteği logla, token ekle
apiClient.interceptors.request.use(
  async (config) => {
    const fullUrl = `${config.baseURL ?? ""}${config.url}`;
    console.log("→ AXIOS REQ:", config.method?.toUpperCase(), fullUrl);

    if (config.url?.endsWith("/auth/login")) {
      console.log("→ LOGIN BODY:", config.data);
    }

    const token = await AsyncStorage.getItem("jwtToken");
    console.log("→   With token:", token ? token.slice(0, 10) + "…" : null);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("→ REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);

// Response interceptor — cevabı veya hatayı logla, 401’se logout et
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `↩️ AXIOS RES ${response.status}:`,
      response.config.url,
      response.data
    );
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    console.warn("↩️ AXIOS ERR:", status, data);

    if (status === 401) {
      console.log("🔒 401 detected, logging out…");
      await AsyncStorage.removeItem("jwtToken");
      router.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default apiClient;




// // UNIBOT/unibot/app/services/apiClient.ts
// // =======================================
// import axios, { AxiosInstance } from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { API_BASE } from '../../constants/api'

// const api: AxiosInstance = axios.create({
//   baseURL: API_BASE,
//   headers: { 'Content-Type': 'application/json' },
// })

// // Her isteğe AsyncStorage’daki token’ı ekle
// api.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('accessToken')
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => Promise.reject(error)
// )

// export default api