
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/common.css";
import { PollProvider } from "./context/PollContext.jsx";
createRoot(document.getElementById("root")).render(
  
    <PollProvider>
      <App />
    </PollProvider>
 
);
