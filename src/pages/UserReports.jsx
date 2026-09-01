import React, { useEffect, useState } from "react";
import { Avatar, IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { CgCloseR } from "react-icons/cg";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/css/msme.css";
import ViewButton from "../components/commons/ViewButton";
import { updateToken } from "../redux/reducers/authReducer";
import { CapitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import handleAuthFailure from "../utils/handleAuthFailure";

const mobileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
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
  height: "80%",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const dataGridStyle = {
  "& .MuiDataGrid-root": { fontFamily: "Montserrat, sans-serif" },
  "& .status-pending": { color: "rgb(234, 156, 0)" },
  "& .status-rejected": { color: "red" },
  "& .status-approved": { color: "green" },
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
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return isNaN(date.getTime()) ? value : date.toLocaleString();
};

function UserReports() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const serverToken = useSelector((state) => state.server.serverToken);
  const tokenHeader = currentUser.token;

  // 1 = All, 2 = Unread, 3 = Read
  const [buttonActive, setButtonActive] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [allReports, setAllReports] = useState([]);
  const [unreadReports, setUnreadReports] = useState([]);
  const [readReports, setReadReports] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [allFetched, setAllFetched] = useState(false);
  const [unreadFetched, setUnreadFetched] = useState(false);
  const [readFetched, setReadFetched] = useState(false);

  const [singleReport, setSingleReport] = useState({});
  const [openModelView, setOpenModelView] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Each fetcher takes an optional token override and returns the rotated
  // token it received, so a chained sequence of calls inside one handler can
  // pass the fresh JWT forward — dispatch(updateToken) only lands on the
  // NEXT render, so the closure's tokenHeader goes stale mid-handler.
  const buildHeaders = (token) => ({
    "Content-Type": "application/json",
    Authorization: `${serverToken}`,
    "x-access-token": `${token}`,
  });

  const fetchReportList = async (path, setList, setFetched, tokenOverride) => {
    const activeToken = tokenOverride || tokenHeader;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/msme/admin/reports${path}`,
        {
          method: "GET",
          headers: buildHeaders(activeToken),
        },
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get("x-access-token");

      if (newTokenHeader) {
        dispatch(updateToken({ token: newTokenHeader }));
      }

      if (response.ok) {
        setList(data.data || []);
      } else {
        setFetched(true);
        handleAuthFailure({ dispatch, navigate, type: "auth" });
        return newTokenHeader || activeToken;
      }

      setFetched(true);
      return newTokenHeader || activeToken;
    } catch (error) {
      setFetched(true);
      handleAuthFailure({ dispatch, navigate, type: "network" });
      return activeToken;
    }
  };

  const fetchAllReports = (tokenOverride) =>
    fetchReportList("", setAllReports, setAllFetched, tokenOverride);

  const fetchUnreadReports = (tokenOverride) =>
    fetchReportList("/unread", setUnreadReports, setUnreadFetched, tokenOverride);

  const fetchReadReports = (tokenOverride) =>
    fetchReportList("/read", setReadReports, setReadFetched, tokenOverride);

  // The count is always read from its own endpoint — never derived from
  // unreadReports.length (stale on the All/Read tabs) and never decremented
  // locally (drifts on a no-op PUT or when another admin got there first).
  const fetchUnreadCount = async (tokenOverride) => {
    const activeToken = tokenOverride || tokenHeader;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/msme/admin/reports/unreadCount`,
        {
          method: "GET",
          headers: buildHeaders(activeToken),
        },
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get("x-access-token");

      if (newTokenHeader) {
        dispatch(updateToken({ token: newTokenHeader }));
      }

      if (response.ok) {
        setUnreadCount(data.data?.count ?? 0);
      }

      return newTokenHeader || activeToken;
    } catch (error) {
      return activeToken;
    }
  };

  useEffect(() => {
    // Sequential, not parallel: two concurrent requests carrying the same JWT
    // while the server rotates it per-response is a race we can avoid cheaply.
    const loadInitial = async () => {
      const rotated = await fetchAllReports();
      await fetchUnreadCount(rotated);
    };
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetchActiveList = (tokenOverride) => {
    if (buttonActive === 2) return fetchUnreadReports(tokenOverride);
    if (buttonActive === 3) return fetchReadReports(tokenOverride);
    return fetchAllReports(tokenOverride);
  };

  const handleTabChange = (tab) => {
    setButtonActive(tab);
    if (tab === 1) fetchAllReports();
    if (tab === 2) fetchUnreadReports();
    if (tab === 3) fetchReadReports();
  };

  // Opening a report marks it read: GET the detail, then PUT the read flag,
  // chaining the rotated JWT forward. The lists are NOT refreshed here —
  // that happens on close, so nothing shifts while the admin is reading.
  const handleView = async (id) => {
    setIsOpening(true);
    try {
      const getResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/msme/admin/reports/${id}`,
        {
          method: "GET",
          headers: buildHeaders(tokenHeader),
        },
      );

      const getData = await getResponse.json();
      const tokenAfterGet = getResponse.headers.get("x-access-token");

      if (tokenAfterGet) {
        dispatch(updateToken({ token: tokenAfterGet }));
      }

      if (!getResponse.ok) {
        setIsOpening(false);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${getData.message}`,
          showConfirmButton: false,
          timer: 4000,
        });
        return;
      }

      const activeToken = tokenAfterGet || tokenHeader;

      const putResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/msme/admin/reports/${id}/read`,
        {
          method: "PUT",
          headers: buildHeaders(activeToken),
        },
      );

      let putData = {};
      try {
        putData = await putResponse.json();
      } catch {
        putData = {};
      }

      const tokenAfterPut = putResponse.headers.get("x-access-token");
      if (tokenAfterPut) {
        dispatch(updateToken({ token: tokenAfterPut }));
      }

      // The GET payload predates the PUT, so it still says read: false.
      // Prefer the PUT's own updated report; otherwise merge the read state
      // in from what we know locally.
      setSingleReport(
        putResponse.ok && putData?.data?.id
          ? putData.data
          : {
              ...getData.data,
              read: true,
              readAt: getData.data?.readAt || new Date().toISOString(),
              readByAdmin: getData.data?.readByAdmin || {
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
              },
            },
      );

      setOpenModelView(true);
      setIsOpening(false);
    } catch (error) {
      setIsOpening(false);
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
  };

  const handleCloseView = async () => {
    setOpenModelView(false);
    setSingleReport({});
    const rotated = await refetchActiveList();
    await fetchUnreadCount(rotated);
  };

  const columns = [
    {
      field: "reporter",
      headerName: "Reported By",
      width: isSmallScreen ? 140 : 180,
    },
    {
      field: "business",
      headerName: "Business",
      width: isSmallScreen ? 150 : 220,
    },
    { field: "title", headerName: "Title", width: isSmallScreen ? 150 : 220 },
    {
      field: "description",
      headerName: "Description",
      width: isSmallScreen ? 180 : 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      cellClassName: (params) =>
        params.value === "Unread" ? "status-pending" : "status-approved",
    },
    {
      field: "createdAt",
      headerName: "Created_At",
      width: isSmallScreen ? 150 : 200,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 150 : 200,
      renderCell: (params) => (
        <ViewButton onClick={() => handleView(params.row.id)} />
      ),
    },
  ];

  const toRows = (list) =>
    list.map((report) => ({
      id: report.id,
      reporter: `${report.reporter?.firstName ?? ""} ${
        report.reporter?.lastName ?? ""
      }`.trim(),
      business:
        report.business?.businessDisplayName ||
        report.business?.businessRegistrationName,
      title: report.title,
      description: report.description,
      status: report.read ? "Read" : "Unread",
      createdAt: formatDate(report.createdAt),
    }));

  // Null-safe filter — these rows carry nulls (a deleted reporter or
  // business), and value.toString() would throw on them.
  const filterRows = (rows) =>
    rows.filter((row) =>
      Object.values(row).some((value) =>
        (value ? value.toString() : "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    );

  const renderListPanel = (list, fetched, heading, emptyText) => {
    const rows = filterRows(toRows(list));

    return (
      <div className="col-12 mt-1">
        <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
          <Box
            className="app-search-bar"
            display="flex"
            width="320px"
            marginRight="10px"
          >
            <InputBase
              className="app-search-input"
              sx={{ ml: 1.5, flex: 1 }}
              placeholder="Search for a report"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" className="app-search-btn" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </div>

        <p className="list-groupp">{heading}</p>

        {!fetched ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 500, width: "100%" }}
          >
            <div style={{ textAlign: "center" }}>
              <CircularProgress color="inherit" />
              <p className="p-4 text-secondary">
                Just a moment, we're getting things ready...
              </p>
            </div>
          </div>
        ) : rows.length > 0 ? (
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              sx={dataGridStyle}
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
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 500, width: "100%" }}
          >
            <div style={{ textAlign: "center" }}>
              <p className="text-secondary" style={{ fontSize: "16px" }}>
                {emptyText}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderField = (label, value) => (
    <>
      <p className="text-boldd mb-1">{label}</p>
      <p style={{ wordBreak: "break-word" }}>{value || "—"}</p>
    </>
  );

  const reporterName = `${singleReport.reporter?.firstName ?? ""} ${
    singleReport.reporter?.lastName ?? ""
  }`.trim();

  const readByName = singleReport.readByAdmin
    ? `${singleReport.readByAdmin.firstName ?? ""} ${
        singleReport.readByAdmin.lastName ?? ""
      }`.trim()
    : "";

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }}
        open={isOpening}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="container-fluid mt-4">
        <p className="msme">User Reports</p>
        <p>Review reports submitted by users about businesses.</p>

        <Box className="" justifyContent={"space-evenly"}>
          <Box
            display="grid"
            gridTemplateColumns={
              isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
            }
            gridAutoRows="140px"
            gap={isSmallScreen ? "0px" : "10px"}
          >
            <Box gridColumn="span 12" gridRow="span 3">
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
                        onClick={() => handleTabChange(1)}
                        style={{ border: "none" }}
                      >
                        All Reports
                      </button>
                      <button
                        className={
                          buttonActive === 2
                            ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                            : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                        }
                        onClick={() => handleTabChange(2)}
                        style={{ border: "none" }}
                      >
                        {`Unread (${unreadCount})`}
                      </button>
                      <button
                        className={
                          buttonActive === 3
                            ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                            : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                        }
                        onClick={() => handleTabChange(3)}
                        style={{ border: "none" }}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>

                {buttonActive === 1 &&
                  renderListPanel(
                    allReports,
                    allFetched,
                    "All Reports",
                    "No user reports found.",
                  )}
                {buttonActive === 2 &&
                  renderListPanel(
                    unreadReports,
                    unreadFetched,
                    "Unread Reports",
                    "No unread reports found.",
                  )}
                {buttonActive === 3 &&
                  renderListPanel(
                    readReports,
                    readFetched,
                    "Read Reports",
                    "No read reports found.",
                  )}
              </div>
            </Box>
          </Box>
        </Box>

        <Modal
          open={openModelView}
          onClose={handleCloseView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={isSmallScreen ? mobileStyle : largeStyle}>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <h4 className="m-0">Report Details</h4>
              <Tooltip title="Close">
                <div>
                  <CgCloseR
                    style={{
                      color: "red",
                      fontSize: "32px",
                      cursor: "pointer",
                    }}
                    onClick={handleCloseView}
                  />
                </div>
              </Tooltip>
            </div>

            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={12}>
                <span
                  className={
                    singleReport.read ? "status-approved" : "status-pending"
                  }
                >
                  {singleReport.read ? "Read" : "Unread"}
                </span>
              </Grid>

              <Grid item xs={12}>
                {renderField("Title", singleReport.title)}
              </Grid>
              <Grid item xs={12}>
                <p className="text-boldd mb-1">Description</p>
                <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {singleReport.description || "—"}
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("Reported On", formatDate(singleReport.createdAt))}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("Last Updated", formatDate(singleReport.updatedAt))}
              </Grid>

              <Grid item xs={12}>
                <p className="list-groupp border-bottom">Reporter</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="d-flex align-items-center">
                  <Avatar sx={{ bgcolor: "#1976d2", width: 40, height: 40 }}>
                    {`${CapitalizeFirstLetter(
                      singleReport.reporter?.firstName,
                    )}${CapitalizeFirstLetter(singleReport.reporter?.lastName)}`}
                  </Avatar>
                  <div style={{ marginLeft: "10px" }}>
                    <p className="m-0">{reporterName || "—"}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("Email", singleReport.reporter?.email)}
              </Grid>

              <Grid item xs={12}>
                <p className="list-groupp border-bottom">Business</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField(
                  "Registration Name",
                  singleReport.business?.businessRegistrationName,
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField(
                  "Display Name",
                  singleReport.business?.businessDisplayName,
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("Status", singleReport.business?.status)}
              </Grid>

              <Grid item xs={12}>
                <p className="list-groupp border-bottom">Read Information</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("Read At", formatDate(singleReport.readAt))}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField(
                  "Read By",
                  readByName
                    ? `${readByName} (${singleReport.readByAdmin?.email})`
                    : "",
                )}
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default UserReports;
