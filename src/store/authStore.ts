import { create } from "zustand";
import type { LoginResponse } from "../api/authService";


// shape of zustand store
interface AuthState {
  user: LoginResponse | null;
  token: string | null;
 
  login: (userData: LoginResponse) => void;
  logout: () => void;
}
 
export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
 
  token: localStorage.getItem("token"),
 
  login: (userData) => {
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
 
    set({
      user: userData,
      token: userData.accessToken,
    });
  },
 
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
 
    set({
      user: null,
      token: null,
    });
  },
}));