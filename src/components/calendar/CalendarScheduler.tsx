import { useEvents } from "@/hooks/useEvents";
import Calendar from "./Calendar";
import CreateEventModal from "./CreateEventModal";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

function CalendarScheduler() {
  const { events } = useEvents();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="calender">
      <div className="addSlot">
        <button className="btn btn-default btn-sm" onClick={handleClick}>
          <FaPlus className="mr-2 h-4 w-4" /> Add Slot
        </button>
      </div>

      <CreateEventModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Calendar events = {events}/>
    </div>
  );
}

export default CalendarScheduler;
