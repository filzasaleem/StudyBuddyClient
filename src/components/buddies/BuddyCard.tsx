import React from "react";
import { Buddy } from "@/hooks/useConnection";
import { FaEnvelope, FaTrash, FaCalendarAlt } from "react-icons/fa";


const BuddyCard = ({ buddy }: { buddy: Buddy }) => {
  


  return (
    <div className="buddy-card">
      {/* --- LEFT SIDE: Info & Contact --- */}
      <div className="buddy-content-left">
        
        {/* Header: Avatar + Name + Date */}
        <div className="buddy-header">
          <div className="buddy-avatar-circle">
            {buddy.firstName?.[0]}{buddy.lastName?.[0]}
          </div>
          <div className="buddy-header-text">
            <h4>{buddy.firstName} {buddy.lastName}</h4>
          </div>
        </div>

       

        {/* Contact Boxes */}
        <div className="buddy-contact-section">
          
          

          {/* Email Box */}
          <div className="contact-box email">
            <div className="contact-label">
              <span className="label-text">EMAIL</span> 
              <span className="contact-value">{buddy.email || "unknow@example.com"}</span>
            </div>
            <button className="icon-btn">
               <FaEnvelope />
            </button>
          </div>

        </div>
      </div>


      <div className="buddy-actions-right">
        
        <button className="action-btn remove-btn">
          <FaTrash className="action-icon" />
          <span>Remove</span>
        </button>

        <button className="action-btn schedule-btn">
          <FaCalendarAlt className="action-icon" />
          <span>Schedule</span>
        </button>

      </div>
    </div>
  );
};

export default BuddyCard;