import React, { useState } from "react";
import "../css/login.css";
import Modal from "../components/errorMsg.jsx";
import axios from "axios";
import LoadingSc from "../components/loadingScreen";

function LoginPage(props) {
  const [username, setUsername] = useState("theonlyadmin");
  const [password, setPassword] = useState("oneandonlyadmin");
  const [errorMsg, setErrorMSg] = React.useState("Error");
  const [errStatus, setErrStatus] = React.useState(0);
  const [showModalBox, setShowModalBox] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function toggleModalBox() {
    setShowModalBox(!showModalBox);
  }

  function login(e) {
    e.preventDefault();
    setIsLoading(true);

    let body = {
      username,
      password,
    };
    axios
      .post("/login", body)
      .then((res) => {
        setIsLoading(false);

        console.log(res);
        localStorage.setItem("token", res.data.accesToken);
        props.history.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
        if (err.response.status == 401) {
          setErrStatus(401);
        }
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
  }

  return (
    <div className="container-login-page">
      {showModalBox && (
        <Modal
          msg={errorMsg}
          errStatus={errStatus}
          onToggle={toggleModalBox}
          history={props.history}
        ></Modal>
      )}
      {isLoading && <LoadingSc></LoadingSc>}
      <form action="" className="form" onSubmit={login}>
        <h3 className="title">LOGIN</h3>
        <div className="form_div">
          <input
            type="text"
            name="username"
            id="username"
            required
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username" className="label">
            Username
          </label>
        </div>
        <div className="form_div">
          <input
            type="password"
            name="username"
            id="password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>

        <button className="btn">LOGIN</button>
      </form>
    </div>
  );
}

export default LoginPage;
