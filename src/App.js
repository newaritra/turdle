// import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";
import Header from "./components/Header";
import Wordle from "./components/Wordle";
import { Alert } from "./context/Alert";
const SubHeader = styled.p`
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem 0;
`;
function App() {
  return (
    <Alert>
      <div className="App">
        <Header />
        <SubHeader>
          A wordle clone but the narrator is rude and unappreciative.
        </SubHeader>
        <Wordle />
      </div>
    </Alert>
  );
}

export default App;
