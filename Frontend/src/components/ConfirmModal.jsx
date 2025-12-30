

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <button className="danger" onClick={onConfirm}>Confirm</button>
                <button className="secondary" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
