import React from "react";
import "../css/tambahBarang.css";
import Modal from "../components/errorMsg.jsx";
import axios from "axios";

function EditBarang(props) {
  const [kondisiBarang, setKondisiBarang] = React.useState("Baik");
  const [namaBarang, setNamaBarang] = React.useState("");
  const [jumlah, setJumlah] = React.useState(0);
  const [lokasi, setLokasi] = React.useState("");
  const [status, setStatus] = React.useState("Ada");
  const [namaPeminjam, setNamaPeminjam] = React.useState("");
  const [milik, setMilik] = React.useState("Internal");
  const [satuanBarang, setSatuanBarang] = React.useState("Pcs");
  const [photo, setPhoto] = React.useState(null);
  const [errorMsg, setErrorMSg] = React.useState("Error");
  const [showModalBox, setShowModalBox] = React.useState(false);
  const [barangId, setBarangId] = React.useState("");

  React.useEffect(() => {
    // Update the document title using the browser API
    let headers = { Authorization: "Bearer " + localStorage.getItem("token") };

    axios
      .get("/barang" + props.location.search, { headers: headers })
      .then((res) => {
        // setBarang(result.data);
        setNamaBarang(res.data.nama);
        setKondisiBarang(res.data.kondisi);
        setStatus(res.data.status);
        setLokasi(res.data.lokasi);
        setSatuanBarang(res.data.satuan);
        setJumlah(res.data.jumlah);
        setMilik(res.data.milik);
        setNamaPeminjam(res.data.nama_peminjam || "");
        setBarangId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
  }, []);

  function editBarang() {
    let formData = new FormData();
    formData.append("nama", namaBarang);
    formData.append("kondisi", kondisiBarang);
    formData.append("lokasi", lokasi);
    formData.append("jumlah", jumlah);
    formData.append("satuan", satuanBarang);
    formData.append("photo", photo);
    formData.append("nama_peminjam", namaPeminjam);
    formData.append("milik", milik);
    formData.append("barangId", barangId);
    formData.append("status", status);
    let headers = { Authorization: "Bearer " + localStorage.getItem("token") };

    axios
      .post("/edit-barang", formData, { headers: headers })
      .then((res) => {
        console.log(res);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
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
  function toggleModalBox() {
    setShowModalBox(!showModalBox);
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

  function changeStatus(e) {
    setStatus(e.target.textContent);
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
      {showModalBox && <Modal msg={errorMsg} onToggle={toggleModalBox}></Modal>}
      <form action="" className="form">
        <h3 className="title">Edit barang</h3>
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
            value
            value={namaBarang}
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
              value={kondisiBarang}
              onChange={(e) => setKondisiBarang(e.target.value)}
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
            <li onClick={changeKondisiBarang}>Rusak ringan</li>
            <li onClick={changeKondisiBarang}>Rusak parah</li>
          </ul>
        </div>
        <div className="form_div">
          <label htmlFor="kondisiBarang" className="label">
            Status barang
          </label>
          <div className="input hidden-input" onClick={focusInput}>
            <input
              type="text"
              name="statusBarang"
              id="statusBarang"
              onFocus={openListInput}
              onBlur={closeListInput}
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <span>{status}</span>

            <div className="triangle"></div>
          </div>

          <ul
            className="input-list hide"
            onMouseOver={suggestionBoxHovered}
            onMouseOut={suggestionBoxOutHover}
          >
            <li onClick={changeStatus}>Ada</li>
            <li onClick={changeStatus}>Dipinjam</li>
            <li onClick={changeStatus}>Hilang</li>
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
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
          />
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
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />

            <div className="input hidden-input" onClick={focusInput}>
              <input
                type="text"
                onFocus={(e) => openListInput(e, true)}
                onBlur={(e) => closeListInput(e, true)}
                value={satuanBarang}
                onChange={(e) => setSatuanBarang(e.target.value)}
              />
              <span>{satuanBarang}</span>
              <div className="triangle"></div>
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

        {status.toLowerCase() == "dipinjam" && (
          <div className="exsternal_option">
            <div className="form_div">
              <label htmlFor="namaBarang" className="label">
                Nama / organisasi peminjam
              </label>
              <input
                type="text"
                name="namaPeminjam"
                id="namaPeminjam"
                required
                className="input"
                value={namaPeminjam}
                onChange={(e) => setNamaPeminjam(e.target.value)}
              />
            </div>
          </div>
        )}

        <button className="btn" type="button" onClick={editBarang}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default EditBarang;
