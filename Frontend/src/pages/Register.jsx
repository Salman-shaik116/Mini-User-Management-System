import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import isStrongPassword from "../utils/passwordValidator";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const { name, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();
        const nextErrors = {};

        // Required field validation
        if (!name || !email || !password || !confirmPassword) {
            if (!name) nextErrors.name = "Full name is required";
            if (!email) nextErrors.email = "Email is required";
            if (!password) nextErrors.password = "Password is required";
            if (!confirmPassword) nextErrors.confirmPassword = "Confirm password is required";
        }

        // Email validation
        if (!email.includes("@")) {
            nextErrors.email = "Invalid email format";
        }

        // Password strength
        if (!isStrongPassword(password)) {
            nextErrors.password =
                "Password must be at least 12 characters and include uppercase, lowercase, and number";
        }

        // Password match
        if (password !== confirmPassword) {
            nextErrors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        try {
            setSubmitting(true);
            await api.post("/auth/signup", {
                name,
                email,
                password
            });

            toast.success("Account created successfully. Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="login-container">
                    <h2>Sign Up</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={name}
                            onChange={handleChange}
                        />
                        {formErrors.name && <p className="error">{formErrors.name}</p>}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <p className="error">{formErrors.email}</p>}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                        {formErrors.password && <p className="error">{formErrors.password}</p>}

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                        {formErrors.confirmPassword && (
                            <p className="error">{formErrors.confirmPassword}</p>
                        )}

                        <button type="submit" disabled={submitting}>
                            {submitting ? "Registering..." : "Register"}
                        </button>
                        {submitting && <Spinner />}
                    </form>

                    <p>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
