import { Dispatch, SetStateAction, createContext } from "react";
import { Auth } from "../types/auth";

export type AuthContextType = {
  auth: Auth | null;
  setAuth: Dispatch<SetStateAction<Auth | null>>;
};

export default createContext<AuthContextType>({} as AuthContextType);
