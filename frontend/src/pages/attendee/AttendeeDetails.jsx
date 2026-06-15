import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAttendeeById } from "../../services/attendeeService";
import { Link } from "react-router-dom";

function AttendeeDetails() {

  const [id, setId] = useState("");
  const [attendee, setAttendee] = useState(null);

  const searchAttendee = async () => {

    try {

      const response = await getAttendeeById(id);

      setAttendee(response.data.data);

    } catch (error) {

      console.log(error);

      alert("Attendee Not Found");
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow">

        {/* Top Navigation */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <Link
            to="/attendees/create"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Create
          </Link>

          <Link
            to="/attendees/list"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            List
          </Link>

          {/* Active Page */}
          <Link
            to="/attendees/details"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            View
          </Link>

          <Link
            to="/attendees/update"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Update
          </Link>

        </div>

          <h2 className="text-2xl font-bold mb-4">
            Search Attendee
          </h2>

          <div className="flex gap-3">

            <input
              type="number"
              placeholder="Enter Attendee ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 border p-3 rounded"
            />

            <button
              onClick={searchAttendee}
              className="bg-green-600 text-white px-6 rounded"
            >
              Search
            </button>

          </div>

        </div>

        {attendee && (

          <div className="bg-white p-6 mt-5 rounded-xl shadow">

            <p>
              <strong>ID:</strong> {attendee.id}
            </p>

            <p>
              <strong>Name:</strong> {attendee.name}
            </p>

            <p>
              <strong>Email:</strong> {attendee.email}
            </p>

            <p>
              <strong>Phone:</strong> {attendee.phone}
            </p>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default AttendeeDetails;