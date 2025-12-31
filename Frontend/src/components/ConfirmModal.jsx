import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <Dialog open onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} color="inherit">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;
