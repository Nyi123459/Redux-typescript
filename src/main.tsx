import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import "./index.css";

const root = document.getElementById("root");

// Use createRoot instead of ReactDOM.render
const reactRoot = ReactDOM.createRoot(root as HTMLElement);
reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
