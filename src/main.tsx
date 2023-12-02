import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ChangePassword } from "./pages/ChangePassword.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "changePassword",
    element: (
      <PrivateRoute path="/login">
        <ChangePassword />
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
