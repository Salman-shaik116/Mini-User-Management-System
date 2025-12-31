import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import {
    Box,
    Button,
    Container,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

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

        if (email && !email.includes("@")) {
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
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                py: 6,
                bgcolor: "grey.50",
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            fullWidth
                            margin="normal"
                            error={Boolean(formErrors.email)}
                            helperText={formErrors.email}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            fullWidth
                            margin="normal"
                            error={Boolean(formErrors.password)}
                            helperText={formErrors.password}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={submitting}
                            sx={{ mt: 2 }}
                        >
                            {submitting ? "Signing in..." : "Sign in"}
                        </Button>

                        {submitting && <Spinner />}

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 2, color: "text.secondary" }}
                        >
                            Don’t have an account?{" "}
                            <Link component={RouterLink} to="/register" underline="hover">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
