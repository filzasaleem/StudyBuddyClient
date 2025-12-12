import React, { useEffect, useState } from "react";
import { StudyBuddyT } from "@/hooks/useStudyBuddy";
import { FaUserFriends } from "react-icons/fa";
import { useUserSync } from "@/hooks/useUserSync";
import { useConnections } from "@/hooks/useConnection";


export default function StudyBuddyCard({ card }: { card: StudyBuddyT }) {
  const { user } = useUserSync();
  const { pendingQuery, sendRequestMutation } = useConnections();

  const [status, setStatus] = useState<"none" | "pending" | "connected">("none");
  const [buttonClass, setButtonClass] = useState("btn btn-default");

  // Update button status based on pending requests from server
  useEffect(() => {
    if (!pendingQuery.data || !user) return;

    const pendingRequest = pendingQuery.data.find(
      (req) => req.receiverId === card.userId
    );

    if (pendingRequest) {
      setStatus("pending");
      setButtonClass("btn btn-secondary");
    }
  }, [pendingQuery.data, card.userId, user]);

  const handleConnect = () => {
    if (!user) return;
    setStatus("pending");
    setButtonClass("btn btn-secondary");

    sendRequestMutation.mutate(
      { receiverId: card.userId, senderId: user.id },
      { onSuccess: () => setStatus("pending") } 
    );
  };

  return (
    <div className="studdybuddy-card">
      <div className="studdybuddy-card-initials">{card.initials}</div>
      <div className="name-status">
        <h3 className="studdybuddy-card-name">{card.fullName}</h3>
        <div className="status-dot" data-online={card.isOnline}></div>
      </div>
      <div className="studdybuddy-card-subject">{card.subject}</div>
      <div className="studdybuddy-card-description">{card.description}</div>
      <button
        className={buttonClass}
        onClick={handleConnect}
        disabled={status === "pending" || status === "connected"}
      >
        <FaUserFriends />{" "}
        <span>
          {status === "none"
            ? "Connect"
            : status === "pending"
            ? "Request Sent"
            : "Connected"}
        </span>
      </button>
    </div>
  );
}
