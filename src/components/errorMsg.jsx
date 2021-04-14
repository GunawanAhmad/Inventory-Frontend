import React from "react";
import "../css/errorModal.css";

function errorMSg(props) {
  function toggleModal() {
    props.onToggle();
  }

  return (
    <div className="container">
      <div className="modal">
        <h1 className="title">Error !</h1>
        <p>{props.msg}</p>
        <button className="btn" onClick={toggleModal}>
          OK
        </button>
      </div>
    </div>
  );
}

export default errorMSg;
