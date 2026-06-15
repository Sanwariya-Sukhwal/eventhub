function Footer() {
  return (
    <footer className="bg-white border-t shadow-sm py-4 px-6">

      <div className="grid md:grid-cols-3 gap-4 text-sm">

        <div>
          <h3 className="font-semibold">EventHub</h3>
          <p className="text-gray-500">
            Manage Events, Venues, Attendees and Registrations.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Modules</h3>
          <p className="text-gray-500">
            Organizer • Venue • Event • Attendee • Registration
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500">
            © 2026 EventHub
          </p>
          <p className="text-gray-500">
            React + Spring Boot
          </p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;