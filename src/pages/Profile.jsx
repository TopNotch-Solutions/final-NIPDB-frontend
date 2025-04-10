import { React, useState, useRef, useEffect } from "react";
import "../assets/css/profile.css";
import { useTheme, useMediaQuery } from "@mui/material";
import profile from "../assets/images/blank-profile-picture-973460_960_720.webp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { toggleIsSubmittingTrue,toggleIsSubmittingfalse } from "../redux/reducers/submittingReducer";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage } from "../redux/reducers/authReducer";
import { login } from "../redux/reducers/authReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/reducers/authReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import handleAuthFailure from "../utils/handleAuthFailure";

function Profile() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("select");
  const currentUser = useSelector((state) => state.auth.user);
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [contactNumber, setContactNumber] = useState(currentUser.contactNumber);
  const [department, setDepartment] = useState(currentUser.department);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serverToken = useSelector((state) => state.server.serverToken);
  const tokenHeader = currentUser.token;
  const buttonStyle = {
    color: "red",
    borderColor: "red",
  };

  useEffect(() => {
    dispatch(toggleIsSubmittingTrue());
    if (currentUser && currentUser.profileImage) {
      const parsedData = currentUser.profileImage;
      setProfilePic(parsedData);
    }
    dispatch(toggleIsSubmittingfalse());
  }, [currentUser]);

  const convertToBase64 = (file) => {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewProfilePic(reader.result);
    };
    reader.onerror = (error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 3000,
      });
    };
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = [
        "image/jpeg", // .jpg and .jpeg
        "image/png", // .png
      ];

      if (!allowedExtensions.exec(file.name)) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Please upload a valid image file with .jpg, .jpeg, or .png extension.`,
          showConfirmButton: false,
          timer: 4000,
        });
        setSelectedFile(null);
        return;
      }

      if (!validMimeTypes.includes(file.type)) {
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      convertToBase64(file);
    }
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setNewProfilePic("");
    setUploadStatus("select");
    setError("");
  };

  const handleFileUpload = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://dt.mtc.com.na:4000/auth/admin/update/profile-image/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
          body: JSON.stringify({
            profileImage: newProfilePic,
          }),
        }
      );
      
      

      const data = await response.json();
        const newTokenHeader = response.headers.get('x-access-token');
        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }else{
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
        if (!response.ok) {
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Something went wrong during data update`,
            showConfirmButton: false,
            timer: 4000,
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      setIsSubmitting(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile image successfully updated!",
        showConfirmButton: false,
        timer: 4000,
      });
      setProfilePic(data.profileImage);

      dispatch(updateProfileImage({ profileImage: data.profileImage }));
      setSelectedFile(null);
      setNewProfilePic("");
    } catch (error) {
      setIsSubmitting(false);
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };

  const handleCameraClick = () => {
    inputRef.current.click();
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Passwords do not match!`,
        showConfirmButton: false,
        timer: 4000,
      });
    } else {
      try {
        setIsSubmitting(true);
        const response = await fetch(
          `https://dt.mtc.com.na:4000/auth/admin/change-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
            body: JSON.stringify({
              currentPassword,
              newPassword,
              confirmPassword,
            }),
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('x-access-token');
        
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password successfully updated!",
            showConfirmButton: false,
            timer: 4000,
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setIsSubmitting(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
          
        }
      } catch (error) {
        setIsSubmitting(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };

  const handleUserDetailsChange = async () => {
    if (!firstName || !lastName || !email || !contactNumber || !department) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Input fields cannot be empty`,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      if (
        firstName === currentUser.firstName &&
        lastName === currentUser.lastName &&
        email === currentUser.email &&
        contactNumber === currentUser.contactNumber &&
        department === currentUser.department
      ) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: `You have not made any changes`,
          showConfirmButton: false,
          timer: 4000,
        });
      } else {
        try {
          setIsSubmitting(true);
          const response = await fetch(
            `https://dt.mtc.com.na:4000/auth/admin/update/details`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${serverToken}`,
                'x-access-token': `${tokenHeader}`
              },
              
              body: JSON.stringify({
                firstName,
                lastName,
                email,
                contactNumber,
                department,
              }),
            }
          );

          const data = await response.json();
        const newTokenHeader = response.headers.get('x-access-token');
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Admin details successfully updated!",
              showConfirmButton: false,
              timer: 4000,
            });
            dispatch(login({
              user: data.currentUser
            }));
            setIsEditing(false);
          } else {
            setIsSubmitting(false);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 4000,
            });
            
          }
        } catch (error) {
          setIsSubmitting(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
                  }
      }
    }
  };
  const departmentsOption = [
    {
      value: "Human Resources",
    },
    {
      value: "Finance",
    },
    {
      value: "Marketing",
    },
    {
      value: "Sales",
    },
    {
      value: "Operations",
    },
    {
      value: "Information Technology",
    },
    {
      value: "Research and Development",
    },
    {
      value: "Customer Service",
    },
    {
      value: "Legal",
    },
    {
      value: "Administration",
    },
  ];

  return (
    <>
    {
      isSubmitting ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) :(
        <div className="container-fluid mt-4">
      <p className="msme">My Profile</p>
      <p>View and manage your personal information and account settings.</p>
      <div className="row d-flex flex-column flex-md-row justify-content-around mx-auto mt-4">
        <div className="d-flex align-items-center border rounded-3">
          <div>
            <div className="col-12  mt-4 p-1  p-md-4 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
              <div className="position-relative">
                <div
                  className="bg-white rounded-circle position-absolute camera-top d-flex align-items-center justify-content-center "
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={selectedFile ? clearFileInput : handleCameraClick}
                >
                  {selectedFile ? (
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
                  src={selectedFile ? newProfilePic : profilePic || profile}
                  className="circular-image img-responsive img-thumbnail"
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

              {selectedFile && (
                <>
                  <button
                    className="btn btn-success  p-md-1 p-xl-2 w-100 ptt-top"
                    onClick={handleFileUpload}
                  >
                    {uploadStatus === "select" || uploadStatus === "uploading"
                      ? "Upload Image"
                      : "Done"}
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            <h3 className="d-none d-sm-block">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <h5 className="d-block d-sm-none">
              {currentUser.firstName} {currentUser.lastName}
            </h5>
            <p className="role">Role: {currentUser.role}</p>
          </div>
        </div>
        <div className="col-12 rounded-3 mt-4 border p-4 d-flex flex-column justify-content-start align-items-start b-g me-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h6 className="text-boldd">Personal Information</h6>
            <Stack direction="row" spacing={2}>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outlined"
                  size={isSmallScreen ? "small" : "medium"}
                  color="info"
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setFirstName(currentUser.firstName);
                    setLastName(currentUser.lastName);
                    setEmail(currentUser.email);
                    setContactNumber(currentUser.contactNumber);
                    setDepartment(currentUser.department);
                    setIsEditing(false);
                  }}
                  variant="outlined"
                  size={isSmallScreen ? "small" : "medium"}
                  style={buttonStyle}
                  endIcon={<DeleteIcon />}
                >
                  Undo
                </Button>
              )}
            </Stack>
          </div>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3">
                <label htmlFor="email" className="pb-md-2">
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="form-control place-holder p-md-2"
                  placeholder="example@nipdb.com.na"
                  autoComplete="off"
                  name="email"
                  disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3">
                <label htmlFor="email" className="pb-md-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="form-control place-holder p-md-2"
                  placeholder="example@nipdb.com.na"
                  autoComplete="off"
                  name="email"
                  disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3">
                <label htmlFor="email" className="pb-md-2">
                  Email Address:
                </label>
                <input
                  type="text"
                  value={email}
                  className="form-control place-holder p-md-2"
                  placeholder="example@nipdb.com.na"
                  autoComplete="off"
                  name="email"
                  disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3">
                <label htmlFor="email" className="pb-md-2">
                  Contact Number:
                </label>
                <input
                  type="text"
                  value={contactNumber}
                  className="form-control place-holder p-md-2"
                  placeholder="example@nipdb.com.na"
                  autoComplete="off"
                  name="email"
                  disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3">
                <label htmlFor="email" className="pb-md-2">
                  Department:
                </label>
                <select
                  class="form-select"
                  value={department}
                  disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  <option value="" disabled selected={!department}>
                    Select business type
                  </option>
                  {departmentsOption.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group">
                {isEditing ? (
                  <button
                    className="btn btn-success w-100 pt-top"
                    onClick={handleUserDetailsChange}
                  >
                    Submit
                  </button>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="col-12 rounded-3 mt-4 border p-4 d-flex flex-column justify-content-start align-items-start b-g me-3">
          <h6 className="text-boldd">Security Information</h6>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3 position-relative">
                <label htmlFor="email" className="pb-md-2">
                  Current Password:
                </label>
                <input
                  type={currentPasswordShown ? "text" : "password"}
                  value={currentPassword}
                  className="form-control place-holder p-md-2"
                  placeholder="**********************"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
                <span
                  className="show-password"
                  onClick={() => setCurrentPasswordShown(!currentPasswordShown)}
                  style={{ cursor: "pointer" }}
                >
                  {currentPasswordShown ? (
                    <VisibilityIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                  )}
                </span>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}></Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3 position-relative">
                <label htmlFor="email" className="pb-md-2">
                  New Password:
                </label>
                <input
                  type={newPasswordShown ? "text" : "password"}
                  value={newPassword}
                  className="form-control place-holder p-md-2"
                  placeholder="**********************"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                  <span
                      className="show-password mt-1 position-absolute translate-middle-y pr-4"
                      onClick={() =>setNewPasswordShown(!newPasswordShown)}
                      style={{ cursor: "pointer" }}
                    >
                      {newPasswordShown ? (
                        <VisibilityIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                        />
                      )}
                    </span>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}></Grid>
            <Grid item xs={12} sm={5} md={5}>
              <div className="form-group pb-md-3 position-relative">
                <label htmlFor="email" className="pb-md-2">
                  Confirm Password:
                </label>
                <input
                  type={confirmPasswordShown ? "text" : "password"}
                  value={confirmPassword}
                  className="form-control place-holder p-md-2"
                  placeholder="**********************"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <span
                      className="show-password mt-1 position-absolute translate-middle-y pr-4"
                      onClick={() =>setConfirmPasswordShown(!confirmPasswordShown)}
                      style={{ cursor: "pointer" }}
                    >
                      {confirmPasswordShown ? (
                        <VisibilityIcon sx={{ color: "rgba(0, 0, 0, 0.5)" }} />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                        />
                      )}
                    </span>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              {currentPassword && newPassword && confirmPassword && (
                <button
                  className="btn btn-success p-md-2 w-100 pt-top"
                  onClick={handlePasswordChange}
                >
                  Change Password
                </button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
      )
    }
    </>
  );
}

export default Profile;
