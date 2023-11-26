import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./styles/index.css";
import { store } from "./common/store";

const el = document.getElementById("root");

createRoot(el).render(
  <Provider store={store}>
    <App />
  </Provider>
);
