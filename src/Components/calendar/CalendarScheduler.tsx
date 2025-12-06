import { useState } from "react";
import Calendar from "./Calendar"
import CreateEventModal from "./CreateEventModal";
import { Button } from "@/components/ui/button";

 
function CalendarScheduler() {
 
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <Button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Event +
      </Button>

      {true &&<CreateEventModal open={true} onClose={() => setOpen(false)} />}
    <Calendar />
    </div>
  )
}
 
export default CalendarScheduler