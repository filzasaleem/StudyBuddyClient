import React, { useEffect, useState } from "react";
import { StudyBuddyT } from "@/hooks/useStudyBuddy";
import { FaUserFriends } from "react-icons/fa";
import { useUserSync } from "@/hooks/useUserSync";
import { useConnections } from "@/hooks/useConnection";

export default function StudyBuddyCard({ card }: { card: StudyBuddyT }) {
  const { user } = useUserSync();
  const { pendingQuery, buddiesQuery, sendRequestMutation } = useConnections();

  const [status, setStatus] = useState<"none" | "pending" | "connected">("none");
  const [buttonClass, setButtonClass] = useState("btn btn-default");

  useEffect(() => {
    if (!user) return;

  
    const isBuddy = buddiesQuery.data?.some(
      (b) => b.id === card.userId
    );

    if (isBuddy) {
      setStatus("connected");
      setButtonClass("btn btn-outline-teal"); //make a new one
      return;
    }


    const isPending = pendingQuery.data?.some(
      (req) => req.receiverId === card.userId
    );

    if (isPending) {
      setStatus("pending");
      setButtonClass("btn btn-secondary"); // GRAY
      return;
    }

    setStatus("none");
    setButtonClass("btn btn-default");

  }, [user, card.userId, pendingQuery.data, buddiesQuery.data]);

  const handleConnect = () => {
    if (!user) return;

    sendRequestMutation.mutate({
      senderId: user.id,
      receiverId: card.userId,
    });
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
        disabled={status !== "none"}
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
