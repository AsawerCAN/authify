import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./config/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools position="bottom-right" initialIsOpen={true} />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
