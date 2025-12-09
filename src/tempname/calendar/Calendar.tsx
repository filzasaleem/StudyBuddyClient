import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
interface Event {
  id: string;
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  Subject: string;

}

function Calendar() {

  const events: Event[] = [
    {
      id: "1",
      title: "Math Tutoring",
      start: "2025-12-06T10:00:00Z",
      end: "2025-12-06T11:00:00Z",
      Subject: "Calculus session with Hiba",
    },
    {
      id: "2",
      title: "Physics Tutoring",
      start: "2025-12-06T12:00:00Z",
      end: "2025-12-06T13:00:00Z",
      Subject: "Newton's laws revision",
    },
    {
      id: "3",
      title: "Chemistry Lab",
      start: "2025-12-07T09:00:00Z",
      end: "2025-12-07T10:30:00Z",
      Subject: "Organic chemistry experiments",
    },
    {
      id: "4",
      title: "English Reading",
      start: "2025-12-07T14:00:00Z",
      end: "2025-12-07T15:00:00Z",
      Subject: "Reading comprehension practice",
    },
    {
      id: "5",
      title: "History Discussion",
      start: "2025-12-08T11:00:00Z",
      end: "2025-12-08T12:00:00Z",
      Subject: "World War II overview",
    },
  ];


  const calendarEvents = events.map((ev) => ({
    id: ev.id,
    title: ev.title,
    description: ev.Subject,
   start: Temporal.ZonedDateTime.from(`${ev.start}[UTC]`),
  end: Temporal.ZonedDateTime.from(`${ev.end}[UTC]`),
  }));

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid(),createViewDay()],
    events: calendarEvents,
    plugins: [ createDragAndDropPlugin()],
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default Calendar;

// npm i @schedule-x/drag-and-drop @schedule-x/event-modal