import React, { useState, createContext } from "react";

export const ListBarangContext = createContext();

export const ContextApi = (props) => {
  const [listBarang, setListBarang] = useState([
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
  ]);

  return (
    <ListBarangContext.Provider value={"Helo"}>
      {props.children}
    </ListBarangContext.Provider>
  );
};
