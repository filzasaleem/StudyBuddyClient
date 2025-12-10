import "@/components/styles/navbar.css";
import { Link } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaBook, FaPeopleGroup } from "react-icons/fa6";
import { FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import NotificationIcon from "./NotificationIcon";

export function Navbar() {
  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <FaBook />
        <Link to="/">StudyBuddy</Link>
      </div>

      {/* CENTER MENU */}
      <div className="nav-center">
        <Link className="nav-center-item" to="/">
          <FaSearch />
          Find Buddy
        </Link>

        <Link className="nav-center-item" to="/mybuddies">
          <FaPeopleGroup />
          My Buddies
        </Link>

        <Link className="nav-center-item schedule" to="/calendar">
          <FaRegCalendarAlt />
          Schedule
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <SignedOut>
          {/* <button> */}
            <SignInButton mode="modal" />
          {/* </button> */}
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
