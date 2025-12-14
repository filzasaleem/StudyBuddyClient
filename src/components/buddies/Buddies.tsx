import React from "react";
import { useBuddies } from "@/hooks/useBuddies";
import BuddyCard from "./BuddyCard";
import { useConnections } from "@/hooks/useConnection";
import "@/components/styles/buddies.css";


const Buddies = () => {
  const { buddiesQuery } = useConnections();
  const buddies = buddiesQuery.data || [];
  if (buddiesQuery.isLoading) {
    return <p>Loading buddies...</p>;
  }

  if (buddiesQuery.isError) {
    return <p>Failed to load buddies</p>;
  }

  if (!buddies ||buddies.length === 0) {
    return <p>No buddies yet</p>;
  }

  return (
    <div className="buddies-page">
      <h2>Your Buddies</h2>

      <div className="buddies-grid">
        {buddies.map((buddy) => (
          <BuddyCard key={buddy.id} buddy={buddy} />
        ))}
      </div>
    </div>
  );
};

export default Buddies;
