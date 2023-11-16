import { useState } from "react";
import "./Signup_Login.css";
import { useNavigate } from "react-router-dom";

const SignupLogin = () => {
  const navigate = useNavigate();

  //HANDLE FORM ANIMATION
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formPosition, setFormPosition] = useState(0);

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

  //HANDLE SIGNUP SUBMIT
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { firstName, lastName, username, password };
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
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLoginForm ? "login" : "signup"}`}>
          Login Form
        </div>
        <div className={`title ${isLoginForm ? "signup" : "login"}`}>
          Signup Form
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
            action="#"
            className="login"
            style={{ marginLeft: `${formPosition}%` }}
          >
            <div className="field">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              {isLoginForm ? (
                <a href="#" onClick={handleSignupLinkClick}>
                  Not a member? Signup now
                </a>
              ) : null}
            </div>
          </form>
          <form
            onSubmit={handleSubmit}
            className="signup"
            style={{ marginLeft: `-${formPosition}%` }}
          >
            <div className="field">
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                type="text"
                placeholder="First Name"
                required
              />
            </div>
            <div className="field">
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
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="field">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <button type="submit">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
