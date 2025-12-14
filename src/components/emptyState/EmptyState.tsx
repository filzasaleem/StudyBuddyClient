import React from "react";
import { Link } from "@tanstack/react-router"; 
import { FaUserFriends, FaSearch } from "react-icons/fa";
import "@/components/styles/emptyState.css"; 

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

const EmptyState = ({ 
  title = "No buddies yet", 
  description = "You haven't connected with anyone yet. Find a study partner to get started!",
  actionLabel = "Find a Buddy",
  actionLink = "/search"
}: EmptyStateProps) => {
  return (
    <div className="empty-state-container">
      <div className="empty-icon">
        <FaUserFriends />
      </div>
      
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      
      {actionLink && (
        <Link to={actionLink} className="btn-empty-action">
          <FaSearch /> {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;