import { useState } from "react"; 
import { FaBell } from "react-icons/fa";
import "@/components/styles/notificationIcon.css";
import { useConnections } from "@/hooks/useConnection";

function NotificationIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { respondMutation ,notificationsQuery} = useConnections(); // use respondMutation
  const notifications = notificationsQuery.data || [];
  const handleAccept = (id: string) => {
    respondMutation.mutate(
      { id, status: "Accepted" },
      {
        onSuccess: () => {
          console.log("Accepted connection:", id);
        },
      }
    );
  };

  const handleReject = (id: string) => {
    respondMutation.mutate(
      { id, status: "Rejected" },
      {
        onSuccess: () => {
          console.log("Rejected connection:", id);
        },
      }
    );
  };

  return (
    <div className="notification-container">
      <div className="bell-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <FaBell className="bell-icon" />
        {notifications.length > 0 && <span className="badge pulse"></span>}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            {notifications.length > 0 && (
              <button
                className="mark-read-btn"
                onClick={() =>
                  notifications.forEach((notif) =>
                    handleReject(notif.id) // Mark all read by rejecting all (or you can create a separate API)
                  )
                }
              >
                {/* Mark all read */}
              </button>
            )}
          </div>

          <div className="dropdown-content">
            {notifications.length === 0 ? (
              <div className="empty-state">No new notifications</div>
            ) : (
              notifications.map((notif,index) => (
                <div key={notif.id+index} className="notification-item unread">
                  <span className="notif-text">
                    {notif.senderFirstName} {notif.senderLastName} sent you a connection request
                  </span>

                  <div className="notification-actions">
                    <button
                      className="btn btn-sm btn-default"
                      onClick={() => handleAccept(notif.connectionId)}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-sm btn-destructive"
                      onClick={() => handleReject(notif.connectionId)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationIcon;
