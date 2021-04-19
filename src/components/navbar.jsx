import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropDown";
import "../css/navbar.css";

function Navbar(props) {
  const [dropdown, setDropdown] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const dropdownMenu = React.createRef();

  function closeDropdownMenu(e) {
    if (!onHover) {
      setDropdown(false);
    }
    setTimeout(() => {
      setDropdown(false);
    }, 100);
  }
  function openDropdownMenu(e) {
    setDropdown(!dropdown);
  }
  function setHover() {
    setOnHover(true);
  }

  function leaveHover() {
    setOnHover(false);
  }

  return (
    <header className="header">
      <nav ref={dropdownMenu}>
        <ul>
          <Link to="/">
            <li>INVENTORY</li>
          </Link>
          <Link to="/history-peminajaman">
            <li>
              HISTORY <span>PEMINJAMAN</span>
            </li>
          </Link>
          <li className="dropdown">
            <input
              type="text"
              onBlur={closeDropdownMenu}
              onClick={openDropdownMenu}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              // ref={plusSvg}
              className={dropdown ? "rotate" : ""}
            >
              <rect x="28" width="8" height="64" fill="#2C2C2C" />
              <rect
                x="64"
                y="28"
                width="8"
                height="64"
                transform="rotate(90 64 28)"
                fill="#2C2C2C"
              />
            </svg>

            <span className="triangle"></span>
            {dropdown ? (
              <Dropdown onHover={setHover} onLeave={leaveHover}></Dropdown>
            ) : (
              ""
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
