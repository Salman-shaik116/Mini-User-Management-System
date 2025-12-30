import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ConfirmModal from "../components/ConfirmModal";

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
        <div style={{ padding: "20px" }}>
            <h2>Admin Dashboard - Users</h2>

            {confirmState.open && (
                <ConfirmModal
                    message={confirmState.message}
                    onConfirm={confirmAction}
                    onCancel={closeConfirm}
                />
            )}

            {loading && <Spinner />}

            <table border="1" width="100%" cellPadding="8">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.isActive ? "Active" : "Inactive"}</td>
                            <td>
                                {user.isActive ? (
                                    <button
                                        className="danger"
                                        onClick={() => openConfirm(user._id, "deactivate")}
                                    >
                                        Deactivate
                                    </button>
                                ) : (
                                    <button
                                        className="primary"
                                        onClick={() => openConfirm(user._id, "activate")}
                                    >
                                        Activate
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div style={{ marginTop: "15px" }}>
                <button
                    disabled={page === 1}
                    onClick={() => fetchUsers(page - 1)}
                >
                    Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => fetchUsers(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminUsers;
