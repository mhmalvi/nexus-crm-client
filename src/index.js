import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <div className="m-0 p-0 lg:block hidden">
          <App />
        </div>
        <div className="lg:hidden block w-full h-screen flex items-center justify-center bg-gray-800">
          <h1 className="text-brand-color text-2xl">
            Please use from a Desktop or Laptop.
          </h1>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
