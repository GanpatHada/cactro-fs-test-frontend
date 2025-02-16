import { useContext, useEffect, useState } from "react";
import PollCard from "../../components/poll-card/PollCard";
import "./PollList.css";
import { PollContext } from "../../context/PollContext";
const PollsList = () => {
  const [loading, setLoading] = useState(false);
  const { polls, setPolls } = useContext(PollContext);

  useEffect(() => {
    setLoading(true);
    const fetchPolls = async () => {
      const response = await fetch("https://cactro-fs-test-backend.onrender.com/api/v1/poll");
      const data = await response.json();
      setPolls(data.data);
      setLoading(false);
    };
    const interval = setInterval(() => {
      fetchPolls(); 
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loader">
    Loading Polls ...
  </div>;

  return (
    <div id="poll-list">
      {polls.map((poll,index) => {
        return <PollCard key={index} poll={poll} questionIndex={index+1} />;
      })}
    </div>
  );
};

export default PollsList;
