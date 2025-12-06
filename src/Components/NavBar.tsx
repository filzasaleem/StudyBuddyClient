import { Link } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "../Components/ui/button";
import { FaBook, FaPeopleGroup } from "react-icons/fa6";
import { FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import NotificationIcon from "./NotificationIcon";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex flex-row items-center justify-between max-w-5xl mx-auto p-3">
        {/* LEFT — Logo */}
        <div className="flex-[1] flex items-center gap-2">
          <FaBook className="w-5 h-5" />
          <Link to="/">StudyBuddy</Link>
        </div>

        {/* CENTER — Menu */}
        <div className="flex-[3] flex items-center gap-6 justify-center">
          <div className="flex flex-row items-center gap-1">
            <FaSearch className="w-5 h-5" />
            <Link to="/">Find Buddy</Link>
          </div>

          <div className="flex flex-row items-center gap-1">
            <FaPeopleGroup className="w-5 h-5" />
            <Link to="/mybuddies">My Buddies</Link>
          </div>

          <div className="flex flex-row items-center gap-1">
            <FaRegCalendarAlt className="w-5 h-5" />
            <Link to="/calendar">Schedule</Link>
          </div>
        </div>

        {/* RIGHT — Auth */}
        <div className="flex-[1] flex items-center gap-3 justify-end">
          <SignedOut>
            <Button variant="outline" size="sm">
              <SignInButton mode="modal" />
            </Button>
          </SignedOut>

          <SignedIn>
            <NotificationIcon></NotificationIcon>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
