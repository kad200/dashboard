import React from "react";
import ReactDOM from "react-dom/client";
import "styles/index.scss";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "context/userContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);