import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAttendeeById,
  updateAttendee,
} from "../../services/attendeeService";

function UpdateAttendee() {
  const [attendeeId, setAttendeeId] = useState("");

  const [attendee, setAttendee] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setAttendee({
      ...attendee,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAttendee = async () => {
    try {
      const response = await getAttendeeById(attendeeId);

      const data = response.data.data;

      setAttendee({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
      alert("Attendee Not Found");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateAttendee(attendeeId, attendee);

      alert("Attendee Updated Successfully");
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

          <Link
            to="/attendees/details"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            View
          </Link>

          <Link
            to="/attendees/update"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Update
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Update Attendee
        </h2>

        <div className="flex gap-3 mb-5">
          <input
            type="number"
            placeholder="Enter Attendee ID"
            value={attendeeId}
            onChange={(e) =>
              setAttendeeId(e.target.value)
            }
            className="flex-1 border p-3 rounded"
          />

          <button
            onClick={fetchAttendee}
            className="bg-green-600 text-white px-6 rounded"
          >
            Search
          </button>
        </div>

        {attendee.name && (
          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              value={attendee.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="email"
              name="email"
              value={attendee.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="phone"
              value={attendee.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded"
            >
              Update Attendee
            </button>
          </form>
        )}

      </div>
    </DashboardLayout>
  );
}

export default UpdateAttendee;