import "@/components/styles/navbar.css";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaBook, FaPeopleGroup } from "react-icons/fa6";
import { FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import NotificationIcon from "../notification/NotificationIcon";

export function Navbar() {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <FaBook />
        <Link
          className={`nav-center-item ${path === "/" ? "active" : ""}`}
          to="/"
        >
          StudyBuddy
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="nav-center">
        <Link
          className={`nav-center-item ${path === "/search" ? "active" : ""}`}
          to="/search"
        >
          <FaSearch />
          Find Buddy
        </Link>

        <Link
          className={`nav-center-item ${path === "/mybuddies" ? "active" : ""}`}
          to="/mybuddies"
        >
          <FaPeopleGroup />
          My Buddies
        </Link>

        <Link
          className={`nav-center-item ${path === "/calendar" ? "active" : ""}`}
          to="/calendar"
        >
          <FaRegCalendarAlt />
          Schedule
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>

        <SignedIn>
          <div className="notification-wrapper">
            <NotificationIcon />
          </div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
