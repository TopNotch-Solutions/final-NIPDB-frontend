import React, { useEffect, useRef, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { CgCloseR } from "react-icons/cg";
import "../assets/css/bso.css";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { toggleIsSubmittingTrue,toggleIsSubmittingfalse } from "../redux/reducers/submittingReducer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import MyButton from "../components/commons/MyButton";
import Modal from "@mui/material/Modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import ModelButton from "../components/commons/ModelButton";
import Swal from "sweetalert2";
import DeleteButton from "../components/commons/DeleteButton";
import UpdateButton from "../components/commons/UpdateButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../redux/reducers/authReducer";
import { login } from "../redux/reducers/authReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import handleAuthFailure from "../utils/handleAuthFailure";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '90%', 
    md: '70%',
    xl: '50%',
    xxl: '30%'
  },
  height: "80%",
  bgcolor: 'background.paper',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  p: 4,
  overflowY: 'auto'
};

function Bso() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileUpdate, setFileUpdate] = useState(null);

  const [totalBsos, setTotalBsos] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [description, setDesciption] = useState("");
  const [descriptionError, setDesciptionError] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState("");

  const [nameDetails, setNameDetails] = useState("");
  const [nameDetailsError, setNameDetailsError] = useState("");
  const [typeDetails, setTypeDetails] = useState("");
  const [typeDetailsError, setTypeDetailsError] = useState("");
  const [contactNumberDetails, setContactNumberDetails] = useState("");
  const [contactNumberDetailsError, setContactNumberDetailsError] =
    useState("");
  const [websiteDetails, setWebsiteDetails] = useState("");
  const [websiteDetailsError, setWebsiteDetailsError] = useState("");
  const [emailDetails, setEmailDetails] = useState("");
  const [emailDetailsError, setEmailDetailsError] = useState("");
  const [descriptionDetails, setDesciptionDetails] = useState("");
  const [descriptionDetailsError, setDesciptionDetailsError] = useState("");
  const [logoDetails, setLogoDetails] = useState("");
  const [logoDetailsError, setLogoDetailsError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [updatingFail, setUpdatingFail] = useState("");
  const [updatingDetails, setUpdatingDetails] = useState([]);
  const [bsoList, setBsoList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namibiaPhoneRegex = /^(?:\+264|0)(\s?\d{2})\s?\d{3}\s?\d{4}$/;

  const serverToken = useSelector((state) => state.server.serverToken);
  const currentUser = useSelector((state) => state.auth.user);
  const tokenHeader = currentUser.token;
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => {
    setNameError("");
    setTypeError("");
    setEmailError("");
    setWebsiteError("");
    setContactNumberError("");
    setDesciptionError("");
    setLogoError("");
    setOpenModel(false);
  };
  const handleCloseEdit = () => {
    setNameDetailsError("");
    setTypeDetailsError("");
    setEmailDetailsError("");
    setWebsiteDetailsError("");
    setContactNumberDetailsError("");
    setDesciptionDetailsError("");
    setLogoDetailsError("");
    setUpdatingFail("");
    setOpenModelEdit(false);
  };
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/bso/admin/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        });

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
          setTotalBsos(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchTotalCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/bso/admin/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        });

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
          setBsoList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    };

    fetchApprovedCount();
  }, [isSubmitting]);

  const fields1 = [
    { value: name, setError: setNameError, name: "Name" },
    { value: type, setError: setTypeError, name: "Type" },
    { value: email, setError: setEmailError, name: "Email" },
    {
      value: contactNumber,
      setError: setContactNumberError,
      name: "Contact Number",
    },
    { value: website, setError: setWebsiteError, name: "Website" },
    { value: email, setError: setEmailError, name: "Email" },
    { value: description, setError: setDesciptionError, name: "Description" },
    { value: logo, setError: setLogoError, name: "Logo" },
  ];
  const validateFields1 = () => {
    let isValid = true;
  
    fields1.forEach((field) => {
      field.setError("");
  
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      } else {

        if (field.name === "Email" && field.value) {
          if (!emailRegex.test(field.value)) {
            field.setError("Invalid email format.");
            isValid = false;
          }
        }
  
        if (field.name === "Contact Number" && field.value) {
          if (!namibiaPhoneRegex.test(field.value)) {
            field.setError("Invalid phone number.");
            isValid = false;
          }
        }
  
        if (field.name === "Website" && field.value) {
          if (!urlRegex.test(field.value)) {
            field.setError("Invalid website URL.");
            isValid = false;
          }
        }
      }
    });
  
    return isValid;
  };
  
  
  const fields2 = [
    { value: nameDetails, setError: setNameDetailsError, name: "Name" },
    { value: typeDetails, setError: setTypeDetailsError, name: "Type" },
    { value: emailDetails, setError: setEmailDetailsError, name: "Email" },
    {
      value: contactNumberDetails,
      setError: setContactNumberDetailsError,
      name: "Contact Number",
    },
    {
      value: websiteDetails,
      setError: setWebsiteDetailsError,
      name: "Website",
    },
    { value: emailDetails, setError: setEmailDetailsError, name: "Email" },
    {
      value: descriptionDetails,
      setError: setDesciptionDetailsError,
      name: "Description",
    },
    { value: logoDetails, setError: setLogoDetailsError, name: "Logo" },
  ];
  const validateFields2 = () => {
    let isValid = true;
  
    fields2.forEach((field) => {
      field.setError("");

      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      } else {

        if (field.name === "Email" && field.value) {
          if (!emailRegex.test(field.value)) {
            field.setError("Invalid email format.");
            isValid = false;
          }
        }
  
        if (field.name === "Contact Number" && field.value) {
          if (!namibiaPhoneRegex.test(field.value)) {
            field.setError("Invalid phone number.");
            isValid = false;
          }
        }
  
        if (field.name === "Website" && field.value) {
          if (!urlRegex.test(field.value)) {
            field.setError("Invalid website URL.");
            isValid = false;
          }
        }
      }
    });
  
    return isValid;
  };
  
  

  const handleStep5 = async () => {
    if (validateFields1()) {
      try {
        setIsSubmitting(true);
        dispatch(toggleIsSubmittingTrue());
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("contactNumber", contactNumber);
        formData.append("email", email);
        formData.append("description", description);
        formData.append("bso-image", file);
        formData.append("website", website);
        const response = await fetch("https://dt.mtc.com.na:4000/bso/admin/create", {
          method: "POST",
          
          headers:{
            Authorization: `${serverToken}`,
          
          },
          body: formData,
        });
        const data = await response.json();
        
        if (response.ok) {
          setOpenModel(false);
          setIsSubmitting(false);
          dispatch(toggleIsSubmittingfalse());
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Bso successfully added",
            showConfirmButton: false,
            timer: 4000,
          });
          setName("");
          setType("");
          setContactNumber("");
          setDesciption("");
          setEmail("");
          setWebsite("");
          setLogo("");
        } else {
          setIsSubmitting(false);
          setOpenModel(false);
          dispatch(toggleIsSubmittingfalse());
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
          setName("");
          setType("");
          setContactNumber("");
          setDesciption("");
          setEmail("");
          setWebsite("");
          setLogo("");
          
        }
      } catch (error) {
        setIsSubmitting(false);
        setOpenModel(false);
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };

  const columns = [
    { field: "Name", headerName: "Name", width: isSmallScreen ? 120 : 160 },
    { field: "Type", headerName: "Type", width: isSmallScreen ? 180 : 100 },
    {
      field: "ContactNumber",
      headerName: "Contact Number",
      width: isSmallScreen ? 120 : 130,
    },
    {
      field: "Website",
      headerName: "Website",
      width: isSmallScreen ? 150 : 220,
    },
    {
      field: "EmailAddress",
      headerName: "Email Address",
      width: isSmallScreen ? 150 : 220,
    },
    {
      field: "Description",
      headerName: "Description",
      width: isSmallScreen ? 180 : 450,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 230 : 350,
      renderCell: (params) => (
        currentUser.role === "Super admin" ? (
          <>
          <UpdateButton onClick={() => handleUpdate(params.row.id)} />
          <DeleteButton onClick={() => handleDeletion(params.row.id)} />
        </>
        ) : null
        
      ),
    },
  ];

  const rows = bsoList.map((bso) => ({
    id: bso.id,
    Name: bso.name,
    Type: bso.type,
    ContactNumber: bso.contactNumber,
    Website: bso.website,
    EmailAddress: bso.email,
    Description: bso.description,
  }));
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const typeOptions = [
    { value: "Finance" },
    { value: "Incubator/Accelerator" },
    { value: "Government Agency" },
    { value: "Non-profit Organization" },
  ];

  const handleUpdate = async (id) => {
    try {
      dispatch(toggleIsSubmittingTrue());
      const response = await fetch(
        `https://dt.mtc.com.na:4000/bso/admin/single/${id}`,
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
        setUpdatingDetails(data.data);
        setNameDetails(data.data.name);
        setTypeDetails(data.data.type);
        setEmailDetails(data.data.email);
        setContactNumberDetails(data.data.contactNumber);
        setWebsiteDetails(data.data.website);
        setDesciptionDetails(data.data.description);
        setLogoDetails(data.data.logo);
        setOpenModelEdit(true);
        dispatch(toggleIsSubmittingfalse());
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 4000,
        });
      }
    } catch (error) {
      dispatch(toggleIsSubmittingfalse());
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const handleDeletion = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "BSO will be removed from the system completely!",
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
              `https://dt.mtc.com.na:4000/bso/admin/delete/${id}`,
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
                title: "Bso Successfully Deleted",
                showConfirmButton: false,
                timer: 4000,
              });
              
            } else {
              dispatch(toggleIsSubmittingfalse());
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });

            }
          } catch (error) {
            dispatch(toggleIsSubmittingfalse());
            handleAuthFailure({ dispatch, navigate, type: "network" });
          } finally {
            dispatch(toggleIsSubmittingfalse());
            setIsSubmitting(false);
          }
        }
      });
    } catch (error) {
      dispatch(toggleIsSubmittingfalse());
      console.error("Unexpected Error:", error);
    }
  };

  const handleSubmitUpdate = async () => {
    if (
      updatingDetails.name === nameDetails &&
      updatingDetails.type === typeDetails &&
      updatingDetails.contactNumber === contactNumberDetails &&
      updatingDetails.website === websiteDetails &&
      updatingDetails.email === emailDetails &&
      updatingDetails.description === descriptionDetails &&
      updatingDetails.logo === logoDetails
    ) {
      setUpdatingFail("You have not made any changes");
    } else {
      if (validateFields2()) {
        try {
          dispatch(toggleIsSubmittingTrue());
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("name", nameDetails);
          formData.append("type", typeDetails);
          formData.append("contactNumber", contactNumberDetails);
          formData.append("email", emailDetails);
          formData.append("description", descriptionDetails);
          formData.append("bso-image", fileUpdate);
          formData.append("website", websiteDetails);
          const response = await fetch(
            `https://dt.mtc.com.na:4000/bso/admin/update/${updatingDetails.id}`,
            {
              method: "PUT",
              
              headers:{
                Authorization: `${serverToken}`,
              },
              body: formData,
            }
          );
          const data = await response.json();

          if (response.ok) {
            setOpenModelEdit(false);
            setIsSubmitting(false);
            dispatch(toggleIsSubmittingfalse());
            Swal.fire({
              position: "center",
              icon: "success",
              title: "BSO Details Successfully Updated",
              showConfirmButton: false,
              timer: 4000,
            });
            setNameDetails("");
            setTypeDetails("");
            setEmailDetails("");
            setContactNumberDetails("");
            setDesciptionDetails("");
            setWebsiteDetails("");
            setLogoDetails("");
          } else {
            setIsSubmitting(false);
            setOpenModelEdit(false);
            dispatch(toggleIsSubmittingfalse());
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 4000,
            });
            setNameDetails("");
            setTypeDetails("");
            setEmailDetails("");
            setContactNumberDetails("");
            setDesciptionDetails("");
            setWebsiteDetails("");
            setLogoDetails("");
            
          }
        } catch (error) {
          dispatch(toggleIsSubmittingfalse());
          setIsSubmitting(false);
          setOpenModelEdit(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
        }
      }
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setLogoError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setLogoError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setLogo(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setLogoError("Invalid image type. Please upload a .jpg or .png image.");
        setLogo(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setLogo(objectUrl);
    }
  };
  const handleFileChange1 = (e) => {
    const selectedFile = e.target.files[0];
    setUpdatingFail("");
    setLogoDetailsError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setLogoDetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setLogoDetails(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setLogoDetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setLogoDetails(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileUpdate(selectedFile);
      setLogoDetails(objectUrl);
    }
  };

  const clearFileInput = () => {
    if (logo) {
      URL.revokeObjectURL(logo);
    }
    inputRef.current.value = "";
    setLogo(null);
  };
  const clearFileInput1 = () => {
    if (logoDetails) {
      URL.revokeObjectURL(logo);
    }
    inputRef.current.value = "";
    setLogoDetails(null);
  };
  const handleCameraClick = () => {
    inputRef.current.click();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return isSubmitting ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isSubmitting}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <>
      <div className="container-fluid mt-4">
        <p className="msme">Manage BSOs</p>
        <p>View, search, and manage all BSO listings.</p>

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
              marginTop={"10px"}
              gridColumn={isSmallScreen ? "span 12" : "span 3"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <div className="col-12 p-4 shadow rounded-2">
                <div className="d-flex justify-content-between">
                  <Tooltip title="Total BSOs" className="pointer">
                    <p className="text">Total BSOs</p>
                  </Tooltip>
                  <ArrowForwardIosIcon />
                </div>
                <div className="d-flex justify-content-start">
                  <div className="p-1 border rounded-2 ml-2">
                    <StickyNote2Icon sx={{ color: "rgba(21, 78, 138, 1)" }} />
                  </div>
                  <Tooltip title={totalBsos}>
                    <p className="digit text pointer">{totalBsos}</p>
                  </Tooltip>
                </div>
              </div>
            </Box>

            <Box
              gridColumn={isSmallScreen ? "span 12" : "span 12"}
              gridRow="span 3"
            >
              <div className="col-12 mb-4 listing-msme p-4 shadow rounded-3 mb-4">
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
                      placeholder="Search for a BSO"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                      <SearchIcon />
                    </IconButton>
                  </Box>
                  {currentUser.role === "Super admin" && (
                      <>
                       <div onClick={handleOpen}>
                    <MyButton text="Add BSO" />
                  </div>
                      </>
                    )}
                  
                </div>
                <div className="col-12 mt-1">
                  <p className="list-groupp">BSO List</p>
                  {totalBsos ? (
                    <>
                      <Box sx={{ height: 500, width: "100%" }}>
                        <DataGrid
                          rows={filteredRows}
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
          <Box sx={modalStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <h1 className="text-center">Add New BSO</h1>
              <Tooltip title="Close">
              <CgCloseR
                style={{
                  color: "red",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setNameError("");
                  setTypeError("");
                  setEmailError("");
                  setWebsiteError("");
                  setContactNumberError("");
                  setDesciptionError("");
                  setLogoError("");
                  setOpenModel(false);
                }}
              />
              </Tooltip>
            </div>

            <div></div>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Name: <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control place-holder"
                    placeholder="Enter bso name"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setNameError("");
                      setName(e.target.value);
                    }}
                  />
                  {nameError && (
                    <>
                      <p className="error-message">{nameError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Type: <span>*</span>
                  </label>
                  <select
                    class="form-select"
                    onChange={(e) => {
                      setTypeError("");
                      setType(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Select type
                    </option>
                    {typeOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                  {typeError && (
                    <>
                      <p className="error-message">{typeError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-3">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Contact Number: <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control place-holder"
                    placeholder="081*******"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setContactNumberError("");
                      setContactNumber(e.target.value);
                    }}
                  />
                  {contactNumberError && (
                    <>
                      <p className="error-message">{contactNumberError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Website Link:<span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control place-holder"
                    placeholder="www.example.com.na"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setWebsiteError("");
                      setWebsite(e.target.value);
                    }}
                  />
                  {websiteError && (
                    <>
                      <p className="error-message">{websiteError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Email: <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control place-holder"
                    placeholder="example@nipdb.com.na"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setEmailError("");
                      setEmail(e.target.value);
                    }}
                  />
                  {emailError && (
                    <>
                      <p className="error-message">{emailError}</p>
                    </>
                  )}
                </div>
                {logo ? (
                  <>
                    <div>
                      <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                        <div className="position-relative">
                          <div
                            className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                            style={{
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                            }}
                            onClick={clearFileInput}
                          >
                            {logo ? (
                              <CloseIcon
                                style={{
                                  width: isSmallScreen ? "18px" : "24px",
                                  height: isSmallScreen ? "18px" : "24px",
                                  color: "#1674BB",
                                }}
                              />
                            ) : (
                              <CameraAltIcon
                                style={{
                                  width: isSmallScreen ? "18px" : "24px",
                                  height: isSmallScreen ? "18px" : "24px",
                                  color: "#1674BB",
                                }}
                              />
                            )}
                          </div>
                          <img
                            src={logo}
                            className=" img-responsive img-thumbnail"
                            alt=""
                          />
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={inputRef}
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Logo: <span>*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control place-holder"
                        placeholder="example@nipdb.com.na"
                        autoComplete="off"
                        name="email"
                        onChange={handleFileChange}
                      />
                      {logoError && (
                        <>
                          <p className="error-message">{logoError}</p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Description: <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    rows={5}
                    className="form-control place-holder"
                    placeholder="Enter bso description"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setDesciptionError("");
                      setDesciption(e.target.value);
                    }}
                  />
                  {descriptionError && (
                    <>
                      <p className="error-message">{descriptionError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="d-flex justify-content-end w-100 pt-4">
                  <ModelButton text="Submit" onClick={handleStep5} />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openModelEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <h1 className="text-center">Update BSO</h1>
              <Tooltip title="Close">
              <CgCloseR
                style={{
                  color: "red",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setNameDetailsError("");
                  setTypeDetailsError("");
                  setEmailDetailsError("");
                  setWebsiteDetailsError("");
                  setContactNumberDetailsError("");
                  setDesciptionDetailsError("");
                  setLogoDetailsError("");
                  setUpdatingFail("");
                  setOpenModelEdit(false);
                }}
              />
              </Tooltip>
             
            </div>
            {updatingFail && (
              <>
                <div className="col-md-6 p-1 p-md-3 error-div d-flex justify-content-center align-items-center m-auto">
                  <p>{updatingFail}</p>
                </div>
              </>
            )}
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Name: <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={nameDetails}
                    className="form-control place-holder"
                    placeholder="Enter bso name"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setNameDetailsError("");
                      setUpdatingFail("");
                      setNameDetails(e.target.value);
                    }}
                  />
                  {nameDetailsError && (
                    <>
                      <p className="error-message">{nameDetailsError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Type: <span>*</span>
                  </label>
                  <select
                    class="form-select"
                    value={typeDetails}
                    onChange={(e) => {
                      setTypeDetailsError("");
                      setUpdatingFail("");
                      setTypeDetails(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Select type
                    </option>
                    {typeOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                  {typeDetailsError && (
                    <>
                      <p className="error-message">{typeDetailsError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-3">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Contact Number: <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={contactNumberDetails}
                    className="form-control place-holder"
                    placeholder="+264 *** ****"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setContactNumberDetailsError("");
                      setUpdatingFail("");
                      setContactNumberDetails(e.target.value);
                    }}
                  />
                  {contactNumberDetailsError && (
                    <>
                      <p className="error-message">{contactNumberDetailsError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Website Link:<span>*</span>
                  </label>
                  <input
                    type="text"
                    value={websiteDetails}
                    className="form-control place-holder"
                    placeholder="www.example.com.na"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setWebsiteDetailsError("");
                      setUpdatingFail("");
                      setWebsiteDetails(e.target.value);
                    }}
                  />
                  {websiteDetailsError && (
                    <>
                      <p className="error-message">{websiteDetailsError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Email: <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={emailDetails}
                    className="form-control place-holder"
                    placeholder="example@nipdb.com.na"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setEmailDetailsError("");
                      setUpdatingFail("");
                      setEmailDetails(e.target.value);
                    }}
                  />
                  {emailDetailsError && (
                    <>
                      <p className="error-message">{emailDetailsError}</p>
                    </>
                  )}
                </div>
                {logoDetails ? (
                  <>
                    <div>
                      <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                        <div className="position-relative">
                          <div
                            className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                            style={{
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                            }}
                            onClick={clearFileInput1}
                          >
                            {logoDetails ? (
                              <CloseIcon
                                style={{
                                  width: isSmallScreen ? "18px" : "24px",
                                  height: isSmallScreen ? "18px" : "24px",
                                  color: "#1674BB",
                                }}
                              />
                            ) : (
                              <CameraAltIcon
                                style={{
                                  width: isSmallScreen ? "18px" : "24px",
                                  height: isSmallScreen ? "18px" : "24px",
                                  color: "#1674BB",
                                }}
                              />
                            )}
                          </div>
                          <img
                            src={
                              updatingDetails.logo === logoDetails
                                ? `https://dt.mtc.com.na:4000/bsos/${logoDetails}`
                                : logoDetails
                            }
                            className=" img-responsive img-thumbnail"
                            alt=""
                          />
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={inputRef}
                            onChange={handleFileChange1}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Logo: <span>*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control place-holder"
                        placeholder="example@nipdb.com.na"
                        autoComplete="off"
                        name="email"
                        onChange={handleFileChange1}
                      />
                      {logoDetailsError && (
                        <>
                          <p className="error-message">{logoDetailsError}</p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Description: <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    rows={5}
                    value={descriptionDetails}
                    className="form-control place-holder"
                    placeholder="Enter bso description"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setDesciptionDetailsError("");
                      setUpdatingFail("");
                      setDesciptionDetails(e.target.value);
                    }}
                  />
                  {descriptionDetailsError && (
                    <>
                      <p className="error-message">{descriptionDetailsError}</p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="d-flex justify-content-end w-100">
                  <ModelButton text="Submit" onClick={handleSubmitUpdate} />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Bso;
