import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import {
    Alert,
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// User Profile Page 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [editData, setEditData] = useState({
        name: "",
        email: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch current user
    const fetchProfile = async () => {
        setLoadingProfile(true);
        try {
            const res = await api.get("/users/me");
            const currentUser = res.data?.data ?? res.data;
            setUser(currentUser);
            setEditData({
                name: currentUser?.name || "",
                email: currentUser?.email || "",
            });
        } catch {
            setError("Failed to load profile");
        } finally {
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Update profile
    const handleProfileUpdate = async () => {
        setError("");
        setMessage("");

        try {
            setSavingProfile(true);
            await api.put("/users/me", editData);
            toast.success("Profile updated successfully");
            setMessage("Profile updated successfully");
            fetchProfile();
        } catch (err) {
            const apiMessage = err.response?.data?.message || "Update failed";
            toast.error(apiMessage);
            setError(apiMessage);
        } finally {
            setSavingProfile(false);
        }
    };

    // Change password
    const handlePasswordChange = async () => {
        setError("");
        setMessage("");

        if (!passwordData.currentPassword || !passwordData.newPassword) {
            toast.error("Both password fields are required");
            return;
        }

        try {
            setChangingPassword(true);
            await api.put("/users/me/change-password", passwordData);
            toast.success("Password changed successfully");
            setMessage("Password changed successfully");
            setPasswordData({ currentPassword: "", newPassword: "" });
        } catch (err) {
            const apiMessage = err.response?.data?.message || "Password change failed";
            toast.error(apiMessage);
            setError(apiMessage);
        } finally {
            setChangingPassword(false);
        }
    };

    // Cancel edits
    const handleCancel = () => {
        setEditData({
            name: user.name,
            email: user.email,
        });
        setMessage("");
        setError("");
    };

    if (loadingProfile) {
        return (
            <Box sx={{ py: 6 }}>
                <Spinner />
            </Box>
        );
    }

    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Alert severity="error">Failed to load profile.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>

            <Stack spacing={2} sx={{ mb: 2 }}>
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </Stack>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Profile information
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Full name"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        autoComplete="name"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        autoComplete="email"
                        fullWidth
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <Button
                            variant="contained"
                            onClick={handleProfileUpdate}
                            disabled={savingProfile}
                            startIcon={
                                savingProfile ? (
                                    <CircularProgress size={16} color="inherit" />
                                ) : null
                            }
                        >
                            Save changes
                        </Button>
                        <Button variant="outlined" onClick={handleCancel} disabled={savingProfile}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Paper>

            <Divider sx={{ my: 3 }} />

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Change password
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Current password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                            })
                        }
                        autoComplete="current-password"
                        fullWidth
                    />
                    <TextField
                        label="New password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                            })
                        }
                        autoComplete="new-password"
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        onClick={handlePasswordChange}
                        disabled={changingPassword}
                        startIcon={
                            changingPassword ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : null
                        }
                    >
                        {changingPassword ? "Updating..." : "Update password"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Profile;
