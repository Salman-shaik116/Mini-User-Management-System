import { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

import {
    AppBar,
    Box,
    Button,
    Chip,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = async () => {
        await logout();
        toast.info("Logged out successfully");
        navigate("/login");
    };

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar sx={{ gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        Mini UMS
                    </Typography>
                    <Chip
                        size="small"
                        variant="outlined"
                        label={`${user.name} (${user.role})`}
                    />
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <Button component={RouterLink} to="/dashboard" color="inherit">
                        Dashboard
                    </Button>
                    <Button component={RouterLink} to="/profile" color="inherit">
                        Profile
                    </Button>

                    {user.role === "admin" && (
                        <Button component={RouterLink} to="/admin/users" color="inherit">
                            Manage Users
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;
