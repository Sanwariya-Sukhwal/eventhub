import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllVenues } from "../../services/venueService";
import { Link } from "react-router-dom";

const VenueList = () => {

  const [venues, setVenues] = useState([]);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {

    try {

      const response = await getAllVenues();

      setVenues(response.data.data.content);

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
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Create
        </Link>

        <Link
          to="/venues/list"
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
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

        <h2 className="text-2xl font-bold mb-5">
          Venue List
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full border border-gray-300">

            <thead>
              <tr className="bg-slate-200">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Capacity</th>
              </tr>
            </thead>

            <tbody>

              {venues.map((venue) => (

                <tr key={venue.id}>

                  <td className="p-3">{venue.id}</td>
                  <td className="p-3">{venue.name}</td>
                  <td className="p-3">{venue.location}</td>
                  <td className="p-3">{venue.capacity}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default VenueList;