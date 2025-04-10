import React, { useEffect, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toggleIsSubmittingTrue,toggleIsSubmittingfalse } from "../redux/reducers/submittingReducer";
import InputBase from "@mui/material/InputBase";
import Select from "react-select";
import "../assets/css/notifications.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import MyButton from "../components/commons/MyButton";
import Modal from "@mui/material/Modal";
import { IoTrashBin } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import DeleteButton from "../components/commons/DeleteButton";
import NViewButton from "../components/commons/NViewButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/reducers/authReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { login } from "../redux/reducers/authReducer";
import handleAuthFailure from "../utils/handleAuthFailure";

const mobileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "60%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const largeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};
const largeNotificationStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

function Notifications() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buttonActive, setButonActive] = useState(4);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationError, setNotificationError] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [updatedId, setUpdatedId] = useState(null);

  const [textCounter, setTextCounter] = useState(0);
  const [notificationActive, setNotificationActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allAdminNotifications, setAllAdminNotifications] = useState([]);
  const [allUnread, setAllUnread] = useState([]);
  const [allRead, setAllRead] = useState([]);
  const [allSent, setAllSent] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [singleAdminNotification, setSingleAdminNotification] = useState([]);
  const [sentAdminNotification, setSentAdminNotification] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const [openModelSent, setOpenModelSent] = useState(false);
  const [openModelView, setOpenModelView] = useState(false);
  const DropdownIndicator = () => null;
  const tokenHeader = currentUser.token;
  const serverToken = useSelector((state) => state.server.serverToken);
  const handleOpen = () => setOpenModel(true);
  const handleOpenSent = () => setOpenModelSent(true);
  const handleOpenView = () => setOpenModelView(true);
  const handleClose = () => {
    setOpenModel(false);

    setTitleError("");
    setPriorityError("");
    setNotificationError("");
  };
  const handleCloseView = () => {
    setOpenModelView(false);
  };
  const handleCloseSent = () => {
    setOpenModelSent(false);
  };
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/all/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllUserList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllUser();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllAdminNotifications = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        setIsSubmitting(true);
        const response = await fetch(
          `https://dt.mtc.com.na:4000/notifications/admin/single/notifications`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllAdminNotifications(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllAdminNotifications();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllUnread = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        setIsSubmitting(true);
        const response = await fetch(
          `https://dt.mtc.com.na:4000/notifications/admin/all/unread-notification`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllUnread(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllUnread();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllSent = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        setIsSubmitting(true);
        const response = await fetch(
          `https://dt.mtc.com.na:4000/notifications/admin/all/sent-by-admin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllSent(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllSent();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllRead = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        setIsSubmitting(true);
        const response = await fetch(
          `https://dt.mtc.com.na:4000/notifications/admin/all/read-notification`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllRead(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    };

    fetchAllRead();
  }, [isSubmitting]);

  const userOptions = allUserList.map((option) => ({
    label: `${option.firstName} ${option.lastName}`,
    value: option.id,
  }));

  const handleStep5 = async () => {
    if (validateFields()) {
      try {
        dispatch(toggleIsSubmittingTrue());
        setIsSubmitting(true);
        const requestData = {
          title,
          priority,
          notification,
          notificationActive,
          type: "Alert",
          senderId: currentUser.id,
        };
        const response = await fetch(
          `https://dt.mtc.com.na:4000/notifications/admin/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
            body: JSON.stringify(requestData),
          }
        );
        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");
        
        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }else{
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setOpenModel(false);
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Notification successfully added",
            showConfirmButton: false,
            timer: 3000,
          });
          setTitle("");
          setPriority("");
          setNotification("");
        } else {
          dispatch(toggleIsSubmittingfalse());
          setIsSubmitting(false);
          setOpenModel(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
          setTitle("");
          setPriority("");
          setNotification("");
          
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        setOpenModel(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };
  const handleStep6 = async () => {
    if (validateFields1()) {
      try {
        dispatch(toggleIsSubmittingTrue());
        setIsSubmitting(true);
        const requestData = {
          title,
          priority,
          notification,
          notificationActive,
          type: "Alert",
          senderId: currentUser.id,
        };
        const response = await fetch(
          `https://dt.mtc.com.na:4000/notifications/admin/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
            body: JSON.stringify(requestData),
          }
        );
        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");
        
        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }else{
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setOpenModel(false);
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Notification successfully added",
            showConfirmButton: false,
            timer: 3000,
          });
          setTitle("");
          setPriority("");
          setNotification("");
        } else {
          dispatch(toggleIsSubmittingfalse());
          setIsSubmitting(false);
          setOpenModel(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
          setTitle("");
          setPriority("");
          setNotification("");
          
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        setOpenModel(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };
  const handleView = async (id) => {
    try {
      dispatch(toggleIsSubmittingTrue());
      setIsSubmitting(true);
      const response = await fetch(
        `https://dt.mtc.com.na:4000/notifications/admin/single/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get("x-access-token");
      
      if (newTokenHeader) {
        dispatch(
          updateToken({
            token: newTokenHeader,
          })
        );
      }else{
        handleAuthFailure({ dispatch, navigate, type: "auth" });
      }
      if (response.ok) {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        setUpdatedId(id);
        setSingleAdminNotification(data.data);
        setOpenModelView(true);
      } else {
        setIsSubmitting(false);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
        
      }
    } catch (error) {
      dispatch(toggleIsSubmittingfalse());
      setIsSubmitting(false);
      setOpenModel(false);
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const handleViewSent = async (id) => {
    try {
      dispatch(toggleIsSubmittingTrue());
      setIsSubmitting(true);
      const response = await fetch(
        `https://dt.mtc.com.na:4000/notifications/admin/single/sent-by-admin/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get("x-access-token");
      
      if (newTokenHeader) {
        dispatch(
          updateToken({
            token: newTokenHeader,
          })
        );
      }else{
        handleAuthFailure({ dispatch, navigate, type: "auth" });
      }
      if (response.ok) {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        setSentAdminNotification(data.data);
        setOpenModelSent(true);
      } else {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
        
      }
    } catch (error) {
      dispatch(toggleIsSubmittingfalse());
      setIsSubmitting(false);
      setOpenModel(false);
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const handleDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Notification will be removed from the system completely!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsSubmitting(true);
          dispatch(toggleIsSubmittingTrue());
          const response = await fetch(
            `https://dt.mtc.com.na:4000/notifications/admin/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${serverToken}`,
                'x-access-token': `${tokenHeader}`
              },
              
            }
          );

          const data = await response.json();
          const newTokenHeader = response.headers.get("x-access-token");
          
          if (newTokenHeader) {
            dispatch(
              updateToken({
                token: newTokenHeader,
              })
            );
          }else{
            handleAuthFailure({ dispatch, navigate, type: "auth" });
          }
          if (response.ok) {
            dispatch(toggleIsSubmittingfalse());
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Notification Successfully Deleted",
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            dispatch(toggleIsSubmittingfalse());
            console.error("Server Error:", data.message);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 3000,
            });
            
          }
        } catch (error) {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "network" });
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };
  const handleNoticationDeletion = async (id) => {
    try {
      setIsSubmitting(true);
      dispatch(toggleIsSubmittingTrue());
      const response = await fetch(
        `https://dt.mtc.com.na:4000/notifications/admin/delete/${updatedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get("x-access-token");
      
      if (newTokenHeader) {
        dispatch(
          updateToken({
            token: newTokenHeader,
          })
        );
      }else{
        handleAuthFailure({ dispatch, navigate, type: "auth" });
      }
      if (response.ok) {
        setIsSubmitting(false);
        dispatch(toggleIsSubmittingfalse());
        setOpenModelView(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Notification Successfully Deleted",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
             }
    } catch (error) {
      dispatch(toggleIsSubmittingfalse());
      setIsSubmitting(false);
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const columns = [
    {
      field: "notification",
      headerName: "Notification",
      width: isSmallScreen ? 180 : 300,
    },
    { field: "type", headerName: "Type", width: isSmallScreen ? 100 : 100 },
    {
      field: "priority",
      headerName: "Priority",
      width: isSmallScreen ? 100 : 100,
    },
    { field: "viewed", headerName: "Viewed", width: isSmallScreen ? 100 : 100 },
    {
      field: "createdAt",
      headerName: "Created_At",
      width: isSmallScreen ? 130 : 200,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 230 : 350,
      renderCell: (params) => (
        <>
          <NViewButton onClick={() => handleView(params.row.id)} />
          <DeleteButton onClick={() => handleDeletion(params.row.id)} />
        </>
      ),
    },
  ];
  const columnSent = [
    {
      field: "notification",
      headerName: "Notification",
      width: isSmallScreen ? 180 : 300,
    },
    { field: "type", headerName: "Type", width: isSmallScreen ? 100 : 100 },
    {
      field: "priority",
      headerName: "Priority",
      width: isSmallScreen ? 100 : 100,
    },
    {
      field: "createdAt",
      headerName: "Created_At",
      width: isSmallScreen ? 130 : 200,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 230 : 450,
      renderCell: (params) => (
        <>
          <NViewButton onClick={() => handleViewSent(params.row.id)} />
        </>
      ),
    },
  ];

  const rows = allAdminNotifications.map((admin) => ({
    id: admin.id,
    notification: admin.notification,
    type: admin.type,
    priority: admin.priority,
    viewed: admin.viewed,
    createdAt: admin.createdAt,
  }));
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const rowsUnread = allUnread.map((admin) => ({
    id: admin.id,
    notification: admin.notification,
    type: admin.type,
    priority: admin.priority,
    viewed: admin.viewed,
    createdAt: admin.createdAt,
  }));
  const filteredRowsUnread = rowsUnread.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const rowsRead = allRead.map((admin) => ({
    id: admin.id,
    notification: admin.notification,
    type: admin.type,
    priority: admin.priority,
    viewed: admin.viewed,
    createdAt: admin.createdAt,
  }));
  const filteredRowsRead = rowsRead.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const rowsSent = allSent.map((admin) => ({
    id: admin.id,
    notification: admin.notification,
    type: admin.type,
    priority: admin.priority,
    createdAt: admin.createdAt,
  }));
  const filteredRowsSent = rowsSent.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const notificationsOptions = [
    {
      value: "High",
    },
    {
      value: "Medium",
    },
    {
      value: "Low",
    },
  ];

  const fields = [
    { value: title, setError: setTitleError, name: "Title" },
    { value: priority, setError: setPriorityError, name: "Priority" },
    {
      value: notification,
      setError: setNotificationError,
      name: "Notification",
    },
  ];
  const fields1 = [
    { value: title, setError: setTitleError, name: "Title" },
    { value: userId, setError: setUserIdError, name: "MSME name" },
    {
      value: notification,
      setError: setNotificationError,
      name: "Notification",
    },
  ];
  const validateFields = () => {
    let isValid = true;
    fields.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const validateFields1 = () => {
    let isValid = true;
    fields1.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <div className="container-fluid mt-4">
      <p className="msme">Manage Notifications</p>
      <p>
        Welcome to the Manage Notification page. This page allows you to send
        and manage notifications for both MSME and regular app users
      </p>

      <Box className="" justifyContent={"space-evenly"}>
        <Box
          display="grid"
          gridTemplateColumns={
            isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
          }
          gridAutoRows="140px"
          gap={isSmallScreen ? "0px" : "10px"}
        >
          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow="span 3"
          >
            <div className="col-12 mb-4 listing-msme p-4 shadow rounded-3 mb-4">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-12 col-xxl-9 mx-auto border d-flex flex-wrap justify-content-between p-1">
                    
                    <button
                      className={
                        buttonActive === 4
                          ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                          : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                      }
                      onClick={() => setButonActive(4)}
                      style={{ border: "none" }}
                    >
                      Unread
                    </button>
                    <button
                      className={
                        buttonActive === 2
                          ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                          : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                      }
                      onClick={() => setButonActive(2)}
                      style={{ border: "none" }}
                    >
                      Read
                    </button>
                    <button
                      className={
                        buttonActive === 3
                          ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                          : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                      }
                      onClick={() => setButonActive(3)}
                      style={{ border: "none" }}
                    >
                      Sent
                    </button>
                  </div>
                </div>
              </div>

              {buttonActive === 1 && (
                <></>
                
              )}
              {buttonActive === 2 && (
                <>
                  <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                    <Box
                      display="flex"
                      backgroundColor="rgba(245, 246, 248, 1)"
                      borderRadius="3px"
                      width="300px"
                      marginRight="10px"
                    >
                      {/* rgba(245, 246, 248, 1) */}
                      <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search for read notification"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    {currentUser.role === "Super admin" && (
                      <>
                        <div onClick={handleOpen}>
                      <MyButton text="New Notification" />
                    </div>
                      </>
                    )}
                   
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-groupp">All Read Notification List</p>
                    {allRead ? (
                      <>
                        <Box sx={{ height: 500, width: "100%" }}>
                          <DataGrid
                            rows={filteredRowsRead}
                            columns={columns}
                            sx={{
                              "& .MuiDataGrid-root": {
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .status-pending": {
                                color: "rgb(234, 156, 0)",
                              },
                              "& .status-rejected": {
                                color: "red",
                              },
                              "& .status-approved": {
                                color: "green",
                              },
                              "& .MuiDataGrid-columnHeaders": {
                                fontWeight: 800,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 600,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-cell": {
                                fontWeight: 400,
                                fontFamily: "Montserrat, sans-serif",
                              },
                            }}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 25, 
                                },
                              },
                            }}
                            pageSizeOptions={[25, 50, 100]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: 500, width: "100%" }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <CircularProgress color="inherit" />
                            <p className="p-4 text-secondary">
                              Just a moment, we’re getting things ready...
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {buttonActive === 3 && (
                <>
                  <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                    <Box
                      display="flex"
                      backgroundColor="rgba(245, 246, 248, 1)"
                      borderRadius="3px"
                      width="300px"
                      marginRight="10px"
                    >
                      {/* rgba(245, 246, 248, 1) */}
                      <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search for sent notification"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    {currentUser.role === "Super admin" && (
                      <>
                      <div onClick={handleOpen}>
                      <MyButton text="New Notification" />
                    </div>
                      </>
                    )}
                    
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-groupp">Sent Notification List</p>
                    {allSent ? (
                      <>
                        <Box sx={{ height: 500, width: "100%" }}>
                          <DataGrid
                            rows={filteredRowsSent}
                            columns={columnSent}
                            sx={{
                              "& .MuiDataGrid-root": {
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .status-pending": {
                                color: "rgb(234, 156, 0)",
                              },
                              "& .status-rejected": {
                                color: "red",
                              },
                              "& .status-approved": {
                                color: "green",
                              },
                              "& .MuiDataGrid-columnHeaders": {
                                fontWeight: 800,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 600,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-cell": {
                                fontWeight: 400,
                                fontFamily: "Montserrat, sans-serif",
                              },
                            }}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 25, 
                                },
                              },
                            }}
                            pageSizeOptions={[25, 50, 100]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: 500, width: "100%" }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <CircularProgress color="inherit" />
                            <p className="p-4 text-secondary">
                              Just a moment, we’re getting things ready...
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {buttonActive === 4 && (
                <>
                  <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                    <Box
                      display="flex"
                      backgroundColor="rgba(245, 246, 248, 1)"
                      borderRadius="3px"
                      width="300px"
                      marginRight="10px"
                    >
                      {/* rgba(245, 246, 248, 1) */}
                      <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search for unread notification"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    {currentUser.role === "Super admin" && (
                      <>
                      <div onClick={handleOpen}>
                      <MyButton text="New Notification" />
                    </div>
                      </>
                    )}
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-groupp">All Unread Notifications List</p>
                    {allAdminNotifications ? (
                      <>
                        <Box sx={{ height: 500, width: "100%" }}>
                          <DataGrid
                            rows={filteredRowsUnread}
                            columns={columns}
                            sx={{
                              "& .MuiDataGrid-root": {
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .status-pending": {
                                color: "rgb(234, 156, 0)",
                              },
                              "& .status-rejected": {
                                color: "red",
                              },
                              "& .status-approved": {
                                color: "green",
                              },
                              "& .MuiDataGrid-columnHeaders": {
                                fontWeight: 800,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 600,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-cell": {
                                fontWeight: 400,
                                fontFamily: "Montserrat, sans-serif",
                              },
                            }}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 25, 
                                },
                              },
                            }}
                            pageSizeOptions={[25, 50, 100]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: 500, width: "100%" }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <CircularProgress color="inherit" />
                            <p className="p-4 text-secondary">
                              Just a moment, we’re getting things ready...
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </Box>
        </Box>{" "}
      </Box>
      <Modal
        open={openModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isSmallScreen ? mobileStyle : largeNotificationStyle}>
          <div className="d-flex justify-content-between align-items-center">
            <div></div>
            <h1 className="text-center">Add New Notification</h1>
            <CgCloseR
              style={{
                color: "red",
                fontSize: "32px",
                cursor: "pointer",
              }}
              onClick={() => {
                setTitle("");
                setPriority("");
                setNotification("");
                setTextCounter(0);
                setNotificationActive("All");
                setOpenModel(false);

                setTitleError("");
                setPriorityError("");
                setNotificationError("");
              }}
            />
          </div>

          <div className="container-fluid mt-md-4">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-12 col-xxl-9 mx-auto border d-flex flex-wrap justify-content-between p-1">
                <button
                  className={
                    notificationActive === "All"
                      ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                      : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                  }
                  onClick={() => {
                    setNotificationActive("All");
                  }}
                >
                  All Users
                </button>
                <button
                  className={
                    notificationActive === "Business"
                      ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                      : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                  }
                  onClick={() => {
                    setNotificationActive("Business");
                  }}
                >
                  All Business Users
                </button>
                {/* <button
                  className={
                    notificationActive === "Single"
                      ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                      : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                  }
                  onClick={() => {
                    setNotificationActive("Single");
                  }}
                >
                  MSME User
                </button> */}
              </div>
            </div>
          </div>
          {
            (notificationActive === "All" || notificationActive === "Business") ? (
              <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <div className="form-group pb-3">
                <label htmlFor="email" className="pb-2 text-boldd">
                  Subject: <span>*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  className="form-control place-holder"
                  placeholder="Enter title"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    setTitleError("");
                    setTitle(e.target.value);
                  }}
                />
                {titleError && (
                  <>
                    <p className="error-message">{titleError}</p>
                  </>
                )}
              </div>
              <div className="form-group pb-3">
                <label htmlFor="email" className="pb-2 text-boldd">
                  Prority: <span>*</span>
                </label>
                <select
                  class="form-select"
                  value={priority}
                  //disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setPriorityError("");
                    setPriority(e.target.value);
                  }}
                >
                  <option value="" disabled selected={!priority}>
                    Select priority
                  </option>
                  {notificationsOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {priorityError && (
                  <>
                    <p className="error-message">{priorityError}</p>
                  </>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="form-group pb-3">
                <label htmlFor="email" className="pb-2 text-boldd">
                  Notification: <span>*</span>
                </label>
                <textarea
                  type="textArea"
                  rows="5"
                  cols="50"
                  value={notification}
                  className="form-control place-holder"
                  maxlength="1500"
                  placeholder="Type here.........."
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    setTextCounter(e.target.value.length);
                    setNotificationError("");
                    setNotification(e.target.value);
                  }}
                />
              </div>
              <div className="float-end text-counter">
                <span>{textCounter}</span>
                <span>/1500</span>
              </div>
              {notificationError && (
                <>
                  <p className="error-message">{notificationError}</p>
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <div className="float-end">
                <button
                  className="btn btn-success m-1 p-2 modelButton text-boldd"
                  onClick={handleStep5}
                >
                  Send
                </button>
              </div>
            </Grid>
          </Grid>
            ) : (
              <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-3">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Subject: <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    className="form-control place-holder"
                    placeholder="Enter title"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setTitleError("");
                      setTitle(e.target.value);
                    }}
                  />
                  {titleError && (
                    <>
                      <p className="error-message">{titleError}</p>
                    </>
                  )}
                </div>
                <div className="form-group pb-3">
                              <label htmlFor="email" className="pb-2 text-boldd">
                                User Name: <span>*</span>
                              </label>
                              <Select
                                value={userOptions.find(
                                  (option) => option.value === userId
                                )}
                                onChange={(selectedOption) => {
                                  setUserIdError("");
                                  setUserId(
                                    selectedOption ? selectedOption.value : ""
                                  );
                                  if(!setUserId){
                                    setUserId("")
                                  }
                                }}
                                options={userOptions}
                                placeholder="Select user"
                                isSearchable
                                classNamePrefix="react-select"
                                components={{ DropdownIndicator }}
                              />
                              {userIdError && (
                                <>
                                  <p className="error-message">{userIdError}</p>
                                </>
                              )}
                            </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-3">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Notification: <span>*</span>
                  </label>
                  <textarea
                    type="textArea"
                    rows="5"
                    cols="50"
                    value={notification}
                    className="form-control place-holder"
                    maxlength="700"
                    placeholder="Type here.........."
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setTextCounter(e.target.value.length);
                      setNotificationError("");
                      setNotification(e.target.value);
                    }}
                  />
                </div>
                <div className="float-end text-counter">
                  <span>{textCounter}</span>
                  <span>/700</span>
                </div>
                {notificationError && (
                  <>
                    <p className="error-message">{notificationError}</p>
                  </>
                )}
              </Grid>
  
              <Grid item xs={12}>
                <div className="float-end">
                  <button
                    className="btn btn-success m-1 p-2 modelButton text-boldd"
                    onClick={handleStep6}
                  >
                    Send
                  </button>
                </div>
              </Grid>
            </Grid>
            )
          }
        </Box>
      </Modal>
      <Modal
        open={openModelView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isSmallScreen ? mobileStyle : largeStyle}>
          <div className="w-100 d-flex border-bottom mt-1 mt-md-2 my-border">
            <div className="col-2 col-md-1">
              <Tooltip title="close">
                <CgCloseR
                  style={{
                    color: "red",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenModelView(false)}
                />
              </Tooltip>
            </div>
            <div className="col-10 col-md-11">
              <div className="d-flex justify-content-between">
                <h5>{singleAdminNotification.type}</h5>
                <p>{singleAdminNotification.createdAt}</p>
              </div>
              <p>{sentAdminNotification?.title}</p>
              <p>{singleAdminNotification.notification}</p>
            </div>
          </div>
          <div className="float-end mt-2">
            <Tooltip title="delete">
              <IoTrashBin
                style={{
                  color: "red",
                  fontSize: isSmallScreen ? "32px" : "25px",
                  cursor: "pointer",
                }}
                onClick={handleNoticationDeletion}
              />
            </Tooltip>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openModelSent}
        onClose={handleCloseSent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isSmallScreen ? mobileStyle : largeStyle}>
          <div className="w-100 d-flex border-bottom mt-1 mt-md-2 my-border">
            <div className="col-2 col-md-1">
              <Tooltip title="close">
                <div>
                  <CgCloseR
                    style={{
                      color: "red",
                      fontSize: "32px",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenModelSent(false)}
                  />
                </div>
              </Tooltip>
            </div>
            <div className="col-10 col-md-11">
              <div className="d-flex justify-content-between">
                <h5>{sentAdminNotification?.type}</h5>
                <p>{sentAdminNotification?.createdAt}</p>
              </div>
              <p>{sentAdminNotification?.title}</p>
              <p>{sentAdminNotification?.notification}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Notifications;
