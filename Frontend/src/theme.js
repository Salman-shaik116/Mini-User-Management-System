import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
    },
});

export default theme;
