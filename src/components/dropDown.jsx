import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";

function Dropdown() {
  return (
    <ul>
      <Link to="/tambah-barang">
        <li>Tambah barang</li>
      </Link>
      <Link>
        <li>Logout</li>
      </Link>
    </ul>
  );
}

export default Dropdown;
