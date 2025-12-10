import { createFileRoute } from "@tanstack/react-router";
import CalendarScheduler from "../components/calendar/CalendarScheduler";
import "@/components/styles/calender.css";
import { getEvents } from "@/hooks/useEvents";


export const Route = createFileRoute("/calendar")({
  component: CalendarScheduler,
});
