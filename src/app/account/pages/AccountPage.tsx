import { useAuth } from "../../../services/providers/auth/auth-provider";

function AccountPage(): React.ReactElement {
  const { logout } = useAuth();
  return (
    <div>
      AccountPage
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default AccountPage;
