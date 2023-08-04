import {Route, Routes} from "react-router-dom"

import Home from "./views/home/home.component";
import Detail from "./views/detail/detail.component";
import Create from "./views/create/create.component";
import Landing from "./views/landing/landing.component";
import './App.css';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>

    </div>
  );
}

export default App;
