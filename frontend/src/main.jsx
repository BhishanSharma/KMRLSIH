import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  </LanguageProvider>
);
