import { createContext , useContext } from "react";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const isAuthenticated = false; // Replace with actual authentication logic
    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

}




