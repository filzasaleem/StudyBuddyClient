import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useEffect, useMemo, useRef } from "react";
import { Event } from "@/hooks/useEvents";

function Calendar({ events }: { events: Event[] }) {
  const eventsServiceRef = useRef<any>(null);

  const eventsServicePlugin = useMemo(() => {
    return createEventsServicePlugin();
  }, []);

  
  useEffect(() => {
    eventsServiceRef.current = eventsServicePlugin;
  }, [eventsServicePlugin]);

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid(), createViewDay()],
    events: [], 
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      eventsServicePlugin,
    ],
  });


  useEffect(() => {
    const plugin = eventsServiceRef.current;
    if (!plugin) return;

  
    plugin.getAll().forEach((ev: any) => plugin.remove(ev.id));


    events.forEach((ev) => {
      plugin.add({
        id: ev.id,
        title: ev.title,
        description: ev.description,
        start: Temporal.ZonedDateTime.from(`${ev.start}[UTC]`),
        end: Temporal.ZonedDateTime.from(`${ev.end}[UTC]`),
      });
    });
  }, [events]);

  if (!calendar) return null;

  return <ScheduleXCalendar calendarApp={calendar} />;
}

export default Calendar;
