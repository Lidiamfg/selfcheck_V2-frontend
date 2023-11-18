import { useContext, useEffect, useState } from "react";
import "./Signup_Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SignupLogin = () => {
  //HANDLE FORM ANIMATION
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formPosition, setFormPosition] = useState(0);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignupClick = () => {
    setIsLoginForm(false);
    setFormPosition(-50);
  };

  const handleLoginClick = () => {
    setIsLoginForm(true);
    setFormPosition(0);
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    handleSignupClick();
  };

  //SHOW OR HIDE PASSWORD , ERROR MESSAGE FOR USER NOT VALID AND WRONG PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //HANDLE SIGNUP SUBMIT
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Reset form state
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setSignupUsername("");
    setSignupPassword("");
  };

  // Pop-up state
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  // Close popup when clicking outside of the popup section
  const handleOutsideClick = (event) => {
    const popup = document.querySelector(".popup");
    if (popup && !popup.contains(event.target)) {
      setShowPopup(false);
    }
    if (signupSuccess) {
      handleLoginClick();
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("blur");
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.body.classList.remove("blur");
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.body.classList.remove("blur");
    };
  }, [showPopup, signupSuccess]);

  //HANDLE SIGNUP SUBMIT
  const handleSignup = async (event) => {
    event.preventDefault();
    const payload = {
      firstName,
      lastName,
      username: signupUsername,
      password: signupPassword,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 201) {
        setSignupSuccess(true);
        setShowPopup(true);
        setPopupContent("User created successfully!");
        resetForm();
        setUsernameError("");
      } else if (response.status === 400) {
        // Handle specific error for bad request (e.g., duplicated username)
        setUsernameError("Username is already taken. Please choose another.");
        setSignupSuccess(false);
      } else {
        // Handle other error scenarios
        console.log("Error during signup:", response.status);
        setShowPopup(true);
        setPopupContent(
          "An error occurred during signup. Please try again later."
        );
        setUsernameError("");
        setSignupSuccess(false);
      }
    } catch (error) {
      console.log("Error during signup:", error);
      setShowPopup(true);
      setPopupContent(
        "An error occurred during signup. Please try again later."
      );
      setUsernameError("");
      setSignupSuccess(false);
    }
  };

  //HANDLE LOGIN SUBMIT
  const { handleLogin } = useContext(AuthContext);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginForm = async (event) => {
    event.preventDefault();
    const payload = { username: loginUsername, password: loginPassword };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        setPasswordError(parsed.message);
      } else if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        setPasswordError("");
      }
    } catch (error) {
      console.log(error);
      setShowPopup(true);
      setPopupContent(error.message);
    }
  };

  return (
    <>
      <section className="wrapper">
        <div className="title-text">
          <div
            className={`title login`}
            style={{ marginLeft: `${formPosition}%` }}
          >
            Welcome back!
          </div>
          <div
            className={`title signup`}
            style={{ marginLeft: `-${formPosition}%` }}
          >
            Welcome!
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLoginForm}
              onChange={handleLoginClick}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLoginForm}
              onChange={handleSignupClick}
            />
            <label
              htmlFor="login"
              className={`slide login`}
              onClick={handleLoginClick}
            >
              Login
            </label>
            <label
              htmlFor="signup"
              className={`slide signup`}
              onClick={handleSignupClick}
            >
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form
              className="login"
              onSubmit={handleLoginForm}
              style={{ marginLeft: `${formPosition}%` }}
            >
              <div className="field">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={loginUsername}
                  onChange={(event) => setLoginUsername(event.target.value)}
                />
              </div>
              <div className="field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {passwordError && (
                  <span className="error-message">{passwordError}</span>
                )}
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <button type="submit" value="Login">
                  Login
                </button>
              </div>
              <div className="signup-link">
                Not a member?
                {isLoginForm ? (
                  <a href="#" onClick={handleSignupLinkClick}>
                    {" Signup now"}
                  </a>
                ) : null}
              </div>
            </form>
            <form
              onSubmit={handleSignup}
              className="signup"
              style={{ marginLeft: `-${formPosition}%` }}
            >
              <div className="field first-name">
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  type="text"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="field last-name">
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="field">
                <input
                  value={signupUsername}
                  onChange={(event) => setSignupUsername(event.target.value)}
                  type="text"
                  placeholder="Username"
                  required
                />
                {usernameError && (
                  <span className="error-message">{usernameError}</span>
                )}
              </div>
              <div className="field">
                <input
                  value={signupPassword}
                  onChange={(event) => setSignupPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <button type="submit">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section
        className={`popup-container ${showPopup ? "popup-styling" : ""}`}
      >
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span
                className="close"
                onClick={() => {
                  setShowPopup(false);
                  if (signupSuccess) {
                    handleLoginClick();
                  }
                }}
              >
                &times;
              </span>
              <p>{popupContent}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SignupLogin;
