import React, { useContext, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import { DataContext } from "../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  // PLACEHOLDERS
  const [userPH, setUserPH] = useState(`  Username`);
  const [emailPH, setEmailPH] = useState(`  Email`);
  const [passwordPH, setPaswordPH] = useState("  Password");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { userData, setUserData } = useContext(DataContext);

  const handleNaviSignUp = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handlelogin");
    if (!data.password) return;
    const response = await axios.post("/users/login", data);
    console.log("response is: ", response);
    if (response.data.success) {
      console.log("login client side data SUCCESS", data);
      setUserData({ ...response.data.user });
      navigate("/home");
    }
  };
  return (
    <div className="login ">
      <div className="bg-img"></div>

      <div className="login-main shadow-lg">
        <form onClick={(e) => handleLogin(e)} className="form">
          <div className="logo">
            <img
              className="logo-image"
              src="https://media.istockphoto.com/photos/leaf-symbol-green-black-picture-id693694672?b=1&k=20&m=693694672&s=170667a&w=0&h=_B5pyXi5TjexGcH6FbN2IiJy2Qa6fKqs-2KG0gb5Zy8="
              alt="logo"
            />
          </div>
          <h3 className="title">SIGN IN</h3>
          <input
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="input input-user"
            type="text"
            placeholder={userPH}
            onFocus={() => setUserPH("")}
            onBlur={() => setUserPH("  Username")}
          />
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="input input-user"
            type="email"
            placeholder={emailPH}
            onFocus={() => setEmailPH("")}
            onBlur={() => setEmailPH("  Email")}
          />
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input input-email"
            type="text"
            placeholder={passwordPH}
            onFocus={() => setPaswordPH("")}
            onBlur={() => setPaswordPH("  Password")}
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
          <Link to="/forgotpassword">
            <div className="forgot">
              <small>Forgot Password</small>
            </div>
          </Link>
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
