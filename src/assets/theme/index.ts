import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            "50": "#C6E4FE",
            "100": "#B2DAFE",
            "200": "#8AC6FE",
            "300": "#62B3FD",
            "400": "#399FFD",
            "500": "#118CFC",
            "600": "#036FD2",
            "700": "#02529B",
            "800": "#013563",
            "900": "#01172C",
            A100: "#399FFD",
            A200: "#399FFD",
            A400: "#399FFD",
            A700: "#399FFD",
            contrastText: "#ffffff"
        },
        secondary: {
            50: "#FFFFFF",
            100: "#FFFFFF",
            200: "#FFFFFF",
            300: "#FFFFFF",
            400: "#FEFDFE",
            500: "#E4DEF5",
            600: "#C1B3E8",
            700: "#9E88DB",
            800: "#7A5DCE",
            900: "#5A38BA",
            A100: "#5A38BA",
            A200: "#5A38BA",
            A400: "#5A38BA",
            A700: "#5A38BA",
            contrastText: "#ffffff"
        },
    },

    components: {
        // Overriding default Text Field
        MuiTextField: {
            defaultProps: {
                size: "small"
            },
            styleOverrides: {
                root: {
                    width: "100%",
                },
                
            },
        },

        MuiButton: {
            defaultProps: {
                size: "medium",
                variant: "contained",
            },
        },

        MuiDialog: {
            defaultProps: {
                fullWidth: true,
            },
        },

        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontWeight: "bold",
                    padding: "1rem",
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: "0 1rem",
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: "0 1rem 1rem 1rem",
                },
            },
        },
    },
});

export default theme;
