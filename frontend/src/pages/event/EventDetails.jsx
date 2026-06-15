import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getEventById } from "../../services/eventService";

function EventDetails() {
  const [id, setId] = useState("");
  const [event, setEvent] = useState(null);

  const searchEvent = async () => {
    try {
      const response = await getEventById(id);

      setEvent(response.data.data);
    } catch (error) {
      console.log(error);

      setEvent(null);

      alert("Event Not Found");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

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
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
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

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Search Event
          </h2>

          <div className="flex gap-3">

            <input
              type="number"
              placeholder="Enter Event ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 border p-3 rounded"
            />

            <button
              onClick={searchEvent}
              className="bg-green-600 text-white px-6 rounded"
            >
              Search
            </button>

          </div>

        </div>

        {event && (

          <div className="bg-white p-6 mt-5 rounded-xl shadow">

            <h3 className="text-xl font-bold mb-4">
              Event Details
            </h3>

            <p>
              <strong>ID:</strong> {event.id}
            </p>

            <p>
              <strong>Title:</strong> {event.title}
            </p>

            <p>
              <strong>Description:</strong> {event.description}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.eventDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Venue:</strong>{" "}
              {event.venue?.name}
            </p>

            <p>
              <strong>Organizer:</strong>{" "}
              {event.organizer?.name}
            </p>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default EventDetails;