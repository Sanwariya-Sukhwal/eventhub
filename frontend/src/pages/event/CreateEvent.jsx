import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createEvent } from "../../services/eventService";

function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    venueId: "",
    organizerId: "",
  });

  const [createdEvent, setCreatedEvent] = useState(null);

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: event.title,
      description: event.description,
      eventDate: event.eventDate,

      venue: {
        id: Number(event.venueId),
      },

      organizer: {
        id: Number(event.organizerId),
      },
    };

    try {
      const response = await createEvent(payload);

      setCreatedEvent(response.data.data);

      alert("Event Created Successfully");

      setEvent({
        title: "",
        description: "",
        eventDate: "",
        venueId: "",
        organizerId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl shadow">

        {/* Top Navigation */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <Link
            to="/events/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Create
          </Link>

          <Link
            to="/events/list"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            List
          </Link>

          <Link
            to="/events/details"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            View
          </Link>

          <Link
            to="/events/update"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Update
          </Link>

          <Link
            to="/events/attendees"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Attendees
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-6">
          Create Event
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={event.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows="4"
          />

          <input
            type="date"
            name="eventDate"
            value={event.eventDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="venueId"
            placeholder="Venue ID"
            value={event.venueId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="organizerId"
            placeholder="Organizer ID"
            value={event.organizerId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Create Event
          </button>
        </form>

        {createdEvent && (
          <div className="mt-5 bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">
              Event Created Successfully
            </h3>

            <p>ID: {createdEvent.id}</p>
            <p>Title: {createdEvent.title}</p>
            <p>Description: {createdEvent.description}</p>
            <p>Date: {createdEvent.eventDate}</p>

            {createdEvent.venue && (
              <p>Venue ID: {createdEvent.venue.id}</p>
            )}

            {createdEvent.organizer && (
              <p>Organizer ID: {createdEvent.organizer.id}</p>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default CreateEvent;