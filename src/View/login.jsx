import React from "react";
import "../css/login.css";

function Login() {
  return (
    <div className="container">
      <form action="" className="form">
        <h3 className="title">LOGIN</h3>
        <div className="form_div">
          <input
            type="text"
            name="username"
            id="username"
            required
            className="input"
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
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>
        <label class="checkbox-container">
          Remember me
          <input type="checkbox" />
          <span class="fake-checkbox"></span>
        </label>
        <button className="btn">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
