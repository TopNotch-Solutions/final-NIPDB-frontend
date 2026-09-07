import React from "react";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { actionButtonStyle } from "./actionButtonStyles";

const UpdateButton = ({ onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={actionButtonStyle("secondary", {
        marginRight: "10px",
        width: isSmallScreen ? "40%" : "40%",
      })}
    >
      Edit
    </Button>
  );
};

export default UpdateButton;
