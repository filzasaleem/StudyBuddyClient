import "@/components/styles/modal.css";
import { X } from "lucide-react";
import { useState } from "react";

type PropType = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CalendarEventModal({ isOpen, onClose }: PropType) {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const generateTimes = () => {
    const times: string[] = [];
    for (let hour = 8; hour <= 22; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const timeSlots = generateTimes();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">New Availability</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* SUBJECT */}
        <label className="modal-label">Subject</label>
        <input
          className="modal-input"
          placeholder="e.g. Physics, React"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* DATE + TIME */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* DATE */}
          <div>
            <label className="modal-label">Date</label>
            <input
              type="date"
              className="modal-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* START TIME */}
          <div>
            <label className="modal-label">Start Time</label>
            <select
              className="modal-select"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              <option value="">Select time</option>
              {timeSlots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* END TIME */}
          <div>
            <label className="modal-label">End Time</label>
            <select
              className="modal-select"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              <option value="">Select time</option>
              {timeSlots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button className="modal-button mt-6" onClick={onClose}>
          Save Slot
        </button>

      </div>
    </div>
  );
}
