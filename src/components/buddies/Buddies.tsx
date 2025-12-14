import React from "react";
import { useBuddies } from "@/hooks/useBuddies";
import BuddyCard from "./BuddyCard";
import { useConnections } from "@/hooks/useConnection";
import "@/components/styles/buddies.css";
import { Loader } from "lucide-react";
import ErrorDisplay from "../Errors/ErrorDisplay";
import EmptyState from "../emptyState/EmptyState";


const Buddies = () => {
  const { buddiesQuery } = useConnections();
  const buddies = buddiesQuery.data || [];
  if (buddiesQuery.isLoading) {
    return <Loader />;
  }

if (buddiesQuery.isError) {
  return (
    <ErrorDisplay 
      message="Failed to load your connection list." 
      onRetry={() => buddiesQuery.refetch()} // React Query specific retry!
    />
  );
}

 if (!buddies || buddies.length === 0) {
    return (
      <div className="buddies-page">
        <h2>Your Buddies</h2>
        <EmptyState 
          title="No buddies found"
          description="It looks like you haven't connected with anyone yet. Head over to the search page to find students with similar interests!"
          actionLabel="Find Partners"
          actionLink="/search" 
        />
      </div>
    );
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
