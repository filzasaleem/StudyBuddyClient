import React, { useEffect, useState } from "react";
import { StudyBuddyT } from "@/hooks/useStudyBuddy";
import { FaUserFriends } from "react-icons/fa";
import { useUserSync } from "@/hooks/useUserSync";
import { useConnections } from "@/hooks/useConnection";

export default function StudyBuddyCard({ card }: { card: StudyBuddyT }) {
  const { user } = useUserSync();
  const {
    pendingQuery,
    buddiesQuery,
    sendRequestMutation,
    outgoingPendingQuery,
  } = useConnections();

  const [status, setStatus] = useState<"none" | "pending" | "connected">(
    "none"
  );
  const [buttonClass, setButtonClass] = useState("btn btn-default");
  console.log("pending query------->>>>", pendingQuery.data);
  useEffect(() => {
    if (!user) return;

     if (buddiesQuery.data?.some(b => b.id === card.userId)) {
    setStatus("connected");
    setButtonClass("btn btn-outline-teal");
    return;
  }

    // const isPending = pendingQuery.data?.some(
    //   (req) => req.receiverId === card.userId
    // );

     if (outgoingPendingQuery.data?.some(req => req.receiverId === card.userId)) {
    setStatus("pending");
    setButtonClass("btn btn-secondary");
    return;
  }


    setStatus("none");
    setButtonClass("btn btn-default");
  }, [user, card.userId, pendingQuery.data, buddiesQuery.data,outgoingPendingQuery.data]);

  const handleConnect = () => {
    if (!user) return;

    setStatus("pending");
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
