import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
export default function Login() {
  const navigate = useNavigate();

  const [userOrEmailPH, setUserOrEmailPH] = useState(`  Username / Email`);
  const [passwordPH, setPaswrdPH] = useState("  Password");

  const handleNaviSignUp = () => {
    navigate("/register");
  };
  return (
    <div className="login ">
      <div className="bg-img"></div>

      <div className="login-main shadow-lg">
        <form className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN IN</h3>
          <input
            className="input input-user"
            type="text"
            placeholder={userOrEmailPH}
            onFocus={() => setUserOrEmailPH("")}
            onBlur={() => setUserOrEmailPH("  Username / Email")}
          />
          <input
            className="input input-email"
            type="text"
            placeholder={passwordPH}
            onFocus={() => setPaswrdPH("")}
            onBlur={() => setPaswrdPH("  Password")}
          />
          <div className="checkbox-div">
            <input
              className=" input-checkbox"
              htmlFor="check-remember"
              type="checkbox"
            />
            <label className="checkbox-label" id="check-remember">
              Remember me
            </label>
          </div>

          <button className="login-button" type="submit">
            Sign In
          </button>
          <div className="forgot">
            <small>Forgot Password</small>
          </div>
          <div className="no-account">
            <small>
              Don't have an account ?{" "}
              <span onClick={handleNaviSignUp}>Sign Up</span>
            </small>
          </div>
        </form>
        <div className="side"></div>
      </div>
    </div>
  );
}
