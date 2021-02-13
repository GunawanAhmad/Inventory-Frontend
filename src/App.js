import Login from "./View/login";
import BarangDetail from "./View/barangDetail";
import Beranda from "./View/beranda";
import Navbar from "./components/navbar";
import "./css/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={Beranda} />
          <Route path="/login" component={Login} />
          <Route path="/:id" component={BarangDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
