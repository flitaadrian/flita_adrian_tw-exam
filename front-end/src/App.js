
import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Movie from "./Movie";
import Crewmember from "./Crewmember";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/crewmember/:id">
            <Crewmember />
          </Route>
          <Route path="/">
            <Movie/>
          </Route>

        </Switch>
      </Router>
  );
}

export default App;
