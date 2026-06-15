import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col bg-slate-100">

        <Navbar />

        <main className="flex-1 p-6">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default DashboardLayout;