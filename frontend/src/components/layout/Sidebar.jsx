import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-3xl font-bold mb-10 text-center">
        EventHub
      </h1>

      <nav className="space-y-3">

        <Link
          to="/dashboard"
          className="block p-3 rounded hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/organizers/create"
          className="block p-3 rounded hover:bg-slate-800"
        >
          Organizer
        </Link>

        <Link
          to="/venues/create"
          className="block p-3 rounded hover:bg-slate-800"
        >
          Venue
        </Link>

        <Link
          to="/events/create"
          className="block p-3 rounded hover:bg-slate-800"
        >
          Event
        </Link>

        <Link
          to="/attendees/create"
          className="block p-3 rounded hover:bg-slate-800"
        >
          Attendee
        </Link>

        <Link
          to="/registrations/create"
          className="block p-3 rounded hover:bg-slate-800"
        >
          Registration
        </Link>

      </nav>
    </aside>
  );
}

export default Sidebar;