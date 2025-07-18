import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

type User = {
  _id: string;
  fullName: string;
  profilePic: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
};

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;
  getUser: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("Error in finding the Users");
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error while loading Messages");
      console.log(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
