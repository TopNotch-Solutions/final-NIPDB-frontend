import React, { useState } from "react";
import { Box, IconButton, Avatar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "@mui/material/Badge";
import { BsPersonGear, BsBoxArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/nipdb-logo.jpg";
import "../../assets/css/TopBar.css";
import { CapitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { toggleSidebarfalse } from "../../redux/reducers/sidebarReducer";
import { login } from "../../redux/reducers/authReducer";
import { toggleAuthenticationfalse } from "../../redux/reducers/twoFactorReducer";
import { updateToken } from "../../redux/reducers/authReducer";
import { toggleActiveTab } from "../../redux/reducers/tabsReducer";
import useNotificationPoller from "../../hooks/useNotificationPoller";

const Topbar = ({ OpenSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  let fullName = currentUser?.firstName + currentUser?.lastName;
  const tokenHeader = currentUser.token;
  const [allNotificationsCount, setAllNotificationsCount] = useState(0);
  let firstLetter = CapitalizeFirstLetter(currentUser?.firstName);
  let secondLetter = CapitalizeFirstLetter(currentUser?.lastName);

  // Polling hook — replaces the old one-shot fetch.
  // Fires every 2s, updates badge count via callback, and triggers
  // instant toasts for new notifications via the emitter.
  useNotificationPoller({
    onCountUpdated: setAllNotificationsCount,
  });

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/auth/admin/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenHeader}`,
            "x-access-token": `${tokenHeader}`,
          },
          //
        },
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get("x-access-token");
      dispatch(
        updateToken({
          token: newTokenHeader,
        }),
      );

      if (response.ok) {
        dispatch(toggleAuthenticationfalse());
        dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          }),
        );
        navigate("/");
      } else {
        dispatch(toggleAuthenticationfalse());
        dispatch(toggleSidebarfalse());

        dispatch(
          login({
            user: {},
          }),
        );
        navigate("/");
      }
    } catch (error) {
      // Handle the network error
      // For example, show an error message
      // toast.error("Network error. Please check your network connection and try again");
    }
  };
  return (
    <Box className="topbar-container">
      <div className="topbar-left">
        <Box display="flex" alignItems="center" gap={2}>
          <div className="d-none d-lg-block">
            <img src={logo} alt="logo" className="topbar-logo" />
          </div>
          <div className="d-block d-lg-none">
            <IconButton
              onClick={OpenSidebar}
              aria-label="Open navigation menu"
              sx={{ color: "var(--color-brand-text)" }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Box>
      </div>

      <Box display="flex" alignItems="center" gap={2}>
        <Tooltip title="Notifications">
          <div
            className="notification-icon"
            onClick={() => {
              dispatch(toggleActiveTab({ activeTab: 6 }));
              navigate("/notifications");
            }}
          >
            <IconButton
              aria-label={
                allNotificationsCount > 0
                  ? `Notifications, ${allNotificationsCount} unread`
                  : "Notifications"
              }
              sx={{ color: "var(--color-text-muted)" }}
            >
              {allNotificationsCount > 0 ? (
                <Badge
                  badgeContent={allNotificationsCount}
                  max={99}
                  color="primary"
                >
                  <NotificationsOutlinedIcon />
                </Badge>
              ) : (
                <NotificationsOutlinedIcon />
              )}
            </IconButton>
          </div>
        </Tooltip>

        <div className="user-info d-none d-sm-flex">
          <div className="user-details">
            <p className="user-name">
              {fullName.length <= 14
                ? currentUser?.firstName + " " + currentUser?.lastName
                : currentUser?.lastName}
            </p>
            <p className="user-role">{currentUser?.role}</p>
          </div>
        </div>

        <div className="user-avatar">
          {currentUser?.profileImage ? (
            <Avatar
              alt="User Profile"
              src={currentUser?.profileImage}
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: "var(--color-brand-surface)",
                width: 40,
                height: 40,
                fontSize: "var(--text-base)",
                fontWeight: 600,
              }}
            >{`${firstLetter}${secondLetter}`}</Avatar>
          )}
        </div>

        <Dropdown className="user-dropdown" autoClose="outside">
          <Dropdown.Toggle
            variant=""
            id="dropdown-basic"
            className="dropdown-toggle"
          ></Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item
              href="/profile"
              onClick={() => dispatch(toggleActiveTab({ activeTab: 8 }))}
              className="dropdown-item"
            >
              <BsPersonGear /> Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className="dropdown-item">
              <BsBoxArrowRight /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default Topbar;
