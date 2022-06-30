import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Wordle from "./components/Wordle";
import {Alert} from "./context/Alert";
function App() {
  return (
    <Alert>
      <div className="App">
        <Header />  
        <Wordle />
      </div>
    </Alert>
  );
}

export default App;
