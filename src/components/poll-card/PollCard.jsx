import React, { useContext, useState } from "react";
import "./PollCard.css";
import { toast } from "react-toastify";
import { PollContext } from "../../context/PollContext";
const PollCard = ({ poll, questionIndex }) => {
  const { question, options, _id } = poll;
  const [loading, setLoading] = useState(false);
  const { polls, setPolls } = useContext(PollContext);

  const handleVotes = () => {};

  handleVotes();

  const doVoting = async (id) => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8000/api/v1/poll/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: _id, optionId: id }),
      });
      response = await response.json();
      if (!response.success) throw new Error(response.message);
      else {
        toast.success("voted successfully");
        setPolls(
          polls.map((poll) => {
            if (poll._id === _id) {
              return {
                ...poll,
                options: poll.options.map((option) => {
                  if (option._id === id)
                    return { ...option, votes: option.votes + 1 };
                  return option;
                }),
              };
            }
            return poll;
          })
        );
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="poll-card">
      {loading && <div className="poll-card-loading"></div>}
      <div className="question">
        <h2>
          <strong>{questionIndex}.</strong> {question}
        </h2>
      </div>
      <ol type="a" className="options">
        {options.map((option, index) => (
          <li
            key={option._id}
            onClick={() => doVoting(option._id)}
            className="options-text"
          >
            <span>{option.text}</span>
            <i>{option.votes} votes</i>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PollCard;
