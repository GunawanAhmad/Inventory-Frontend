import React from "react";
import img from "../default.jpg";
import "../css/barangDetail.css";
import axios from "axios";
import Modal from "../components/errorMsg.jsx";

function BarangDetail(props) {
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

  const [errorMsg, setErrorMSg] = React.useState("Error");
  const [showModalBox, setShowModalBox] = React.useState(false);

  React.useEffect(() => {
    // Update the document title using the browser API
    axios
      .get(props.location.pathname + props.location.search)
      .then((result) => {
        console.log(result);
        setBarang(result.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
  }, []);

  function deleteBarang() {
    console.log(barang._id, barang.milik);
    let body = {
      barangId: barang._id,
      milik: barang.milik,
    };
    axios
      .delete("/hapus-barang", {
        data: body,
      })
      .then((result) => {
        console.log(result);
        props.history.push("/");
      })
      .catch((err) => {
        setErrorMSg(err.response.data.message);
        toggleModalBox();
      });
  }

  function editBarang() {
    props.history.push(
      "edit-barang/barang?barangId=" + barang._id + "&milik=" + barang.milik
    );
  }

  function setErrorPhoto(e) {
    e.target.src = img;
  }
  function toggleModalBox() {
    setShowModalBox(!showModalBox);
  }

  return (
    <div className="container-detail">
      {showModalBox && <Modal msg={errorMsg} onToggle={toggleModalBox}></Modal>}
      <img
        src={"http://localhost:5000/" + barang.photo}
        alt=""
        className="img"
        onError={setErrorPhoto}
      />

      <div className="section">
        <p className="label">Nama barang</p>
        <p className="content">{barang.nama}</p>
      </div>
      <div className="section">
        <p className="label">Status</p>
        <p className="content">{barang.status}</p>
      </div>
      <div className="section">
        <p className="label">Lokasi</p>
        <p className="content">{barang.lokasi}</p>
      </div>
      <div className="section">
        <p className="label">Kondisi</p>
        <p className="content">{barang.kondisi}</p>
      </div>
      <div className="section">
        <p className="label">Tanggal masuk</p>
        <p className="content">{barang.tanggal_masuk.split("T")[0]}</p>
      </div>
      <div className="section">
        <p className="label">Jumlah</p>
        <p className="content">{barang.jumlah + " " + barang.satuan}</p>
      </div>
      <div className="section">
        <p className="label">Milik</p>
        <p className="content">{barang.milik}</p>
      </div>
      {barang.status.toLowerCase() == "dipinjam" && (
        <>
          <div className="section">
            <p className="label">Nama / organisasi peminjam</p>
            <p className="content">{barang.nama_peminjam}</p>
          </div>
          <div className="section">
            <p className="label">Tanggal dipiinjam</p>
            <p className="content">{barang.dipinjam}</p>
          </div>
        </>
      )}

      <div className="section btns">
        <button className="btn" onClick={editBarang}>
          Edit
        </button>
        <button className="btn" onClick={deleteBarang}>
          Hapus
        </button>
      </div>
    </div>
  );
}

export default BarangDetail;
