import React from "react";
import "../css/tambahBarang.css";
import Modal from "../components/errorMsg.jsx";
import axios from "axios";

function EditBarang() {
  const [barang, setBarang] = React.useState({
    nama: "",
    lokasi: "",
    status: "",
    kondisi: "",
    photo: "",
    tanggal_masuk: "",
    nama_peminjam: "",
    tanggal_dipinjam: "",
    jumlah: "",
    satuan: "",
    milik: "",
    _id: "",
  });
  const [kondisiBarang, setKondisiBarang] = React.useState("Baik");
  const [namaBarang, setNamaBarang] = React.useState("");
  const [jumlah, setJumlah] = React.useState(0);
  const [lokasi, setLokasi] = React.useState("");
  const [status, setStatus] = React.useState("Ada");
  const [namaPemilik, setNamaPemilik] = React.useState("");
  const [milik, setMilik] = React.useState("Internal");
  const [satuanBarang, setSatuanBarang] = React.useState("Pcs");
  const [photo, setPhoto] = React.useState(null);
  const [errorMsg, setErrorMSg] = React.useState("Error");
  const [showModalBox, setShowModalBox] = React.useState(false);

  React.useEffect(() => {
    // Update the document title using the browser API
    // axios
    //   .get(props.location.pathname + props.location.search)
    //   .then((result) => {
    //     console.log(result);
    //     setBarang(result.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setErrorMSg(err.response.data.message);
    //     toggleModalBox();
    //   });
  }, []);

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
            />

            <div className="input hidden-input" onClick={focusInput}>
              <input
                type="text"
                onFocus={(e) => openListInput(e, true)}
                onBlur={(e) => closeListInput(e, true)}
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
              />
            </div>
          </div>
        )}

        <button className="btn">SUBMIT</button>
      </form>
    </div>
  );
}

export default EditBarang;
