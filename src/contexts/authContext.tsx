import Proxy from "@/shared/Proxy";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { userInterface } from "@/shared/defineTypes";

interface AuthContextType {
  currentUser: userInterface | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: async () => {},
});

type Props = {
  children: any;
}

const AuthContextProvider = ({children}:Props) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || "null") || null) 

    const login = async (inputs:any) => {
        const res = await axios.post(`${Proxy}/auth/login`, inputs) 
        setCurrentUser(res.data)
    }

    const logout = async () => {
        await axios.post(`${Proxy}/auth/logout`)
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])
    
    // console.log(`===>currentUser ${currentUser.username}`)

    return(
      <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthContextProvider