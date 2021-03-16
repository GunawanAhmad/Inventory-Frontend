import Login from "./View/login";
import BarangDetail from "./View/barangDetail";
import Beranda from "./View/beranda";
import Navbar from "./components/navbar";
import TambahBarang from "./View/tambahBarang";
import "./css/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Beranda} />
            <Route path="/tambah-barang" component={TambahBarang} />
            <Route path="/login" component={Login} />
            <Route path="/:id" component={BarangDetail} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
