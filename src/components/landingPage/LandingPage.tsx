import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";
import { FaUserFriends, FaCalendarAlt, FaSearch } from "react-icons/fa";
import "@/components/styles/landingPage.css";

export default function LandingPage() {
  return (
    <>
      {/* If already signed in → go to home */}
      <SignedIn>
        <Navigate to="/home" />
      </SignedIn>

      {/* Public landing page */}
      <SignedOut>
        <div className="landing-page">
          <section className="hero-section">
            <span className="hero-badge">The Study Platform</span>

            <h1 className="hero-title">
              Master your subjects <br />
              with the perfect <span>Study Buddy</span>
            </h1>

            <p className="hero-subtitle">
              Connect with students who share your classes and schedule sessions
            </p>

            <div className="hero-actions">
              <SignInButton mode="modal">
                <button className="btn-hero btn-primary">
                  Get Started here
                </button>
              </SignInButton>

              
            </div>
          </section>

          <section className="features-section">
            <div className="features-grid">
              <Feature icon={<FaSearch />} title="Find Partners Easily" />
              <Feature icon={<FaUserFriends />} title="Connect Instantly" />
              <Feature icon={<FaCalendarAlt />} title="Schedule Sessions" />
            </div>
          </section>
        </div>
      </SignedOut>
    </>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}
