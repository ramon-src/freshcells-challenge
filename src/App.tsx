import { ApolloProvider } from "@apollo/client";
import "./App.css";
import Login from "./pages/Login";
import client from "./service/graphql/apollo-client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Login />
    </ApolloProvider>
  );
}

export default App;
