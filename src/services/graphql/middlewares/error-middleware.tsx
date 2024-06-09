import { ApolloLink } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { NotificationContextType } from "../../notification/providers/notification-provider";

type Exception = {
  code: number;
  data: {
    message: {
      messages: {
        id: string;
        message: string;
      }[];
    }[];
  };
};
type GraphQlErrorsMessage = {
  id: string;
  message: string;
};

const getErrorMessages = (
  errors: readonly GraphQLError[] | undefined
): GraphQlErrorsMessage[] => {
  if (!errors) return [];

  return errors.flatMap((error) => {
    const exception: Exception | undefined = error?.extensions
      ?.exception as Exception;
    return exception?.data?.message?.flatMap((msg) => msg.messages) || [];
  });
};

export const errorHandler =
  (notifier: NotificationContextType["notify"]) =>
  ({ graphQLErrors, networkError }: ErrorResponse): void => {
    const errorMessages = getErrorMessages(graphQLErrors);

    if (errorMessages.length > 0) {
      errorMessages.forEach((msg) => {
        notifier("error", msg.id, msg.message);
      });
    }

    if (networkError) {
      notifier("error", "network.error", networkError.message);
    }
  };

const createErrorLink = (
  notifier: NotificationContextType["notify"]
): ApolloLink => {
  const errorLink = onError(errorHandler(notifier));
  return errorLink;
};

export default createErrorLink;
