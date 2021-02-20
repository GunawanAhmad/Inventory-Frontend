import React from "react";
import "../css/beranda.css";

function Login() {
  const [milik, setMilik] = React.useState("Internal");
  const selectMilik = React.createRef();
  function toggleDropdown(e) {
    if (e.target.classList.contains("select-milik")) {
      selectMilik.current.classList.toggle("hide");
    }
  }

  function changeMilikList(val) {
    setMilik(val);
    selectMilik.current.classList.toggle("hide");
  }

  return (
    <div className="beranda-container">
      <div className="header-section">
        <h1 className="title">Inventory</h1>
        <div
          className="select-milik"
          onClick={toggleDropdown}
          ref={selectMilik}
        >
          <span>Milik : </span>
          <span>&nbsp; {milik}</span>
          <span className="triangle"></span>

          <ul className="list hide">
            <li onClick={() => changeMilikList("Internal")}>Internal</li>
            <li onClick={() => changeMilikList("Eksternal")}>Eksternal</li>
          </ul>
        </div>
        <div className="search-input">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="6" stroke="#2C2C2C" stroke-width="2" />
            <path d="M11 11L15 15" stroke="#2C2C2C" stroke-width="2" />
          </svg>

          <input type="text" placeholder="search..." />
        </div>
      </div>
    </div>
  );
}

export default Login;
