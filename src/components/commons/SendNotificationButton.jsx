import React from "react";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { actionButtonStyle } from "./actionButtonStyles";

const SendNotificationButton = ({ onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={actionButtonStyle("primary", {
        marginRight: "10px",
        width: isSmallScreen ? "40%" : "30%",
      })}
    >
      Send Notification
    </Button>
  );
};

export default SendNotificationButton;
