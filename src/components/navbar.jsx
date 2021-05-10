import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropDown";
import { useLocation, useHistory } from "react-router-dom";
import "../css/navbar.css";

function Navbar(props) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownMenu = React.createRef();
  const location = useLocation();
  const [isNavbarVis, setNavbarVis] = React.useState(true);
  const History = useHistory();
  function toggleDropdownMenu(e) {
    setDropdown(!dropdown);
  }

  React.useEffect(() => {
    let currLocation = location.pathname;
    if (currLocation == "/login") {
      setNavbarVis(false);
    } else {
      setNavbarVis(true);
    }
  }, [location]);

  return (
    <header className="header">
      {isNavbarVis && (
        <>
          <nav ref={dropdownMenu}>
            <ul>
              <li className="back" onClick={History.goBack}>
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 33 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 13C7.49103 8.50897 14.5 1.5 14.5 1.5M3 13L14.5 24.5M3 13H33"
                    stroke="black"
                    strokeWidth="3"
                  />
                </svg>
              </li>
              <li>
                <Link to="/">INVENTORY</Link>
              </li>

              <li className="dropdown">
                <input type="text" onClick={toggleDropdownMenu} />
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
                  <Dropdown toggleDrop={toggleDropdownMenu}></Dropdown>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

export default Navbar;
