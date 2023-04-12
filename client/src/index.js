import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SortMethodProvider } from "./contexts/SortMethodContext";
import { PinPlayerProvider } from "./contexts/PinPlayerContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.title = "NHL Nightly";
root.render(
  <SortMethodProvider>
    <PinPlayerProvider>
      <App />
    </PinPlayerProvider>
  </SortMethodProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
