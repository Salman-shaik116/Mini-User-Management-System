import { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const didToastRef = useRef(false);

    useEffect(() => {
        if (loading) return;
        if (didToastRef.current) return;

        if (!user) {
            toast.error("You must be logged in to access this page");
            didToastRef.current = true;
            return;
        }

        if (allowedRoles && !allowedRoles.includes(user.role)) {
            toast.error("Access denied: insufficient permissions");
            didToastRef.current = true;
        }
    }, [allowedRoles, loading, user]);

    // Still checking auth
    if (loading) {
        return (
            <Box sx={{ py: 6 }}>
                <Spinner />
                <Typography variant="body2" color="text.secondary" align="center">
                    Checking session...
                </Typography>
            </Box>
        );
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role restriction (admin-only etc.)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
