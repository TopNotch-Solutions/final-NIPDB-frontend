import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import "../assets/css/Dashboard.css";
import {
  toggleIsSubmittingTrue,
  toggleIsSubmittingfalse,
} from "../redux/reducers/submittingReducer";
import CircularProgress from "@mui/material/CircularProgress";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Tooltip from "@mui/material/Tooltip";
import { ResponsivePie } from "@nivo/pie";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as RCTooltip,
  Legend as RCLegend,
} from "chart.js";
import { updateToken } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import handleAuthFailure from "../utils/handleAuthFailure";
import LineChartCard from '../components/LineChartCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  RCTooltip,
  RCLegend
);

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalRegisteration, setTotalRegistration] = useState("");
  const [pendingRegisteration, setPendingRegistration] = useState("");
  const [rejectedRegisteration, setRejectedRegistration] = useState("");
  const [approvedRegisteration, setIApprovedRegistration] = useState("");

  const [allMSMEList, setAllMSMEList] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topCategory, setTopCategory] = useState([]);
  const [firstElement, setFirstElement] = useState({});
  const [secondElement, setSecondElement] = useState({});
  const [thirdElement, setThirdElement] = useState({});
  const [fourthElement, setFourthElement] = useState({});
  const [fifthElement, setFifthElement] = useState({});
  const [lineData, setLineData] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const serverToken = useSelector((state) => state.server.serverToken)
  const tokenHeader = currentUser.token;

  const datamy = lineData;

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/monthly/registeration",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            //
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");
        if (newTokenHeader) {
          dispatch(updateToken({ token: newTokenHeader }));
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setLineData(data.data);
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
    const fetchLineGraph = async () => {
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
           // 
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

    fetchLineGraph();
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
            //
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
            //
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
            //
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
          //
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
    const fetchTop5 = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/msme/admin/top5/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            //
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
          setTopCategory(data.data);
          setFirstElement(data.data[0]);
          setSecondElement(data.data[1]);
          setThirdElement(data.data[2]);
          setFourthElement(data.data[3]);
          setFifthElement(data.data[4]);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    };

    fetchTop5();
  }, [isSubmitting]);

  const columns = [
    {
      field: "registrationName",
      headerName: "Registration Name",
      width: isSmallScreen ? 130 : 160,
    },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 180 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 140 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 140 },
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
      width: isSmallScreen ? 120 : 180,
    },
  ];
  const rows = allMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo?.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked,
    createdAt: msme.createdAt,
  }));
  const data = [
    {
      id: firstElement?.primaryIndustry,
      label: firstElement?.primaryIndustry,
      value: firstElement?.industryCount,
      color: "hsl(83, 70%, 50%)",
    },
    {
      id: secondElement?.primaryIndustry,
      label: secondElement?.primaryIndustry,
      value: secondElement?.industryCount,
      color: "hsl(155, 70%, 50%)",
    },
    {
      id: thirdElement?.primaryIndustry,
      label: thirdElement?.primaryIndustry,
      value: thirdElement?.industryCount,
      color: "hsl(276, 70%, 50%)",
    },
    {
      id: fourthElement?.primaryIndustry,
      label: fourthElement?.primaryIndustry,
      value: fourthElement?.industryCount,
      color: "hsl(147, 70%, 50%)",
    },
    {
      id: fifthElement?.primaryIndustry,
      label: fifthElement?.primaryIndustry,
      value: fifthElement?.industryCount,
      color: "hsl(193, 70%, 50%)",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <p className="msme">Dashboard</p>
      <p>View and manage all System Performance and Analytics</p>

      <Box className="" justifyContent={"space-evenly"}>
        <Box
          display="grid"
          gridTemplateColumns={
            isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
          }
          //gridAutoRows="270px"
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
                <Tooltip title="Registered MSMEs" className="pointer">
                  <p className="text">Registrated MSMEs</p>
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
                <Tooltip title="Pending Approvals" className="pointer">
                  <p className="text">Pending Approvals</p>
                </Tooltip>

                <ArrowForwardIosIcon />
              </div>
              <div className="d-flex align-items-center justify-content-start text-center">
                <div className="p-1 border rounded-2">
                  <StickyNote2Icon sx={{ color: "rgba(0, 149, 71, 1)" }} />
                </div>
                <Tooltip title={pendingRegisteration}>
                  <p className="digit text pointer">{pendingRegisteration}</p>
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
                  <p className="digit text pointer">{rejectedRegisteration}</p>
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
                  <StickyNote2Icon sx={{ color: "rgba(251, 177, 34, 1)" }} />
                </div>
                <Tooltip title={approvedRegisteration}>
                  <p className="digit text pointer">{approvedRegisteration}</p>
                </Tooltip>
              </div>
            </div>
          </Box>
          <Box
            marginTop={"10px"}
            gridColumn={isSmallScreen ? "span 12" : "span 7"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LineChartCard 
              data={datamy} 
              isLoading={!lineData} 
            />
          </Box>
          <Box
            marginTop={"10px"}
            gridColumn={isSmallScreen ? "span 12" : "span 5"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div className="col-12 p-4 shadow rounded-2">
              <div className="d-flex justify-content-between align-items-center border-bottom ">
                <h6 className="header-padding">Top 5 performing categories</h6>
              </div>
              {topCategory ? (
                <>
                  <div style={{ height: 300 }}>
                    <ResponsivePie
                      data={data}
                      margin={{ top: 30, right: 10, bottom: 30, left: 40 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      borderWidth={1}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                      }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor="#333333"
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: "color" }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 8]],
                      }}
                      defs={[
                        {
                          id: "dots",
                          type: "patternDots",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          size: 4,
                          padding: 1,
                          stagger: true,
                        },
                        {
                          id: "lines",
                          type: "patternLines",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10,
                        },
                      ]}
                      fill={[
                        {
                          match: {
                            id: "ruby",
                          },
                          id: "dots",
                        },
                        {
                          match: {
                            id: "c",
                          },
                          id: "dots",
                        },
                        {
                          match: {
                            id: "go",
                          },
                          id: "dots",
                        },
                        {
                          match: {
                            id: "python",
                          },
                          id: "dots",
                        },
                        {
                          match: {
                            id: "scala",
                          },
                          id: "lines",
                        },
                        {
                          match: {
                            id: "lisp",
                          },
                          id: "lines",
                        },
                        {
                          match: {
                            id: "elixir",
                          },
                          id: "lines",
                        },
                        {
                          match: {
                            id: "javascript",
                          },
                          id: "lines",
                        },
                      ]}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: 300, width: "100%" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <CircularProgress color="inherit" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Box>

          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow="span 3"
          >
            <div className="col-12 listing-msme p-4 shadow rounded-3 mb-4">
              <div className="col-12 mt-1">
                <p className="list-groupp">All MSME List</p>
                {allMSMEList ? (
                  <>
                    <Box sx={{ height: 500, width: "100%" }}>
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
                              pageSize: 25,
                            },
                          },
                        }}
                        pageSizeOptions={[25, 50, 100]}
                        checkboxSelection
                        disableRowSelectionOnClick
                      />
                    </Box>
                    ;
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
    </div>
  );
}

export default Dashboard;
