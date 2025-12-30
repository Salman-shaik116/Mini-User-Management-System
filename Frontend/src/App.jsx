import { BrowserRouter, Routes, Route } from "react-router-dom";


import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Authenticated routes */}

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin-only route */}
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <AdminUsers />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
