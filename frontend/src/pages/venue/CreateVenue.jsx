import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createVenue } from "../../services/venueService";

function CreateVenue() {
  const [venue, setVenue] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const [createdVenue, setCreatedVenue] = useState(null);

  const handleChange = (e) => {
    setVenue({
      ...venue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createVenue(venue);

      setCreatedVenue(response.data.data);

      alert("Venue Created Successfully");

      setVenue({
        name: "",
        location: "",
        capacity: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex gap-3 mb-6 flex-wrap">

        <Link
          to="/venues/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
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
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          View
        </Link>

      </div>

        <h2 className="text-2xl font-bold mb-6">
          Create Venue
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Venue Name"
            value={venue.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Venue Location"
            value={venue.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={venue.capacity}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Create Venue
          </button>
        </form>

        {createdVenue && (
          <div className="mt-5 bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">
              Venue Created Successfully
            </h3>

            <p>ID: {createdVenue.id}</p>
            <p>Name: {createdVenue.name}</p>
            <p>Location: {createdVenue.location}</p>
            <p>Capacity: {createdVenue.capacity}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CreateVenue;