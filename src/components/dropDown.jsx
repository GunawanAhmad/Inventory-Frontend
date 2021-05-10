import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";

function Dropdown(props) {
  function Logout() {
    localStorage.removeItem("token");
    props.toggleDrop();
  }
  return (
    <ul>
      <Link to="/tambah-barang">
        <li onClick={props.toggleDrop}>Tambah barang</li>
      </Link>
      <Link to="/#">
        <li onClick={props.toggleDrop}>Download as CSV</li>
      </Link>
      <Link to="/login">
        <li onClick={Logout}>Logout</li>
      </Link>
    </ul>
  );
}

export default Dropdown;
