import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";

function Dropdown(props) {
  function setHover() {
    props.onHover();
  }

  function leaveHover() {
    props.onLeave();
  }
  return (
    <ul onMouseOver={setHover} onMouseLeave={leaveHover}>
      <Link to="/tambah-barang">
        <li>Tambah barang</li>
      </Link>
      <Link to="/#">
        <li>Download as CSV</li>
      </Link>
      <Link to="/#">
        <li>Logout</li>
      </Link>
    </ul>
  );
}

export default Dropdown;
