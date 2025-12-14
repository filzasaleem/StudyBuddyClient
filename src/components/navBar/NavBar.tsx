import "@/components/styles/navbar.css";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaBook, FaPeopleGroup, FaBars,  } from "react-icons/fa6";
import { FaSearch, FaRegCalendarAlt, FaTimes } from "react-icons/fa";
import NotificationIcon from "../notification/NotificationIcon";

export function Navbar() {
  const { location } = useRouterState();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <div className="nav-left">
          <FaBook />
          <Link className={`nav-center-item ${path === "/home" ? "active" : ""}`} to="/home">
            StudyBuddy
          </Link>
        </div>

        {/* CENTER (Desktop Only) */}
        <div className="nav-center">
          <Link className={`nav-center-item ${path === "/search" ? "active" : ""}`} to="/search">
            <FaSearch /> Find Buddy
          </Link>
          <Link className={`nav-center-item ${path === "/mybuddies" ? "active" : ""}`} to="/mybuddies">
            <FaPeopleGroup /> My Buddies
          </Link>
          <Link className={`nav-center-item ${path === "/calendar" ? "active" : ""}`} to="/calendar">
            <FaRegCalendarAlt /> Schedule
          </Link>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          
          {/* 1. WRAP ICONS IN A DESKTOP-ONLY DIV */}
          <div className="nav-actions-desktop">
            <SignedIn>
              <div className="notification-wrapper">
                <NotificationIcon />
              </div>
              <UserButton />
            </SignedIn>
          </div>

          {/* Hamburger (Mobile Only) */}
          <button className="hamburger-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-links">
            <Link className={`mobile-link ${path === "/search" ? "active" : ""}`} to="/search" onClick={closeMenu}>
            <FaSearch /> Find Buddy
            </Link>
            <Link className={`mobile-link ${path === "/mybuddies" ? "active" : ""}`} to="/mybuddies" onClick={closeMenu}>
            <FaPeopleGroup /> My Buddies
            </Link>
            <Link className={`mobile-link ${path === "/calendar" ? "active" : ""}`} to="/calendar" onClick={closeMenu}>
            <FaRegCalendarAlt /> Schedule
            </Link>
        </div>

        {/* 2. ADD PROFILE & NOTIFICATIONS TO BOTTOM OF MENU */}
        <SignedIn>
            <div className="mobile-menu-footer">
                <div className="mobile-footer-row">
                    <span className="mobile-footer-label">Notifications</span>
                    <NotificationIcon />
                </div>
                <div className="mobile-footer-row">
                    <span className="mobile-footer-label">Profile</span>
                    {/* showName={true} makes the user button look more like a menu item */}
                    <UserButton showName={true} />
                </div>
            </div>
        </SignedIn>
      </div>
    </>
  );
}