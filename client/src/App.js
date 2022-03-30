import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import PrimarySearchAppBar from "./components/appbar/Appbar";
import { Col, Row } from "react-bootstrap";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="App">
      <Row>
        <Col>
          <PrimarySearchAppBar />
        </Col>
      </Row>
      <Row>
        <Col className="col-3">
          <Navbar />
        </Col>
        <Col className="col-9">MAIN</Col>
      </Row>

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
