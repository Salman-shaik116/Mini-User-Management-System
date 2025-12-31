import { Container, Paper, Typography } from "@mui/material";

const Dashboard = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Typography variant="body1">
                    Welcome to the Mini User Management System.
                </Typography>
            </Paper>
        </Container>
    );
};

export default Dashboard;
