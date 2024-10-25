import './App.css';
import {useState} from "react"
import Navbar from "./Component/Navbar"
import ContentPage from './Component/ContentPage';


function App() {
  const [buttonChange, setButtonChange] = useState(true);
  function setButton() {
    setButtonChange(!buttonChange)
  }
  return (
    <>
    <Navbar buttonValue={buttonChange} setButton={setButton}></Navbar>
    <ContentPage  buttonValue={buttonChange}></ContentPage>
    </>
  );
}



export default App;
