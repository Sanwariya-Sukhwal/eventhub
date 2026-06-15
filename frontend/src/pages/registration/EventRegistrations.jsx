import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getRegistrationsByEvent } from "../../services/registrationService";

function EventRegistrations() {
  const [eventId, setEventId] = useState("");
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try {
      const response =
        await getRegistrationsByEvent(eventId);

      setRegistrations(response.data.data);
    } catch (error) {
      console.log(error);

      setRegistrations([]);

      alert("No Registrations Found");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl shadow">

        {/* Top Navigation */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <Link
            to="/registrations/create"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Create
          </Link>

          <Link
            to="/registrations/details"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            View
          </Link>

          <Link
            to="/registrations/event"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Event Registrations
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Event Registrations
        </h2>

        <div className="flex gap-3 mb-5">

          <input
            type="number"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={(e) =>
              setEventId(e.target.value)
            }
            className="flex-1 border p-3 rounded"
          />

          <button
            onClick={fetchRegistrations}
            className="bg-green-600 text-white px-6 rounded"
          >
            Search
          </button>

        </div>

        {registrations.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead>

                <tr className="bg-slate-200">

                  <th className="p-3">
                    Registration ID
                  </th>

                  <th className="p-3">
                    Registration Date
                  </th>

                  <th className="p-3">
                    Attendee
                  </th>

                  <th className="p-3">
                    Email
                  </th>

                </tr>

              </thead>

              <tbody>

                {registrations.map((registration) => (

                  <tr
                    key={registration.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {registration.id}
                    </td>

                    <td className="p-3">
                      {registration.registrationDate}
                    </td>

                    <td className="p-3">
                      {registration.attendee?.name}
                    </td>

                    <td className="p-3">
                      {registration.attendee?.email}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center text-gray-500 mt-5">
            Search an Event ID to view registrations.
          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default EventRegistrations;