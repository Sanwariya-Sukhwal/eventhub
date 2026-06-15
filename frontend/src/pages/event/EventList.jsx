import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import {
  getAllEvents,
  deleteEvent,
} from "../../services/eventService";

function EventList() {

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadEvents();
  }, [page]);

  const loadEvents = async () => {
    try {

      const response = await getAllEvents(page);

      setEvents(response.data.data.content);

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {

      await deleteEvent(id);

      alert("Event Deleted Successfully");

      loadEvents();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
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
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
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

        <h2 className="text-2xl font-bold mb-5">
          Event List
        </h2>

        <table className="min-w-full border border-gray-300">

          <thead>

            <tr className="bg-slate-200">

              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Organizer</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {events.map((event) => (

              <tr
                key={event.id}
                className="border-b"
              >

                <td className="p-3">
                  {event.id}
                </td>

                <td className="p-3">
                  {event.title}
                </td>

                <td className="p-3">
                  {event.eventDate}
                </td>

                <td className="p-3">
                  {event.venue?.name}
                </td>

                <td className="p-3">
                  {event.organizer?.name}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex gap-3 mt-5">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Prev
          </button>

          <span className="flex items-center">
            Page {page + 1}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default EventList;