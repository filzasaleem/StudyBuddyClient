import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "../components/navBar/NavBar";
import { UserSync } from "@/components/UserSync";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import LandingPage from "@/components/landingPage/LandingPage";

export const Route = createRootRoute({
  component: () => (
    <>
      <SignedIn>
        <Navbar />
        <UserSync />
      </SignedIn>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
   
    </>
  ),
});
 