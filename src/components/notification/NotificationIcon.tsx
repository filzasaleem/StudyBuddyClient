import { useState } from "react"; 
import { FaBell } from "react-icons/fa";
import { useConnections } from "@/hooks/useConnection";
import "@/components/styles/notificationIcon.css";

function NotificationIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { notificationsQuery } = useConnections();
  const notifications = notificationsQuery.data || [];

  const handleAccept = (id) => {
    console.log("Accepted connection:", id);
    // Add your API call here
  };

  const handleReject = (id) => {
    console.log("Rejected connection:", id);
    // Add your API call here
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
                  <button className="mark-read-btn">Mark all read</button>
                )}
            </div>

            <div className="dropdown-content">
                {notifications.length === 0 ? (
                    <div className="empty-state">No new notifications</div>
                ) : (
                    notifications.map((notif, i) => (
                        <div key={i} className="notification-item unread">
                            <span className="notif-text">{notif.message}</span>
                            
                            <div className="notification-actions">
                                {/* Accept Button: Teal (btn-default) */}
                                <button 
                                  className="btn btn-sm btn-default"
                                  onClick={() => handleAccept(notif.id)}
                                >
                                  Accept
                                </button>
                                
                                {/* Reject Button: Red (btn-destructive) */}
                                <button 
                                  className="btn btn-sm btn-destructive"
                                  onClick={() => handleReject(notif.id)}
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