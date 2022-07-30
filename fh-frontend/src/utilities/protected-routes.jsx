import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ user, adminRoute, children }) {
    if (!user) return <Navigate to={"/login"} replace />;
    if (adminRoute && user.administrator !== 1) return <Navigate to={"/"} />;

    return (children);
};