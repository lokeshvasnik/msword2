import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./store/auth.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <React.StrictMode>
            <App />
            <Toaster position="bottom-center" reverseOrder={false} />
        </React.StrictMode>
    </AuthProvider>
);
