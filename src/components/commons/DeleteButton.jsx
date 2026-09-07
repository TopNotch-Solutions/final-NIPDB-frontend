import React from "react";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { actionButtonStyle } from "./actionButtonStyles";

const DeleteButton = ({ onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={actionButtonStyle("danger", {
        marginRight: "10px",
        width: isSmallScreen ? "40%" : "40%",
      })}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
