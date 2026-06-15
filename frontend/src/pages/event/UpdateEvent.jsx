import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import {
  getEventById,
  updateEvent,
} from "../../services/eventService";

function UpdateEvent() {

  const [eventId, setEventId] = useState("");

  const [event, setEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    venueId: "",
    organizerId: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEvent = async () => {
    try {

      const response = await getEventById(eventId);

      const data = response.data.data;

      setEvent({
        title: data.title,
        description: data.description,
        eventDate: data.eventDate,
        venueId: data.venue?.id || "",
        organizerId: data.organizer?.id || "",
      });

    } catch (error) {

      console.log(error);

        setEvent({
        title: "",
        description: "",
        eventDate: "",
        venueId: "",
        organizerId: "",
      });

      alert("Event Not Found");
    }
  };

  const handleUpdate = async (e) => {
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

      await updateEvent(eventId, payload);

      alert("Event Updated Successfully");

      setEvent({
        title: "",
        description: "",
        eventDate: "",
        venueId: "",
        organizerId: "",
      });

      setEventId("");

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };

  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

      {/* Top Navigation */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <Link
          to="/events/create"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
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
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
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

        <h2 className="text-2xl font-bold mb-5">
          Update Event
        </h2>

        {/* Search Section */}

        <div className="flex gap-3 mb-5">

          <input
            type="number"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="flex-1 border p-3 rounded"
          />

          <button
            onClick={fetchEvent}
            className="bg-green-600 text-white px-6 rounded"
          >
            Search
          </button>

        </div>

        {/* Form Show After Search */}

        {event.title && (

          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={event.title}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={event.description}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="date"
              name="eventDate"
              value={event.eventDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              name="venueId"
              placeholder="Venue ID"
              value={event.venueId}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              name="organizerId"
              placeholder="Organizer ID"
              value={event.organizerId}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded"
            >
              Update Event
            </button>

          </form>

        )}

      </div>

    </DashboardLayout>
  );
}

export default UpdateEvent;