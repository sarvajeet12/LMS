// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";

// router
import { router } from "./routers.jsx";
import { RouterProvider } from "react-router-dom";

// rtk
import { Provider } from "react-redux";
import persistor, { appStore } from "./app/store.js";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";






createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClickrtl={true}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
    </PersistGate>
  </Provider>
  // </StrictMode>,
);
