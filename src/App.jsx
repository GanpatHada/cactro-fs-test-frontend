import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import PollModal from "./components/poll-modal/PollModal";
import { ToastContainer } from "react-toastify";
import PollsList from "./pages/polls-list/PollsList";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
  
      />
      {showModal && <PollModal closeModal={closeModal} />}
      <Navbar setShowModal={setShowModal} />
      <PollsList/>
    </div>
  );
};

export default App;
