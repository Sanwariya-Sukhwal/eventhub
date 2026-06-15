import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createOrganizer } from "../../services/organizerService";

function CreateOrganizer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrganizer(formData);

      alert("Organizer Created Successfully");

      setFormData({
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
        
        {/* Top Navigation Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <Link
            to="/organizers/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Create
          </Link>

          <Link
            to="/organizers/view"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            View
          </Link>

        </div>

        <h2 className="text-2xl font-bold mb-6">
          Create Organizer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Organizer Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Organizer Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Create Organizer
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CreateOrganizer;