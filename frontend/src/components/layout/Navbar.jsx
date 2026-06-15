import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes("organizers")) {
      return "Organizer Management";
    }

    if (path.includes("venues")) {
      return "Venue Management";
    }

    if (path.includes("events")) {
      return "Event Management";
    }

    if (path.includes("attendees")) {
      return "Attendee Management";
    }

    if (path.includes("registrations")) {
      return "Registration Management";
    }

    return "Dashboard";
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h2 className="text-2xl font-semibold">
        {getPageTitle()}
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;