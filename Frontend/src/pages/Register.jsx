import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import isStrongPassword from "../utils/passwordValidator";
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
        if (email && !email.includes("@")) {
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
                        Create account
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Full name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            autoComplete="name"
                            fullWidth
                            margin="normal"
                            error={Boolean(formErrors.name)}
                            helperText={formErrors.name}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            autoComplete="email"
                            fullWidth
                            margin="normal"
                            error={Boolean(formErrors.email)}
                            helperText={formErrors.email}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            fullWidth
                            margin="normal"
                            error={Boolean(formErrors.password)}
                            helperText={formErrors.password}
                        />

                        <TextField
                            label="Confirm password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            fullWidth
                            margin="normal"
                            error={Boolean(formErrors.confirmPassword)}
                            helperText={formErrors.confirmPassword}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={submitting}
                            sx={{ mt: 2 }}
                        >
                            {submitting ? "Creating account..." : "Create account"}
                        </Button>

                        {submitting && <Spinner />}

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 2, color: "text.secondary" }}
                        >
                            Already have an account?{" "}
                            <Link component={RouterLink} to="/login" underline="hover">
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
