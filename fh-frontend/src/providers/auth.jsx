import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import pages from "../pages";

const updateUserContext = createContext();
const userContext = createContext();

export const useUser = () => useContext(userContext);
export const useUpdateUser = () => useContext(updateUserContext);

export default function AuthProvider({ children, ...props }) {
    var [loading, setLoading] = useState(true);
    var [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost/auth/@me", {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json()).then((response) => {
            if (!response.error && response.data) setUser(response.data);

            setLoading(false);
        }).catch((error) => {
            setLoading(false);
        });
    }, []);

    function updateUser() {
        fetch("http://localhost/auth/@me", {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json()).then((response) => {
            if (!response.error && response.data) setUser(response.data);
            
            setLoading(false);
        }).catch((error) => {});
    };

    return (
        <userContext.Provider value={user}>
            <updateUserContext.Provider value={updateUser}>
                {loading ? <pages.loading /> : children}
            </updateUserContext.Provider>
        </userContext.Provider>
    );
};