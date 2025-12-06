import { createFileRoute } from "@tanstack/react-router";
import CalendarScheduler from "../components/calendar/CalendarScheduler";

export const Route = createFileRoute("/calendar")({
  component: CalendarScheduler,
});
