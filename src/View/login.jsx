import React, { useState } from "react";
import "../css/login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function login(e) {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:5000/login",
        requestOptions
      );
      const json = await response.json();
      localStorage.setItem("token", json.accesToken);
    } catch (err) {
      const rs = err.response;
      setErrMsg({ errMsg: rs.message });
    }
  }

  return (
    <div className="container-login-page">
      <form action="" className="form" onSubmit={login}>
        <h3 className="title">LOGIN</h3>
        <div className="form_div">
          <input
            type="text"
            name="username"
            id="username"
            required
            className="input"
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
