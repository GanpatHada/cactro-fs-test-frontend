import React, { useContext, useState } from "react";
import "./PollModal.css";
import { toast } from "react-toastify";
import { PollContext } from "../../context/PollContext";
const PollModal = ({ closeModal }) => {
  const{setPolls,polls}=useContext(PollContext)
  const [poll, setPoll] = useState({
    question: "",
    options: [],
  });
  const [loading, setLoading] = useState(false);
  const handleOptionChange = (index, value) => {
    setPoll((prevPoll) => {
      const updatedOptions = [...prevPoll.options];
      updatedOptions[index] = value;
      return { ...prevPoll, options: updatedOptions };
    });
  };
  const createPoll = async (e) => {
    e.preventDefault();
    console.log(poll)
    if(poll.question.trim().length===0)
      return toast.error('question is empty')
    if(poll.options.some(option=>option.trim().length===0)|| poll.options.length!==4)
      return toast.error('options is empty')
    setLoading(true);
    try {
      let response = await fetch("https://cactro-fs-test-backend.onrender.com/api/v1/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poll),
      });
      response = await response.json();
      console.log(response)
      if (!response.success) 
        throw new Error(response.message);
      else
      {
        toast.success('Poll created successfully');
        setPolls([{...response.data},...polls])
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div id="overlay" onClick={closeModal}>
      <div id="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={createPoll}>
          <h1>Create Poll</h1>
          <label htmlFor="question">Enter Question</label>
          <textarea
            id="question"
            placeholder="enter question"
            value={poll.question}
            onChange={(e) => setPoll({ ...poll, question: e.target.value })}
          ></textarea>
          <input
            type="text"
            placeholder="option 1"
            value={poll.options[0]}
            onChange={(e) => handleOptionChange(0, e.target.value)}
          />
          <input
            type="text"
            placeholder="option 2"
            value={poll.options[1]}
            onChange={(e) => handleOptionChange(1, e.target.value)}
          />
          <input
            type="text"
            placeholder="option 3"
            value={poll.options[2]}
            onChange={(e) => handleOptionChange(2, e.target.value)}
          />
          <input
            type="text"
            placeholder="option 4"
            value={poll.options[3]}
            onChange={(e) => handleOptionChange(3, e.target.value)}
          />
          <button disabled={loading} type="submit">
            {loading ? "creating" : "Create Poll"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PollModal;
