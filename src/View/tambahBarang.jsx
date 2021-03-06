import React from "react";
import "../css/tambahBarang.css";
import axios from "axios";
import Modal from "../components/errorMsg.jsx";
import LoadingSc from "../components/loadingScreen";

function TambahBarang(props) {
  const [kondisiBarang, setKondisiBarang] = React.useState("Baik");
  const [namaBarang, setNamaBarang] = React.useState("");
  const [jumlah, setJumlah] = React.useState(0);
  const [lokasi, setLokasi] = React.useState("");
  const [namaPemilik, setNamaPemilik] = React.useState("");
  const [milik, setMilik] = React.useState("Internal");
  const [satuanBarang, setSatuanBarang] = React.useState("Pcs");
  const [photo, setPhoto] = React.useState(null);
  const [errorMsg, setErrorMSg] = React.useState("Error");
  const [errStatus, setErrStatus] = React.useState(0);
  const [showModalBox, setShowModalBox] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function uploadBarang() {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("nama", namaBarang);
    formData.append("kondisi", kondisiBarang);
    formData.append("lokasi", lokasi);
    formData.append("jumlah", jumlah);
    formData.append("satuan", satuanBarang);
    formData.append("photo", photo);
    formData.append("nama_pemilik", namaPemilik);
    formData.append("milik", milik);

    let headers = { Authorization: "Bearer " + localStorage.getItem("token") };

    axios
      .post("/tambah-barang", formData, { headers })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        props.history.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
        if (err.response.status == 401) {
          setErrStatus(401);
        }
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
  }

  function toggleModalBox() {
    setShowModalBox(!showModalBox);
  }

  function openListInput(inputElm, check) {
    let container;
    if (check) {
      container =
        inputElm.target.parentElement.parentElement.parentElement.childNodes[2];
    } else {
      container = inputElm.target.parentElement.parentElement.childNodes[2];
    }
    container.classList.remove("hide");
  }

  function closeListInput(inputElm, check) {
    let container;
    if (check) {
      container =
        inputElm.target.parentElement.parentElement.parentElement.childNodes[2];
    } else {
      container = inputElm.target.parentElement.parentElement.childNodes[2];
    }
    if (!container.classList.contains("hovered")) {
      container.classList.add("hide");
    }
  }

  function suggestionBoxHovered(elm) {
    let suggestionBox = elm.target.parentElement.parentElement.childNodes[2];
    suggestionBox.classList.add("hovered");
  }
  function suggestionBoxOutHover(elm) {
    let suggestionBox = elm.target.parentElement.parentElement.childNodes[2];
    suggestionBox.classList.remove("hovered");
  }

  function changeKondisiBarang(e) {
    setKondisiBarang(e.target.textContent);
    let suggestionBox = e.target.parentElement;
    suggestionBox.classList.add("hide");
  }

  function changeMilik(e) {
    setMilik(e.target.textContent);
    let suggestionBox = e.target.parentElement;
    suggestionBox.classList.add("hide");
  }

  function changeSatuanbarang(e) {
    setSatuanBarang(e.target.textContent);
    let suggestionBox = e.target.parentElement;
    suggestionBox.classList.add("hide");
  }

  function getFilePhoto(e) {
    setPhoto(e.target.files[0]);
  }
  function focusInput(e) {
    e.target.childNodes[0].focus();
  }

  return (
    <div className="container-tambah-barang">
      {showModalBox && (
        <Modal
          msg={errorMsg}
          errStatus={errStatus}
          onToggle={toggleModalBox}
          history={props.history}
        ></Modal>
      )}
      {isLoading && <LoadingSc></LoadingSc>}
      <form action="" className="form">
        <h3 className="title">Tambah barang</h3>
        <div className="form_div">
          <label htmlFor="namaBarang" className="label">
            Nama barang
          </label>
          <input
            type="text"
            name="namaBarang"
            id="namaBarang"
            required
            className="input"
            onChange={(e) => setNamaBarang(e.target.value)}
          />
        </div>
        <div className="form_div">
          <label htmlFor="kondisiBarang" className="label">
            Kondisi barang
          </label>
          <div className="input hidden-input" onClick={focusInput}>
            <input
              type="text"
              name="kondisiBarang"
              id="kondisiBarang"
              onFocus={openListInput}
              onBlur={closeListInput}
              required
            />
            <span>{kondisiBarang}</span>

            <div className="triangle"></div>
          </div>

          <ul
            className="input-list hide"
            onMouseOver={suggestionBoxHovered}
            onMouseOut={suggestionBoxOutHover}
          >
            <li onClick={changeKondisiBarang}>Baik</li>
            <li onClick={changeKondisiBarang}>Rusak</li>
            <li onClick={changeKondisiBarang}>Hilang</li>
          </ul>
        </div>

        <div className="form_div">
          <label htmlFor="lokasiBarang" className="label">
            Lokasi barang
          </label>
          <input
            type="text"
            name="lokasiBarang"
            id="lokasiBarang"
            required
            className="input"
            onChange={(e) => setLokasi(e.target.value)}
          />
        </div>
        <div className="form_div">
          <label htmlFor="milikBarang" className="label">
            Milik
          </label>
          <div className="input hidden-input" onClick={focusInput}>
            <input
              type="text"
              name="milikBarang"
              id="milikBarang"
              onFocus={openListInput}
              onBlur={closeListInput}
              required
            />
            <span>{milik}</span>
            <div className="triangle"></div>
          </div>

          <ul
            className="input-list hide"
            onMouseOver={suggestionBoxHovered}
            onMouseOut={suggestionBoxOutHover}
          >
            <li onClick={changeMilik}>Internal</li>
            <li onClick={changeMilik}>Eksternal</li>
          </ul>
        </div>

        <div className="form_div">
          <label htmlFor="jumlahBarang" className="label">
            Jumlah
          </label>
          <div className="input double">
            <input
              type="number"
              name="jumlahBarang"
              id="jumlahBarang"
              required
              className="input"
              onChange={(e) => setJumlah(e.target.value)}
            />

            <div className="input hidden-input" onClick={focusInput}>
              <input
                type="text"
                onFocus={(e) => openListInput(e, true)}
                onBlur={(e) => closeListInput(e, true)}
              />
              <div className="triangle"></div>
              <span>{satuanBarang}</span>
            </div>
          </div>

          <ul
            className="input-list hide"
            onMouseOver={suggestionBoxHovered}
            onMouseOut={suggestionBoxOutHover}
          >
            <li onClick={changeSatuanbarang}>Pcs</li>
            <li onClick={changeSatuanbarang}>Pack</li>
          </ul>
        </div>
        <div className="form_div">
          <label htmlFor="lokasiBarang" className="label">
            Foto
          </label>
          <div className="input photo-input">
            <label htmlFor="file-upload" className="custom-file-upload">
              {photo ? photo.name : "Choose file"}
            </label>
            <div className="icon">
              <i className="fa fa-file"></i>
            </div>
            <input id="file-upload" type="file" onChange={getFilePhoto} />
          </div>
        </div>

        {milik == "Eksternal" && (
          <div className="exsternal_option">
            <div className="form_div">
              <label htmlFor="namaBarang" className="label">
                Nama / organisasi pemilik
              </label>
              <input
                type="text"
                name="namaBarang"
                id="namaBarang"
                required
                className="input"
                onChange={(e) => setNamaPemilik(e.target.value)}
              />
            </div>
          </div>
        )}

        <button className="btn" type="button" onClick={uploadBarang}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default TambahBarang;
