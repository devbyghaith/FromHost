import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoutes from './utilities/protected-routes';
import pages from './pages';
import { useUser } from './providers/auth';

export default function FromHost() {
    var user = useUser();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"}>
                    <Route index element={<Navigate to={"/dashboard"} />} />
                    <Route path={"login"} element={<pages.authentication.login />} />
                    <Route path={"dashboard"}>
                        <Route index element={<ProtectedRoutes user={user} children={<pages.dashboard.main />} />} />
                        <Route path={"my-products"} element={<ProtectedRoutes user={user} children={<pages.dashboard.clients.myProducts />} />} />
                        <Route path={"admin"}>
                            <Route path={"activations"} element={<ProtectedRoutes user={user} adminRoute={true} children={<pages.dashboard.admins.activations />} />} />
                            <Route path={"products"} element={<ProtectedRoutes user={user} adminRoute={true} children={<pages.dashboard.admins.products />} />} />
                            <Route path={"clients"} element={<ProtectedRoutes user={user} adminRoute={true} children={<pages.dashboard.admins.clients />} />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};