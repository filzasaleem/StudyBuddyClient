import React from 'react';
import { useAuth } from "@clerk/clerk-react";

export default function Index() {
  const { getToken } = useAuth();

const tokenFetch = async() => {
   
      const token = await getToken();
      console.log("token", token)

  };

  return <div>Index
    <button onClick={tokenFetch}>Get token</button>
  </div>;
}
