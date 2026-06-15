import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getEventAttendees } from "../../services/eventService";

function EventAttendees() {
  const [eventId, setEventId] = useState("");
  const [attendees, setAttendees] = useState([]);

  const fetchAttendees = async () => {
    try {
      const response = await getEventAttendees(eventId);

      setAttendees(response.data.data);
    } catch (error) {
      console.log(error);

      setAttendees([]);

      alert("No Attendees Found");
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
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Update
          </Link>

          <Link
            to="/events/attendees"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Attendees
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Event Attendees
        </h2>

        <div className="flex gap-3 mb-5">

          <input
            type="number"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="flex-1 border p-3 rounded"
          />

          <button
            onClick={fetchAttendees}
            className="bg-green-600 text-white px-6 rounded"
          >
            Search
          </button>

        </div>

        {attendees.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="min-w-full border border-gray-300">

              <thead>

                <tr className="bg-slate-200">

                  <th className="p-3 text-left">
                    ID
                  </th>

                  <th className="p-3 text-left">
                    Name
                  </th>

                  <th className="p-3 text-left">
                    Email
                  </th>

                </tr>

              </thead>

              <tbody>

                {attendees.map((attendee) => (

                  <tr
                    key={attendee.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {attendee.id}
                    </td>

                    <td className="p-3 font-medium">
                      {attendee.name}
                    </td>

                    <td className="p-3">
                      {attendee.email}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center text-gray-500 mt-5">
            Search an Event ID to view attendees.
          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default EventAttendees;