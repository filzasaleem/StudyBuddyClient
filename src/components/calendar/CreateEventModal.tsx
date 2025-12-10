import "@/components/styles/modal.css";
import { X } from "lucide-react";
import { useState } from "react";
import { EventNew, useEvents } from "@/hooks/useEvents";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { createEvent } = useEvents();

  const generateTimes = () => {
    const times: string[] = [];
    for (let hour = 1; hour <= 24; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const timeSlots = generateTimes();

  const handleCreate = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!date) newErrors.date = "Date is required";
    if (!startTime) newErrors.startTime = "Start time is required";
    if (!endTime) newErrors.endTime = "End time is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    const event: EventNew = {
      title: subject,
      start: new Date(`${date}T${startTime}:00Z`).toISOString(),
      end: new Date(`${date}T${endTime}:00Z`).toISOString(),
      description: description,
    };

    console.log("new create event is", event);
    try {
      await createEvent.mutateAsync(event);
      setSubject("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
      onClose();
    } catch (error) {
      console.error("Failed to create event:", error);
    }
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
        {errors.subject && <p className="error-text">{errors.subject}</p>}
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
            {errors.date && <p className="error-text">{errors.date}</p>}
            <input
              type="date"
              className="modal-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="modal-label">Start Time</label>
            {errors.startTime && (
              <p className="error-text">{errors.startTime}</p>
            )}
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
            {errors.endTime && <p className="error-text">{errors.endTime}</p>}
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

        <button className="btn btn-default btn-lg mt-4" onClick={handleCreate}>
          Save Slot
        </button>
      </div>
    </div>
  );
}
