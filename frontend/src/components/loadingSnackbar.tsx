import { Box, LinearProgress } from "@mui/material";
import React from "react";

export default function LoadingSnackbar() {
    return (
        <Box
            sx={{
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1400,
            }}
        >
            <LinearProgress
                style={{
                    height: "0.5rem",
                }}
            />
        </Box>
    );
}