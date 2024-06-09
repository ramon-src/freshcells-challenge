import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { ACCOUNT } from "../../../services/graphql/queries/account";
import { LOGGED_USER } from "../../../services/graphql/queries/loggedUser";
import { useAuth } from "../../../services/providers/auth/auth-provider";

function AccountPage(): React.ReactElement {
  const { logout } = useAuth();
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery(LOGGED_USER);

  const userId = useMemo(() => meData?.me?.id, [meData]);

  const {
    data: accountData,
    loading: accountLoading,
    error: accountError,
  } = useQuery(ACCOUNT, {
    skip: !userId,
    variables: { id: userId },
  });

  if (meLoading || accountLoading) return <p>Loading...</p>;
  if (meError) return <p>Error fetching user data: {meError.message}</p>;
  if (accountError)
    return <p>Error fetching account data: {accountError.message}</p>;

  const { user } = accountData;

  return (
    <div>
      AccountPage
      <input type="text" readOnly={true} value={user.firstName} />
      <input type="text" readOnly={true} value={user.lastName} />
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default AccountPage;
