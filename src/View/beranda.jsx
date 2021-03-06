import React from "react";
import "../css/beranda.css";
import img from "../test.jpg";

function Login() {
  const [milik, setMilik] = React.useState("Internal");
  const [status, setStatus] = React.useState("Semua");
  const selectMilik = React.createRef();
  const selectStatus = React.createRef();

  const listBarang = [
    {
      nama: "kursi",
      kondisi: "Baik",
      lokasi: "Gudang",
      status: "Ada",
      tanggalMasuk: "11/12/2020",
      jumlah: 1,
      satuan: "Buah",
    },
    {
      nama: "kursi Duduk",
      kondisi: "Baik",
      lokasi: "Gudang",
      status: "Ada",
      tanggalMasuk: "11/12/2020",
      jumlah: 1,
      satuan: "Buah",
    },
    {
      nama: "Meja",
      kondisi: "Baik",
      lokasi: "Gudang",
      status: "Rusak",
      tanggalMasuk: "11/12/2020",
      jumlah: 1,
      satuan: "Buah",
    },
    {
      nama: "Lemari",
      kondisi: "Baik",
      lokasi: "Gudang",
      status: "Hilang",
      tanggalMasuk: "11/12/2020",
      jumlah: 1,
      satuan: "Buah",
    },
    {
      nama: "Lemari",
      kondisi: "Baik",
      lokasi: "Gudang",
      status: "Hilang",
      tanggalMasuk: "11/12/2020",
      jumlah: 1,
      satuan: "Buah",
    },
  ];

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

  return (
    <div className="beranda-container">
      <section className="header-section">
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
          <tr className="table-head">
            <th></th>
            <th>Nama barang</th>
            <th>Kondisi</th>
            <th>Lokasi</th>
            <th>Status</th>
            <th>Tanggal masuk</th>
            <th>Jumlah</th>
          </tr>
          {listBarang
            .filter((barang) =>
              status == "Semua" ? barang.status != "" : barang.status == status
            )
            .map((filteredList) => (
              <tr className="item">
                <td>
                  <img src={img} alt="img" />
                </td>
                <td className="item-name">{filteredList.nama}</td>
                <td>{filteredList.kondisi}</td>
                <td>{filteredList.lokasi}</td>
                <td>{filteredList.status}</td>
                <td> {filteredList.tanggalMasuk}</td>
                <td>
                  {filteredList.jumlah} {filteredList.satuan}
                </td>
              </tr>
            ))}
        </table>
      </section>
      <section className="option-section">
        <button className="btn">Download as CSV</button>
      </section>
    </div>
  );
}

export default Login;
