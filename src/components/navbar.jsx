import React, { useState } from "react";
import "../css/navbar.css";

function Navbar() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>INVENTORY</li>
          <li>HISTORY PEMINJAMAN</li>
          <li className="dropdown">
            <svg
              width="15"
              height="15"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 0V17" stroke="black" stroke-width="3" />
              <path d="M17 8L-1.78814e-07 8" stroke="black" stroke-width="3" />
            </svg>

            <ul>
              <li>Tambah barang</li>
              <li>Logout</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
