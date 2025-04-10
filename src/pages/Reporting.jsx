import React, { useEffect, useState } from "react";
import {useTheme, useMediaQuery } from "@mui/material";
import "../assets/css/Reporting.css";
import * as XLSX from 'xlsx';  
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import BackButton from "../components/commons/BackButton";
import DownloadButton from "../components/commons/DownloadButton";
import { toggleIsSubmittingTrue,toggleIsSubmittingfalse } from "../redux/reducers/submittingReducer";
import ViewButton from "../components/commons/ViewButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../redux/reducers/authReducer";
import handleAuthFailure from "../utils/handleAuthFailure";

function Reporting() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const [allMSMEList,setAllMSMEList] = useState([]);
  const [allMSMEPendingList,setAllMSMEPendingList] = useState([]);
  const [allMSMERejectedList,setAllMSMERejectedList] = useState([]);
  const [allMSMEBlockedList,setAllMSMEBlockedList] = useState([]);
  const [allUserList,setAllUserList] = useState([]);
  const [allBSOList,setAllBSOList] = useState([]);
  const serverToken = useSelector((state) => state.server.serverToken);
  const currentUser = useSelector((state) => state.auth.user);
  const tokenHeader = currentUser.token;

  useEffect(() => {
    const fetchMsmeAllMSME = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/msme/admin/all/approved", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('x-access-token');
      
      if(newTokenHeader){
        dispatch(updateToken({
          token: newTokenHeader
        }));
      }
      
        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllMSMEList(data.data);
        }else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({dispatch, navigate, type:'auth'});
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeAllMSME();
  }, []);
  useEffect(() => {
    const fetchMsmeAllMSMEPending = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/msme/admin/all/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('x-access-token');
      
      if(newTokenHeader){
        dispatch(updateToken({
          token: newTokenHeader
        }));
      }
      
        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllMSMEPendingList(data.data);
        }else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({dispatch, navigate, type:'auth'});
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeAllMSMEPending();
  }, []);
  useEffect(() => {
    const fetchMsmeAllMSMERejected = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/msme/admin/all/rejected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('x-access-token');
      
      if(newTokenHeader){
        dispatch(updateToken({
          token: newTokenHeader
        }));
      }
      
        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllMSMERejectedList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({dispatch, navigate, type:'auth'});
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeAllMSMERejected();
  }, []);
  useEffect(() => {
    const fetchMsmeAllMSMEBlocked = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/msme/admin/all/blocked", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('x-access-token');
      
      if(newTokenHeader){
        dispatch(updateToken({
          token: newTokenHeader
        }));
      }
      
        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllMSMEBlockedList(data.data);
        }else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({dispatch, navigate, type:'auth'});
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeAllMSMEBlocked();
  }, []);
  useEffect(() => {
    const fetchMsmeAllBSO = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/bso/admin/all/download", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('x-access-token');
     
      if(newTokenHeader){
        dispatch(updateToken({
          token: newTokenHeader
        }));
      }
      
        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllBSOList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({dispatch, navigate, type:'auth'});
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchMsmeAllBSO();
  }, []);
  useEffect(() => {
    const fetchMsmeAllUsers = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch("https://dt.mtc.com.na:4000/system/all/admin/list/download", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('x-access-token');
      
      if(newTokenHeader){
        dispatch(updateToken({
          token: newTokenHeader
        }));
      }
      
        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAllUserList(data.data);
        }else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({dispatch, navigate, type:'auth'});
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: 'network' });
      }
    };

    fetchMsmeAllUsers();
  }, []);
  const columns1 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "registrationNumber", headerName: "Registration Number", width: isSmallScreen ? 130 : 160 },
    { field: "displayName", headerName: "Display Name", width: isSmallScreen ? 130 : 160 },
    { field: "typeOfBusiness", headerName: "Type of Business", width: isSmallScreen ? 140 : 160 },
    { field: "description", headerName: "Description", width: isSmallScreen ? 140 : 160 },
    { field: "yearOfEstablishment", headerName: "Year of Establishment", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "foundersGender", headerName: "Founders Gender", width: isSmallScreen ? 120 : 180 },
    { field: "foundersAge", headerName: "Founders Age", width: isSmallScreen ? 120 : 180 },
    { field: "businessAddress", headerName: "Business Address", width: isSmallScreen ? 120 : 180 },
    { field: "phoneNumber", headerName: "Phone Number", width: isSmallScreen ? 120 : 180 },
    { field: "whatsAppNumber", headerName: "WhatsApp Number", width: isSmallScreen ? 120 : 180 },
    { field: "email", headerName: "Business Email", width: isSmallScreen ? 120 : 180 },
    { field: "website", headerName: "Website Link", width: isSmallScreen ? 120 : 180 },
    { field: "twitter", headerName: "Twitter Link", width: isSmallScreen ? 120 : 180 },
    { field: "facebook", headerName: "Facebook Link", width: isSmallScreen ? 120 : 180 },
    { field: "instagram", headerName: "Instagram Link", width: isSmallScreen ? 120 : 180 },
    { field: "linkedln", headerName: "LinkedIn Link", width: isSmallScreen ? 120 : 180 },
    { field: "monday", headerName: "Monday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "tuesday", headerName: "Tuesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "wednesday", headerName: "Wednesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "thursday", headerName: "Thursday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "friday", headerName: "Friday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "saturday", headerName: "Saturday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "sunday", headerName: "Sunday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "numberOfEmployees", headerName: "Number of Employees", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
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
];

const rowsAll = allMSMEList.map((msme) => ({
  id: msme.id,
  registrationName: msme.registrationName,
  registrationNumber: msme.registrationNumber,
  displayName: msme.displayName,
  typeOfBusiness: msme.typeOfBusiness,
  description: msme.description,
  annualTurnover: msme.annualTurnOver,
  yearOfEstablishment: msme.yearOfEstablishment,
  email: msme.businessEmail, // Fixed duplicate "email" field
  region: msme.region,
  town: msme.town,
  primaryIndustry: msme.primaryIndustry,
  foundersName: msme.foundersName,
  foundersGender: msme.foundersGender,
  foundersAge: msme.foundersAge,
  businessAddress: msme.businessAddress,
  phoneNumber: msme.phoneNumber,
  whatsAppNumber: msme.whatsAppNumber,
  website: msme.website,
  twitter: msme.twitter,
  facebook: msme.facebook,
  instagram: msme.instagram,
  linkedln: msme.linkedln,
  monday: msme.monday,
  tuesday: msme.tuesday,
  wednesday: msme.wednesday,
  thursday: msme.thursday,
  friday: msme.friday,
  saturday: msme.saturday,
  sunday: msme.sunday,
  numberOfEmployees: msme.numberOfEmployees,
  status: msme.status,
  isBlocked: msme.isBlocked
}));

  const columns2 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "registrationNumber", headerName: "Registration Number", width: isSmallScreen ? 130 : 160 },
    { field: "displayName", headerName: "Display Name", width: isSmallScreen ? 130 : 160 },
    { field: "typeOfBusiness", headerName: "Type of Business", width: isSmallScreen ? 140 : 160 },
    { field: "description", headerName: "Description", width: isSmallScreen ? 140 : 160 },
    { field: "yearOfEstablishment", headerName: "Year of Establishment", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "foundersGender", headerName: "Founders Gender", width: isSmallScreen ? 120 : 180 },
    { field: "foundersAge", headerName: "Founders Age", width: isSmallScreen ? 120 : 180 },
    { field: "businessAddress", headerName: "Business Address", width: isSmallScreen ? 120 : 180 },
    { field: "phoneNumber", headerName: "Phone Number", width: isSmallScreen ? 120 : 180 },
    { field: "whatsAppNumber", headerName: "WhatsApp Number", width: isSmallScreen ? 120 : 180 },
    { field: "email", headerName: "Business Email", width: isSmallScreen ? 120 : 180 },
    { field: "website", headerName: "Website Link", width: isSmallScreen ? 120 : 180 },
    { field: "twitter", headerName: "Twitter Link", width: isSmallScreen ? 120 : 180 },
    { field: "facebook", headerName: "Facebook Link", width: isSmallScreen ? 120 : 180 },
    { field: "instagram", headerName: "Instagram Link", width: isSmallScreen ? 120 : 180 },
    { field: "linkedln", headerName: "LinkedIn Link", width: isSmallScreen ? 120 : 180 },
    { field: "monday", headerName: "Monday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "tuesday", headerName: "Tuesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "wednesday", headerName: "Wednesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "thursday", headerName: "Thursday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "friday", headerName: "Friday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "saturday", headerName: "Saturday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "sunday", headerName: "Sunday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "numberOfEmployees", headerName: "Number of Employees", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
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
  ];
  const rowsAllPending = allMSMEPendingList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    registrationNumber: msme.registrationNumber,
    displayName: msme.displayName,
    typeOfBusiness: msme.typeOfBusiness,
    description: msme.description,
    annualTurnover: msme.annualTurnOver,
    yearOfEstablishment: msme.yearOfEstablishment,
    email: msme.businessEmail, // Fixed duplicate "email" field
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    foundersName: msme.foundersName,
    foundersGender: msme.foundersGender,
    foundersAge: msme.foundersAge,
    businessAddress: msme.businessAddress,
    phoneNumber: msme.phoneNumber,
    whatsAppNumber: msme.whatsAppNumber,
    website: msme.website,
    twitter: msme.twitter,
    facebook: msme.facebook,
    instagram: msme.instagram,
    linkedln: msme.linkedln,
    monday: msme.monday,
    tuesday: msme.tuesday,
    wednesday: msme.wednesday,
    thursday: msme.thursday,
    friday: msme.friday,
    saturday: msme.saturday,
    sunday: msme.sunday,
    numberOfEmployees: msme.numberOfEmployees,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const columns3 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "registrationNumber", headerName: "Registration Number", width: isSmallScreen ? 130 : 160 },
    { field: "displayName", headerName: "Display Name", width: isSmallScreen ? 130 : 160 },
    { field: "typeOfBusiness", headerName: "Type of Business", width: isSmallScreen ? 140 : 160 },
    { field: "description", headerName: "Description", width: isSmallScreen ? 140 : 160 },
    { field: "yearOfEstablishment", headerName: "Year of Establishment", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "foundersGender", headerName: "Founders Gender", width: isSmallScreen ? 120 : 180 },
    { field: "foundersAge", headerName: "Founders Age", width: isSmallScreen ? 120 : 180 },
    { field: "businessAddress", headerName: "Business Address", width: isSmallScreen ? 120 : 180 },
    { field: "phoneNumber", headerName: "Phone Number", width: isSmallScreen ? 120 : 180 },
    { field: "whatsAppNumber", headerName: "WhatsApp Number", width: isSmallScreen ? 120 : 180 },
    { field: "email", headerName: "Business Email", width: isSmallScreen ? 120 : 180 },
    { field: "website", headerName: "Website Link", width: isSmallScreen ? 120 : 180 },
    { field: "twitter", headerName: "Twitter Link", width: isSmallScreen ? 120 : 180 },
    { field: "facebook", headerName: "Facebook Link", width: isSmallScreen ? 120 : 180 },
    { field: "instagram", headerName: "Instagram Link", width: isSmallScreen ? 120 : 180 },
    { field: "linkedln", headerName: "LinkedIn Link", width: isSmallScreen ? 120 : 180 },
    { field: "monday", headerName: "Monday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "tuesday", headerName: "Tuesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "wednesday", headerName: "Wednesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "thursday", headerName: "Thursday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "friday", headerName: "Friday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "saturday", headerName: "Saturday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "sunday", headerName: "Sunday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "numberOfEmployees", headerName: "Number of Employees", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
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
  ];
  const rowsRejected = allMSMERejectedList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    registrationNumber: msme.registrationNumber,
    displayName: msme.displayName,
    typeOfBusiness: msme.typeOfBusiness,
    description: msme.description,
    annualTurnover: msme.annualTurnOver,
    yearOfEstablishment: msme.yearOfEstablishment,
    email: msme.businessEmail, // Fixed duplicate "email" field
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    foundersName: msme.foundersName,
    foundersGender: msme.foundersGender,
    foundersAge: msme.foundersAge,
    businessAddress: msme.businessAddress,
    phoneNumber: msme.phoneNumber,
    whatsAppNumber: msme.whatsAppNumber,
    website: msme.website,
    twitter: msme.twitter,
    facebook: msme.facebook,
    instagram: msme.instagram,
    linkedln: msme.linkedln,
    monday: msme.monday,
    tuesday: msme.tuesday,
    wednesday: msme.wednesday,
    thursday: msme.thursday,
    friday: msme.friday,
    saturday: msme.saturday,
    sunday: msme.sunday,
    numberOfEmployees: msme.numberOfEmployees,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const column4 = [
    { field: "Name", headerName: "Name", width: isSmallScreen ? 120 : 160 },
    { field: "Type", headerName: "Type", width: isSmallScreen ? 180 : 130 },
    {
      field: "ContactNumber",
      headerName: "Contact Number",
      width: isSmallScreen ? 120 : 160,
    },
    {
      field: "Website",
      headerName: "Website",
      width: isSmallScreen ? 150 : 280,
    },
    {
      field: "EmailAddress",
      headerName: "Email Address",
      width: isSmallScreen ? 150 : 220,
    },
  ];
  const rowsBSO = allBSOList.map((bso) => ({
    id: bso.id,
    Name: bso.name,
    Type: bso.type,
    ContactNumber: bso.contactNumber,
    Website: bso.website,
    EmailAddress: bso.email,
  }));
  const columns5 = [
    { field: "firstName", headerName: "first Name", width: isSmallScreen ? 100 : 160 },
    { field: "lastName", headerName: "Last Name", width: isSmallScreen ? 100 : 150 },
    { field: "email", headerName: "Email", width: isSmallScreen ? 120 : 220 },
    { field: "department", headerName: "Department", width: isSmallScreen ? 150 : 190},
    { field: "role", headerName: "Role",width: isSmallScreen ? 150 : 180 },
    { field: "createdAt", headerName: "Created Date", width: isSmallScreen ? 180 : 250 },
  ];

  const rowsUsers = allUserList.map((admin) =>({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email:admin.email,
    department: admin.department,
    role: admin.role,
    createdAt: admin.createdAt
  }));
  const columns6 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "registrationNumber", headerName: "Registration Number", width: isSmallScreen ? 130 : 160 },
    { field: "displayName", headerName: "Display Name", width: isSmallScreen ? 130 : 160 },
    { field: "typeOfBusiness", headerName: "Type of Business", width: isSmallScreen ? 140 : 160 },
    { field: "description", headerName: "Description", width: isSmallScreen ? 140 : 160 },
    { field: "yearOfEstablishment", headerName: "Year of Establishment", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "foundersGender", headerName: "Founders Gender", width: isSmallScreen ? 120 : 180 },
    { field: "foundersAge", headerName: "Founders Age", width: isSmallScreen ? 120 : 180 },
    { field: "businessAddress", headerName: "Business Address", width: isSmallScreen ? 120 : 180 },
    { field: "phoneNumber", headerName: "Phone Number", width: isSmallScreen ? 120 : 180 },
    { field: "whatsAppNumber", headerName: "WhatsApp Number", width: isSmallScreen ? 120 : 180 },
    { field: "email", headerName: "Business Email", width: isSmallScreen ? 120 : 180 },
    { field: "website", headerName: "Website Link", width: isSmallScreen ? 120 : 180 },
    { field: "twitter", headerName: "Twitter Link", width: isSmallScreen ? 120 : 180 },
    { field: "facebook", headerName: "Facebook Link", width: isSmallScreen ? 120 : 180 },
    { field: "instagram", headerName: "Instagram Link", width: isSmallScreen ? 120 : 180 },
    { field: "linkedln", headerName: "LinkedIn Link", width: isSmallScreen ? 120 : 180 },
    { field: "monday", headerName: "Monday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "tuesday", headerName: "Tuesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "wednesday", headerName: "Wednesday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "thursday", headerName: "Thursday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "friday", headerName: "Friday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "saturday", headerName: "Saturday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "sunday", headerName: "Sunday Hours", width: isSmallScreen ? 120 : 180 },
    { field: "numberOfEmployees", headerName: "Number of Employees", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
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
  ];
  const rowsAllBlocked = allMSMEBlockedList.map((msme) => ({
    id: msme.id,
    registrationName: msme.registrationName,
    registrationNumber: msme.registrationNumber,
    displayName: msme.displayName,
    typeOfBusiness: msme.typeOfBusiness,
    description: msme.description,
    annualTurnover: msme.annualTurnOver,
    yearOfEstablishment: msme.yearOfEstablishment,
    email: msme.businessEmail, // Fixed duplicate "email" field
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    foundersName: msme.foundersName,
    foundersGender: msme.foundersGender,
    foundersAge: msme.foundersAge,
    businessAddress: msme.businessAddress,
    phoneNumber: msme.phoneNumber,
    whatsAppNumber: msme.whatsAppNumber,
    website: msme.website,
    twitter: msme.twitter,
    facebook: msme.facebook,
    instagram: msme.instagram,
    linkedln: msme.linkedln,
    monday: msme.monday,
    tuesday: msme.tuesday,
    wednesday: msme.wednesday,
    thursday: msme.thursday,
    friday: msme.friday,
    saturday: msme.saturday,
    sunday: msme.sunday,
    numberOfEmployees: msme.numberOfEmployees,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const lines = [
    "All MSMEs(Approved) Report",
    "All MSMEs(Pending) Report",
    "All MSMEs(Rejected) Report",
    "All MSMEs(Blocked) Report",
    "All BSOs Report",
    "All System Users",
  ];

  const columns = [
    { field: "id", headerName: "#", width: isSmallScreen ?50 : 70 },
    { field: "reportName", headerName: "REPORT NAME", width: isSmallScreen ? 350:750 },
    {
      field: "action",
      headerName: "ACTION",
      width:250,
      renderCell: (params) => (
        <ViewButton onClick={() => setActiveTab(params.row.id)}/>
      ),
    },
  ];
  const rows = lines.map((line, index) => ({
    id: index + 1,
    reportName: line,
    action: "",
  }));
  const handleDownloadAllMSME =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMEList);
      XLSX.utils.book_append_sheet(wb,ws, "All MSMEs List");
      XLSX.writeFile(wb,"All_MSME_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  const handleDownloadAllMSMEPending =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMEPendingList);
      XLSX.utils.book_append_sheet(wb,ws, "All Pending MSMEs List");
      XLSX.writeFile(wb,"All_Pending_MSME_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  const handleDownloadAllMSMERejected =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMERejectedList);
      XLSX.utils.book_append_sheet(wb,ws, "All Rejected MSMEs List");
      XLSX.writeFile(wb,"All_Rejected_MSME_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  const handleDownloadAllBSO =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allBSOList);
      XLSX.utils.book_append_sheet(wb,ws, "All BSO List");
      XLSX.writeFile(wb,"All_BSO_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  const handleDownloadAllUsers =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allUserList);
      XLSX.utils.book_append_sheet(wb,ws, "All System User List");
      XLSX.writeFile(wb,"All_System_Users.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  const handleDownloadAllBlocked =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMEBlockedList);
      XLSX.utils.book_append_sheet(wb,ws, "All Blocked MSME List");
      XLSX.writeFile(wb,"All_Blocked_MSME.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  }

  return (
    <div className="container-fluid mt-4">
      <p className="msme">Reports</p>
      <p>Access and view detailed reports about Micro, Small, and Medium Enterprises (MSMEs) and Business Support Organizations (BSOs).</p>
      <div className="mt-1 mt-md-4">
      <Box className="" justifyContent={"space-evenly"}>
        <Box
        marginTop={isSmallScreen ? "1px" : "50px"}
          display="grid"
          gridTemplateColumns={
            isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
          }
          //gridAutoRows="270px"
          gap={isSmallScreen ? "0px" : "10px"}
        >
          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow="span 3"
          >
            <div className="col-12 p-4 shadow rounded-3 mb-4">
              {
                activeTab === 0 &&<>
                  <div className="col-12 mt-1">
                <p className="list-groupp">All Reports</p>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
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
                          pageSize: 6,
                        },
                      },
                    }}
                    pageSizeOptions={[6]}
                    disableRowSelectionOnClick
                      hideFooter
                  />
                </Box>
              </div>
                </>
              }
              {
                activeTab === 1 &&<>
                <div className="col-12 mt-1">
                <p className="list-groupp text-center">All Approved MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                    {allMSMEList.length > 0 ? <><DownloadButton onClick={handleDownloadAllMSME}/></> :null}
                </div>
                <Box sx={{ height: 500, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsAll}
                    columns={columns1}
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
              }
              {
                activeTab === 2 &&<>
                <div className="col-12 mt-1">
                <p className="list-groupp text-center">All Pending MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                    {allMSMEPendingList.length > 0 ? <><DownloadButton onClick={handleDownloadAllMSMEPending}/></> : null}
                </div>
                <Box sx={{ height: 500, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsAllPending}
                    columns={columns2}
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
              }
              {
                activeTab === 3 &&<>
                <div className="col-12 mt-1">
                <p className="list-groupp text-center">All Rejected MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
  <BackButton onClick={() => setActiveTab(0)} />
  {allMSMERejectedList.length > 0 ? (
    <DownloadButton onClick={handleDownloadAllMSMERejected} />
  ) : null}
</div>

                <Box sx={{ height: 500, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsRejected}
                    columns={columns3}
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
              }
              {
                activeTab === 5 &&<>
                <div className="col-12 mt-1">
                <p className="list-groupp text-center">All BSO Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                    {
                      allBSOList.length > 0 ? <><DownloadButton onClick={handleDownloadAllBSO}/></> : null
                    }
                  
                </div>
                <Box sx={{ height: 500, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsBSO}
                    columns={column4}
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
              }
              {
                activeTab === 6 &&<>
                <div className="col-12 mt-1">
                <p className="list-groupp text-center">All System Users</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                    {
                      allUserList.length > 0 ? <><DownloadButton onClick={handleDownloadAllUsers}/></> : null
                    }
                </div>
                <Box sx={{ height: 500, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsUsers}
                    columns={columns5}
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
              }
              {
                activeTab === 4 &&<>
                <div className="col-12 mt-1">
                <p className="list-groupp text-center">All Blocked MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                    {
                      allMSMEBlockedList.length > 0 ? <><DownloadButton onClick={handleDownloadAllBlocked}/></>: null
                    }
                </div>
                <Box sx={{ height: 500, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsAllBlocked}
                    columns={columns6}
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
              }
            </div>
          </Box>
        </Box>{" "}
      </Box>
      </div>
    </div>
  );
}

export default Reporting;
