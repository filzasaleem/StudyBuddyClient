import React from 'react';
import { useAuth, useUser } from "@clerk/clerk-react";

export default function Index() {
  const { getToken } = useAuth();
  const {user} = useUser();

const tokenFetch = async() => {
   
      const token = await getToken();

      console.log("token", token)
      console.log("________user________");
      console.log(user);

  };

  return <div>Index
    <button onClick={tokenFetch}>Get token</button>
  </div>;
}
