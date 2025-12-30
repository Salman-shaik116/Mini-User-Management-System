import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();

        const nextErrors = {};

        // Client-side validation
        if (!email || !password) {
            if (!email) nextErrors.email = "Email is required";
            if (!password) nextErrors.password = "Password is required";
        }

        if (!email.includes("@")) {
            nextErrors.email = "Invalid email format";
        }

        setFormErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        try {
            setSubmitting(true);
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                    <p className="error">{formErrors.email}</p>
                )}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                )}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Logging in..." : "Login"}
                </button>
                {submitting && <Spinner />}
            </form>

            <p>
                Don’t have an account?{" "}
                <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
