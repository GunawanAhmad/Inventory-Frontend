import React from "react";
import img from "../test.jpg";
import "../css/barangDetail.css";

function Login() {
  const [barang, setBarang] = React.useState({
    Nama: "Kursi",
    Lokasi: "Gudang",
    Kondisi: "Baik",
    Status: "Ada",
    Milik: "Internal",
    foto: img,
    bukti: "mantap",
  });
  const barangMap = [];
  let foto;
  let bukti;
  if (barang.foto) {
    foto = barang.foto;
  }
  if (barang.bukti) {
    bukti = barang.bukti;
  }

  Object.entries(barang).map((item) => {
    if (item[0] != "foto" && item[0] != "bukti") {
      barangMap.push(item);
    }
  });

  return (
    <div className="container">
      <img src={img} alt="" className="img" />
      {barangMap.map((item, index) => (
        <div className="section" key={index}>
          <p className="label">{item[0]}</p>
          <p className="content">{item[1]}</p>
        </div>
      ))}
      {/* gunakan foto bukti disni */}
      {barang.bukti && (
        <div className="section">
          <p className="label">Bukti</p>
          <p className="content">oWo</p>
        </div>
      )}
      <div className="section btns">
        <button className="btn">Edit</button>
        <button className="btn">Hapus</button>
      </div>
    </div>
  );
}

export default Login;
