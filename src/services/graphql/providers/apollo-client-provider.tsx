import { useNotifier } from "../../notification/providers/notification-provider";
import { createApolloClient } from "../apollo-client";

import { ApolloProvider } from "@apollo/client";
type ApolloClientProviderProps = {
  children: React.ReactElement;
};

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => {
  const { notify } = useNotifier();
  const client = createApolloClient(notify);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
