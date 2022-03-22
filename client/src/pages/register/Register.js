import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import axios from 'axios'


export default function Register() {
  // These 3 states are only placeholder PLACEHOLDER state
  const [userPH, setUserPH] = useState(`  Username`);
  const [emailPH, setEmailPH] = useState(`  Email`);
  const [passwordPH, setPaswordPH] = useState("  Password");
  const [confirmPH, setConfirmPH] = useState("  Confirm Password");

  const [confirm, setConfirm] = useState("");

  const [data, setData] = useState({
    usernameS: "",
    emailS: "",
    passwordS: "",
  });

  console.log("data is: ", data);

  const navigate = useNavigate();

  const handleNaviSignIn = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit");
    console.log("data2 is: ", data);

    if (!data.usernameS || !data.emailS || !data.passwordS) return;

    const response = await axios.post("/users/register", data);
    console.log("response is ", response);

    setData({ usernameS: "", emailS: "", passwordS: "" });
    setConfirm("");
  };

  return (
    <div className="register">
     <div className="bg-img"></div>

      <div className="register-main">
        
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN UP</h3>
          <input
            value={data.usernameS}
            onChange={(e) => setData({ ...data, usernameS: e.target.value })}
            className="input input-user"
            type="text"
            placeholder={userPH}
            onFocus={() => setUserPH("")}
            onBlur={() => setUserPH("  Username")}
          />
          <input
            value={data.emailS}
            onChange={(e) => setData({ ...data, emailS: e.target.value })}
            className="input input-email"
            type="email"
            placeholder={emailPH}
            onFocus={() => setEmailPH("")}
            onBlur={() => setEmailPH("  Email")}
          />
          <input
            value={data.passwordS}
            onChange={(e) => setData({ ...data, passwordS: e.target.value })}
            className="input input-pass"
            type="password"
            placeholder={passwordPH}
            onFocus={() => setPaswordPH("")}
            onBlur={() => setPaswordPH("  Password")}
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input input-pass"
            type="password"
            placeholder={confirmPH}
            onFocus={() => setConfirmPH("")}
            onBlur={() => setConfirmPH("  Confirm Password")}
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
            Sign Up
          </button>
          <div className="forgot">
            <small>Forgot Password</small>
          </div>
          <div className="no-account">
            <small>
              Already have an account !{" "}
              <span onClick={handleNaviSignIn}>Sign In</span>
            </small>
          </div>
        </form>
        <div className="side"></div>
      </div>
      
       
    </div>
  );
}
