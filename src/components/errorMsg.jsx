import React from "react";
import "../css/errorModal.css";

function ErrorMSg(props) {
  function toggleModal() {
    if (props.errStatus == 401) {
      props.onToggle();
      props.history.push("/login");
    } else {
      props.onToggle();
    }
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

export default ErrorMSg;
