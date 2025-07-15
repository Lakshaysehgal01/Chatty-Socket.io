import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { FormProps } from "../pages/Signup";
import { toast } from "sonner";
import type { LoginProps } from "../pages/Login";

type AuthUser = {
  _id: string;
  fullName: string;
  profilePic: string;
};

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: FormProps) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LoginProps) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: " + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: FormProps) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully");
    } catch (error) {
      console.log("Error " + error);
      toast.error("Error while signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
    } catch (error) {
      console.log("Error in logout :" + error);
    }
  },
  login: async (data: LoginProps) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
    } catch (error) {
      console.log("Error " + error);
      toast.error("Error while login ");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
