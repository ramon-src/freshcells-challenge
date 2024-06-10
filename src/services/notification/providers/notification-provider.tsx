import notification from "antd/lib/notification";
import { ReactElement, createContext, useCallback, useContext } from "react";

export type NotificationContextType = {
  notify: (
    type: NotificationType,
    message: string,
    description?: string,
    placement?: Placement
  ) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notify: () => {},
});

export const useNotifier = (): NotificationContextType =>
  useContext(NotificationContext);

type NotificationType = "info" | "success" | "error" | "warning";

type Placement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

type NotificationProviderProps = {
  children: ReactElement;
};

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = useCallback(
    (
      type: NotificationType,
      message: string,
      description?: string,
      placement?: Placement
    ) => {
      api[type]({
        message,
        description,
        placement: placement ?? "bottomRight",
      });
    },
    [api]
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
