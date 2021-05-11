import React from "react";
import Login from "./View/login";
import BarangDetail from "./View/barangDetail";
import Beranda from "./View/beranda";
import Navbar from "./components/navbar";
import TambahBarang from "./View/tambahBarang";
import EditBarang from "./View/editBarang";
import "./css/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from "./contextAPI";

function App(props) {
  return (
    <ContextProvider>
      <div className="app-container">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Beranda} />
            <Route path="/tambah-barang" component={TambahBarang} />
            <Route path="/edit-barang/:query" component={EditBarang} />
            <Route path="/login" component={Login} />
            <Route path="/:query" component={BarangDetail} />
          </Switch>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
