import { FaBell } from "react-icons/fa";

import { useUserSync } from "@/hooks/useUserSync";
import { useConnections } from "@/hooks/useConnection";

function NotificationIcon() {


  const { notificationsQuery } = useConnections();
  const notifications = notificationsQuery.data || [];

  return (
    <div className="notification-bell">
      <FaBell />
      {notifications.length > 0 && (
        <span className="badge">{notifications.length}</span>
      )}
      <div className="dropdown">
        {notifications.map((notif, i) => (
          <div key={i}>{notif.message}</div>
        ))}
      </div>
    </div>
  );
}

export default NotificationIcon;
