import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getRegistrationById,
  deleteRegistration,
} from "../../services/registrationService";

function RegistrationDetails() {
  const [id, setId] = useState("");
  const [registration, setRegistration] = useState(null);

  const searchRegistration = async () => {
    try {
      const response = await getRegistrationById(id);

      setRegistration(response.data.data);
    } catch (error) {
      console.log(error);

      setRegistration(null);

      alert("Registration Not Found");
    }
  };

  const handleDelete = async (registrationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRegistration(registrationId);

      alert("Registration Deleted Successfully");

      setRegistration(null);
      setId("");
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

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
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            View
          </Link>

          <Link
            to="/registrations/event"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Event Registrations
          </Link>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Search Registration
          </h2>

          <div className="flex gap-3">

            <input
              type="number"
              placeholder="Enter Registration ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 border p-3 rounded"
            />

            <button
              onClick={searchRegistration}
              className="bg-green-600 text-white px-6 rounded"
            >
              Search
            </button>

          </div>

        </div>

        {registration && (

          <div className="bg-white p-6 mt-5 rounded-xl shadow">

            <p>
              <strong>ID:</strong> {registration.id}
            </p>

            <p>
              <strong>Registration Date:</strong>{" "}
              {registration.registrationDate}
            </p>

            <p>
              <strong>Event:</strong>{" "}
              {registration.event?.title}
            </p>

            <p>
              <strong>Attendee:</strong>{" "}
              {registration.attendee?.name}
            </p>

            <button
              onClick={() =>
                handleDelete(registration.id)
              }
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-5"
            >
              Delete Registration
            </button>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default RegistrationDetails;