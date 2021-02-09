import logo from "./logo.svg";
import "./App.css";
import Login from "./View/login";
import BarangDetail from "./View/barangDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/:id" component={BarangDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
