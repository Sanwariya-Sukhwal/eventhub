import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createAttendee } from "../../services/attendeeService";

function CreateAttendee() {
  const [attendee, setAttendee] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [createdAttendee, setCreatedAttendee] = useState(null);

  const handleChange = (e) => {
    setAttendee({
      ...attendee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAttendee(attendee);

      setCreatedAttendee(response.data.data);

      alert("Attendee Created Successfully");

      setAttendee({
        name: "",
        email: "",
        phone: "",
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
            to="/attendees/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Create
          </Link>

          <Link
            to="/attendees/list"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            List
          </Link>

          <Link
            to="/attendees/details"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            View
          </Link>

          <Link
            to="/attendees/update"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Update
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-5">
          Create Attendee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={attendee.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={attendee.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={attendee.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Create Attendee
          </button>
        </form>

        {createdAttendee && (
          <div className="mt-5 bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">
              Attendee Created Successfully
            </h3>

            <p>ID: {createdAttendee.id}</p>
            <p>Name: {createdAttendee.name}</p>
            <p>Email: {createdAttendee.email}</p>
            <p>Phone: {createdAttendee.phone}</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default CreateAttendee;