import React, { useEffect, useState } from "react";
import "../assets/css/AdminLogin.css";
import logo from "../assets/images/in4logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { toggleSidebarTrue } from "../redux/reducers/sidebarReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import {toggleAuthenticationTrue, toggleAuthenticationfalse} from "../redux/reducers/twoFactorReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToken} from "../redux/reducers/authReducer";
import {updateServerToken } from "../redux/reducers/serverReducer";
import { login } from "../redux/reducers/authReducer";
import { toggleActiveTab } from "../redux/reducers/tabsReducer";
import { fetchOAuthToken } from "../utils/fectchOAuthToken";
import { setUserId, clearUserId } from "../redux/reducers/userIdReducer";


const AdminLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [twoFactorDigits, setTwoFactorDigits] = useState("");
  const [twoFactorDigitsError, setTwoFactorDigitsError] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const isUserAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userId = useSelector((state) => state.userId.userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleSidebarfalse());
    dispatch(toggleActiveTab({ activeTab: 1 }));
    dispatch(updateServerToken({serverToken: ''}))
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
  
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberPassword(true);
    }
  }, []);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError("Username is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Username is invalid");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (rememberPassword) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    if (validateForm()) {

      try {
        // Fetch OAuth token
        const tokenData = await fetchOAuthToken();
      
        if (tokenData.access_token) {
          try {
            setIsSubmitting(true);
    
            const loginResponse = await fetch("https://dt.mtc.com.na:4000/auth/admin/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData.access_token}`,
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });
      
            const loginData = await loginResponse.json();
      
            if (loginResponse.ok) {
              setIsSubmitting(false);
              dispatch(setUserId(loginData.userId));
              setTwoFactorDigits(""); 
              dispatch(toggleAuthenticationTrue());
            } else {
              setIsSubmitting(false);
              toast.error(`Invalid credentails. Verify & try again!`);
            }
          } catch (error) {
            // Handle network error during login request
            setIsSubmitting(false);
            toast.error(
              "Network error.",
              "Please check your network connection and try again.Please check your network connection and try again"
            );
          }
        } else {
          toast.error(
            "Network error.",
            "Please check your network connection and try again.Please check your network connection and try again"
          );
        }
      } catch (error) {
        // Handle error during token fetch
        console.error("Error fetching OAuth token:", error);
        toast.error("Unableto fetch token. Please check your network and try again.");
      }
      
      
    }
  };

  const validateTwoFactor = () => {
    let valid = true;
    if (!twoFactorDigits) {
      setTwoFactorDigitsError("Code is required");
      valid = false;
    } else if (twoFactorDigits.length !== 4) {
      setTwoFactorDigitsError("Code is invalid");
      valid = false;
    } else if (!userId) {
      toast.error(
        `Something went wrong during the authentication process. Try again`
      );
      dispatch(toggleAuthenticationfalse())
      valid = false;
    }
    return valid;
  };
  const handleTwoFactorAuthentication = async (e) => {
    e.preventDefault();

    setTwoFactorDigitsError("");
    if (validateTwoFactor()) {
      const tokenData = await fetchOAuthToken();
      
      if (tokenData.access_token) {
        try {
          setIsSubmitting(true);
          const response = await fetch(
            "https://dt.mtc.com.na:4000/auth/admin/verify-otp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenData.access_token}`,
              },
              //
              body: JSON.stringify({
                userId,
                otp: twoFactorDigits,
              }),
            }
          );
  
          const data = await response.json();
  
          if (response.ok) {
  
            dispatch(toggleSidebarTrue());
            dispatch(clearUserId());
            dispatch(
              login({
                user: data.currentUser,
              })
            );
            dispatch(updateServerToken({
              serverToken: `Bearer ${tokenData.access_token}`
            }));
            dispatch(updateToken({
              token: `Bearer ${data.currentUser.token}`
            }));
            dispatch(toggleAuthenticationfalse());
           
            navigate("/Dashboard");
          } else {
            setIsSubmitting(false);
            toast.error(`${data.message}:`);
          }
        } catch (error) {
          setIsSubmitting(false);
          toast.error(
            "Network error. Please check your network connection and try again",
            "Please check your network connection and try again"
          );
        }
      }
      
    }
  };
  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left side with logo */}
        <div className="login-logo-section">
          <img src={logo} alt="IN4MSME Logo" className="login-logo" />
        </div>

        {/* Right side with forms */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <h1 className="login-title">IN4MSME Portal</h1>
            
            <div className="login-card">
              {isUserAuthenticated ? (
                // Two Factor Authentication Form
                <form className="auth-form">
                  <h2>Enter your code</h2>
                  <p className="auth-subtitle">
                    Enter the 4-digit code sent to your email
                  </p>
                  
                  <div className="form-field">
                    <label>2FA Code</label>
                    <input
                      type="text"
                      value={twoFactorDigits || ""}
                      placeholder="****"
                      onChange={(e) => {
                        setTwoFactorDigitsError("");
                        setTwoFactorDigits(e.target.value);
                      }}
                      className={twoFactorDigitsError ? "error-input" : ""}
                    />
                    {twoFactorDigitsError && (
                      <span className="error-message">{twoFactorDigitsError}</span>
                    )}
                  </div>

                  <button 
                    onClick={handleTwoFactorAuthentication}
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <div className="loader"></div> : "Verify Code"}
                  </button>

                  <button
                    onClick={() => {
                      setPassword("");
                      setEmail("");
                      dispatch(toggleAuthenticationfalse());
                      dispatch(clearUserId());
                    }}
                    className="back-button"
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                // Main Login Form
                <form className="auth-form">
                  <h2>Sign in to account</h2>
                  <p className="auth-subtitle">Welcome back! Please sign in to continue</p>

                  <div className="form-field">
                    <label>Username</label>
                    <input
                      type="text"
                      value={email || ""}
                      placeholder="example@nipdb.com.na"
                      onChange={(e) => {
                        setEmailError("");
                        setEmail(e.target.value);
                      }}
                      className={emailError ? "error-input" : ""}
                    />
                    {emailError && <span className="error-message">{emailError}</span>}
                  </div>

                  <div className="form-field">
                    <label>Password</label>
                    <div className="password-input">
                      <input
                        type={passwordShown ? "text" : "password"}
                        value={password || ""}
                        placeholder="Enter your password"
                        onChange={(e) => {
                          setPasswordError("");
                          setPassword(e.target.value);
                        }}
                        className={passwordError ? "error-input" : ""}
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={togglePassword}
                      >
                        {passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </button>
                    </div>
                    {passwordError && <span className="error-message">{passwordError}</span>}
                  </div>

                  <div className="form-actions">
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        checked={rememberPassword}
                        onChange={() => setRememberPassword(!rememberPassword)}
                      />
                      <span>Remember me</span>
                    </label>
                    <button 
                      type="button"
                      className="forgot-password"
                      onClick={() => navigate("/Submit")}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <div className="loader"></div> : "Sign in"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
