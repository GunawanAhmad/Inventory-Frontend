import React from "react";
import "../css/beranda.css";
import img from "../default.jpg";
import axios from "axios";
import Modal from "../components/errorMsg.jsx";
import LoadingSc from "../components/loadingScreen";
import { getLoginToken } from "../Helper/Helper.js";
import { MilikContext } from "../contextAPI";

function Beranda(props) {
  // const [milik, setMilik] = React.useState("Internal");
  const [status, setStatus] = React.useState("Semua");
  const [listBarang, setListBarang] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const selectMilik = React.createRef();
  const selectStatus = React.createRef();
  const [errorMsg, setErrorMSg] = React.useState("Error");
  const [errStatus, setErrStatus] = React.useState(0);
  const [showModalBox, setShowModalBox] = React.useState(false);
  const [milik, setMilik] = React.useContext(MilikContext);

  React.useEffect(() => {
    // Update the document title using the browser API
    if (!getLoginToken()) {
      props.history.push("/login");
      return;
    }
    if (milik.toLowerCase() == "eksternal") {
      getBarangEksternal();
    } else if (milik.toLowerCase() == "internal") {
      getBarangInternal();
    }
  }, []);

  function toggleModalBox() {
    setShowModalBox(!showModalBox);
  }
  function getBarangInternal() {
    setIsLoading(true);
    let headers = { Authorization: "Bearer " + localStorage.getItem("token") };

    axios
      .get("/list-barang-internal", { headers: headers })
      .then((response) => {
        setListBarang(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        let errStatus = err.response.status || 0;
        if (errStatus == 401) {
          setErrStatus(401);
        }
        setErrorMSg(err.response.data.message || "Error");
        toggleModalBox();
      });
  }

  function getBarangEksternal() {
    setIsLoading(true);
    let headers = { Authorization: "Bearer " + localStorage.getItem("token") };
    axios
      .get("/list-barang-eksternal", { headers: headers })
      .then((response) => {
        console.log(response);
        setListBarang(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
        let errStatus = err.response.status || 0;
        if (errStatus == 401) {
          setErrStatus(401);
        }
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
  }

  function toggleMilikDropdown(e) {
    if (e.target.classList.contains("select-milik")) {
      selectMilik.current.classList.toggle("hide");
    }
  }

  function toggleStatusDropdown(e) {
    if (e.target.classList.contains("select-status")) {
      selectStatus.current.classList.toggle("hide");
    }
  }

  function changeMilikList(val) {
    setMilik(val);
    if (val.toLowerCase() == "eksternal") {
      getBarangEksternal();
    } else if (val.toLowerCase() == "internal") {
      getBarangInternal();
    }
    selectMilik.current.classList.toggle("hide");
  }

  function changeStatusList(val) {
    setStatus(val);
    selectStatus.current.classList.toggle("hide");
  }

  function searchFilter(filterValue) {
    //getValue of Input

    //get item in the ul
    let items = document.querySelectorAll(".item");

    //lopp through collection item list
    for (let i = 0; i < items.length; i++) {
      let itemName = items[i].querySelector(".item-name");

      //if matched
      if (
        itemName.innerText.toUpperCase().indexOf(filterValue.toUpperCase()) > -1
      ) {
        items[i].style.display = "";
      } else {
        items[i].style.display = "none";
      }
    }
  }

  function setErrorPhoto(e) {
    e.target.src = img;
  }

  function getBarangDetail(barangId) {
    props.history.push("/barang?barangId=" + barangId + "&milik=" + milik);
  }

  return (
    <div className="beranda-container">
      {showModalBox && (
        <Modal
          msg={errorMsg}
          errStatus={errStatus}
          onToggle={toggleModalBox}
          history={props.history}
        ></Modal>
      )}
      {isLoading && <LoadingSc></LoadingSc>}
      <section className="header-section">
        <div className="title-select-cont">
          <h1 className="title">Inventory</h1>
          <div
            className="select-milik hide"
            onClick={toggleMilikDropdown}
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
        </div>
        <div className="search-input">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7" cy="7" r="6" stroke="#2C2C2C" strokeWidth="2" />
            <path d="M11 11L15 15" stroke="#2C2C2C" strokeWidth="2" />
          </svg>

          <input
            type="text"
            placeholder="search..."
            onKeyUp={(e) => searchFilter(e.target.value)}
          />
        </div>
      </section>
      <section
        className="select-status hide"
        onClick={toggleStatusDropdown}
        ref={selectStatus}
      >
        <p>
          Status : {status} <span className="triangle"></span>
        </p>
        <ul className="list hide">
          <li onClick={() => changeStatusList("Semua")}>Semua</li>
          <li onClick={() => changeStatusList("Ada")}>Ada</li>
          <li onClick={() => changeStatusList("Dipinjam")}>Dipinjam</li>
          <li onClick={() => changeStatusList("Hilang")}>Hilang</li>
        </ul>
      </section>
      <section className="list-section">
        <table className="table-container">
          <tbody>
            <tr className="table-head">
              <th></th>
              <th>Nama barang</th>
              <th>Kondisi</th>
              <th>Lokasi</th>
              <th>Status</th>
              {milik.toLowerCase() == "internal" && <th>Tanggal masuk</th>}
              {milik.toLowerCase() == "eksternal" && <th>Tanggal dipinjam</th>}
              <th>Jumlah</th>
            </tr>
            {listBarang
              .filter((barang) =>
                status == "Semua"
                  ? barang.status != ""
                  : barang.status.toLowerCase() == status.toLowerCase()
              )
              .map((filteredList) => (
                <tr
                  className="item"
                  key={filteredList._id}
                  onClick={() => getBarangDetail(filteredList._id)}
                >
                  <td className="item-img">
                    <img
                      src={axios.defaults.baseURL + "/" + filteredList.photo}
                      onError={setErrorPhoto}
                    />
                  </td>
                  <td className="item-name">
                    {filteredList.nama}{" "}
                    <span>
                      {filteredList.jumlah} {filteredList.satuan}
                    </span>
                  </td>
                  <td>{filteredList.kondisi}</td>
                  <td>{filteredList.lokasi}</td>
                  <td>{filteredList.status}</td>
                  {milik.toLowerCase() == "internal" && (
                    <td>
                      {" "}
                      {new Date(filteredList.tanggal_masuk).toDateString()}
                    </td>
                  )}
                  {milik.toLowerCase() == "eksternal" && (
                    <td>
                      {" "}
                      {new Date(filteredList.tanggal_dipinjam).toDateString()}
                    </td>
                  )}
                  <td>
                    {filteredList.jumlah} {filteredList.satuan}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Beranda;
