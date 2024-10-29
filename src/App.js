import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Main/>
      </Router>
      
    </div>
  );
}

export default App;
