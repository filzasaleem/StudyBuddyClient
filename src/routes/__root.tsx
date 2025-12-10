import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "../components/NavBar";
import { UserSync } from "@/components/UserSync";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <UserSync /> 
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
