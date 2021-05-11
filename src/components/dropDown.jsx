import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { MilikContext } from "../contextAPI";

function Dropdown(props) {
  const [milik, setMilik] = React.useContext(MilikContext);

  function Logout() {
    localStorage.removeItem("token");
    props.toggleDrop();
  }

  function downloadAsCSV() {
    props.toggleDrop();
    window.open(axios.defaults.baseURL + "/download-csv/" + milik);
  }
  return (
    <ul>
      <li onClick={props.toggleDrop} className="drop-list">
        <Link to="/tambah-barang">Tambah barang</Link>
      </li>

      <li className="drop-list" onClick={downloadAsCSV}>
        <a type="button">Download as CSV</a>
      </li>
      <li onClick={Logout} className="drop-list">
        <Link to="/login">Logout</Link>
      </li>
    </ul>
  );
}

export default Dropdown;
