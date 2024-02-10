import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.css";
import ModalProviders from "@/providers/modal-providers.tsx";

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const cliendId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={cliendId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ApolloProvider client={client}>
        <ModalProviders />
        <App />
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>
);
