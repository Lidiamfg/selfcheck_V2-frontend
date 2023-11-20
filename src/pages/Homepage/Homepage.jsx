import { useState } from "react";
import SignupLogin from "../../components/Signup_Login/Signup_Login";
import "./Homepage.css";
import MobileLogo from "../../assets/logo-dark.png";

const HomePage = () => {
  const handleSignupPopup = (content) => {
    setShowPopup(true);
    setPopupContent(content);
  };

  return (
    <>
      <div className="logo">
        <img className="mobile-logo" src={MobileLogo} />
      </div>
      <section className="homepage-background">
        <article className="hp-title">
          <h1>Track your finances</h1>
          <p>
            <b>Forget</b> the excel sheets!
          </p>
          <p>
            Selfcheck is a personal "notebook" for you to track your personal
            finances.
          </p>
        </article>
        <SignupLogin />
      </section>
    </>
  );
};

export default HomePage;
