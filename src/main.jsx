import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LocaleProvider } from "./contexts/LocaleContext.jsx";

createRoot(document.getElementById("root")).render(
  <LocaleProvider defaultValue="ko">
    <App />
  </LocaleProvider>
);
