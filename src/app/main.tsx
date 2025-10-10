import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import { StoreProvider } from "./providers/store-provider";
import "@/app.css";
import { GamePage } from "@pages/game/GamePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <Layout>
        <GamePage />
      </Layout>
    </StoreProvider>
  </React.StrictMode>
);
