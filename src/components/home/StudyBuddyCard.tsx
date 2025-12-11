import React from "react";
import { StudyBuddyT } from "@/hooks/useStudyBuddy";
import { FaUserFriends } from "react-icons/fa";

export default function StudyBuddyCard({ card }: { card: StudyBuddyT }) {
  return (
    <div className="studdybuddy-card">
      <div className="studdybuddy-card-initials">{card.initials}</div>
      <div className="name-status">
      <h3 className="studdybuddy-card-name">{card.fullName}</h3>
      <div className="status-dot" data-online={card.isOnline}></div>
      </div>

      <div className="studdybuddy-card-subject">{card.subject}</div>
     <div className="studdybuddy-card-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, quidem!</div>
      <button className="btn btn-default "><FaUserFriends/> <span>Connect</span></button>
    </div>
  );
}
