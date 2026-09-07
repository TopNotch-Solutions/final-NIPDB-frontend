import React from "react";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { actionButtonStyle } from "./actionButtonStyles";

const ViewButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={actionButtonStyle("primary", { width: "50%" })}
    >
      View
      <FaEye size={14} style={{ marginLeft: "10px" }} />
    </Button>
  );
};

export default ViewButton;
