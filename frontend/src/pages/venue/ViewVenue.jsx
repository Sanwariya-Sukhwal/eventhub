import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getVenueById } from "../../services/venueService";
import { Link } from "react-router-dom";

const ViewVenue = () => {

  const [id, setId] = useState("");
  const [venue, setVenue] = useState(null);

  const searchVenue = async () => {

    try {

      const response = await getVenueById(id);

      setVenue(response.data.data);

    } catch (error) {
      alert("Venue Not Found");
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex gap-3 mb-6 flex-wrap">

          <Link
            to="/venues/create"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Create
          </Link>

          <Link
            to="/venues/list"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            List
          </Link>

          <Link
            to="/venues/view"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            View
          </Link>

        </div>

          <h2 className="text-2xl font-bold mb-4">
            Search Venue
          </h2>

          <div className="flex gap-3">

            <input
              type="number"
              placeholder="Enter Venue ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 border p-3 rounded"
            />

            <button
              onClick={searchVenue}
              className="bg-green-600 text-white px-6 rounded"
            >
              Search
            </button>

          </div>

        </div>

        {venue && (

          <div className="bg-white p-6 mt-5 rounded-xl shadow">

            <p><strong>ID:</strong> {venue.id}</p>
            <p><strong>Name:</strong> {venue.name}</p>
            <p><strong>Location:</strong> {venue.location}</p>
            <p><strong>Capacity:</strong> {venue.capacity}</p>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default ViewVenue;