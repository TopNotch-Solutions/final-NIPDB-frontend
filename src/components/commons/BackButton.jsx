import React from "react";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { actionButtonStyle } from "./actionButtonStyles";

const BackButton = ({ onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={actionButtonStyle("secondary", {
        width: isSmallScreen ? "30%" : "13%",
      })}
    >
      <IoArrowBackSharp size={14} style={{ marginRight: "10px" }} />
      Back
    </Button>
  );
};

export default BackButton;
