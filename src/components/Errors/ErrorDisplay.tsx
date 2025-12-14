import React from "react";
import { FaExclamationCircle, FaRedo } from "react-icons/fa";
import "@/components/styles/error.css";

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ 
  message = "Unable to load data. Please try again.", 
  onRetry 
}: ErrorDisplayProps) => {
  
  
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="error-container">
      <FaExclamationCircle className="error-icon" />
      
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-message">{message}</p>
      
      <button className="btn-retry" onClick={handleRetry}>
        <FaRedo /> Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;