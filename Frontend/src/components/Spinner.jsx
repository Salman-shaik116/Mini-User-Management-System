import { Box, CircularProgress } from "@mui/material";

const Spinner = ({ size = 24, label = "Loading" }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={size} aria-label={label} />
        </Box>
    );
};

export default Spinner;
