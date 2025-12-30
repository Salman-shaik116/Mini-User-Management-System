import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

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
        <nav style={styles.nav} className="navbar">
            <div className="nav-right">
                <strong>{user.name}</strong> ({user.role})
            </div>

            <div style={styles.links}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>

                {user.role === "admin" && (
                    <Link to="/admin/users">Manage Users</Link>
                )}

                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#f4f4f4",
    },
    links: {
        display: "flex",
        gap: "15px",
        alignItems: "center",
    },
};

export default Navbar;
