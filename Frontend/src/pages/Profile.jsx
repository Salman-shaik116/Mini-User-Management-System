import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

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
        return <Spinner />;
    }

    if (!user) {
        return <p>Failed to load profile.</p>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>

            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Profile Info */}
            <h4>Profile Information</h4>

            <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Full Name"
            />

            <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                }
                placeholder="Email"
            />

            <div style={{ marginTop: "10px" }}>
                <button onClick={handleProfileUpdate}>Save</button>
                <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                    Cancel
                </button>
            </div>
            {savingProfile && <Spinner />}

            <hr />

            {/* Change Password */}
            <h4>Change Password</h4>

            <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                    setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                    })
                }
            />

            <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                    setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                    })
                }
            />

            <button onClick={handlePasswordChange} disabled={changingPassword}>
                {changingPassword ? "Updating..." : "Update Password"}
            </button>
            {changingPassword && <Spinner />}
        </div>
    );
};

export default Profile;
