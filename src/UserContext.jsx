import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false)

    useEffect(() => {
        // Fetch user profile only if the user is not already set
        if (!user) {
            axios.get('/profile', { withCredentials: true }) // Ensure cookies are sent
                .then(response => {
                    setUser(response.data); // Update user state with the response data
                    setReady(true)
                })
                .catch(error => {
                    console.error("Error fetching profile:", error); // Handle errors (e.g. user not logged in)
                });
        }
    }, [user]); // Dependency array ensures this runs when 'user' changes

    return (
        <UserContext.Provider value={{ user, setUser,ready }}>
            {children}
        </UserContext.Provider>
    );
}
