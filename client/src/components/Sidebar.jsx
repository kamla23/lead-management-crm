
import { LayoutDashboard, Users, BarChart3 } from "lucide-react";
import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  return (
    <>

      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-logo">
          <h2>
            <span className="insta">Insta</span>
            <span className="crm">CRM</span>
          </h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("dashboard");
              setIsOpen(false);
            }}
          >
            <LayoutDashboard className="nav-icon" />
            Dashboard
          </button>

          <button
            className={`nav-btn ${activeTab === "leads" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("leads");
              setIsOpen(false);
            }}
          >
            <Users className="nav-icon" />
            All Leads
          </button>

          <button
            className={`nav-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("analytics");
              setIsOpen(false);
            }}
          >
            <BarChart3 className="nav-icon" />
            Analytics
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;