import React, { useEffect, useRef, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  toggleIsSubmittingTrue,
  toggleIsSubmittingfalse,
} from "../redux/reducers/submittingReducer";
import Select from "react-select";
import { Switch } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import "../assets/css/msme.css";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Box from "@mui/material/Box";
import { CgCloseR } from "react-icons/cg";
import { DataGrid } from "@mui/x-data-grid";
import { SlOptionsVertical } from "react-icons/sl";
import Swal from "sweetalert2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MyButton from "../components/commons/MyButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ModelButton from "../components/commons/ModelButton";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { login } from "../redux/reducers/authReducer";
import handleAuthFailure from "../utils/handleAuthFailure";
import { RemoveWhiteSpaces } from "../utils/removeWhiteSpaces";
import { convert24To12Hour } from "../utils/timeConvertion";
import { validateTimeRangeOrClosed } from "../utils/validateTime";

// const mobileStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: {
//     xs: '95%',
//     sm: '80%', 
//     md: '70%'
//   },
//   height: "80%",
//   overflowY: "scroll",
//   bgcolor: "background.paper",
//   border: "2px solid #fff",
//   boxShadow: 24,
//   p: 4,
// };

// const largeStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: {
//     xs: '95%',
//     sm: '80%', 
//     md: '70%'
//   },
//   height: "80%",
//   overflowY: "auto",
//   bgcolor: "background.paper",
//   border: "2px solid #fff",
//   boxShadow: 24,
//   p: 4,
// };
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

const steps = [
  "General business information",
  "Founder's information",
  "Contact information",
  "Business hours",
  "Additional information",
];

function Msme() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();

  const inputRefBusinessLogo = useRef();
  const inputRef1Details = useRef();
  const inputRef2Details = useRef();
  const inputRef3Details = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const [fileBusinessLogo, setFileBusinessLogo] = useState(null);
  const [fileImage1, setFileImage1] = useState(null);
  const [fileImage2, setFileImage2] = useState(null);
  const [fileImage3, setFileImage3] = useState(null);

  const [totalRegisteration, setTotalRegistration] = useState("");
  const [pendingRegisteration, setPendingRegistration] = useState("");
  const [rejectedRegisteration, setRejectedRegistration] = useState("");
  const [incompleteRegisteration, setIncompleteRegistration] = useState("");
  const [allMSMEList, setAllMSMEList] = useState([]);
  const [pendingMSMEList, setPendingMSMEList] = useState([]);
  const [rejectedMSMEList, setRejectedMSMEList] = useState([]);
  const [approvedMSMEList, setApprovedMSMEList] = useState([]);
  const [incompleteMSMEList, setIncompleteMSMEList] = useState([]);
  const [approvedRegisteration, setIApprovedRegistration] = useState("");
  const [stepperCounter, setStepperCounter] = useState(0);
  const [buttonActive, setButonActive] = useState(1);
  const [businessRegistrationName, setBusinessRegistrationName] = useState("");
  const [businessRegistrationNameError, setBusinessRegistrationNameError] =
    useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState("");
  const [businessRegistrationNumberError, setBusinessRegistrationNumberError] =
    useState("");
  const [businessDisplayName, setBusinessDisplayName] = useState("");
  const [businessDisplayNameError, setBusinessDisplayNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [typeOfBusinessError, setTypeOfBusinessError] = useState("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [town, setTown] = useState("");
  const [townError, setTownError] = useState("");
  const [primaryIndustry, setPrimaryIndustry] = useState("");
  const [primaryIndustryError, setPrimaryIndustryError] = useState("");
  const [secondaryIndustry, setSecondaryIndustry] = useState("");
  const [secondaryIndustryError, setSecondaryIndustryError] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [yearOfEstablishmentError, setYearOfEstablishmentError] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [annualTurnoverError, setAnnualTurnoverError] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [regionList, setRegionList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [primaryIndustryList, setPrimaryIndustryList] = useState([]);
  const [secondaryList, setSecondaryList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [foundersName, setFoundersName] = useState("");
  const [foundersNameError, setFoundersNameError] = useState("");
  const [foundersGender, setFoundersGender] = useState("");
  const [foundersGenderError, setFoundersGenderError] = useState("");
  const [foundersAge, setFoundersAge] = useState("");
  const [foundersAgeError, setFoundersAgeError] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [whatsAppNumberError, setWhatsAppNumberError] = useState("");
  const [businessEmailError, setBusinessEmailError] = useState("");
  const [websiteLinkError, setWebsiteLinkError] = useState("");
  const [twitterLinkError, setTwitterLinkError] = useState("");
  const [facebookLinkError, setFacebookLinkError] = useState("");
  const [instagramLinkError, setInstagramLinkError] = useState("");
  const [linkedInLinkError, setLinkedInLinkError] = useState("");
  const [mondayError, setMondayError] = useState("");
  const [tuesdayError, setTuesdayError] = useState("");
  const [wednesdayError, setWednesdayError] = useState("");
  const [thursdayError, setThursdayError] = useState("");
  const [fridayError, setFridayError] = useState("");
  const [saturdayError, setSaturdayError] = useState("");
  const [sundayError, setSundayError] = useState("");
  const [numberOfEmployeesError, setNumberOfEmployeesError] = useState("");
  const [businessLogoError, setBusinessLogoError] = useState("");
  const [image1Error, setImage1Error] = useState("");
  const [image2Error, setImage2Error] = useState("");
  const [image3Error, setImage3Error] = useState("");
  const [mondayFrom, setMondayFrom] = useState("");
  const [mondayTo, setMondayTo] = useState("");
  const [tuesdayFrom, setTuesdayFrom] = useState("");
  const [tuesdayTo, setTuesdayTo] = useState("");
  const [wednesdayFrom, setWednesdayFrom] = useState("");
  const [wednesdayTo, setWednesdayTo] = useState("");
  const [thursdayFrom, setThursdayFrom] = useState("");
  const [thursdayTo, setThursdayTo] = useState("");
  const [fridayFrom, setFridayFrom] = useState("");
  const [fridayTo, setFridayTo] = useState("");
  const [saturdayFrom, setSaturdayFrom] = useState("");
  const [saturdayTo, setSaturdayTo] = useState("");
  const [sundayFrom, setSundayFrom] = useState("");
  const [sundayTo, setSundayTo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryPending, setSearchQueryPending] = useState("");
  const [searchQueryApproved, setSearchQueryApproved] = useState("");
  const [searchQueryRejected, setSearchQueryRejected] = useState("");
  const [searchQueryIncomplete, setSearchQueryIncomplete] = useState("");
  const [updatingDetails, setUpdatingDetails] = useState([]);
  const [numberOfDaysOpenError, setNumberOfDaysOpenError] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [openModelView, setOpenModelView] = useState(false);

  const [businessRegistrationNameDetails, setBusinessRegistrationNameDetails] =
    useState("");
  const [
    businessRegistrationNameDetailsError,
    setBusinessRegistrationNameDetailsError,
  ] = useState("");
  const [
    businessRegistrationNumberDetails,
    setBusinessRegistrationNumberDetails,
  ] = useState("");
  const [
    businessRegistrationNumberDetailsError,
    setBusinessRegistrationNumberDetailsError,
  ] = useState("");
  const [businessDisplayNameDetails, setBusinessDisplayNameDetails] =
    useState("");
  const [businessDisplayNameDetailsError, setBusinessDisplayNameDetailsError] =
    useState("");
  const [descriptionDetails, setDescriptionDetails] = useState("");
  const [descriptionDetailsError, setDescriptionDetailsError] = useState("");
  const [typeOfBusinessDetails, setTypeOfBusinessDetails] = useState("");
  const [typeOfBusinessDetailsError, setTypeOfBusinessDetailsError] =
    useState("");
  const [regionDetails, setRegionDetails] = useState("");
  const [regionDetailsError, setRegionDetailsError] = useState("");
  const [townDetails, setTownDetails] = useState("");
  const [townDetailsError, setTownDetailsError] = useState("");
  const [primaryIndustryDetails, setPrimaryIndustryDetails] = useState("");
  const [primaryIndustryDetailsError, setPrimaryIndustryDetailsError] =
    useState("");
  const [secondaryIndustryDetails, setSecondaryIndustryDetails] = useState("");
  const [secondaryIndustryDetailsError, setSecondaryIndustryDetailsError] =
    useState("");
  const [yearOfEstablishmentDetails, setYearOfEstablishmentDetails] =
    useState("");
  const [yearOfEstablishmentDetailsError, setYearOfEstablishmentDetailsError] =
    useState("");
  const [numberOfEmployeesDetails, setNumberOfEmployeesDeDetails] =
    useState("");
  const [numberOfEmployeesDetailsError, setNumberOfEmployeesDetailsError] =
    useState("");
  const [annualTurnoverDetails, setAnnualTurnoverDetails] = useState("");
  const [annualTurnoverDetailsError, setAnnualTurnoverDetailsError] =
    useState("");
  const [foundersNameDetails, setFoundersNameDetails] = useState("");
  const [foundersNameDetailsError, setFoundersNameDetailsError] = useState("");
  const [foundersGenderDetails, setFoundersGenderDetails] = useState("");
  const [foundersGenderDetailsError, setFoundersGenderDetailsError] =
    useState("");
  const [foundersAgeDetails, setFoundersAgeDetails] = useState("");
  const [foundersAgeDetailsError, setFoundersAgeDetailsError] = useState("");
  const [businessAddressDetails, setBusinessAddressDetails] = useState("");
  const [phoneNumberDetails, setPhoneNumberDetails] = useState("");
  const [whatsAppNumberDetails, setWhatsAppNumberDetails] = useState("");
  const [businessEmailDetails, setBusinessEmailDetails] = useState("");
  const [websiteLinkDetails, setWebsiteLinkDetails] = useState("");
  const [twitterLinkDetails, setTwitterLinkDetails] = useState("");
  const [facebookLinkDetails, setFacebookLinkDetails] = useState("");
  const [instagramLinkDetails, setInstagramLinkDetails] = useState("");
  const [linkedInLinkDetails, setLinkedInLinkDetails] = useState("");
  const [businessAddressDetailsError, setBusinessAddressDetailsError] =
    useState("");
  const [phoneNumberDetailsError, setPhoneNumberDetailsError] = useState("");
  const [whatsAppNumberDetailsError, setWhatsAppNumberDetailsError] =
    useState("");
  const [businessEmailDetailsError, setBusinessEmailDetailsError] =
    useState("");
  const [websiteLinkDetailsError, setWebsiteLinkDetailsError] = useState("");
  const [twitterLinkDetailsError, setTwitterLinkDetailsError] = useState("");
  const [facebookLinkDetailsError, setFacebookLinkDetailsError] = useState("");
  const [instagramLinkDetailsError, setInstagramLinkDetailsError] =
    useState("");
  const [linkedInLinkDetailsError, setLinkedInLinkDetailsError] = useState("");
  const [mondayDetails, setMondayDetails] = useState("");
  const [tuesdayDetails, setTuesdayDetails] = useState("");
  const [wednesdayDetails, setWednesdayDetails] = useState("");
  const [thursdayDetails, setThursdayDetails] = useState("");
  const [fridayDetails, setFridayDetails] = useState("");
  const [saturdayDetails, setSaturdayDetails] = useState("");
  const [sundayDetails, setSundayDetails] = useState("");
  const [mondayDetailsError, setMondayDetailsError] = useState("");
  const [tuesdayDetailsError, setTuesdayDetailsError] = useState("");
  const [wednesdayDetailsError, setWednesdayDetailsError] = useState("");
  const [thursdayDetailsError, setThursdayDetailsError] = useState("");
  const [fridayDetailsError, setFridayDetailsError] = useState("");
  const [saturdayDetailsError, setSaturdayDetailsError] = useState("");
  const [sundayDetailsError, setSundayDetailsError] = useState("");
  const [businessLogoDetails, setBusinessLogoDetails] = useState("");
  const [businessLogoDetailsError, setBusinessLogoDetailsError] = useState("");
  const [image1Details, setImage1Details] = useState("");
  const [image1DetailsError, setImage1DetailsError] = useState("");
  const [image2Details, setImage2Details] = useState("");
  const [image2DetailsError, setImage2DetailsError] = useState("");
  const [image3Details, setImage3Details] = useState("");
  const [image3DetailsError, setImage3DetailsError] = useState("");
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [notificationFail, setNotificationFail] = useState(false);

  const [isMondayClosed, setIsMondayClosed] = useState(false);
  const [isTuesdayClosed, setIsTuesdayClosed] = useState(false);
  const [isWednesdayClosed, setIsWednesdayClosed] = useState(false);
  const [isThursdayClosed, setIsThursdayClosed] = useState(false);
  const [isFridayClosed, setIsFridayClosed] = useState(false);
  const [isSaturdayClosed, setIsSaturdayClosed] = useState(false);
  const [isSundayClosed, setIsSundayClosed] = useState(false);
  const [update, setUpdate] = useState(false);
  const [removeBusinessProfileImage, setRemoveBusinessProfileImage] =
    useState(false);
  const [removeImage1, setRemoveImage1] = useState(false);
  const [removeImage2, setRemoveImage2] = useState(false);
  const [removeImage3, setRemoveImage3] = useState(false);
  const [addNotification, setAddNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationTitleError, setNotificationTitleError] = useState("");
  const [notificationDescription, setNotificationDescription] = useState("");
  const [sendingNotification, setsendingNotification] = useState(false);
  const [notificationDescriptionError, setNotificationDescriptionError] =
    useState("");
  const [textCounter, setTextCounter] = useState(0);
  const [textCounterDetails, setTextCounterDetails] = useState(0);
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namibiaPhoneRegex = /^(?:\+264|0)(\s?\d{2})\s?\d{3}\s?\d{4}$/;

  const tokenHeader = currentUser.token;
  const serverToken = useSelector((state) => state.server.serverToken);

  const handleOpen = () => setOpenModel(true);
  const handleClose = () => {
    setBusinessAddressError("");
    setBusinessRegistrationNameError("");
    setBusinessRegistrationNumberError("");
    setBusinessDisplayNameError("");
    setDescriptionError("");
    setTypeOfBusinessError("");
    setRegionError("");
    setTownError("");
    setPrimaryIndustryError("");
    setSecondaryIndustryError("");
    setYearOfEstablishmentError("");
    setNumberOfEmployeesError("");
    setAnnualTurnoverError("");
    setFoundersNameError("");
    setFoundersGenderError("");
    setFoundersAgeError("");
    setBusinessAddressError("");
    setPhoneNumberError("");
    setWhatsAppNumberError("");
    setBusinessEmailError("");
    setWebsiteLinkError("");
    setFacebookLinkError("");
    setTwitterLinkError("");
    setInstagramLinkError("");
    setLinkedInLinkError("");
    setMondayError("");
    setTuesdayDetails("");
    setWednesdayError("");
    setThursdayError("");
    setFridayError("");
    setSaturdayError("");
    setSundayError("");
    setBusinessLogoError("");
    setImage1Error("");
    setImage2Error("");
    setImage3Error("");
    setUserIdError("");

    setIsMondayClosed(false);
    setIsTuesdayClosed(false);
    setIsWednesdayClosed(false);
    setIsThursdayClosed(false);
    setIsFridayClosed(false);
    setIsSaturdayClosed(false);
    setIsSundayClosed(false);
    setOpenModel(false);
  };
  const handleOpenView = () => setOpenModelView(true);
  const handleCloseView = () => {
    setUpdatingDetails([]);
    setBusinessAddressDetails();
    setBusinessRegistrationNameDetails("");
    setBusinessDisplayNameDetails("");
    setDescriptionDetails("");
    setTypeOfBusinessDetails("");
    setRegionDetails("");
    setTownDetails("");
    setPrimaryIndustryDetails("");
    setSecondaryIndustryDetails("");
    setYearOfEstablishmentDetails("");
    setNumberOfEmployeesDeDetails("");
    setAnnualTurnoverDetails("");
    setFoundersNameDetails("");
    setFoundersGenderDetails("");
    setFoundersAgeDetails("");
    setBusinessAddressDetails("");
    setPhoneNumberDetails("");
    setWhatsAppNumberDetails("");
    setBusinessEmailDetails("");
    setWebsiteLinkDetails("");
    setFacebookLinkDetails("");
    setTwitterLinkDetails("");
    setInstagramLinkDetails("");
    setLinkedInLinkDetails("");
    setMondayDetails("");
    setTuesdayDetails("");
    setWednesdayDetails("");
    setThursdayDetails("");
    setFridayDetails("");
    setSaturdayDetails("");
    setSundayDetails("");
    setBusinessLogoDetails("");
    setImage1Details("");
    setImage2Details("");
    setImage3Details("");
    setStepperCounter(0);
    setOpenModelView(false);
    setMondayDetailsError("");
    setNotificationDescription("");
    setNotificationTitle("");
    setNotificationDescriptionError("");
    setNotificationTitleError("");
    setAddNotification(false);
    setTuesdayDetailsError("");
    setWednesdayDetailsError("");
    setThursdayDetailsError("");
    setFridayDetailsError("");
    setSaturdayDetailsError("");
    setSundayDetailsError("");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function convertTo12HourFormat(time) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    const period = hours >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${period}`;
  }
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/totalCount",
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
          setTotalRegistration(data.count);
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
    const fetchPendingCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/pendingCount",
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
          setPendingRegistration(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchPendingCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchRejectedCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/rejectedCount",
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
          setRejectedRegistration(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchRejectedCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/approvedCount",
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
          setIApprovedRegistration(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchApprovedCount();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchIncompleteCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/incompleteCount",
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
          setIncompleteRegistration(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchIncompleteCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeAllMSME = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/msme/admin/all", {
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
          setAllMSMEList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeAllMSME();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchMsmePendingMSME = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/all/pending",
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
          setPendingMSMEList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmePendingMSME();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeRejectedMSME = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/all/rejected",
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
          setRejectedMSMEList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeRejectedMSME();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeApprovedMSME = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/all/approved",
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
          setApprovedMSMEList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeApprovedMSME();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeIncompleteMSME = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/all/incomplete",
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
          setIncompleteMSMEList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeIncompleteMSME();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/region/admin/all", {
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
          setRegionList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllRegions();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchAllTowns = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/town/admin/all", {
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
          setTownList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllTowns();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllPrimaryIndustryList = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/primaryIndustry/admin/all",
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
          setPrimaryIndustryList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllPrimaryIndustryList();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllSeconaryList = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/secondaryIndustry/admin/all",
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
          setSecondaryList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchAllSeconaryList();
  }, [isSubmitting]);
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
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    };

    fetchAllUser();
  }, [isSubmitting]);

  const fields1 = [
    {
      value: businessRegistrationName,
      setError: setBusinessRegistrationNameError,
      name: "Business Registration Name",
    },
    {
      value: businessDisplayName,
      setError: setBusinessDisplayNameError,
      name: "Business Display Name",
    },
    { value: description, setError: setDescriptionError, name: "Description" },
    {
      value: typeOfBusiness,
      setError: setTypeOfBusinessError,
      name: "Type of Business",
    },
    { value: region, setError: setRegionError, name: "Region" },
    { value: town, setError: setTownError, name: "Town" },
    {
      value: primaryIndustry,
      setError: setPrimaryIndustryError,
      name: "Primary Industry",
    },
    {
      value: yearOfEstablishment,
      setError: setYearOfEstablishmentError,
      name: "Year of Establishment",
    },
    {
      value: annualTurnover,
      setError: setAnnualTurnoverError,
      name: "Annual Turnover",
    },
    { value: userId, setError: setUserIdError, name: "User Name" },
  ];
  const fields2 = [
    {
      value: foundersName,
      setError: setFoundersNameError,
      name: "Founder's Name",
    },
    {
      value: foundersGender,
      setError: setFoundersGenderError,
      name: "Founder's Gender",
    },
    {
      value: foundersAge,
      setError: setFoundersAgeError,
      name: "Founder's Age",
    },
  ];
  const fields3 = [
    {
      value: businessAddress,
      setError: setBusinessAddressError,
      name: "Business Address",
    },
    {
      value: phoneNumber,
      setError: setPhoneNumberError,
      name: "Phone Number",
    },
    {
      value: businessEmail,
      setError: setBusinessEmailError,
      name: "Email",
    },
    {
      value: websiteLink,
      setError: setWebsiteLinkError,
      name: "Website Link",
      optional: true,
      isUrl: true,
    },
    {
      value: twitterLink,
      setError: setTwitterLinkError,
      name: "Twitter Link",
      optional: true,
      isUrl: true,
    },
    {
      value: facebookLink,
      setError: setFacebookLinkError,
      name: "Facebook Link",
      optional: true,
      isUrl: true,
    },
    {
      value: instagramLink,
      setError: setInstagramLinkError,
      name: "Instagram Link",
      optional: true,
      isUrl: true,
    },
    {
      value: linkedInLink,
      setError: setLinkedInLinkError,
      name: "LinkedIn Link",
      optional: true,
      isUrl: true,
    },
  ];

  const fields4 = [
    {
      value: mondayFrom,
      to: mondayTo,
      isClosed: isMondayClosed,
      setError: setMondayError,
      name: "Monday",
    },
    {
      value: tuesdayFrom,
      to: tuesdayTo,
      isClosed: isTuesdayClosed,
      setError: setTuesdayError,
      name: "Tuesday",
    },
    {
      value: wednesdayFrom,
      to: wednesdayTo,
      isClosed: isWednesdayClosed,
      setError: setWednesdayError,
      name: "Wednesday",
    },
    {
      value: thursdayFrom,
      to: thursdayTo,
      isClosed: isThursdayClosed,
      setError: setThursdayError,
      name: "Thursday",
    },
    {
      value: fridayFrom,
      to: fridayTo,
      isClosed: isFridayClosed,
      setError: setFridayError,
      name: "Friday",
    },
    {
      value: saturdayFrom,
      to: saturdayTo,
      isClosed: isSaturdayClosed,
      setError: setSaturdayError,
      name: "Saturday",
    },
    {
      value: sundayFrom,
      to: sundayTo,
      isClosed: isSundayClosed,
      setError: setSundayError,
      name: "Sunday",
    },
  ];
  const fields5 = [
    {
      value: numberOfEmployees,
      setError: setNumberOfEmployeesError,
      name: "Number of Employees",
    },
  ];

  const fieldsDetails1 = [
    {
      value: businessRegistrationNameDetails,
      setError: setBusinessRegistrationNameDetailsError,
      name: "Business Registration Name",
    },
    {
      value: businessRegistrationNumberDetails,
      setError: setBusinessRegistrationNumberDetailsError,
      name: "Business Registration Number",
      optional: true,
    },
    {
      value: businessDisplayNameDetails,
      setError: setBusinessDisplayNameDetailsError,
      name: "Business Display Name",
    },
    {
      value: descriptionDetails,
      setError: setDescriptionDetailsError,
      name: "Description",
    },
    {
      value: typeOfBusinessDetails,
      setError: setTypeOfBusinessDetailsError,
      name: "Type of Business",
    },
    { value: regionDetails, setError: setRegionDetailsError, name: "Region" },
    { value: townDetails, setError: setTownDetailsError, name: "Town" },
    {
      value: primaryIndustryDetails,
      setError: setPrimaryIndustryDetailsError,
      name: "Primary Industry",
    },
    {
      value: yearOfEstablishmentDetails,
      setError: setYearOfEstablishmentDetailsError,
      name: "Year of Establishment",
    },
    {
      value: annualTurnoverDetails,
      setError: setAnnualTurnoverDetailsError,
      name: "Annual Turnover",
    },
    {
      value: numberOfEmployeesDetails,
      setError: setNumberOfEmployeesDetailsError,
      name: "Number of Employees",
    },
  ];
  const fieldsDetails2 = [
    {
      value: foundersNameDetails,
      setError: setFoundersNameDetailsError,
      name: "Founder's Name",
    },
    {
      value: foundersGenderDetails,
      setError: setFoundersGenderDetailsError,
      name: "Founder's Gender",
    },
    {
      value: foundersAgeDetails,
      setError: setFoundersAgeDetailsError,
      name: "Founder's Age",
    },
  ];
  const fieldsDetails3 = [
    {
      value: businessAddressDetails,
      setError: setBusinessAddressDetailsError,
      name: "Business Address",
    },
    {
      value: phoneNumberDetails,
      setError: setPhoneNumberDetailsError,
      name: "Phone Number",
    },
    {
      value: businessEmailDetails,
      setError: setBusinessEmailDetailsError,
      name: "Email",
    },
    {
      value: websiteLinkDetails,
      setError: setWebsiteLinkDetailsError,
      name: "Website Link",
      optional: true,
      isUrl: true,
    },
    {
      value: twitterLinkDetails,
      setError: setTwitterLinkDetailsError,
      name: "Twitter Link",
      optional: true,
      isUrl: true,
    },
    {
      value: facebookLinkDetails,
      setError: setFacebookLinkDetailsError,
      name: "Facebook Link",
      optional: true,
      isUrl: true,
    },
    {
      value: instagramLinkDetails,
      setError: setInstagramLinkDetailsError,
      name: "Instagram Link",
      optional: true,
      isUrl: true,
    },
    {
      value: linkedInLinkDetails,
      setError: setLinkedInLinkDetailsError,
      name: "LinkedIn Link",
      optional: true,
      isUrl: true,
    },
  ];
  const fieldsDetails5 = [];
  const fieldsDetails4 = [
    { value: mondayDetails, setError: setMondayDetailsError, name: "Monday" },
    {
      value: tuesdayDetails,
      setError: setTuesdayDetailsError,
      name: "Tuesday",
    },
    {
      value: wednesdayDetails,
      setError: setWednesdayDetailsError,
      name: "Wednesday",
    },
    {
      value: thursdayDetails,
      setError: setThursdayDetailsError,
      name: "Thursday",
    },
    { value: fridayDetails, setError: setFridayDetailsError, name: "Friday" },
    {
      value: saturdayDetails,
      setError: setSaturdayDetailsError,
      name: "Saturday",
    },
    { value: sundayDetails, setError: setSundayDetailsError, name: "Sunday" },
  ];
  const fieldNotification = [
    {
      value: notificationDescription,
      setError: setNotificationDescriptionError,
      name: "Description",
    },
    {
      value: notificationTitle,
      setError: setNotificationTitleError,
      name: "Title",
    },
  ];
  const validateNotification = () => {
    let isValid = true;
    fieldNotification.forEach((field) => {
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

  const validateFields2 = () => {
    let isValid = true;
    fields2.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const validateFields3 = () => {
    let isValid = true;

    fields3.forEach((field) => {
      field.setError("");

      if (!field.optional && !field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      } else if (field.value) {
        if (field.name === "Email" && !emailRegex.test(field.value)) {
          field.setError("Invalid email format.");
          isValid = false;
        }

        if (
          field.name === "Phone Number" &&
          !namibiaPhoneRegex.test(field.value)
        ) {
          field.setError("Invalid phone number.");
          isValid = false;
        }

        if (field.isUrl && !urlRegex.test(field.value)) {
          field.setError(`Invalid URL format.`);
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const validateFields4 = () => {
    let isValid = true;
    let isBusinessOpenAtLeastOneDay = false;

    fields4.forEach((field) => {
      field.setError("");

      if (field.isClosed) {
        isBusinessOpenAtLeastOneDay = true;
        if (!field.value || !field.to) {
          field.setError(`${field.name} From & To is required.`);
          isValid = false;
        }
      }
    });

    if (!isBusinessOpenAtLeastOneDay) {
      setNumberOfDaysOpenError(
        "The business has to be open for at least one day."
      );
      isValid = false;
    } else {
      setNumberOfDaysOpenError("");
    }

    return isValid;
  };

  const validateFields5 = () => {
    let isValid = true;
    fields5.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  const validateFieldsDetails1 = () => {
    let isValid = true;

    fieldsDetails1.forEach((field) => {
      field.setError("");

      if (
        field.name === "Business Registration Number" &&
        (typeOfBusinessDetails === "Close Corporation (CC)" ||
          typeOfBusinessDetails === "Proprietary Limited Company (PTY)")
      ) {
        field.optional = false;
      }
      if (!field.value && !field.optional) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });

    return isValid;
  };

  const validateFieldsDetails2 = () => {
    let isValid = true;
    fieldsDetails2.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const validateFieldsDetails3 = () => {
    let isValid = true;

    fieldsDetails3.forEach((field) => {
      field.setError("");

      if (!field.optional && !field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      } else if (field.value) {
        if (field.name === "Email" && !emailRegex.test(field.value)) {
          field.setError("Invalid email format.");
          isValid = false;
        }

        if (
          field.name === "Phone Number" &&
          !namibiaPhoneRegex.test(field.value)
        ) {
          field.setError("Invalid phone number.");
          isValid = false;
        }

        if (field.isUrl && !urlRegex.test(field.value)) {
          field.setError(`Invalid URL format.`);
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const validateFieldsDetails4 = () => {
    let isValid = true;

    fieldsDetails4.forEach((field) => {
      field.setError("");

      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      } else {
        if (!validateTimeRangeOrClosed(field.value)) {
          field.setError(
            `${field.name} has an invalid time format. Expected format is 12-hour formate(e.g. 8:00 AM - 12:00 PM) or "Closed".`
          );
          isValid = false;
        } else {
          if (timeFormatRegex.test(field.value)) {
            field.value = field.value.replace(/\s*-\s*/, " - ");
          }
        }
      }
    });

    return isValid;
  };

  const validateFieldsDetails5 = () => {
    let isValid = true;
    fieldsDetails5.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const timeFormatRegex =
    /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$|^((0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]) - ((0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$|^(0:00 AM - 12:00 PM)$/;

  const isValidURL = (url) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!regex.test(url);
  };

  const isValidEmail = (e) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(e);
  };
  const DropdownIndicator = () => null;
  const handleStep1 = () => {
    if (typeOfBusiness === "") {
      fields1.push({
        value: businessRegistrationNumber,
        setError: setBusinessRegistrationNumberError,
        name: "Business Registration Number",
      });
    }
    if (validateFields1()) {
      setStepperCounter(1);
    }
  };
  const handleStep2 = () => {
    if (validateFields2()) {
      setStepperCounter(2);
    }
  };
  const handleStep3 = () => {
    if (validateFields3()) {
      setStepperCounter(3);
    }
  };
  const handleStep4 = () => {
    if (linkedInLink && !isValidURL(linkedInLink)) {
      fields3.push({
        value: linkedInLink,
        setError: setLinkedInLinkError,
        name: "Valid linkedIn link",
      });
    }
    if (validateFields4()) {
      setStepperCounter(4);
    }
  };
  const handleStep5 = async () => {
    if (validateFields4()) {
      const updatedTimes = {
        monday: !isMondayClosed
          ? "Closed"
          : `${convert24To12Hour(mondayFrom)} - ${convert24To12Hour(mondayTo)}`,
        tuesday: !isTuesdayClosed
          ? "Closed"
          : `${convert24To12Hour(tuesdayFrom)} - ${convert24To12Hour(
              tuesdayTo
            )}`,
        wednesday: !isWednesdayClosed
          ? "Closed"
          : `${convert24To12Hour(wednesdayFrom)} - ${convert24To12Hour(
              wednesdayTo
            )}`,
        thursday: !isThursdayClosed
          ? "Closed"
          : `${convert24To12Hour(thursdayFrom)} - ${convert24To12Hour(
              thursdayTo
            )}`,
        friday: !isFridayClosed
          ? "Closed"
          : `${convert24To12Hour(fridayFrom)} - ${convert24To12Hour(fridayTo)}`,
        saturday: !isSaturdayClosed
          ? "Closed"
          : `${convert24To12Hour(saturdayFrom)} - ${convert24To12Hour(
              saturdayTo
            )}`,
        sunday: !isSundayClosed
          ? "Closed"
          : `${convert24To12Hour(sundayFrom)} - ${convert24To12Hour(sundayTo)}`,
      };

      setMonday(updatedTimes.monday);
      setTuesday(updatedTimes.tuesday);
      setWednesday(updatedTimes.wednesday);
      setThursday(updatedTimes.thursday);
      setFriday(updatedTimes.friday);
      setSaturday(updatedTimes.saturday);
      setSunday(updatedTimes.sunday);

      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("businessRegistrationName", businessRegistrationName);
        formData.append(
          "businessRegistrationNumber",
          businessRegistrationNumber
        );
        formData.append("businessDisplayName", businessDisplayName);
        formData.append("typeOfBusiness", typeOfBusiness);
        formData.append("description", description);
        formData.append("region", region);
        formData.append("town", town);
        formData.append("yearOfEstablishment", yearOfEstablishment);
        formData.append("primaryIndustry", primaryIndustry);
        formData.append("secondaryIndustry", secondaryIndustry);
        formData.append("annualTurnover", annualTurnover);
        formData.append("userId", userId);
        formData.append("founderName", foundersName);
        formData.append("founderAge", foundersAge);
        formData.append("founderGender", foundersGender);
        formData.append("businessAddress", businessAddress);
        formData.append("phoneNumber", phoneNumber);
        formData.append("whatsAppNumber", whatsAppNumber);
        formData.append("email", businessEmail);
        formData.append("website", websiteLink);
        formData.append("twitter", twitterLink);
        formData.append("facebook", facebookLink);
        formData.append("instagram", instagramLink);
        formData.append("linkedln", linkedInLink);
        formData.append("monday", updatedTimes.monday);
        formData.append("tuesday", updatedTimes.tuesday);
        formData.append("wednesday", updatedTimes.wednesday);
        formData.append("thursday", updatedTimes.thursday);
        formData.append("friday", updatedTimes.friday);
        formData.append("saturday", updatedTimes.saturday);
        formData.append("sunday", updatedTimes.sunday);
        formData.append("numberOfEmployees", numberOfEmployees);
        if (fileBusinessLogo) {
          formData.append("businessLogo", fileBusinessLogo);
        }
        if (fileImage1) {
          formData.append("image1", fileImage1);
        }
        if (fileImage2) {
          formData.append("image2", fileImage2);
        }
        if (fileImage3) {
          formData.append("image3", fileImage3);
        }
        console.log("This is my formdata", formData);

        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/create",
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
          setOpenModel(false);
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Record successfully inserted",
            showConfirmButton: false,
            timer: 4000,
          });
          setBusinessAddress("");
          setBusinessRegistrationName("");
          setBusinessRegistrationNumber("");
          setBusinessDisplayName("");
          setDescription("");
          setTypeOfBusiness("");
          setRegion("");
          setTown("");
          setPrimaryIndustry("");
          setSecondaryIndustry("");
          setYearOfEstablishment("");
          setNumberOfEmployees("");
          setAnnualTurnover("");
          setFoundersName("");
          setFoundersGender("");
          setFoundersAge("");
          setBusinessAddress("");
          setPhoneNumber("");
          setWhatsAppNumber("");
          setBusinessEmail("");
          setWebsiteLink("");
          setFacebookLink("");
          setTwitterLink("");
          setInstagramLink("");
          setLinkedInLink("");
          setMonday("");
          setTuesday("");
          setWednesday("");
          setThursday("");
          setFriday("");
          setSaturday("");
          setSunday("");
          setBusinessLogo("");
          setImage1("");
          setImage2("");
          setImage3("");
          setUserId("");
          setStepperCounter(0);
          setMondayFrom("");
          setMondayTo("");
          setTuesdayFrom("");
          setTuesdayTo("");
          setWednesdayFrom("");
          setWednesdayTo("");
          setThursdayFrom("");
          setThursdayTo("");
          setFridayFrom("");
          setFridayTo("");
          setSaturdayFrom("");
          setSaturdayTo("");
          setSundayFrom("");
          setSundayTo("");
          setIsMondayClosed(false);
          setIsTuesdayClosed(false);
          setIsWednesdayClosed(false);
          setIsThursdayClosed(false);
          setIsFridayClosed(false);
          setIsSaturdayClosed(false);
          setIsSundayClosed(false);
        } else {
          setIsSubmitting(false);
          setOpenModel(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `Internal server error: ${data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        setOpenModel(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };

  const handleStep1Review = () => {
    if (validateFieldsDetails1()) {
      setStepperCounter(1);
    }
  };
  const handleStep2Review = () => {
    if (validateFieldsDetails2()) {
      setStepperCounter(2);
    }
  };
  const handleStep3Review = () => {
    if (validateFieldsDetails3()) {
      setStepperCounter(3);
    }
  };
  const handleStep4Review = () => {
    if (validateFieldsDetails4()) {
      setStepperCounter(4);
    }
  };
  const handleView = async (id) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://dt.mtc.com.na:4000/msme/admin/single/${id}`,
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
      } else {
        handleAuthFailure({ dispatch, navigate, type: "auth" });
      }
      if (response.ok) {
        setIsSubmitting(false);
        setUpdatingDetails(data.data);
        console.log(updatingDetails);
        setBusinessAddressDetails(data.data.businessRegistrationName);
        setBusinessRegistrationNameDetails(data.data.businessRegistrationName);
        setBusinessRegistrationNumberDetails(
          data.data.businessRegistrationNumber
        );
        setBusinessDisplayNameDetails(data.data.businessDisplayName);
        setDescriptionDetails(data.data.description);
        setTextCounterDetails(data.data.description.length);
        setTypeOfBusinessDetails(data.data.typeOfBusiness);
        setRegionDetails(data.data.region);
        setTownDetails(data.data.town);
        setPrimaryIndustryDetails(data.data.primaryIndustry);
        setSecondaryIndustryDetails(data.data.secondaryIndustry);
        setYearOfEstablishmentDetails(data.data.yearOfEstablishment);
        setAnnualTurnoverDetails(data.data.annualTurnover);
        setFoundersNameDetails(data.data.founderInfo?.founderName);
        setFoundersGenderDetails(data.data.founderInfo?.founderGender);
        setFoundersAgeDetails(data.data.founderInfo?.founderAge);
        setBusinessAddressDetails(data.data.contactInfo?.businessAddress);
        setPhoneNumberDetails(data.data.contactInfo?.phoneNumber);
        setWhatsAppNumberDetails(data.data.contactInfo?.whatsAppNumber);
        setBusinessEmailDetails(data.data.contactInfo?.email);
        setWebsiteLinkDetails(data.data.contactInfo?.website);
        setFacebookLinkDetails(data.data.contactInfo?.facebook);
        setTwitterLinkDetails(data.data.contactInfo?.twitter);
        setInstagramLinkDetails(data.data.contactInfo?.instagram);
        setLinkedInLinkDetails(data.data.contactInfo?.linkedIn);
        setMondayDetails(data.data.businessHours?.monday);
        setTuesdayDetails(data.data.businessHours?.tuesday);
        setWednesdayDetails(data.data.businessHours?.wednesday);
        setThursdayDetails(data.data.businessHours?.thursday);
        setFridayDetails(data.data.businessHours?.friday);
        setSaturdayDetails(data.data.businessHours?.saturday);
        setSundayDetails(data.data.businessHours?.sunday);
        setNumberOfEmployeesDeDetails(
          data.data.additionalInfo?.numberOfEmployees
        );
        setBusinessLogoDetails(data.data.additionalInfo?.businessLogo);
        setImage1Details(data.data.additionalInfo?.image1);
        setImage2Details(data.data.additionalInfo?.image2);
        setImage3Details(data.data.additionalInfo?.image3);

        setOpenModelView(true);
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
      console.error("Error in handleView:", error);
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const rowsIncomplete = incompleteMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    email: msme?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnOver,
    foundersName: msme.foundersName,
    status: msme.status,
    isBlocked: msme.isBlocked,
    createdAt: msme.createdAt,
  }));

  const rowsIncompleteFiltered = rowsIncomplete.filter((row) =>
    Object.values(row).some((value) =>
      (value ? value.toString() : "")
        .toLowerCase()
        .includes(searchQueryIncomplete.toLowerCase())
    )
  );

  const columns = [
    {
      field: "registrationName",
      headerName: "Registration Name",
      width: isSmallScreen ? 130 : 160,
    },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160 },
    {
      field: "primaryIndustry",
      headerName: "Primary Industry",
      width: isSmallScreen ? 120 : 180,
    },
    {
      field: "annualTurnover",
      headerName: "Annual Turnover(N$)",
      width: isSmallScreen ? 120 : 180,
    },
    {
      field: "foundersName",
      headerName: "Founders Name",
      width: isSmallScreen ? 120 : 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: isSmallScreen ? 100 : 120,
      cellClassName: (params) => {
        switch (params.value) {
          case "Pending":
            return "status-pending";
          case "Rejected":
            return "status-rejected";
          case "Approved":
            return "status-approved";
          default:
            return "";
        }
      },
    },
    {
      field: "isBlocked",
      headerName: "Blocked",
      width: isSmallScreen ? 100 : 120,
      cellClassName: (params) => {
        switch (params.value) {
          case true:
            return "status-rejected";
          case false:
            return "status-approved";
          default:
            return "";
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: isSmallScreen ? 100 : 140,
    },

    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: (params) =>
        currentUser.role === "Super admin" ? (
          <SlOptionsVertical
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleView(params.row.id)}
          />
        ) : null,
    },
  ];
  const rowsAll = allMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme?.contactInfo?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo?.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked,
    createdAt: msme.createdAt,
  }));
  const filteredRows = rowsAll.filter((row) =>
    Object.values(row).some((value) =>
      (value ? value.toString() : "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );
  const rowsPending = pendingMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    email: msme?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnOver,
    foundersName: msme.foundersName,
    status: msme.status,
    isBlocked: msme.isBlocked,
    createdAt: msme.createdAt,
  }));
  const filteredRowsPending = rowsPending.filter((row) =>
    Object.values(row).some((value) =>
      (value ? value.toString() : "")
        .toLowerCase()
        .includes(searchQueryPending.toLowerCase())
    )
  );

  const rowsRejected = rejectedMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    email: msme?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnOver,
    foundersName: msme.foundersName,
    status: msme.status,
    isBlocked: msme.isBlocked,
    createdAt: msme.createdAt,
  }));
  const filteredRowsRejected = rowsRejected.filter((row) =>
    Object.values(row).some((value) =>
      (value ? value.toString() : "")
        .toLowerCase()
        .includes(searchQueryRejected.toLowerCase())
    )
  );

  const rowsApproved = approvedMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    email: msme?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnOver,
    foundersName: msme.foundersName,
    status: msme.status,
    isBlocked: msme.isBlocked,
    createdAt: msme.createdAt,
  }));
  const filteredRowsApproved = rowsApproved.filter((row) =>
    Object.values(row).some((value) =>
      (value ? value.toString() : "")
        .toLowerCase()
        .includes(searchQueryApproved.toLowerCase())
    )
  );

  const typeOfBusinessOptions = [
    {
      value: "Proprietary Limited Company (PTY)",
    },
    {
      value: "Close Corporation (CC)",
    },
    {
      value: "Sole Proprietary/Trader",
    },
    {
      value: "Trust",
    },
    {
      value: "Trading As",
    },
    {
      value: "Other",
    },
  ];
  const foundersGenderOptions = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];
  const numberOfEmployeeOptions = [
    {
      value: "Self-employed",
    },
    {
      value: "1-10 employees",
    },
    {
      value: "11-30 employees",
    },
    {
      value: "31-100 employees",
    },
    {
      value: "100+ employees",
    },
  ];
  const annualTurnoverOptions = [
    {
      value: "N$ 0 to N$ 300,000",
    },
    {
      value: "N$ 300,001 to N$ 3,000,000",
    },
    {
      value: "N$ 3,000,001 to N$ 10,000,000",
    },
  ];
  const regionOptions = regionList.map((option) => ({
    label: option.regionName,
    value: option.id,
  }));
  const filteredTownOptions = townList
    .filter((option) => option.regionId === region) // Only towns in the selected region
    .map((option) => ({
      value: option.townName,
      label: option.id,
    }));
  const filteredTownOptionsDetails = townList
    .filter((option) => option.regionId === regionDetails) // Only towns in the selected region
    .map((option) => ({
      value: option.townName,
      label: option.id,
    }));
  const filteredByRegionOption = townList
    .filter((town) => town.regionId === region)
    .map((option) => ({
      value: option.townName,
      label: option.id,
      regionId: option.regionId,
    }));

  const filteredByRegionOptionDetails = townList
    .filter((town) => town.regionId === regionDetails)
    .map((option) => ({
      value: option.townName,
      label: option.id,
      regionId: option.regionId,
    }));
  const primatyIndustryOptions = primaryIndustryList.map((option) => ({
    value: option.industryName,
  }));
  const secondaryOptions = secondaryList.map((option) => ({
    value: option.industryName,
  }));
  const userOptions = allUserList.map((option) => ({
    label: `${option.firstName} ${option.lastName} (${option.email})`,
    value: option.id,
  }));

  const approve = async () => {
    setOpenModelView(false);
    if (
      updatingDetails.businessRegistrationName ===
        businessRegistrationNameDetails &&
      updatingDetails.businessRegistrationNumber ===
        businessRegistrationNumberDetails &&
      updatingDetails.businessDisplayName === businessDisplayNameDetails &&
      updatingDetails.description === descriptionDetails &&
      updatingDetails.typeOfBusiness === typeOfBusinessDetails &&
      updatingDetails.region === regionDetails &&
      updatingDetails.town === townDetails &&
      updatingDetails.primaryIndustry === primaryIndustryDetails &&
      updatingDetails.secondaryIndustry === secondaryIndustryDetails &&
      updatingDetails.yearOfEstablishment === yearOfEstablishmentDetails &&
      updatingDetails.annualTurnover === annualTurnoverDetails &&
      updatingDetails.founderInfo?.founderName === foundersNameDetails &&
      updatingDetails.founderInfo?.founderGender === foundersGenderDetails &&
      updatingDetails.founderInfo?.founderAge === foundersAgeDetails &&
      updatingDetails.contactInfo?.businessAddress === businessAddressDetails &&
      updatingDetails.contactInfo?.phoneNumber === phoneNumberDetails &&
      updatingDetails.contactInfo?.whatsAppNumber === whatsAppNumberDetails &&
      updatingDetails.contactInfo?.email === businessEmailDetails &&
      updatingDetails.contactInfo?.website === websiteLinkDetails &&
      updatingDetails.contactInfo?.facebook === facebookLinkDetails &&
      updatingDetails.contactInfo?.twitter === twitterLinkDetails &&
      updatingDetails.contactInfo?.instagram === instagramLinkDetails &&
      updatingDetails.contactInfo?.linkedln === linkedInLinkDetails &&
      updatingDetails.businessHours?.monday === mondayDetails &&
      updatingDetails.businessHours?.tuesday === tuesdayDetails &&
      updatingDetails.businessHours?.wednesday === wednesdayDetails &&
      updatingDetails.businessHours?.thursday === thursdayDetails &&
      updatingDetails.businessHours?.friday === fridayDetails &&
      updatingDetails.businessHours?.saturday === saturdayDetails &&
      updatingDetails.businessHours?.sunday === sundayDetails &&
      updatingDetails.additionalInfo?.businessLogo === businessLogoDetails &&
      updatingDetails.additionalInfo?.image1 === image1Details &&
      updatingDetails.additionalInfo?.image2 === image2Details &&
      updatingDetails.additionalInfo?.image3 === image3Details &&
      updatingDetails.additionalInfo?.numberOfEmployees ===
        numberOfEmployeesDetails
    ) {
      try {
        setOpenModelView(false);
        Swal.fire({
          title: "Are you sure?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Approve it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              setIsSubmitting(true);
              const response = await fetch(
                `https://dt.mtc.com.na:4000/msme/admin/status/${updatingDetails.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${serverToken}`,
                    'x-access-token': `${tokenHeader}`
                  },
                  
                  body: JSON.stringify({
                    status: "Approved",
                  }),
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
              } else {
                handleAuthFailure({ dispatch, navigate, type: "auth" });
              }

              if (response.ok) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "MSME Successfully Approved",
                  showConfirmButton: false,
                  timer: 4000,
                });
                setStepperCounter(0);
                setUpdatingDetails([]);
                setUpdate(false);
              } else {
                setStepperCounter(0);
                await Swal.fire({
                  position: "center",
                  icon: "error",
                  title: `${data.message}`,
                  showConfirmButton: false,
                  timer: 4000,
                });
              }
            } catch (error) {
              handleAuthFailure({ dispatch, navigate, type: "network" });
            } finally {
              setIsSubmitting(false);
            }
          } else {
            setOpenModelView(true);
          }
        });
      } catch (error) {
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    } else {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append(
          "businessRegistrationName",
          businessRegistrationNameDetails
        );
        if (
          typeOfBusinessDetails === "Close Corporation (CC)" ||
          typeOfBusinessDetails === "Proprietary Limited Company (PTY)"
        ) {
          formData.append(
            "businessRegistrationNumber",
            businessRegistrationNumberDetails
          );
        } else {
          formData.append("businessRegistrationNumber", "");
        }
        formData.append("businessDisplayName", businessDisplayNameDetails);
        formData.append("typeOfBusiness", typeOfBusinessDetails);
        formData.append("description", descriptionDetails);
        formData.append("region", regionDetails);
        formData.append("town", townDetails);
        formData.append("yearOfEstablishment", yearOfEstablishmentDetails);
        formData.append("numberOfEmployees", numberOfEmployeesDetails);
        formData.append("primaryIndustry", primaryIndustryDetails);
        formData.append("secondaryIndustry", secondaryIndustryDetails);
        formData.append("annualTurnover", annualTurnoverDetails);
        formData.append("founderName", foundersNameDetails);
        formData.append("founderAge", foundersAgeDetails);
        formData.append("founderGender", foundersGenderDetails);
        formData.append("businessAddress", businessAddressDetails);
        formData.append("phoneNumber", phoneNumberDetails);
        formData.append("email", businessEmailDetails);
        if (whatsAppNumberDetails) {
          formData.append("whatsAppNumber", whatsAppNumberDetails);
        } else {
          formData.append("whatsAppNumber", "");
        }
        if (websiteLinkDetails) {
          formData.append("website", websiteLinkDetails);
        } else {
          formData.append("website", "");
        }
        if (twitterLinkDetails) {
          formData.append("twitter", twitterLinkDetails);
        } else {
          formData.append("twitter", "");
        }
        if (facebookLinkDetails) {
          formData.append("facebook", facebookLinkDetails);
        } else {
          formData.append("facebook", "");
        }
        if (instagramLinkDetails) {
          formData.append("instagram", instagramLinkDetails);
        } else {
          formData.append("instagram", "");
        }
        if (linkedInLinkDetails) {
          formData.append("linkedln", linkedInLinkDetails);
        } else {
          formData.append("linkedln", "");
        }
        formData.append("monday", mondayDetails);
        formData.append("tuesday", tuesdayDetails);
        formData.append("wednesday", wednesdayDetails);
        formData.append("thursday", thursdayDetails);
        formData.append("friday", fridayDetails);
        formData.append("saturday", saturdayDetails);
        formData.append("sunday", sundayDetails);
        if (fileBusinessLogo) {
          formData.append("businessLogo", fileBusinessLogo);
        }
        if (fileImage1) {
          formData.append("image1", fileImage1);
        }
        if (fileImage2) {
          formData.append("image2", fileImage2);
        }
        if (fileImage3) {
          formData.append("image3", fileImage3);
        }
        if (removeBusinessProfileImage) {
          formData.append("removeImage", removeBusinessProfileImage);
        }
        if (removeImage1) {
          formData.append("removeImage1", removeImage1);
        }
        if (removeImage2) {
          formData.append("removeImage2", removeImage2);
        }
        if (removeImage3) {
          formData.append("removeImage3", removeImage3);
        }
        const response = await fetch(
          `https://dt.mtc.com.na:4000/msme/admin/update/${updatingDetails.id}`,
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
          if (
            updatingDetails.status === "Pending" ||
            updatingDetails.status === "Rejected" ||
            updatingDetails.status === "Incomplete"
          ) {
            try {
              setIsSubmitting(true);
              const response = await fetch(
                `https://dt.mtc.com.na:4000/msme/admin/status/${updatingDetails.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${serverToken}`,
                    'x-access-token': `${tokenHeader}`
                  },
                  
                  body: JSON.stringify({
                    status: "Approved",
                  }),
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
              } else {
                handleAuthFailure({ dispatch, navigate, type: "auth" });
              }

              if (response.ok) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title:
                    updatingDetails.status === "Pending" ||
                    updatingDetails.status === "Incomplete"
                      ? "MSME Successfully Approved"
                      : update
                      ? "MSME Successfully Updated"
                      : "MSME Successfully Approved",
                  showConfirmButton: false,
                  timer: 4000,
                });
                setStepperCounter(0);
                setUpdatingDetails([]);
                setUpdate(false);
                setRemoveBusinessProfileImage(false);
                setRemoveImage1(false);
                setRemoveImage2(false);
                setRemoveImage3(false);
                setFileBusinessLogo(null);
                setFileImage1(null);
                setFileImage2(null);
                setFileImage3(null);
                setsendingNotification(false);
                setNotificationDescription("");
                setNotificationTitle("");
                setAddNotification(false);
              } else {
                setStepperCounter(0);
                await Swal.fire({
                  position: "center",
                  icon: "error",
                  title: `${data.message}`,
                  showConfirmButton: false,
                  timer: 4000,
                });
              }
            } catch (error) {
              handleAuthFailure({ dispatch, navigate, type: "network" });
            } finally {
              setIsSubmitting(false);
              setUpdate(false);
            }
          } else {
            setIsSubmitting(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title:
                updatingDetails.status === "Pending"
                  ? "MSME Successfully Approved"
                  : update
                  ? "MSME Successfully Updated"
                  : "MSME Successfully Approved",
              showConfirmButton: false,
              timer: 4000,
            });
            setStepperCounter(0);
            setUpdatingDetails([]);
            setUpdate(false);
            setRemoveBusinessProfileImage(false);
            setRemoveImage1(false);
            setRemoveImage2(false);
            setRemoveImage3(false);
            setFileBusinessLogo(null);
            setFileImage1(null);
            setFileImage2(null);
            setFileImage3(null);
            setsendingNotification(false);
            setNotificationDescription("");
            setNotificationTitle("");
            setAddNotification(false);
          }
        } else {
          setIsSubmitting(false);
          setOpenModel(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `Internal server error: ${data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        setUpdate(false);
        setOpenModel(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
  };
  const reject = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `https://dt.mtc.com.na:4000/msme/admin/status/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${serverToken}`,
                  'x-access-token': `${tokenHeader}`
                },
                
                body: JSON.stringify({
                  status: "Rejected",
                }),
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
            } else {
              handleAuthFailure({ dispatch, navigate, type: "auth" });
            }

            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Rejected",
                showConfirmButton: false,
                timer: 4000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
              setUpdate(false);
              setRemoveBusinessProfileImage(false);
              setRemoveImage1(false);
              setRemoveImage2(false);
              setRemoveImage3(false);
              setsendingNotification(false);
              setNotificationDescription("");
              setNotificationTitle("");
              setAddNotification(false);
            } else {
              setStepperCounter(0);
              setIsSubmitting(false);
              setUpdate(false);
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });
            }
          } catch (error) {
            setUpdate(false);
            handleAuthFailure({ dispatch, navigate, type: "network" });
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const block = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `https://dt.mtc.com.na:4000/msme/admin/block/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${serverToken}`,
                  'x-access-token': `${tokenHeader}`
                },
                
                body: JSON.stringify({
                  block: true,
                }),
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
            } else {
              handleAuthFailure({ dispatch, navigate, type: "auth" });
            }

            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Block",
                showConfirmButton: false,
                timer: 4000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
              setUpdate(false);
              setRemoveBusinessProfileImage(false);
              setRemoveImage1(false);
              setRemoveImage2(false);
              setRemoveImage3(false);
              setsendingNotification(false);
              setNotificationDescription("");
              setNotificationTitle("");
              setAddNotification(false);
            } else {
              setUpdate(false);
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });
            }
          } catch (error) {
            setStepperCounter(0);
            setUpdate(false);
            handleAuthFailure({ dispatch, navigate, type: "network" });
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const unBlock = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Unblock it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `https://dt.mtc.com.na:4000/msme/admin/block/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${serverToken}`,
                  'x-access-token': `${tokenHeader}`
                },
                
                body: JSON.stringify({
                  block: false,
                }),
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
            } else {
              handleAuthFailure({ dispatch, navigate, type: "auth" });
            }

            if (response.ok) {
              setUpdate(false);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Unblock",
                showConfirmButton: false,
                timer: 4000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
              setRemoveBusinessProfileImage(false);
              setRemoveImage1(false);
              setRemoveImage2(false);
              setRemoveImage3(false);
              setsendingNotification(false);
              setNotificationDescription("");
              setNotificationTitle("");
              setAddNotification(false);
            } else {
              setStepperCounter(0);
              setIsSubmitting(false);
              setUpdate(false);
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });
            }
          } catch (error) {
            setUpdate(false);
            handleAuthFailure({ dispatch, navigate, type: "network" });
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };
  const sendNotification = async () => {
    if (addNotification) {
      setNotificationDescription(RemoveWhiteSpaces(notificationDescription));
      setNotificationTitle(RemoveWhiteSpaces(notificationTitle));
      if (validateNotification()) {
        try {
          setsendingNotification(true);
          const response = await fetch(
            `https://dt.mtc.com.na:4000/notifications/admin/create/single/${updatingDetails.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${serverToken}`,
                'x-access-token': `${tokenHeader}`
              },
              
              body: JSON.stringify({
                notification: notificationDescription,
                title: notificationTitle,
              }),
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
          } else {
            handleAuthFailure({ dispatch, navigate, type: "auth" });
          }
          if (response.ok) {
            setNotificationSuccess(true);
            setsendingNotification(false);
            setNotificationDescription("");
            setNotificationTitle("");
            setAddNotification(false);
            setTimeout(() => {
              setNotificationSuccess(false);
            }, 4000);
          } else {
            setNotificationFail(true);
            setsendingNotification(false);
            setTimeout(() => {
              setNotificationFail(false);
            }, 4000);
            setUpdate(false);
          }
        } catch (error) {
          setsendingNotification(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
        }
      }
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setBusinessLogoError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setBusinessLogoError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setBusinessLogo(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setBusinessLogoError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setBusinessLogo(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileBusinessLogo(selectedFile);
      setBusinessLogo(objectUrl);
    }
  };
  const handleFileChangeBusinessLogoDetails = (e) => {
    const selectedFile = e.target.files[0];
    setBusinessLogoDetailsError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setBusinessLogoDetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setBusinessLogoDetails(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setBusinessLogoDetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setBusinessLogoDetails(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileBusinessLogo(selectedFile);
      setBusinessLogoDetails(objectUrl);
      setUpdate(true);
      setRemoveBusinessProfileImage(false);
    }
  };
  const handleFileChangeImage1 = (e) => {
    const selectedFile = e.target.files[0];
    setImage1Error("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage1Error(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage1(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage1Error(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage1(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage1(selectedFile);
      setImage1(objectUrl);
    }
  };
  const handleFileChangeImage2 = (e) => {
    const selectedFile = e.target.files[0];
    setImage2Error("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage2Error(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage2(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage2Error(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage2(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage2(selectedFile);
      setImage2(objectUrl);
    }
  };
  const handleFileChangeImage3 = (e) => {
    const selectedFile = e.target.files[0];
    setImage3Error("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage3Error(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage3(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage3Error(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage3(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage3(selectedFile);
      setImage3(objectUrl);
    }
  };
  const handleFileChangeImage1Details = (e) => {
    const selectedFile = e.target.files[0];
    setImage1DetailsError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage1DetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage1Details(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage1DetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage1Details(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage1(selectedFile);
      setImage1Details(objectUrl);
      setUpdate(true);
      setRemoveImage1(false);
    }
  };
  const handleFileChangeImage2Details = (e) => {
    const selectedFile = e.target.files[0];
    setImage2DetailsError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage2DetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage2Details(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage2DetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage2Details(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage2(selectedFile);
      setImage2Details(objectUrl);
      setUpdate(true);
      setRemoveImage2(false);
    }
  };
  const handleFileChangeImage3Details = (e) => {
    const selectedFile = e.target.files[0];
    setImage3DetailsError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage3DetailsError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage3Details(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage3DetailsError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage3Details(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage3(selectedFile);
      setImage3Details(objectUrl);
      setUpdate(true);
      setRemoveImage3(false);
    }
  };
  const clearFileInput = () => {
    if (businessLogo) {
      URL.revokeObjectURL(businessLogo);
    }
    inputRef.current.value = "";
    setBusinessLogo(null);
  };
  const clearFileInputImage1 = () => {
    if (image1) {
      URL.revokeObjectURL(image1);
    }
    inputRef1.current.value = "";
    setImage1(null);
  };
  const clearFileInputImage2 = () => {
    if (image2) {
      URL.revokeObjectURL(image2);
    }
    inputRef2.current.value = "";
    setImage2(null);
  };
  const clearFileInputImage3 = () => {
    if (image3) {
      URL.revokeObjectURL(image3);
    }
    inputRef3.current.value = "";
    setImage3(null);
  };
  const clearFileInputBusinessLogoDetails = () => {
    if (businessLogoDetails) {
      URL.revokeObjectURL(businessLogoDetails);
    }
    inputRefBusinessLogo.current.value = "";
    setBusinessLogoDetails(null);
    setUpdate(true);
    setRemoveBusinessProfileImage(true);
  };
  const clearFileInputImage1Details = () => {
    if (image1Details) {
      URL.revokeObjectURL(image1Details);
    }
    inputRef1Details.current.value = "";
    setFileImage1(null);
    setImage1Details(null);
    setUpdate(true);
    setRemoveImage1(true);
  };
  const clearFileInputImage2Details = () => {
    if (image2Details) {
      URL.revokeObjectURL(image2Details);
    }
    inputRef2Details.current.value = "";
    setFileImage2(null);
    setImage2Details(null);
    setUpdate(true);
    setRemoveImage2(true);
  };
  const clearFileInputImage3Details = () => {
    if (image3Details) {
      URL.revokeObjectURL(image3Details);
    }
    inputRef3Details.current.value = "";
    setFileImage3(null);
    setImage3Details(null);
    setUpdate(true);
    setRemoveImage3(true);
  };

  return (
    <>
      {isSubmitting ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="container-fluid mt-4">
          <p className="msme">Manage MSMEs</p>
          <p>View, search and manage all MSME registrations and listing</p>

          <Box className="" justifyContent={"space-evenly"}>
            <Box
              display="grid"
              gridTemplateColumns={
                isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
              }
              gridAutoRows="140px"
              gap={isSmallScreen ? "0px" : "10px"}
            >
              {/* <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Registered MSMEs" className="pointer">
                      <p className="text">Registered MSMEs</p>
                    </Tooltip>
                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex justify-content-start">
                    <div className="p-1 border rounded-2 ml-2">
                      <StickyNote2Icon sx={{ color: "rgba(21, 78, 138, 1)" }} />
                    </div>
                    <Tooltip title={totalRegisteration}>
                      <p className="digit text pointer">{totalRegisteration}</p>
                    </Tooltip>
                  </div>
                </div>
              </Box> */}

              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Pending Approvals" className="pointer">
                      <p className="text">Pending Approvals</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon
                        sx={{ color: "rgba(251, 177, 34, 1)" }}
                      />
                    </div>
                    <Tooltip title={pendingRegisteration}>
                      <p className="digit text pointer">
                        {pendingRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Rejected MSMEs" className="pointer">
                      <p className="text">Rejected MSMEs</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(210, 31, 53, 1)" }} />
                    </div>
                    <Tooltip title={rejectedRegisteration}>
                      <p className="digit text pointer">
                        {rejectedRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Approved Registrations" className="pointer">
                      <p className="text">Approved Registrations</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(0, 149, 71, 1)" }} />
                    </div>
                    <Tooltip title={approvedRegisteration}>
                      <p className="digit text pointer">
                        {approvedRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>
              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip
                      title="Incomplete Registrations"
                      className="pointer"
                    >
                      <p className="text">Incomplete Registrations</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(21, 78, 138, 1)" }} />
                    </div>
                    <Tooltip title={incompleteRegisteration}>
                      <p className="digit text pointer">
                        {incompleteRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                gridColumn={isSmallScreen ? "span 12" : "span 12"}
                gridRow="span 3"
              >
                <div className="col-12 mb-4 listing-msme p-4 shadow rounded-3 mb-4">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-12 col-xxl-10 mx-auto border d-flex flex-wrap justify-content-between p-1">
                        <button
                          className={
                            buttonActive === 1
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => {
                            setButonActive(1);
                          }}
                          style={{ border: "none" }}
                        >
                          Registered Msme
                        </button>
                        <button
                          className={
                            buttonActive === 2
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => {
                            setButonActive(2);
                          }}
                          style={{ border: "none" }}
                        >
                          Pending Approval
                        </button>
                        <button
                          className={
                            buttonActive === 5
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => {
                            setButonActive(5);
                          }}
                          style={{ border: "none" }}
                        >
                          Approved Msme
                        </button>
                        <button
                          className={
                            buttonActive === 3
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => {
                            setButonActive(3);
                          }}
                          style={{ border: "none" }}
                        >
                          Rejected Msme
                        </button>
                        <button
                          className={
                            buttonActive === 4
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => {
                            setButonActive(4);
                          }}
                          style={{ border: "none" }}
                        >
                          Incomplete Registration
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
                            placeholder="Search for a MSME"
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        {currentUser.role === "Super admin" && (
                          <>
                            <div onClick={handleOpen}>
                              <MyButton text="Add MSME" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-groupp">All MSME List</p>
                        {allMSMEList ? (
                          <>
                            <Box sx={{ height: 500, width: "100%" }}>
                              <DataGrid
                                rows={filteredRows}
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
                                columns={columns}
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
                            placeholder="Search for pending MSME"
                            onChange={(e) =>
                              setSearchQueryPending(e.target.value)
                            }
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        {currentUser.role === "Super admin" && (
                          <>
                            <div onClick={handleOpen}>
                              <MyButton text="Add MSME" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-groupp">Pending MSME List</p>
                        {pendingMSMEList ? (
                          <>
                            <Box sx={{ height: 500, width: "100%" }}>
                              <DataGrid
                                rows={filteredRowsPending}
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
                            placeholder="Search for a rejected MSME"
                            onChange={(e) =>
                              setSearchQueryRejected(e.target.value)
                            }
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        {currentUser.role === "Super admin" && (
                          <>
                            <div onClick={handleOpen}>
                              <MyButton text="Add MSME" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-groupp">Rejected MSME List</p>
                        {rejectedMSMEList ? (
                          <>
                            <Box sx={{ height: 500, width: "100%" }}>
                              <DataGrid
                                rows={filteredRowsRejected}
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
                            placeholder="Search for a incomplete"
                            onChange={(e) =>
                              setSearchQueryIncomplete(e.target.value)
                            }
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        {currentUser.role === "Super admin" && (
                          <>
                            <div onClick={handleOpen}>
                              <MyButton text="Add MSME" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-groupp">Incomplete MSME List</p>
                        <Box sx={{ height: 500, width: "100%" }}>
                          <DataGrid
                            rows={rowsIncompleteFiltered}
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
                      </div>
                    </>
                  )}
                  {buttonActive === 5 && (
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
                            placeholder="Search for approved msme"
                            onChange={(e) =>
                              setSearchQueryApproved(e.target.value)
                            }
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        {currentUser.role === "Super admin" && (
                          <>
                            <div onClick={handleOpen}>
                              <MyButton text="Add MSME" />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-groupp">Approved MSME List</p>
                        {approvedMSMEList ? (
                          <>
                            <Box sx={{ height: 500, width: "100%" }}>
                              <DataGrid
                                rows={filteredRowsApproved}
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
            <Box sx={modalStyle}>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h1 className="text-center">Add New MSME</h1>
                <CgCloseR
                  style={{
                    color: "red",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBusinessAddressError("");
                    setBusinessRegistrationNameError("");
                    setBusinessRegistrationNumberError("");
                    setBusinessDisplayNameError("");
                    setDescriptionError("");
                    setTypeOfBusinessError("");
                    setRegionError("");
                    setTownError("");
                    setPrimaryIndustryError("");
                    setSecondaryIndustryError("");
                    setYearOfEstablishmentError("");
                    setNumberOfEmployeesError("");
                    setAnnualTurnoverError("");
                    setFoundersNameError("");
                    setFoundersGenderError("");
                    setFoundersAgeError("");
                    setBusinessAddressError("");
                    setPhoneNumberError("");
                    setWhatsAppNumberError("");
                    setBusinessEmailError("");
                    setWebsiteLinkError("");
                    setFacebookLinkError("");
                    setTwitterLinkError("");
                    setInstagramLinkError("");
                    setLinkedInLinkError("");
                    setMondayError("");
                    setTuesdayDetails("");
                    setWednesdayError("");
                    setThursdayError("");
                    setFridayError("");
                    setSaturdayError("");
                    setSundayError("");
                    setBusinessLogoError("");
                    setImage1Error("");
                    setImage2Error("");
                    setImage3Error("");
                    setUserIdError("");

                    setBusinessAddress("");
                    setBusinessRegistrationName("");
                    setBusinessRegistrationNumber("");
                    setBusinessDisplayName("");
                    setDescription("");
                    setTypeOfBusiness("");
                    setRegion("");
                    setTown("");
                    setPrimaryIndustry("");
                    setSecondaryIndustry("");
                    setYearOfEstablishment("");
                    setNumberOfEmployees("");
                    setAnnualTurnover("");
                    setFoundersName("");
                    setFoundersGender("");
                    setFoundersAge("");
                    setBusinessAddress("");
                    setPhoneNumber("");
                    setWhatsAppNumber("");
                    setBusinessEmail("");
                    setWebsiteLink("");
                    setFacebookLink("");
                    setTwitterLink("");
                    setInstagramLink("");
                    setLinkedInLink("");
                    setMondayTo("");
                    setMondayFrom("");
                    setTuesdayTo("");
                    setTuesdayFrom("");
                    setWednesdayTo("");
                    setWednesdayFrom("");
                    setThursdayTo("");
                    setThursdayFrom("");
                    setFridayTo("");
                    setFridayFrom("");
                    setSaturdayTo("");
                    setSaturdayFrom("");
                    setSundayTo("");
                    setSundayFrom("");
                    setBusinessLogo("");
                    setImage1("");
                    setImage2("");
                    setImage3("");
                    setUserId("");
                    setStepperCounter(0);

                    setIsMondayClosed(false);
                    setIsTuesdayClosed(false);
                    setIsWednesdayClosed(false);
                    setIsThursdayClosed(false);
                    setIsFridayClosed(false);
                    setIsSaturdayClosed(false);
                    setIsSundayClosed(false);

                    setMondayFrom("");
                    setMondayTo("");
                    setTuesdayFrom("");
                    setTuesdayTo("");
                    setWednesdayFrom("");
                    setWednesdayTo("");
                    setThursdayFrom("");
                    setThursdayTo("");
                    setFridayFrom("");
                    setFridayTo("");
                    setSaturdayFrom("");
                    setSaturdayTo("");
                    setSundayFrom("");
                    setSundayTo("");
                    setOpenModel(false);
                  }}
                />
              </div>

              <Box
                sx={{ width: "100%" }}
                style={{ marginTop: "10px", marginBottom: "20px" }}
              >
                <Stepper activeStep={stepperCounter} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              {numberOfDaysOpenError && (
                <>
                  <div className="col-md-8 p-1 p-md-3 error-div d-flex justify-content-center align-items-center m-auto">
                    <p>{numberOfDaysOpenError}</p>
                  </div>
                </>
              )}
              <Grid
                container
                spacing={{ xs: 1 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                style={{ marginTop: "10px" }}
              >
                {stepperCounter === 0 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Type of Business: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={typeOfBusiness}
                          onChange={(e) => {
                            setTypeOfBusinessError("");
                            setTypeOfBusiness(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select business type
                          </option>
                          {typeOfBusinessOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessError && (
                          <>
                            <p className="error-message">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {(typeOfBusiness === "Proprietary Limited Company (PTY)" ||
                      typeOfBusiness === "Close Corporation (CC)") && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="form-group pb-3">
                            <label
                              htmlFor="businessRegistrationNumber"
                              className="pb-2 text-boldd"
                            >
                              Registration Number: <span>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control place-holder"
                              placeholder="Business registration number"
                              autoComplete="off"
                              value={businessRegistrationNumber}
                              name="businessRegistrationNumber"
                              onChange={(e) => {
                                setBusinessRegistrationNumberError("");
                                setBusinessRegistrationNumber(e.target.value);
                              }}
                            />
                            {businessRegistrationNumberError && (
                              <>
                                <p className="error-message">
                                  {businessRegistrationNumberError}
                                </p>
                              </>
                            )}
                          </div>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="registrationName"
                          className="pb-2 text-boldd"
                        >
                          Registration Name:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Registration name"
                          autoComplete="off"
                          value={businessRegistrationName}
                          name="registrationName"
                          onChange={(e) => {
                            setBusinessRegistrationNameError("");
                            setBusinessRegistrationName(e.target.value);
                          }}
                        />
                        {businessRegistrationNameError && (
                          <>
                            <p className="error-message">
                              {businessRegistrationNameError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="displayNumber"
                          className="pb-2 text-boldd"
                        >
                          Display Name:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Display name"
                          value={businessDisplayName}
                          autoComplete="off"
                          name="displayNumber"
                          onChange={(e) => {
                            setBusinessDisplayNameError("");
                            setBusinessDisplayName(e.target.value);
                          }}
                        />
                        {setBusinessDisplayNameError && (
                          <>
                            <p className="error-message">
                              {businessDisplayNameError}
                            </p>
                          </>
                        )}
                      </div>
                      {typeOfBusiness !== "Proprietary Limited Company (PTY)" &&
                        typeOfBusiness !== "Close Corporation (CC)" && (
                          <>
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
                              }}
                              options={userOptions}
                              placeholder="Select user"
                              isSearchable
                              isClearable
                              classNamePrefix="react-select"
                              components={{ DropdownIndicator }}
                            />
                            {userIdError && (
                              <>
                                <p className="error-message">{userIdError}</p>
                              </>
                            )}
                          </div>
                          </>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="description"
                          className="pb-2 text-boldd"
                        >
                          Business Description: <span>*</span>
                        </label>
                        <textarea
                          type="text"
                          rows={5}
                          maxlength="700"
                          className="form-control place-holder"
                          placeholder="Start typing....."
                          value={description}
                          autoComplete="off"
                          name="description"
                          onChange={(e) => {
                            setTextCounter(e.target.value.length);
                            setDescriptionError("");
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                      <div className="float-end text-counter">
                        <span>{textCounter}</span>
                        <span>/700</span>
                      </div>
                      {descriptionError && (
                        <>
                          <p className="error-message">{descriptionError}</p>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {(typeOfBusiness ===
                        "Proprietary Limited Company (PTY)" ||
                        typeOfBusiness === "Close Corporation (CC)") && (
                        <>
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
                              }}
                              options={userOptions}
                              placeholder="Select user"
                              isSearchable
                              isClearable
                              classNamePrefix="react-select"
                              components={{ DropdownIndicator }}
                            />
                            {userIdError && (
                              <>
                                <p className="error-message">{userIdError}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Region: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={region}
                          onChange={(e) => {
                            setRegionError("");
                            let number = parseInt(e.target.value);
                            setRegion(number);
                            console.log(region);
                          }}
                        >
                          <option value="" disabled selected>
                            Select region
                          </option>
                          {regionOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {regionError && (
                          <>
                            <p className="error-message">{regionError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {region && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-3">
                          <label htmlFor="email" className="pb-2 text-boldd">
                            Town: <span>*</span>
                          </label>
                          <select
                            class="form-select"
                            value={town}
                            onChange={(e) => {
                              setTownError("");
                              setTown(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              Select town
                            </option>
                            {filteredByRegionOption.map((option) => (
                              <option value={option.value} key={option.label}>
                                {option.value}
                              </option>
                            ))}
                          </select>
                          {townError && (
                            <>
                              <p className="error-message">{townError}</p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Primary Industry: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={primaryIndustry}
                          onChange={(e) => {
                            setPrimaryIndustryError("");
                            setPrimaryIndustry(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {primatyIndustryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {primaryIndustryError && (
                          <>
                            <p className="error-message">{primaryIndustryError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Secondary Industry:
                        </label>
                        <select
                          class="form-select"
                          value={secondaryIndustry}
                          onChange={(e) => {
                            setSecondaryIndustryError("");
                            setSecondaryIndustry(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {secondaryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {secondaryIndustryError && (
                          <>
                            <p className="error-message">
                              {secondaryIndustryError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Year of Establishment: <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control place-holder"
                          min="1900"
                          max="21000"
                          value={yearOfEstablishment}
                          placeholder="Establishment year"
                          autoComplete="off"
                          name="email"
                          onChange={(e) => {
                            setYearOfEstablishmentError("");
                            setYearOfEstablishment(e.target.value);
                          }}
                        />
                        {yearOfEstablishmentError && (
                          <>
                            <p className="error-message">
                              {yearOfEstablishmentError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="turnover" className="pb-2 text-boldd">
                          Annual Turnover: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={annualTurnover}
                          onChange={(e) => {
                            setAnnualTurnoverError("");
                            setAnnualTurnover(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select annual turnover
                          </option>
                          {annualTurnoverOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {annualTurnoverError && (
                          <>
                            <p className="error-message">{annualTurnoverError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-end w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep1}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}

                {stepperCounter === 1 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Founder's Name:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          value={foundersName || ""}
                          autoComplete="off"
                          name="email"
                          onChange={(e) => {
                            setFoundersNameError("");
                            setFoundersName(e.target.value);
                          }}
                        />
                        {foundersNameError && (
                          <>
                            <p className="error-message">{foundersNameError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Founder's Gender:<span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={foundersGender}
                          onChange={(e) => {
                            setFoundersGenderError("");
                            setFoundersGender(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select gender
                          </option>
                          {foundersGenderOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {foundersGenderError && (
                          <>
                            <p className="error-message">{foundersGenderError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Founder Age: <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control place-holder"
                          min="1"
                          max="110"
                          value={foundersAge}
                          placeholder="age"
                          autoComplete="off"
                          name="email"
                          onChange={(e) => {
                            setFoundersAgeError("");
                            setFoundersAge(e.target.value);
                          }}
                        />
                        {foundersAgeError && (
                          <>
                            <p className="error-message">{foundersAgeError}</p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(0)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep2}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 2 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="businessAddress"
                          className="pb-2 text-boldd"
                        >
                          Business Address: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Location"
                          value={businessAddress}
                          autoComplete="off"
                          name="businessAddress"
                          onChange={(e) => {
                            setBusinessAddressError("");
                            setBusinessAddress(e.target.value);
                          }}
                        />
                        {businessAddressError && (
                          <>
                            <p className="error-message">{businessAddressError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="phoneNumber"
                          className="pb-2 text-boldd"
                        >
                          Phone Number: <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          className="form-control place-holder"
                          placeholder="Enter number e.g. +26481*******"
                          autoComplete="off"
                          name="phoneNumber"
                          onChange={(e) => {
                            setPhoneNumberError("");
                            setPhoneNumber(e.target.value);
                          }}
                        />
                        {phoneNumberError && (
                          <>
                            <p className="error-message">{phoneNumberError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="whatsAppNumber"
                          className="pb-2 text-boldd"
                        >
                          What's App Number:
                        </label>
                        <input
                          type="text"
                          value={whatsAppNumber}
                          className="form-control place-holder"
                          placeholder="Enter number e.g. +26481*******"
                          autoComplete="off"
                          name="whatsAppNumber"
                          onChange={(e) => {
                            setWhatsAppNumberError("");
                            setWhatsAppNumber(e.target.value);
                          }}
                        />
                        {whatsAppNumberError && (
                          <>
                            <p className="error-message">{whatsAppNumberError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="businessEmail"
                          className="pb-2 text-boldd"
                        >
                          Business email: <span>*</span>
                        </label>
                        <input
                          type="email"
                          value={businessEmail}
                          className="form-control place-holder"
                          placeholder="example@nipdb.com.na"
                          autoComplete="off"
                          name="businessEmail"
                          onChange={(e) => {
                            setBusinessEmailError("");
                            setBusinessEmail(e.target.value);
                          }}
                        />
                        {businessEmailError && (
                          <>
                            <p className="error-message">{businessEmailError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="website" className="pb-2 text-boldd">
                          Website Link:
                        </label>
                        <input
                          type="text"
                          value={websiteLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="website"
                          onChange={(e) => {
                            setWebsiteLinkError("");
                            setWebsiteLink(e.target.value);
                          }}
                        />
                        {websiteLinkError && (
                          <>
                            <p className="error-message">{websiteLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="twitter" className="pb-2 text-boldd">
                          Twitter Link:
                        </label>
                        <input
                          type="text"
                          value={twitterLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="twitter"
                          onChange={(e) => {
                            setTwitterLinkError("");
                            setTwitterLink(e.target.value);
                          }}
                        />
                        {twitterLinkError && (
                          <>
                            <p className="error-message">{twitterLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="facebook" className="pb-2 text-boldd">
                          Facebook Link:
                        </label>
                        <input
                          type="text"
                          value={facebookLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="facebook"
                          onChange={(e) => {
                            setFacebookLinkError("");
                            setFacebookLink(e.target.value);
                          }}
                        />
                        {facebookLinkError && (
                          <>
                            <p className="error-message">{facebookLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="instagram" className="pb-2 text-boldd">
                          Instagram Link:
                        </label>
                        <input
                          type="text"
                          value={instagramLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="instagram"
                          onChange={(e) => {
                            setInstagramLinkError("");
                            setInstagramLink(e.target.value);
                          }}
                        />
                        {instagramLinkError && (
                          <>
                            <p className="error-message">{instagramLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="linkedIn" className="pb-2 text-boldd">
                          Linkedln Link:
                        </label>
                        <input
                          type="text"
                          value={linkedInLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="linkedIn"
                          onChange={(e) => {
                            setLinkedInLinkError("");
                            setLinkedInLink(e.target.value);
                          }}
                        />
                        {linkedInLinkError && (
                          <>
                            <p className="error-message">{linkedInLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(1)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep3}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 3 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Monday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isMondayClosed}
                                onChange={() =>
                                  setIsMondayClosed(!isMondayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isMondayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="mondayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="mondayFrom"
                                    value={mondayFrom}
                                    onChange={(e) => {
                                      setMondayError("");
                                      setMondayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="mondayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="mondayTo"
                                    value={mondayTo}
                                    onChange={(e) => {
                                      setMondayError("");
                                      setMondayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {mondayError && (
                          <p className="error-message">{mondayError}</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Tuesday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isTuesdayClosed}
                                onChange={() =>
                                  setIsTuesdayClosed(!isTuesdayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isTuesdayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="TuesdayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="mondayFrom"
                                    value={tuesdayFrom}
                                    onChange={(e) => {
                                      setTuesdayError("");
                                      setTuesdayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="tuesdayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="tuesdayTo"
                                    value={tuesdayTo}
                                    onChange={(e) => {
                                      setTuesdayError("");
                                      setTuesdayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {tuesdayError && (
                          <p className="error-message">{tuesdayError}</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Wednesday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isWednesdayClosed}
                                onChange={() =>
                                  setIsWednesdayClosed(!isWednesdayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isWednesdayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="mondayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="wednesdayFrom"
                                    value={wednesdayFrom}
                                    onChange={(e) => {
                                      setWednesdayError("");
                                      setWednesdayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="wednesdayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="wednesdayTo"
                                    value={wednesdayTo}
                                    onChange={(e) => {
                                      setWednesdayError("");
                                      setWednesdayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {wednesdayError && (
                          <p className="error-message">{wednesdayError}</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Thursday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isThursdayClosed}
                                onChange={() =>
                                  setIsThursdayClosed(!isThursdayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isThursdayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="thursdayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="thursdayFrom"
                                    value={thursdayFrom}
                                    onChange={(e) => {
                                      setThursdayError("");
                                      setThursdayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="thursdayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="thursdayTo"
                                    value={thursdayTo}
                                    onChange={(e) => {
                                      setThursdayError("");
                                      setThursdayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {thursdayError && (
                          <p className="error-message">{thursdayError}</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Friday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isFridayClosed}
                                onChange={() =>
                                  setIsFridayClosed(!isFridayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isFridayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="fridayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="fridayFrom"
                                    value={fridayFrom}
                                    onChange={(e) => {
                                      setFridayError("");
                                      setFridayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="fridayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="fridayTo"
                                    value={fridayTo}
                                    onChange={(e) => {
                                      setFridayError("");
                                      setFridayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {fridayError && (
                          <p className="error-message">{fridayError}</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Saturday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isSaturdayClosed}
                                onChange={() =>
                                  setIsSaturdayClosed(!isSaturdayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isSaturdayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="mondayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="saturdayFrom"
                                    value={saturdayFrom}
                                    onChange={(e) => {
                                      setSaturdayError("");
                                      setSaturdayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="saturdayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="saturdayTo"
                                    value={saturdayTo}
                                    onChange={(e) => {
                                      setSaturdayError("");
                                      setSaturdayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {saturdayError && (
                          <p className="error-message">{saturdayError}</p>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="text-boldd">
                          Sunday:
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={12} md={12}>
                            <div className="form-group d-flex justify-content-between align-items-center">
                              <label className="pb-2 text-boldd text-secondary">
                                Closed:
                              </label>
                              <Switch
                                checked={!isSundayClosed}
                                onChange={() =>
                                  setIsSundayClosed(!isSundayClosed)
                                }
                              />
                            </div>
                          </Grid>

                          {isSundayClosed && (
                            <>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group">
                                  <label
                                    htmlFor="mondayFrom"
                                    className="pb-2 text-boldd"
                                  >
                                    From: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="08:00"
                                    autoComplete="off"
                                    name="sundayFrom"
                                    value={sundayFrom}
                                    onChange={(e) => {
                                      setSundayError("");
                                      setSundayFrom(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group pb-3">
                                  <label
                                    htmlFor="thursdayTo"
                                    className="pb-2 text-boldd"
                                  >
                                    To: <span>*</span>
                                  </label>
                                  <input
                                    type="time"
                                    className="form-control place-holder"
                                    placeholder="15:00"
                                    autoComplete="off"
                                    name="thursdayTo"
                                    value={sundayTo}
                                    onChange={(e) => {
                                      setSundayError("");
                                      setSundayTo(e.target.value);
                                    }}
                                  />
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>

                        {sundayError && (
                          <p className="error-message">{sundayError}</p>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(2)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep4}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 4 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label
                          htmlFor="numberOfEmployee"
                          className="pb-2 text-boldd"
                        >
                          Number of Employees: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={numberOfEmployees}
                          onChange={(e) => {
                            setNumberOfEmployeesError("");
                            setNumberOfEmployees(e.target.value);
                          }}
                        >
                          <option value="" disabled>
                            Select number of employed
                          </option>
                          {numberOfEmployeeOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {numberOfEmployeesError && (
                          <>
                            <p className="error-message">
                              {numberOfEmployeesError}
                            </p>
                          </>
                        )}
                      </div>
                      {image1 ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business image 1:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage1}
                                >
                                  {image1 ? (
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
                                  src={image1}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef1}
                                  onChange={handleFileChangeImage1}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business image 1:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage1}
                            />
                            {image1Error && (
                              <>
                                <p className="error-message">{image1Error}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {businessLogo ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business Logo:
                              </label>
                            </div>
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
                                  {businessLogo ? (
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
                                  src={businessLogo}
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
                              Business Logo:
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
                            {businessLogoError && (
                              <>
                                <p className="error-message">
                                  {businessLogoError}
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {image2 ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business image 2:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage2}
                                >
                                  {image2 ? (
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
                                  src={image2}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef2}
                                  onChange={handleFileChangeImage2}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business image 2:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage2}
                            />
                            {image2Error && (
                              <>
                                <p className="error-message">{image2Error}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {image3 ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business image 3:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage3}
                                >
                                  {image3 ? (
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
                                  src={image3}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef3}
                                  onChange={handleFileChangeImage3}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business image 3:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage3}
                            />
                            {image3Error && (
                              <>
                                <p className="error-message">{image3Error}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(3)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep5}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </Grid>
            </Box>
          </Modal>
          <Modal
            open={openModelView}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h1 className="text-center">MSME Review</h1>
                <CgCloseR
                  style={{
                    color: "red",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUpdate(false);
                    setBusinessAddressDetails();
                    setBusinessRegistrationNameDetails("");
                    setBusinessDisplayNameDetails("");
                    setDescriptionDetails("");
                    setTypeOfBusinessDetails("");
                    setRegionDetails("");
                    setTownDetails("");
                    setMondayDetailsError("");
                    setTuesdayDetailsError("");
                    setWednesdayDetailsError("");
                    setThursdayDetailsError("");
                    setFridayDetailsError("");
                    setSaturdayDetailsError("");
                    setSundayDetailsError("");
                    setPrimaryIndustryDetails("");
                    setSecondaryIndustryDetails("");
                    setYearOfEstablishmentDetails("");
                    setNumberOfEmployeesDeDetails("");
                    setAnnualTurnoverDetails("");
                    setFoundersNameDetails("");
                    setFoundersGenderDetails("");
                    setFoundersAgeDetails("");
                    setBusinessAddressDetails("");
                    setPhoneNumberDetails("");
                    setWhatsAppNumberDetails("");
                    setBusinessEmailDetails("");
                    setWebsiteLinkDetails("");
                    setFacebookLinkDetails("");
                    setTwitterLinkDetails("");
                    setInstagramLinkDetails("");
                    setLinkedInLinkDetails("");
                    setMondayDetails("");
                    setTuesdayDetails("");
                    setWednesdayDetails("");
                    setThursdayDetails("");
                    setFridayDetails("");
                    setSaturdayDetails("");
                    setSundayDetails("");
                    setBusinessLogoDetails("");
                    setImage1Details("");
                    setImage2Details("");
                    setImage3Details("");
                    setStepperCounter(0);
                    setNotificationDescription("");
                    setNotificationTitle("");
                    setAddNotification(false);
                    setNotificationDescriptionError("");
                    setNotificationTitleError("");
                    setOpenModelView(false);
                  }}
                />
              </div>

              <Box
                sx={{ width: "100%" }}
                style={{ marginTop: "10px", marginBottom: "20px" }}
              >
                <Stepper activeStep={stepperCounter} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                style={{ marginTop: "10px" }}
              >
                {stepperCounter === 0 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Type of Business: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={typeOfBusinessDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setTypeOfBusinessDetailsError("");
                            setTypeOfBusinessDetails(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select business type
                          </option>
                          {typeOfBusinessOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessDetailsError && (
                          <>
                            <p className="error-message">
                              {typeOfBusinessDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {(typeOfBusinessDetails ===
                      "Proprietary Limited Company (PTY)" ||
                      typeOfBusinessDetails === "Close Corporation (CC)") && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="form-group pb-md-2">
                            <label
                              htmlFor="businessRegistrationNumber"
                              className="pb-2 text-boldd"
                            >
                              Registration Number: <span>*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control place-holder"
                              placeholder="Registration number"
                              disabled={
                                currentUser.role === "Super admin"
                                  ? false
                                  : true
                              }
                              value={businessRegistrationNumberDetails}
                              autoComplete="off"
                              onChange={(e) => {
                                console.log(e.target.value);
                                setUpdate(true);
                                setBusinessRegistrationNumberDetailsError("");
                                setBusinessRegistrationNumberDetails(
                                  e.target.value
                                );
                                console.log(
                                  "After update",
                                  businessRegistrationNumberDetails
                                );
                              }}
                              name="email"
                            />
                            {businessRegistrationNumberDetailsError && (
                              <>
                                <p className="error-message">
                                  {businessRegistrationNumberDetailsError}
                                </p>
                              </>
                            )}
                          </div>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="registrationName"
                          className="pb-2 text-boldd"
                        >
                          Registration Name: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Registration name"
                          autoComplete="off"
                          value={businessRegistrationNameDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setBusinessRegistrationNameDetailsError("");
                            setBusinessRegistrationNameDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          name="registrationName"
                        />
                        {businessRegistrationNameDetailsError && (
                          <>
                            <p className="error-message">
                              {businessRegistrationNameDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="displayNumber"
                          className="pb-2 text-boldd"
                        >
                          Display Name: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Display name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          onChange={(e) => {
                            setUpdate(true);
                            setBusinessDisplayNameDetailsError("");
                            setBusinessDisplayNameDetails(e.target.value);
                          }}
                          value={businessDisplayNameDetails}
                          autoComplete="off"
                          name="displayNumber"
                        />
                        {businessDisplayNameDetailsError && (
                          <>
                            <p className="error-message">
                              {businessDisplayNameDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="description"
                          className="pb-2 text-boldd"
                        >
                          Business Description: <span>*</span>
                        </label>
                        <textarea
                          type="text"
                          rows={7}
                          cols={10}
                          maxlength="700"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          className="form-control place-holder"
                          placeholder="Display name"
                          value={descriptionDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setDescriptionDetailsError("");
                            setDescriptionDetails(e.target.value);
                            setTextCounterDetails(e.target.value.length);
                          }}
                          autoComplete="off"
                          name="description"
                        />
                      </div>
                      <div className="float-end text-counter">
                        <span>{textCounterDetails}</span>
                        <span>/700</span>
                      </div>
                      {descriptionDetailsError && (
                        <>
                          <p className="error-message">
                            {descriptionDetailsError}
                          </p>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Region: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={regionDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setRegionDetailsError("");
                            let updatedRegion = parseInt(e.target.value);
                            setRegionDetails(updatedRegion);
                            setTownDetails("");
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select region
                          </option>
                          {regionOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {regionDetailsError && (
                          <>
                            <p className="error-message">{regionDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Town: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={townDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setTownDetailsError("");
                            setTownDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>

                          {filteredTownOptionsDetails.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {townDetailsError && (
                          <>
                            <p className="error-message">{townDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Primary Industry: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={primaryIndustryDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setPrimaryIndustryDetailsError("");
                            setPrimaryIndustryDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {primatyIndustryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {primaryIndustryDetailsError && (
                          <>
                            <p className="error-message">
                              {primaryIndustryDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Secondary Industry:
                        </label>
                        <select
                          class="form-select"
                          value={secondaryIndustryDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setSecondaryIndustryDetailsError("");
                            setSecondaryIndustryDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {secondaryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {secondaryIndustryDetailsError && (
                          <>
                            <p className="error-message">
                              {secondaryIndustryDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Year of Establishment: <span>*</span>
                        </label>
                        <input
                          type="number"
                          min="1900"
                          max="21000"
                          className="form-control place-holder"
                          placeholder="Created date"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={yearOfEstablishmentDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setYearOfEstablishmentDetailsError("");
                            setYearOfEstablishmentDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="displayNumber"
                        />
                        {yearOfEstablishmentDetailsError && (
                          <>
                            <p className="error-message">
                              {yearOfEstablishmentDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="turnover" className="pb-2 text-boldd">
                          Annual Turnover: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={annualTurnoverDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setAnnualTurnoverDetailsError("");
                            setAnnualTurnoverDetails(e.target.value);
                          }}
                        >
                          <option value="" disabled>
                            Select annual turnover
                          </option>
                          {annualTurnoverOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {annualTurnoverDetailsError && (
                          <>
                            <p className="error-message">
                              {annualTurnoverDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="turnover" className="pb-2 text-boldd">
                          Number of Employees: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={numberOfEmployeesDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setNumberOfEmployeesDetailsError("");
                            setNumberOfEmployeesDeDetails(e.target.value);
                          }}
                        >
                          <option value="" disabled>
                            Select number of employees
                          </option>
                          {numberOfEmployeeOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {numberOfEmployeesDetailsError && (
                          <>
                            <p className="error-message">
                              {numberOfEmployeesDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-end w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => {
                          console.log(
                            "Registration number msme-information: ",
                            businessRegistrationNumberDetails
                          );
                          handleStep1Review();
                        }}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}

                {stepperCounter === 1 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Founder's Name: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={foundersNameDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setFoundersNameDetailsError("");
                            setFoundersNameDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {foundersNameDetailsError && (
                          <>
                            <p className="error-message">
                              {foundersNameDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Founder's Gender: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={foundersGenderDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setFoundersGenderDetailsError("");
                            setFoundersGenderDetails(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select gender
                          </option>
                          {foundersGenderOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {foundersGenderDetailsError && (
                          <>
                            <p className="error-message">
                              {foundersGenderDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2 text-boldd">
                          Founder Age: <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control place-holder"
                          placeholder="founder's age"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={foundersAgeDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setFoundersAgeDetailsError("");
                            setFoundersAgeDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {foundersAgeDetailsError && (
                          <>
                            <p className="error-message">
                              {foundersAgeDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(0)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => {
                          console.log(
                            "registration number after founder information: ",
                            businessRegistrationNumberDetails
                          );
                          handleStep2Review();
                        }}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 2 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="businessAddress"
                          className="pb-2 text-boldd"
                        >
                          Business Address: <span>*</span>
                        </label>
                        <textarea
                          type="text"
                          rows={2}
                          className="form-control place-holder"
                          placeholder="Location"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={businessAddressDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setBusinessAddressDetailsError("");
                            setBusinessAddressDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {businessAddressDetailsError && (
                          <>
                            <p className="error-message">
                              {businessAddressDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="phoneNumber"
                          className="pb-2 text-boldd"
                        >
                          Phone Number: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="+264 81 *** ****"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={phoneNumberDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setPhoneNumberDetailsError("");
                            setPhoneNumberDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {phoneNumberDetailsError && (
                          <>
                            <p className="error-message">
                              {phoneNumberDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="whatsAppNumber"
                          className="pb-2 text-boldd"
                        >
                          What's App Number:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="+264 81 *** ****"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={whatsAppNumberDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setWhatsAppNumberDetailsError("");
                            setWhatsAppNumberDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {whatsAppNumberDetailsError && (
                          <>
                            <p className="error-message">
                              {whatsAppNumberDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label
                          htmlFor="businessEmail"
                          className="pb-2 text-boldd"
                        >
                          Business email: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="example@nipdb.com"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={businessEmailDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setBusinessEmailDetailsError("");
                            setBusinessEmailDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {businessEmailDetailsError && (
                          <>
                            <p className="error-message">
                              {businessEmailDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="website" className="pb-2 text-boldd">
                          Website Link:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Enter link here"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={websiteLinkDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setWebsiteLinkDetailsError("");
                            setWebsiteLinkDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {websiteLinkDetailsError && (
                          <>
                            <p className="error-message">
                              {websiteLinkDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="twitter" className="pb-2 text-boldd">
                          Twitter Link:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Enter link here"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={twitterLinkDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setTwitterLinkDetailsError("");
                            setTwitterLinkDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {twitterLinkDetailsError && (
                          <>
                            <p className="error-message">
                              {twitterLinkDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="facebook" className="pb-2 text-boldd">
                          Facebook Link:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Enter link here"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={facebookLinkDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setFacebookLinkDetailsError("");
                            setFacebookLinkDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {facebookLinkDetailsError && (
                          <>
                            <p className="error-message">
                              {facebookLinkDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="instagram" className="pb-2 text-boldd">
                          Instagram Link:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Enter link here"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={instagramLinkDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setInstagramLinkDetailsError("");
                            setInstagramLinkDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {instagramLinkDetailsError && (
                          <>
                            <p className="error-message">
                              {instagramLinkDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="linkedIn" className="pb-2 text-boldd">
                          Linkedln Link:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Enter link here"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={linkedInLinkDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setLinkedInLinkDetailsError("");
                            setLinkedInLinkDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {linkedInLinkDetailsError && (
                          <>
                            <p className="error-message">
                              {linkedInLinkDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(1)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep3Review}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 3 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Monday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={mondayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setMondayDetailsError("");
                            setMondayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {mondayDetailsError && (
                          <>
                            <p className="error-message">{mondayDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Tuesday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={tuesdayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setTuesdayDetailsError("");
                            setTuesdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {tuesdayDetailsError && (
                          <>
                            <p className="error-message">{tuesdayDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Wednesday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={wednesdayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setWednesdayDetailsError("");
                            setWednesdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {wednesdayDetailsError && (
                          <>
                            <p className="error-message">
                              {wednesdayDetailsError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Thursday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={thursdayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setThursdayDetailsError("");
                            setThursdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {thursdayDetailsError && (
                          <>
                            <p className="error-message">{thursdayDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Friday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={fridayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setFridayDetailsError("");
                            setFridayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {fridayDetailsError && (
                          <>
                            <p className="error-message">{fridayDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Saturday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={saturdayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setSaturdayDetailsError("");
                            setSaturdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {saturdayDetailsError && (
                          <>
                            <p className="error-message">{saturdayDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="text-boldd">
                          Sunday: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="e.g 8:00 AM - 6:00 PM"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={sundayDetails}
                          onChange={(e) => {
                            setUpdate(true);
                            setSundayDetailsError("");
                            setSundayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {sundayDetailsError && (
                          <>
                            <p className="error-message">{sundayDetailsError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={() => setStepperCounter(2)}
                      >
                        <KeyboardBackspaceIcon
                          style={{ marginRight: "10px" }}
                        />
                        Back
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton text-boldd"
                        onClick={handleStep4Review}
                      >
                        Next
                        <EastIcon style={{ marginLeft: "10px" }} />
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 4 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      {businessLogoDetails ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business logo:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputBusinessLogoDetails}
                                >
                                  {businessLogoDetails ? (
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
                                    updatingDetails?.additionalInfo
                                      ?.businessLogo === businessLogoDetails
                                      ? `https://dt.mtc.com.na:4000/msmes/${businessLogoDetails}`
                                      : businessLogoDetails
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRefBusinessLogo}
                                  onChange={handleFileChangeBusinessLogoDetails}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business logo:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeBusinessLogoDetails}
                            />
                            {businessLogoDetailsError && (
                              <>
                                <p className="error-message">
                                  {businessLogoDetailsError}
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      {image1Details ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business image 1:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage1Details}
                                >
                                  {image1Details ? (
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
                                    updatingDetails?.additionalInfo?.image1 ===
                                    image1Details
                                      ? `https://dt.mtc.com.na:4000/msmes/${image1Details}`
                                      : image1Details
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef1Details}
                                  onChange={handleFileChangeImage1Details}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business image 1:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage1Details}
                            />
                            {image1DetailsError && (
                              <>
                                <p className="error-message">
                                  {image1DetailsError}
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      {image2Details ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business image 2:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage2Details}
                                >
                                  {image2Details ? (
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
                                    updatingDetails?.additionalInfo?.image2 ===
                                    image2Details
                                      ? `https://dt.mtc.com.na:4000/msmes/${image2Details}`
                                      : image2Details
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef2Details}
                                  onChange={handleFileChangeImage2Details}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business image 2:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage2Details}
                            />
                            {image2DetailsError && (
                              <>
                                <p className="error-message">
                                  {image2DetailsError}
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      {image3Details ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label
                                htmlFor="email"
                                className="pb-2 text-boldd"
                              >
                                Business image 3:
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage3Details}
                                >
                                  {image3Details ? (
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
                                    updatingDetails?.additionalInfo?.image3 ===
                                    image3Details
                                      ? `https://dt.mtc.com.na:4000/msmes/${image3Details}`
                                      : image3Details
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef3Details}
                                  onChange={handleFileChangeImage3Details}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2 text-boldd">
                              Business image 3:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage3Details}
                            />
                            {image3DetailsError && (
                              <>
                                <p className="error-message">
                                  {image3DetailsError}
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Tooltip
                        title={
                          addNotification
                            ? "Dismiss notification"
                            : "Send a notification to the current business user"
                        }
                      >
                        <div
                          className="d-flex pointer"
                          onClick={() => {
                            if (!addNotification) {
                              setNotificationDescriptionError("");
                              setNotificationTitleError("");
                              setNotificationDescription("");
                              setNotificationTitle("");
                            }
                            setAddNotification(!addNotification);
                          }}
                        >
                          <p className="text-bold">Send Notification</p>
                          {addNotification ? (
                            <IoIosArrowUp
                              style={{
                                marginTop: "3px",
                                fontSize: "20px",
                                marginLeft: "5px",
                              }}
                            />
                          ) : (
                            <IoIosArrowDown
                              style={{
                                marginTop: "3px",
                                fontSize: "20px",
                                marginLeft: "5px",
                              }}
                            />
                          )}
                        </div>
                      </Tooltip>
                      {addNotification && (
                        <Grid
                          container
                          spacing={{ xs: 1, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                        >
                          {notificationFail && (
                            <Grid item xs={12}>
                              <div className="success-message">
                                <p className="animated-danger">
                                  Notification not sent! Check your network &
                                  try again.
                                </p>
                              </div>
                            </Grid>
                          )}
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-md-2">
                              <label htmlFor="email" className="text-boldd">
                                Subject: <span>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control place-holder"
                                placeholder="Enter title"
                                disabled={
                                  currentUser.role === "Super admin"
                                    ? false
                                    : true
                                }
                                value={notificationTitle}
                                onChange={(e) => {
                                  setNotificationTitleError("");
                                  setNotificationTitle(e.target.value);
                                }}
                                autoComplete="off"
                                name="email"
                              />
                              {notificationTitleError && (
                                <>
                                  <p className="error-message">
                                    {notificationTitleError}
                                  </p>
                                </>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-md-2">
                              <label htmlFor="email" className="text-boldd">
                                Notification: <span>*</span>
                              </label>
                              <textarea
                                type="text"
                                rows={5}
                                className="form-control place-holder"
                                placeholder="Type here........"
                                disabled={
                                  currentUser.role === "Super admin"
                                    ? false
                                    : true
                                }
                                value={notificationDescription}
                                onChange={(e) => {
                                  setNotificationDescriptionError("");
                                  setNotificationDescription(e.target.value);
                                }}
                                autoComplete="off"
                                name="email"
                              />
                              {notificationDescriptionError && (
                                <>
                                  <p className="error-message">
                                    {notificationDescriptionError}
                                  </p>
                                </>
                              )}
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            container
                            justifyContent="flex-end"
                          >
                            <button
                              className="btn btn-success m-1 p-2 modelButtonn text-boldd"
                              onClick={sendNotification}
                            >
                              {sendingNotification ? (
                                <CircularProgress
                                  sx={{ color: "white", paddingTop: "2px" }}
                                  size={19}
                                />
                              ) : (
                                "Send Notification"
                              )}
                            </button>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    {notificationSuccess && (
                      <Grid item xs={12}>
                        <div className="success-message">
                          <p className="animated-success">
                            Notification successfully sent!
                          </p>
                        </div>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <div className="d-flex justify-content-between w-100">
                        <button
                          className="btn btn-success m-1 p-2 modelButton text-boldd"
                          onClick={() => setStepperCounter(3)}
                        >
                          <KeyboardBackspaceIcon
                            style={{ marginRight: "10px" }}
                          />
                          Back
                        </button>
                        {currentUser?.role === "Super admin" && (
                          <div className="">
                            {updatingDetails?.status !== "Rejected" && (
                              <button
                                className="btn btn-danger m-1 p-2 modelButton text-boldd"
                                onClick={reject}
                              >
                                Reject
                              </button>
                            )}

                            {updatingDetails?.status !== "Approved" && (
                              <button
                                className="btn btn-success m-1 p-2 modelButton text-boldd"
                                onClick={approve}
                              >
                                Approve
                              </button>
                            )}

                            {update &&
                              updatingDetails?.status !== "Pending" &&
                              updatingDetails?.status !== "Rejected" &&
                              updatingDetails?.status !== "Incomplete" && (
                                <button
                                  className="btn btn-success m-1 p-2 modelButton text-boldd"
                                  onClick={() => {
                                    console.log(
                                      "registration number before sending: ",
                                      businessRegistrationNumberDetails
                                    );
                                    approve();
                                  }}
                                >
                                  Update
                                </button>
                              )}
                          </div>
                        )}
                        {updatingDetails?.status === "Approved" &&
                          updatingDetails?.isBlocked === false &&
                          currentUser?.role === "Super admin" && (
                            <button
                              className="btn btn-warning m-1 p-2 modelButton text-boldd"
                              onClick={block}
                            >
                              Block
                            </button>
                          )}
                        {updatingDetails?.status === "Approved" &&
                          updatingDetails?.isBlocked === true &&
                          currentUser?.role === "Super admin" && (
                            <button
                              className="btn btn-warning m-1 p-2 modelButton text-boldd"
                              onClick={unBlock}
                            >
                              Unblock
                            </button>
                          )}
                      </div>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Msme;
