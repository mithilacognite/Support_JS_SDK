import React, { useState } from "react";
import "./App.css";
import Modal from "./components/SearchModal";
import Main from "./components/Main";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    
    <div className="App">
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>
      {/* <Main/> */}
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
    
  );
}

export default App;
