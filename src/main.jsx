import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollToTop />
        <App />
      </PersistGate>
    </Provider>
    <ToastContainer />
  </BrowserRouter>,
  // </React.StrictMode>
);