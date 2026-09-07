import React from "react";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { actionButtonStyle } from "./actionButtonStyles";

const DownloadButton = ({ onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={actionButtonStyle("secondary", {
        width: isSmallScreen ? "45%" : "16%",
      })}
    >
      Download
      <IoCloudDownloadOutline size={14} style={{ marginLeft: "10px" }} />
    </Button>
  );
};

export default DownloadButton;
