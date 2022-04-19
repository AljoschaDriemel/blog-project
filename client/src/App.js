import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PrimarySearchAppBar from "./components/appbar/Appbar";
import Navbar2 from "./components/navbar/Navbar2";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from './pages/profile/Profile'
import EmailConfirm from './pages/email/EmailConfirm'
import ForgotPass from './pages/forgotPass/ForgotPass'
import ChangePass from './pages/changePass/ChangePass'
import NotFound from "./pages/notFound/NotFound";


function App() {
  return (
    <div className="App">
          <PrimarySearchAppBar />
          <Navbar2 />
      
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/changepassword/:token" element={<ChangePass />} />
      </Routes>
    </div>
  );
}

export default App;
