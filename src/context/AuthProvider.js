import {createContext, useState} from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({});
    const [admin,setAdmin] = useState({});

    const logout = () => {
        setAuth({});
        // setIsLoggedIn(false);
      };

    const Adminlogout = () => {
        setAdmin({});
    }

    return(
        <AuthContext.Provider value={{auth, setAuth,logout,admin,setAdmin,Adminlogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;