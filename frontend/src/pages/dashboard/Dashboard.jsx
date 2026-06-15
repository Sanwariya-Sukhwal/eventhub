import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import { getAllEvents } from "../../services/eventService";
import { getAllAttendees } from "../../services/attendeeService";
import { getAllVenues } from "../../services/venueService";

function Dashboard() {

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalVenues, setTotalVenues] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const eventsRes = await getAllEvents();
      const attendeesRes = await getAllAttendees();
      const venuesRes = await getAllVenues();

      console.log("Events:", eventsRes.data);
      console.log("Attendees:", attendeesRes.data);
      console.log("Venues:", venuesRes.data);

      setTotalEvents(
        eventsRes.data?.data?.totalElements ||
        eventsRes.data?.data?.content?.length ||
        0
      );

      setTotalAttendees(
        attendeesRes.data?.data?.totalElements ||
        attendeesRes.data?.data?.content?.length ||
        0
      );

      setTotalVenues(
        venuesRes.data?.data?.totalElements ||
        venuesRes.data?.data?.content?.length ||
        0
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Welcome to EventHub
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Total Events</h3>
          <p className="text-3xl font-bold mt-2">
            {totalEvents}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Total Attendees</h3>
          <p className="text-3xl font-bold mt-2">
            {totalAttendees}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3>Total Venues</h3>
          <p className="text-3xl font-bold mt-2">
            {totalVenues}
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;