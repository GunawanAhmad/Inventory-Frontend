import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropDown";
import "../css/navbar.css";

function Navbar(props) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="header">
      <nav>
        <ul>
          <Link to="/">
            <li>INVENTORY</li>
          </Link>
          <Link to="history-peminajaman">
            <li>HISTORY PEMINJAMAN</li>
          </Link>
          <li className="dropdown" onClick={() => setDropdown(!dropdown)}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 0V17" stroke="black" strokeWidth="3" />
              <path d="M17 8L-1.78814e-07 8" stroke="black" strokeWidth="3" />
            </svg>
            <span className="triangle"></span>
            {dropdown ? <Dropdown /> : ""}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
