import React from 'react';

import AuthProvider from './providers/auth';

import FromHost from './fromhost';

export default function Application() {
    return (
        <React.StrictMode>
            <AuthProvider>
                <FromHost />
            </AuthProvider>
        </React.StrictMode>
    );
};