import { Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Organizer
import CreateOrganizer from "../pages/organizer/CreateOrganizer";
import ViewOrganizer from "../pages/organizer/ViewOrganizer";

// Venue
import CreateVenue from "../pages/venue/CreateVenue";
import ViewVenue from "../pages/venue/ViewVenue";
import VenueList from "../pages/venue/VenueList";

// Event
import CreateEvent from "../pages/event/CreateEvent";
import EventList from "../pages/event/EventList";
import EventDetails from "../pages/event/EventDetails";
import UpdateEvent from "../pages/event/UpdateEvent";
import EventAttendees from "../pages/event/EventAttendees";

// Attendee
import CreateAttendee from "../pages/attendee/CreateAttendee";
import AttendeeList from "../pages/attendee/AttendeeList";
import AttendeeDetails from "../pages/attendee/AttendeeDetails";
import UpdateAttendee from "../pages/attendee/UpdateAttendee";

// Registration
import CreateRegistration from "../pages/registration/CreateRegistration";
import RegistrationDetails from "../pages/registration/RegistrationDetails";
import EventRegistrations from "../pages/registration/EventRegistrations";


function AppRoutes() {
  return (
    <Routes>

      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Organizer */}
      <Route path="/organizers/create" element={<CreateOrganizer />}/>
      <Route path="/organizers/view" element={<ViewOrganizer />}/>
      
      {/* Venue */}
      <Route path="/venues/create" element={<CreateVenue />}/>
      <Route path="/venues/view" element={<ViewVenue />} />
      <Route path="/venues/list" element={<VenueList />} />
      
      {/* Event */}
      <Route path="/events/create" element={<CreateEvent />} />
      <Route path="/events/list" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/events/update" element={<UpdateEvent />} />
      <Route path="/events/attendees"  element={<EventAttendees />} />

      {/* Attendee */}
      <Route path="/attendees/create"  element={<CreateAttendee />} />
      <Route  path="/attendees/list"  element={<AttendeeList />}  />
      <Route path="/attendees/details"  element={<AttendeeDetails />} />
      <Route path="/attendees/update"  element={<UpdateAttendee />} />


      {/* Registration */}
      <Route path="/registrations/create" element={<CreateRegistration />} />
      <Route  path="/registrations/details"  element={<RegistrationDetails />} />
      <Route  path="/registrations/event"  element={<EventRegistrations />}  />
    </Routes>
  );
}

export default AppRoutes;