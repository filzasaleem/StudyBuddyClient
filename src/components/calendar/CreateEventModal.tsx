import "@/components/styles/modal.css";
import { X } from "lucide-react";
import { useState } from "react";
import { EventNew } from "@/hooks/useEvents";

type PropType = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CalendarEventModal({ isOpen, onClose }: PropType) {
  const [subject, setSubject] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const generateTimes = () => {
    const times: string[] = [];
    for (let hour = 8; hour <= 22; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const timeSlots = generateTimes();

  const handleCreate = () => {
    const event: EventNew = {
      title: subject,
      start: new Date(`${date}T${startTime}:00Z`).toISOString(),
      end: new Date(`${date}T${endTime}:00Z`).toISOString(),
      description: description,
    };

    console.log("new create event is", event);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="text-lg font-semibold">New Availability</h2>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <label className="modal-label">Subject</label>
        <input
          className="modal-input"
          placeholder="e.g. Physics, React"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label className="modal-label">Description</label>
        <input
          className="modal-input"
          placeholder="short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="modal-label">Date</label>
            <input
              type="date"
              className="modal-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

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

        <button className="btn btn-default btn-lg" onClick={handleCreate}>
          Save Slot
        </button>
      </div>
    </div>
  );
}
