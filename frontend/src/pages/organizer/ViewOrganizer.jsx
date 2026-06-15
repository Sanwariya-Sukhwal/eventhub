import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getOrganizerById } from "../../services/organizerService";
import { Link } from "react-router-dom";

function ViewOrganizer() {

  const [id, setId] = useState("");
  const [organizer, setOrganizer] = useState(null);

  const fetchOrganizer = async () => {
    try {
      const response = await getOrganizerById(id);

      setOrganizer(response.data.data);
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex gap-3 mb-6 flex-wrap">

        <Link
          to="/organizers/create"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Create
        </Link>

        <Link
          to="/organizers/view"
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          View
        </Link>

      </div>

        <h2 className="text-2xl font-bold mb-6">
          View Organizer
        </h2>

        <div className="flex gap-4 mb-6">

          <input
            type="number"
            placeholder="Enter Organizer Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={fetchOrganizer}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            Search
          </button>

        </div>

        {organizer && (
          <div className="border rounded-lg p-4">

            <p><strong>ID:</strong> {organizer.id}</p>
            <p><strong>Name:</strong> {organizer.name}</p>
            <p><strong>Email:</strong> {organizer.email}</p>
            <p><strong>Phone:</strong> {organizer.phone}</p>

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

export default ViewOrganizer;