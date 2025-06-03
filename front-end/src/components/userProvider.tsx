"use client";

import {
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { api, setAuthToken } from "@/axios";
import { useRouter } from "next/navigation";
export type profileType = {
  name: string;
  avatarImage: string;
  about: string;
  socialMediaUrl: string;
  backgroundImage: string;
  successMessage: string;
};
type bankCardType = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  CVC: string;
};
export type donationType = {
  amount: number;
  specialMessage: string;
  sender: { profile: profileType; specialMessage: string };
  createdAt: Date;
};
type User = {
  name: string;
  email: string;
  password: string;
  username: string;
  id: number;
  profile?: profileType;
  bankCard?: bankCardType;
  receivedDonations?: [donationType];
};

type AuthContextType = {
  user?: User;
  setAuthToken: (token: string | null) => void;
  signOut: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  getUser: () => Promise<void>;
};

const authContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  // const [loading, setLoading] = useState(false);,
  const Router = useRouter();
  const signOut = async () => {
    localStorage.removeItem("token");
    Router.push("/signup");
    setUser(undefined);
  };

  const getUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("asdasd", error);
      // localStorage.removeItem("token");
      // setUser(undefined);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser();
  }, []);

  return (
    <authContext.Provider
      value={{ user, signOut, setUser, getUser, setAuthToken }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
