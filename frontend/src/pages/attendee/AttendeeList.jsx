import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAllAttendees,
  deleteAttendee,
} from "../../services/attendeeService";

function AttendeeList() {
  const [attendees, setAttendees] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadAttendees();
  }, [page]);

  const loadAttendees = async () => {
    try {
      const response = await getAllAttendees(page);
      setAttendees(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendee(id);

      alert("Attendee Deleted Successfully");

      loadAttendees();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
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
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
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
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Update
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Attendee List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">

            <thead>
              <tr className="bg-slate-200">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {attendees.length > 0 ? (
                attendees.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {attendee.id}
                    </td>

                    <td className="p-3">
                      {attendee.name}
                    </td>

                    <td className="p-3">
                      {attendee.email}
                    </td>

                    <td className="p-3">
                      {attendee.phone}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          handleDelete(attendee.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-4"
                  >
                    No Attendees Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex gap-3 mt-5">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className={`px-4 py-2 rounded ${
              page === 0
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300"
            }`}
          >
            Prev
          </button>

          <span className="flex items-center font-medium">
            Page {page + 1}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default AttendeeList;