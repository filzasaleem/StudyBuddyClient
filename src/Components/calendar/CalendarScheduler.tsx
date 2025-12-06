import { Plus } from "lucide-react";
import Calendar from "./Calendar";
import CreateEventModal from "./CreateEventModal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

function CalendarScheduler() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {};
  const handleClick = () =>{
    console.log("*********BUtton Clocked********");

    setIsOpen(true);
    console.log("*********BUtton Value********",isOpen);
  }
  return (
    <div className="calender">
      
      <div className="addSlot"> 
        <button className="btn btn-default btn-sm" onClick={handleClick}>
          <FaPlus className="mr-2 h-4 w-4" /> Add Slot
        </button>
      </div>

       <CreateEventModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Calendar />
    </div>
  );
}

export default CalendarScheduler;