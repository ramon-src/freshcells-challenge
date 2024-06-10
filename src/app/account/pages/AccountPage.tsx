import { useQuery } from "@apollo/client";
import { Button, Form, Input, Skeleton } from "antd/lib";
import { useMemo } from "react";
import Page from "../../../components/Form/Page";
import { useAuth } from "../../../services/auth/auth-provider";
import { ACCOUNT } from "../../../services/graphql/queries/account";
import { LOGGED_USER } from "../../../services/graphql/queries/loggedUser";

function AccountPage(): React.ReactElement {
  const { logout } = useAuth();
  const { data: meData, loading: meLoading } = useQuery(LOGGED_USER);

  const userId = useMemo(() => meData?.me?.id, [meData]);

  const { data: accountData, loading: accountLoading } = useQuery(ACCOUNT, {
    skip: !userId,
    variables: { id: userId },
  });

  if (meLoading || accountLoading)
    return (
      <div data-testid="account-loading">
        <Skeleton active />
      </div>
    );

  const { user } = accountData;

  type FieldType = {
    firstName: string;
    lastName: string;
  };
  return (
    <Page title="My Account">
      <Form layout="vertical">
        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input first name!" }]}
          validateTrigger="onChange"
          initialValue={user?.firstName}
        >
          <Input readOnly size="large" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input last name!" }]}
          validateTrigger="onChange"
          initialValue={user?.lastName}
        >
          <Input readOnly size="large" />
        </Form.Item>
      </Form>

      <Button onClick={() => logout()}>Logout</Button>
    </Page>
  );
}

export default AccountPage;
