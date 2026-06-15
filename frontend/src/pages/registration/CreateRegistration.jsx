import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createRegistration } from "../../services/registrationService";

function CreateRegistration() {
  const [formData, setFormData] = useState({
    eventId: "",
    attendeeId: "",
  });

  const [registration, setRegistration] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createRegistration({
        eventId: Number(formData.eventId),
        attendeeId: Number(formData.attendeeId),
      });

      setRegistration(response.data.data);

      alert("Registration Created Successfully");

      setFormData({
        eventId: "",
        attendeeId: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl shadow">

        {/* Top Navigation */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <Link
            to="/registrations/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
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
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Event Registrations
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Create Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="number"
            name="eventId"
            placeholder="Event ID"
            value={formData.eventId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="attendeeId"
            placeholder="Attendee ID"
            value={formData.attendeeId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Register Attendee
          </button>
        </form>

        {registration && (
          <div className="mt-5 bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">
              Registration Created Successfully
            </h3>

            <p>ID: {registration.id}</p>

            {registration.event && (
              <p>Event ID: {registration.event.id}</p>
            )}

            {registration.attendee && (
              <p>Attendee ID: {registration.attendee.id}</p>
            )}

            {registration.registrationDate && (
              <p>
                Registration Date: {registration.registrationDate}
              </p>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default CreateRegistration;