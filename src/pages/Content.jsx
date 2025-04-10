import React, { useEffect, useRef, useState } from "react";
import { IconButton, useTheme, useMediaQuery, Backdrop } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { CgCloseR } from "react-icons/cg";
import "../assets/css/msme.css";
import CircularProgress from "@mui/material/CircularProgress";
import { toggleIsSubmittingTrue,toggleIsSubmittingfalse } from "../redux/reducers/submittingReducer";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import MyButton from "../components/commons/MyButton";
import Modal from "@mui/material/Modal";
import ModelButton from "../components/commons/ModelButton";
import Swal from "sweetalert2";
import UpdateButton from "../components/commons/UpdateButton";
import DeleteButton from "../components/commons/DeleteButton";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { login } from "../redux/reducers/authReducer";
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

function Content() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const tokenHeader = currentUser.token;

  const [file, setFile] = useState(null);
  const [fileMobileImage, setFileMobileImage] = useState(null);
  const [fileMobileImageDetails, setFileMobileImageDetails] = useState(null);

  const [buttonActive, setButonActive] = useState(1);
  const [opportunityActive, setopportunityActive] = useState(1);
  const [description, setDescription] = useState("");

  const [descriptionError, setDescriptionError] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");

  const [descriptionImage, setDescriptionImage] = useState("");
  const [descriptionImageError, setDescriptionImageError] = useState("");
  const [imageImage, setImageImage] = useState("");
  const [imageImageError, setImageImageError] = useState("");
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const [descriptionDetails, setDescriptionDetails] = useState("");
  const [descriptionDetailsError, setDescriptionDetailsError] = useState("");
  const [imageDetails, setImageDetails] = useState("");
  const [imageDetailsError, setImageDetailsError] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const [descriptionImageDetails, setDescriptionImageDetails] = useState("");
  const [descriptionImageDetailsError, setDescriptionImageDetailsError] =
    useState("");
  const [imageImageDetails, setImageImageDetails] = useState("");
  const [imageImageDetailsError, setImageImageDetailsError] = useState("");
  const [linkDetails, setLinkDetails] = useState("");
  const [linkDetailsError, setLinkDetailsError] = useState("");

  const [updatingFail, setUpdatingFail] = useState("");
  const [mobileImagesList, setMobileImagesList] = useState([]);
  const [opportunitiesList, setOpportunitiesList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openModel1, setOpenModel1] = useState(false);
  const [openModelEdit, setOpenModelEdit] = useState(false);
  const [openModelEdit1, setOpenModelEdit1] = useState(false);
  const [updatingDetails, setUpdatingDetails] = useState([]);
  const [updatingImageDetails, setUpdatingImageDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery1, setSearchQuery1] = useState("");
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  const serverToken = useSelector((state) => state.server.serverToken);

  const handleOpen = () => setOpenModel(true);
  const handleOpen1 = () => setOpenModel1(true);

  const handleClose = () => {
    setDescription("");
    setImage("");
    setLinkError("");
    setUserDetails("");
    setOpenModel(false);
  };
  const handleClose1 = () => {
    setOpenModel1(false);
    setDescriptionImageError("");
    setImageImageError("");
    setLinkError("");
  };
  const handleOpenEdit = () => setOpenModelEdit(true);
  const handleOpenEdit1 = () => setOpenModelEdit1(true);
  const handleCloseEdit = () => {
    setDescriptionDetails("");
    setImageDetails("");
    setUserDetails("");
    setUpdatingFail("");
    setLinkDetailsError("");
    setOpenModelEdit(false);
  };
  const handleCloseEdit1 = () => {
    setDescriptionImageDetails("");
    setImageImageDetails("")
    setLinkDetailsError("");
    setUpdatingFail("");
    setOpenModelEdit1(false);
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          `https://dt.mtc.com.na:4000/opportunities/admin/all`,
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
          setOpportunitiesList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchOpportunities();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchMobileImages = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          `https://dt.mtc.com.na:4000/admin/mobile-images/all`,
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
          setMobileImagesList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    };

    fetchMobileImages();
  }, [isSubmitting]);

  const handleSubmit = async () => {
    if (validateFields1()) {
      try {
        setIsSubmitting(true);
        dispatch(toggleIsSubmittingTrue());
        const formData = new FormData();
        formData.append("description", description);
        formData.append("opportunity-image", file);
        formData.append(
          "user",
          opportunityActive === 1 ? "General User" : "Business User"
        );
        formData.append("link", link);

        const response = await fetch(
          `https://dt.mtc.com.na:4000/opportunities/admin/create`,
          {
            method: "POST",
            headers:{
              Authorization: `${serverToken}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Opportunity Successfully Added",
            showConfirmButton: false,
            timer: 4000,
          });
          setDescription("");
          setImage("");
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
      } finally {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        setOpenModel(false);
      }
    }
  };

  const handleSubmitImage = async () => {
    if (validateFields3()) {
      try {
        setIsSubmitting(true);
        dispatch(toggleIsSubmittingTrue());
        const formData = new FormData();
        formData.append("description", descriptionImage);
        formData.append("mobile-image", fileMobileImage);
        const response = await fetch(
          `https://dt.mtc.com.na:4000/admin/mobile-images/create`,
          {
            method: "POST",
            
            headers:{
              Authorization: `${serverToken}`,
            },
            body: formData,
          }
        );
        const data = await response.json();

        if (response.ok) {
          setOpenModel1(false);
          setIsSubmitting(false);
          dispatch(toggleIsSubmittingfalse());
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Image Successfully Added",
            showConfirmButton: false,
            timer: 4000,
          });
          setDescriptionImage("");
          setImageImage("");
        } else {
          setIsSubmitting(false);
          setOpenModel1(false);
          dispatch(toggleIsSubmittingfalse());
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
          setDescriptionImage("");
          setImageImage("");
          
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        setIsSubmitting(false);
        setOpenModel1(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      dispatch(toggleIsSubmittingTrue());
      const response = await fetch(
        `https://dt.mtc.com.na:4000/opportunities/admin/single/${id}`,
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
        setUpdatingDetails(data.data);
        setDescriptionDetails(data.data.description);
        setImageDetails(data.data.image);
        setUserDetails(data.data.user);
        setLinkDetails(data.data.link);
        setOpenModelEdit(true);
        //setAdminList(data.data);
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
    }
  };
  const handleUpdateImage = async (id) => {
    try {
      dispatch(toggleIsSubmittingTrue());
      const response = await fetch(
        `https://dt.mtc.com.na:4000/admin/mobile-images/single/${id}`,
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
        setUpdatingImageDetails(data.data);
        setDescriptionImageDetails(data.data.description);
        setImageImageDetails(data.data.mobileImage);
        setFileMobileImageDetails(data.data.mobileImage);
        console.log(updatingImageDetails.mobileImage, data.data.mobileImage);
        setOpenModelEdit1(true);
        //setAdminList(data.data);
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
    }
  };
  const handleDeletion = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Opportunity will be removed from the system completely!",
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
            `https://dt.mtc.com.na:4000/opportunities/admin/delete/${id}`,
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Opportunity Successfully Deleted",
              showConfirmButton: false,
              timer: 4000,
            });
          } else {
            setIsSubmitting(false);
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
  };
  const handleDeletionImage = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Image will be removed from the system completely!",
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
            `https://dt.mtc.com.na:4000/admin/mobile-images/delete/${id}`,
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Image Successfully Deleted",
              showConfirmButton: false,
              timer: 4000,
            });
          } else {
            setIsSubmitting(false);
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
          setIsSubmitting(false);
        }
      }
    });
  };
  const columns = [
    {
      field: "Description",
      headerName: "Description",
      width: isSmallScreen ? 180 : 300,
    },
    {
      field: "Link",
      headerName: "Link",
      width: isSmallScreen ? 130 : 250,
    },
    {
      field: "User",
      headerName: "Target Audience",
      width: isSmallScreen ? 130 : 160,
    },

    {
      field: "DateUploaded",
      headerName: "Date",
      width: isSmallScreen ? 130 : 160,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 200 : 350,
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

  const rows = opportunitiesList.map((admin) => ({
    id: admin.id,
    Description: admin.description,
    User: admin.user,
    Link: admin.link,
    DateUploaded: admin.dateUploaded,
  }));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns1 = [
    {
      field: "Description",
      headerName: "Description",
      width: isSmallScreen ? 180 : 650,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 200 : 350,
      renderCell: (params) => (
        currentUser.role === "Super admin" ? (
          <>
          <UpdateButton onClick={() => handleUpdateImage(params.row.id)} />
          <DeleteButton onClick={() => handleDeletionImage(params.row.id)} />
        </>
        ) : null
        
      ),
    },
  ];

  const rows1 = mobileImagesList.map((admin) => ({
    id: admin.id,
    Description: admin.description,
  }));

  const filteredRows1 = rows1.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery1.toLowerCase())
    )
  );
  const fields1 = [
    { value: description, setError: setDescriptionError, name: "Description" },
    { value: image, setError: setImageError, name: "Image" },
    { value: link, setError: setLinkError, name: "Link", optional: true, isUrl: true }, // Link is optional
];

const validateFields1 = () => {
    let isValid = true;
    fields1.forEach((field) => {
        field.setError(""); 
        if (!field.optional && !field.value) {
            field.setError(`${field.name} is required.`);
            isValid = false;
        } else if (field.isUrl && field.value && !urlRegex.test(field.value)) {
            field.setError(`Invalid ${field.name}. Please provide a valid URL.`);
            isValid = false;
        }
    });
    return isValid;
};
  const fields2 = [
    {
      value: descriptionDetails,
      setError: setDescriptionDetailsError,
      name: "Description",
    },
    { value: imageDetails, setError: setImageDetailsError, name: "Image" },
    { value: linkDetails, setError: setLinkDetailsError, name: "Link", optional: true, isUrl: true }, 
  ];
  const validateFields2 = () => {
    let isValid = true;
    fields2.forEach((field) => {
      field.setError("");
      if (!field.optional && !field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
    } else if (field.isUrl && field.value && !urlRegex.test(field.value)) {
        field.setError(`Invalid ${field.name}. Please provide a valid URL.`);
        isValid = false;
    }
    });
    return isValid;
  };
  const fields3 = [
    {
      value: descriptionImage,
      setError: setDescriptionImageError,
      name: "Description",
    },
    { value: imageImage, setError: setImageImageError, name: "Image" },
  ];
  const validateFields3 = () => {
    let isValid = true;
    fields3.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const fields4 = [
    {
      value: descriptionImageDetails,
      setError: setDescriptionImageDetailsError,
      name: "Description",
    },
    {
      value: imageImageDetails,
      setError: setImageImageDetailsError,
      name: "Image",
    },
  ];
  const validateFields4 = () => {
    let isValid = true;
    fields4.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageError(""); // Reset any previous errors

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImageError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImageError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImage(objectUrl);
    }
  };

  const clearFileInput = () => {
    if (image) {
      URL.revokeObjectURL(image); // Clean up the object URL
    }
    inputRef.current.value = "";
    setImage(null);
  };

  const handleFileChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    setImageImageError(""); // Reset any previous errors

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImageImageError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImageImage(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImageImageError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImageImage(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileMobileImage(selectedFile);
      setImageImage(objectUrl);
    }
  };
  const clearFileInputImage = () => {
    if (imageImage) {
      URL.revokeObjectURL(imageImage);
    }
    inputRef.current.value = "";
    setImageImage(null);
  };

  const handleFileChangeUpdateOpportunity = (e) => {
    setUpdatingFail("");
    setImageDetailsError("");
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImageDetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImageDetails(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImageDetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImageDetails(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileMobileImage(selectedFile);
      setImageDetails(objectUrl);
    }
  };
  const clearFileInputUpdateOpportunity = () => {
    if (imageDetails) {
      URL.revokeObjectURL(imageImage);
    }
    inputRef.current.value = "";
    setImageDetails(null);
  };
  const handleFileChangeUpdateImage = (e) => {
    setUpdatingFail("");
    setImageImageDetailsError("");
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImageImageDetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImageImageDetails(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImageImageDetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImageImageDetails(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileMobileImageDetails(selectedFile);
      setImageImageDetails(objectUrl);
    }
  };
  const clearFileInputUpdateImage = () => {
    if (imageImageDetails) {
      URL.revokeObjectURL(imageImage);
    }
    inputRef.current.value = "";
    setImageImageDetails(null);
  };

  const handleCameraClick = () => {
    inputRef.current.click();
  };
  const handleSubmitUpdateGeneral = async () => {
    if (
      updatingDetails.description === descriptionDetails &&
      updatingDetails.image === imageDetails &&
      updatingDetails.user === userDetails &&
      updatingDetails.link === linkDetails
    ) {
      setUpdatingFail("You have not made any changes");
    } else {
      if (validateFields2()) {
        try {
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("description", descriptionDetails);
          formData.append("user", userDetails);
          formData.append("opportunity-image", fileMobileImage);
          formData.append("link", linkDetails);
          const response = await fetch(
            `https://dt.mtc.com.na:4000/opportunities/admin/update/${updatingDetails.id}`,
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Opportunity Successfully Updated",
              showConfirmButton: false,
              timer: 3000,
            });
            setDescriptionDetails("");
            setUserDetails("");
            setImageDetails("");
          } else {
            setIsSubmitting(false);
            setOpenModelEdit(false);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 3000,
            });
            setDescriptionDetails("");
            setUserDetails("");
            setImageDetails("");
          }
        } catch (error) {
          setIsSubmitting(false);
          setOpenModelEdit(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
          }
      }
    }
  };
  const handleSubmitUpdateImage = async () => {
    if (
      updatingImageDetails.description === descriptionImageDetails &&
      updatingImageDetails.mobileImage === imageImageDetails
    ) {
      setUpdatingFail("You have not made any changes");
    } else {
      if (validateFields4()) {
        try {
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("description", descriptionImageDetails);
          formData.append("mobile-image", fileMobileImageDetails);
          console.log("yo", descriptionDetails, fileMobileImageDetails);
          const response = await fetch(
            `https://dt.mtc.com.na:4000/admin/mobile-images/update/${updatingImageDetails.id}`,
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
            setOpenModelEdit1(false);
            setIsSubmitting(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Image Successfully Updated",
              showConfirmButton: false,
              timer: 3000,
            });
            setDescriptionImageDetails("");
            setImageImageDetails("");
          } else {
            setIsSubmitting(false);
            setOpenModelEdit1(false);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 3000,
            });
            setDescriptionImageDetails("");
            setImageImageDetails("");
            
          }
        } catch (error) {
          setIsSubmitting(false);
          setOpenModelEdit1(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
          }
      }
    }
  };

  const handleSubmitUpdateBusiness = async () => {
    if (
      updatingDetails.description === descriptionDetails &&
      updatingDetails.image === imageDetails &&
      updatingDetails.user === userDetails &&
      updatingDetails.link === linkDetails
    ) {
      setUpdatingFail("You have not made any changes");
    } else {
      if (validateFields2()) {
        try {
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("description", descriptionDetails);
          formData.append("user", userDetails);
          formData.append("opportunity-image", fileMobileImage);
          formData.append("link", linkDetails);

          const response = await fetch(
            `https://dt.mtc.com.na:4000/opportunities/admin/update/${updatingDetails.id}`,
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Opportunity Successfully Updated",
              showConfirmButton: false,
              timer: 3000,
            });
            setDescriptionDetails("");
            setUserDetails("");
            setImageDetails("");
          } else {
            setIsSubmitting(false);
            setOpenModelEdit(false);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 3000,
            });
            setDescriptionDetails("");
            setUserDetails("");
            setImageDetails("");
            
          }
        } catch (error) {
          setIsSubmitting(false);
          setOpenModelEdit(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
        }
      }
    }
  };
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
        <p className="msme">Manage Content</p>
        <p>
          Easily manage, upload and edit all app images and media efficiently.
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
                          buttonActive === 1
                            ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                            : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                        }
                        onClick={() => setButonActive(1)}
                        style={{ border: "none" }}
                      >
                        Opportunity
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
                        Mobile Images
                      </button>
                    </div>
                  </div>
                </div>

                {buttonActive === 1 && (
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
                          placeholder="Search for an Opportunity"
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: 1 }}>
                          <SearchIcon />
                        </IconButton>
                      </Box>
                      {currentUser.role === "Super admin" && (
                      <>
                       <div onClick={handleOpen}>
                        <MyButton text="Add Opportunity" />
                      </div>
                      </>
                    )}
                      
                    </div>
                    <div className="col-12 mt-1">
                      <p className="list-groupp">Opportunity List</p>
                      {opportunitiesList ? (
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
                  </>
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
                          placeholder="Search for Mobile Image"
                          onChange={(e) => setSearchQuery1(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: 1 }}>
                          <SearchIcon />
                        </IconButton>
                      </Box>
                      {currentUser.role === "Super admin" && (
                      <>
                       <div onClick={handleOpen1}>
                        <MyButton text="Add Image" />
                      </div>
                      </>
                    )}
                      
                    </div>
                    <div className="col-12 mt-1">
                      <p className="list-groupp">Image List</p>
                      {mobileImagesList ? (
                        <>
                          <Box sx={{ height: 500, width: "100%" }}>
                            <DataGrid
                              rows={filteredRows1}
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
                              columns={columns1}
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
          <Box sx={modalStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <h1 className="text-center">Add New Opportunity</h1>
              <CgCloseR
                style={{
                  color: "red",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDescription("");
                  setImage("");
                  setUserDetails("");
                  setDescriptionError("");
                  setImageError("");
                  setLinkError("");
                  setOpenModel(false);
                }}
              />
            </div>
            <div className="container-fluid mt-md-4">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-12 col-xxl-9 mx-auto border d-flex flex-wrap justify-content-between p-1">
                  <button
                    className={
                      opportunityActive === 1
                        ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                        : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                    }
                    onClick={() => {
                      if (opportunityActive !== 1) {
                        setDescriptionError("");
                        setImageError("");
                        setLinkError("");
                        setopportunityActive(1);
                      } else {
                        setopportunityActive(1);
                      }
                    }}
                  >
                    General
                  </button>
                  <button
                    className={
                      opportunityActive === 2
                        ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                        : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                    }
                    onClick={() => {
                      if (opportunityActive !== 2) {
                        setDescriptionError("");
                        setImageError("");
                        setLinkError("");
                        setopportunityActive(2);
                      } else {
                        setopportunityActive(2);
                      }
                    }}
                  >
                    Business
                  </button>
                </div>
              </div>
            </div>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: "10px" }}
            >
              {opportunityActive === 1 && (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Description: <span>*</span>
                      </label>
                      <textarea
                        type="text"
                        rows={4}
                        value={description}
                        className="form-control place-holder"
                        placeholder="Opportunity description......"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setDescriptionError("");
                          setDescription(e.target.value);
                        }}
                      />
                      {descriptionError && (
                        <>
                          <p className="error-message">{descriptionError}</p>
                        </>
                      )}
                    </div>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Link:
                      </label>
                      <input
                        type="url"
                        value={link}
                        className="form-control place-holder"
                        placeholder="Enter URL link "
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setLinkError("");
                          setLink(e.target.value);
                        }}
                      />
                      {linkError && (
                        <>
                          <p className="error-message">{linkError}</p>
                        </>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    {image ? (
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
                                {image ? (
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
                                src={image}
                                className="img-responsive img-thumbnail"
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
                            Image: <span>*</span>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control place-holder"
                            placeholder="example@nipdb.com.na"
                            autoComplete="off"
                            name="opportunity-image"
                            onChange={handleFileChange}
                          />
                          {imageError && (
                            <>
                              <p className="error-message">{imageError}</p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex justify-content-end w-100">
                      <ModelButton text="Submit" onClick={handleSubmit} />
                    </div>
                  </Grid>
                </>
              )}
              {opportunityActive === 2 && (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Description: <span>*</span>
                      </label>
                      <textarea
                        type="text"
                        rows={4}
                        value={description}
                        className="form-control place-holder"
                        placeholder="Opportunity description......"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setDescriptionError("");
                          setDescription(e.target.value);
                        }}
                      />
                      {descriptionError && (
                        <>
                          <p className="error-message">{descriptionError}</p>
                        </>
                      )}
                    </div>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Link:
                      </label>
                      <input
                        type="url"
                        value={link}
                        className="form-control place-holder"
                        placeholder="Enter URL link "
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setLinkError("");
                          setLink(e.target.value);
                        }}
                      />
                      {linkError && (
                        <>
                          <p className="error-message">{linkError}</p>
                        </>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    {image ? (
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
                                {image ? (
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
                                src={image}
                                className="img-responsive img-thumbnail"
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
                            Image: <span>*</span>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control place-holder"
                            placeholder="example@nipdb.com.na"
                            autoComplete="off"
                            name="opportunity-image"
                            onChange={handleFileChange}
                          />
                          {imageError && (
                            <>
                              <p className="error-message">{imageError}</p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex justify-content-end w-100">
                      <ModelButton text="Submit" onClick={handleSubmit} />
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openModel1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <h1 className="text-center">Add New Mobile Image</h1>
              <CgCloseR
                style={{
                  color: "red",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDescriptionImage("");
                  setImageImage("");
                  setOpenModel1(false);
                  setDescriptionImageError("");
                  setImageImageError("");
                }}
              />
            </div>

            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: isSmallScreen ? "10px" : "20px" }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <div className="form-group pb-md-2">
                  <label htmlFor="email" className="pb-2 text-boldd">
                    Description: <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control place-holder"
                    placeholder="Opportunity description"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setDescriptionImageError("");
                      setDescriptionImage(e.target.value);
                    }}
                  />
                  {descriptionImageError && (
                    <>
                      <p className="error-message">{descriptionImageError}</p>
                    </>
                  )}
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                {imageImage ? (
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
                            onClick={clearFileInputImage}
                          >
                            {imageImage ? (
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
                            src={imageImage}
                            className="img-responsive img-thumbnail"
                            alt=""
                          />
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={inputRef}
                            onChange={handleFileChangeImage}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Image: <span>*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control place-holder"
                        placeholder="example@nipdb.com.na"
                        autoComplete="off"
                        name="email"
                        onChange={handleFileChangeImage}
                      />
                      {imageImageError && (
                        <>
                          <p className="error-message">{imageImageError}</p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                <div className="d-flex justify-content-end w-100">
                  <ModelButton text="Submit" onClick={handleSubmitImage} />
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
              <h1 className="text-center">Update Opportunity</h1>
              <CgCloseR
                style={{
                  color: "red",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDescriptionDetails("");
                  setImageDetails("");
                  setUserDetails("");
                  setOpenModelEdit(false);
                  setDescriptionImageDetails("");
                  setLinkDetailsError("");
                  setImageImageDetailsError("");
                  setUpdatingFail("");
                }}
              />
            </div>

            {updatingFail && (
              <>
                <div className="col-md-6 p-1 p-md-3 error-div d-flex justify-content-center align-items-center m-auto">
                  <p>{updatingFail}</p>
                </div>
              </>
            )}
            <div className="container-fluid mt-md-4">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-12 col-xxl-9 mx-auto border d-flex flex-wrap justify-content-between p-1">
                  <button
                    className={
                      userDetails === "General User"
                        ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                        : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                    }
                    onClick={() => {
                      if (userDetails !== "General User") {
                        setDescriptionDetailsError("");
                        setImageDetailsError("");
                        setLinkDetailsError("");
                        setUserDetails("General User");
                      } else {
                        setUserDetails("General User");
                      }
                    }}
                  >
                    General
                  </button>
                  <button
                    className={
                      userDetails === "Business User"
                        ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                        : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                    }
                    onClick={() => {
                      if (userDetails !== "Business User") {
                        setDescriptionDetailsError("");
                        setImageDetailsError("");
                        setLinkDetailsError("");
                        setUserDetails("Business User");
                      } else {
                        setUserDetails("Business User");
                      }
                    }}
                  >
                    Business
                  </button>
                </div>
              </div>
            </div>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: "10px" }}
            >
              {userDetails === "General User" && (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Description: <span>*</span>
                      </label>
                      <textarea
                        type="text"
                        rows={4}
                        value={descriptionDetails}
                        className="form-control place-holder"
                        placeholder="Opportunity description"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setUpdatingFail("");
                          setDescriptionDetailsError("");
                          setDescriptionDetails(e.target.value);
                        }}
                      />
                      {descriptionDetailsError && (
                        <>
                          <p className="error-message">
                            {descriptionDetailsError}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Link:
                      </label>
                      <input
                        type="text"
                        value={linkDetails}
                        className="form-control place-holder"
                        placeholder="Enter link URL"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setUpdatingFail("");
                          setLinkDetails(e.target.value);
                        }}
                      />
                      {linkDetailsError && (
                        <>
                          <p className="error-message">{linkDetailsError}</p>
                        </>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    {imageDetails ? (
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
                                onClick={clearFileInputUpdateOpportunity}
                              >
                                {imageDetails ? (
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
                                  updatingDetails.image === imageDetails
                                    ? `https://dt.mtc.com.na:4000/opportunities/` +
                                      imageDetails
                                    : imageDetails
                                }
                                className="img-responsive img-thumbnail"
                                alt=""
                              />
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={inputRef}
                                onChange={handleFileChangeUpdateOpportunity}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group pb-md-2">
                          <label htmlFor="email" className="pb-2 text-boldd">
                            Image: <span>*</span>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control place-holder"
                            placeholder="example@nipdb.com.na"
                            autoComplete="off"
                            name="opportunity-image"
                            onChange={handleFileChangeUpdateOpportunity}
                          />
                          {imageDetailsError && (
                            <>
                              <p className="error-message">{imageDetailsError}</p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex justify-content-end w-100">
                      <ModelButton
                        text="Submit"
                        onClick={handleSubmitUpdateGeneral}
                      />
                    </div>
                  </Grid>
                </>
              )}
              {userDetails === "Business User" && (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Description: <span>*</span>
                      </label>
                      <textarea
                        type="text"
                        rows={4}
                        value={descriptionDetails}
                        className="form-control place-holder"
                        placeholder="Opportunity description"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setUpdatingFail("");
                          setDescriptionDetailsError("");
                          setDescriptionDetails(e.target.value);
                        }}
                      />
                      {descriptionDetailsError && (
                        <>
                          <p className="error-message">
                            {descriptionDetailsError}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Link:
                      </label>
                      <input
                        type="text"
                        value={linkDetails}
                        className="form-control place-holder"
                        placeholder="Enter link URL"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => {
                          setUpdatingFail("");
                          setLinkDetailsError("");
                          setLinkDetails(e.target.value);
                        }}
                      />
                      {linkDetailsError && (
                        <>
                          <p className="error-message">{linkDetailsError}</p>
                        </>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    {imageDetails ? (
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
                                onClick={clearFileInputUpdateOpportunity}
                              >
                                {imageDetails ? (
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
                                  updatingDetails.image === imageDetails
                                    ? `https://dt.mtc.com.na:4000/opportunities/` +
                                      imageDetails
                                    : imageDetails
                                }
                                className="img-responsive img-thumbnail"
                                alt=""
                              />
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={inputRef}
                                onChange={handleFileChangeUpdateOpportunity}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group pb-md-2">
                          <label htmlFor="email" className="pb-2 text-boldd">
                            Image: <span>*</span>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control place-holder"
                            placeholder="example@nipdb.com.na"
                            autoComplete="off"
                            name="opportunity-image"
                            onChange={handleFileChangeUpdateOpportunity}
                          />
                          {imageDetailsError && (
                            <>
                              <p className="error-message">{imageDetailsError}</p>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex justify-content-end w-100">
                      <ModelButton
                        text="Submit"
                        onClick={handleSubmitUpdateBusiness}
                      />
                    </div>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openModelEdit1}
          onClose={handleCloseEdit1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <h1 className="text-center">Update Mobile Image</h1>
              <CgCloseR
                style={{
                  color: "red",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDescriptionImageDetails("");
                  setImageImageDetails("");
                  setDescriptionImageDetailsError("");
                  setImageImageDetailsError("");
                  setOpenModelEdit1(false);
                  setUpdatingFail("");
                }}
              />
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
                    Description: <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={descriptionImageDetails}
                    className="form-control place-holder"
                    placeholder="Opportunity description"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setUpdatingFail("");
                      setDescriptionImageDetailsError("");
                      setDescriptionImageDetails(e.target.value);
                    }}
                  />
                  {descriptionImageDetailsError && (
                    <>
                      <p className="error-message">
                        {descriptionImageDetailsError}
                      </p>
                    </>
                  )}
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                {imageImageDetails ? (
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
                            onClick={clearFileInputUpdateImage}
                          >
                            {imageImageDetails ? (
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
                              updatingImageDetails.mobileImage ===
                              imageImageDetails
                                ? `https://dt.mtc.com.na:4000/mobile-images/${imageImageDetails}`
                                : imageImageDetails
                            }
                            className="img-responsive img-thumbnail"
                            alt=""
                          />
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={inputRef}
                            onChange={handleFileChangeUpdateImage}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group pb-md-2">
                      <label htmlFor="email" className="pb-2 text-boldd">
                        Image: <span>*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control place-holder"
                        placeholder="example@nipdb.com.na"
                        autoComplete="off"
                        name="email"
                        onChange={handleFileChangeUpdateImage}
                      />
                      {imageImageDetailsError && (
                        <>
                          <p className="error-message">{imageImageDetailsError}</p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                <div className="d-flex justify-content-end w-100">
                  <ModelButton
                    text="Submit"
                    onClick={handleSubmitUpdateImage}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Content;
