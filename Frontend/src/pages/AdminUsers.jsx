import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ConfirmModal from "../components/ConfirmModal";

import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [confirmState, setConfirmState] = useState({
        open: false,
        userId: null,
        action: null,
        message: "",
    });

    const fetchUsers = async (pageNo = 1) => {
        try {
            setLoading(true);
            const res = await api.get(`/users?page=${pageNo}&limit=10`);

            setUsers(res.data.data.users);
            setTotalPages(res.data.data.totalPages);
            setPage(pageNo);
        } catch (err) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAction = async (id, action) => {
        try {
            await api.patch(`/users/${id}/${action}`);
            toast.success(`User ${action}d successfully`);
            fetchUsers(page);
        } catch (err) {
            toast.error("Action failed");
        }
    };

    const openConfirm = (id, action) => {
        setConfirmState({
            open: true,
            userId: id,
            action,
            message: `Are you sure you want to ${action} this user?`,
        });
    };

    const closeConfirm = () => {
        setConfirmState({ open: false, userId: null, action: null, message: "" });
    };

    const confirmAction = async () => {
        if (!confirmState.userId || !confirmState.action) {
            closeConfirm();
            return;
        }

        await handleAction(confirmState.userId, confirmState.action);
        closeConfirm();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Users
            </Typography>

            {confirmState.open && (
                <ConfirmModal
                    message={confirmState.message}
                    onConfirm={confirmAction}
                    onCancel={closeConfirm}
                />
            )}

            {loading && <Spinner />}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Full name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row._id} hover>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell sx={{ textTransform: "capitalize" }}>{row.role}</TableCell>
                                <TableCell>{row.isActive ? "Active" : "Inactive"}</TableCell>
                                <TableCell align="right">
                                    {row.isActive ? (
                                        <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => openConfirm(row._id, "deactivate")}
                                        >
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => openConfirm(row._id, "activate")}
                                        >
                                            Activate
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {!loading && users.length === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Typography color="text.secondary">No users found.</Typography>
                    </Box>
                )}
            </TableContainer>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Button
                    variant="outlined"
                    disabled={page === 1}
                    onClick={() => fetchUsers(page - 1)}
                >
                    Prev
                </Button>

                <Typography color="text.secondary">
                    Page {page} of {totalPages}
                </Typography>

                <Button
                    variant="outlined"
                    disabled={page === totalPages}
                    onClick={() => fetchUsers(page + 1)}
                >
                    Next
                </Button>
            </Stack>
        </Container>
    );
};

export default AdminUsers;
