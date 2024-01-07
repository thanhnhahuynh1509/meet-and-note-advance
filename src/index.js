import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./styles/index.css";
import { store } from "./common/store";
import { BrowserRouter } from "react-router-dom";

const el = document.getElementById("root");

createRoot(el).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
