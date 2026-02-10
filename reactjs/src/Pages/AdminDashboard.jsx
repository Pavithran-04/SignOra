import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDashboard() {
  const [openCollege, setOpenCollege] = useState(false);
  const [openDept, setOpenDept] = useState(false);
  const [openBatch, setOpenBatch] = useState(false);
  const [openAuthority, setOpenAuthority] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);

  const location = useLocation();
  const showWelcome =
    location.pathname === "/admin" || location.pathname === "/admin/";

  const SIDEBAR_WIDTH = 250;

  return (
    <div>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 position-fixed top-0 start-0"
        style={{
          width: `${SIDEBAR_WIDTH}px`,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <h4 className="text-center mb-4">Admin Panel</h4>

        <button className="btn btn-dark w-100 text-start mb-2" onClick={() => setOpenCollege(!openCollege)}>
          College
        </button>
        {openCollege && (
          <div className="ps-3 mb-3">
            <Link to="college/add" className="submenu-link">Add College</Link>
            <Link to="college/update" className="submenu-link">Update College</Link>
            <Link to="college/delete" className="submenu-link">Delete College</Link>
          </div>
        )}

        <button className="btn btn-dark w-100 text-start mb-2" onClick={() => setOpenDept(!openDept)}>
          Department
        </button>
        {openDept && (
          <div className="ps-3 mb-3">
            <Link to="department/add" className="submenu-link">Add Department</Link>
            <Link to="department/update" className="submenu-link">Update Department</Link>
            <Link to="department/delete" className="submenu-link">Delete Department</Link>
          </div>
        )}

        <button className="btn btn-dark w-100 text-start mb-2" onClick={() => setOpenBatch(!openBatch)}>
          Batch
        </button>
        {openBatch && (
          <div className="ps-3 mb-3">
            <Link to="batch/add" className="submenu-link">Add Batch</Link>
            <Link to="batch/update" className="submenu-link">Update Batch</Link>
            <Link to="batch/delete" className="submenu-link">Delete Batch</Link>
          </div>
        )}

        <button className="btn btn-dark w-100 text-start mb-2" onClick={() => setOpenAuthority(!openAuthority)}>
          Authority
        </button>
        {openAuthority && (
          <div className="ps-3 mb-3">
            <Link to="authority/add" className="submenu-link">Add Authority</Link>
            <Link to="authority/update" className="submenu-link">Update Authority</Link>
            <Link to="authority/delete" className="submenu-link">Delete Authority</Link>
          </div>
        )}

        <button className="btn btn-dark w-100 text-start mb-2" onClick={() => setOpenStudent(!openStudent)}>
          Student
        </button>
        {openStudent && (
          <div className="ps-3">
            <Link to="student/add" className="submenu-link">Add Student</Link>
            <Link to="student/update" className="submenu-link">Update Student</Link>
            <Link to="student/delete" className="submenu-link">Delete Student</Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-5 bg-light d-flex align-items-center justify-content-center dashboard-fade"
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minHeight: "100vh",
        }}
      >
        <div className="container-fluid text-center">
          {showWelcome && (
            <>
              <h1 className="fw-bold mb-3">Welcome to Admin Dashboard</h1>
              <p className="text-muted mb-5 fs-5">
                Centralized control panel for managing academic structure.
              </p>

              <div className="row g-5 justify-content-center">
                {/* College */}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card shadow h-100 border-0 p-3 dash-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-semibold mb-3">College Management</h4>
                        <p className="text-muted">Create and maintain colleges.</p>
                        <ul className="text-start small text-muted ps-3">
                          <li>Add new colleges</li>
                          <li>Update college information</li>
                          <li>Remove outdated colleges</li>
                        </ul>
                      </div>
                      <Link to="college/add" className="btn btn-outline-dark w-100 mt-3">
                        Manage Colleges
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Department */}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card shadow h-100 border-0 p-3 dash-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-semibold mb-3">Department Management</h4>
                        <p className="text-muted">Organize departments.</p>
                        <ul className="text-start small text-muted ps-3">
                          <li>Create departments</li>
                          <li>Modify department details</li>
                          <li>Remove inactive departments</li>
                        </ul>
                      </div>
                      <Link to="department/add" className="btn btn-outline-dark w-100 mt-3">
                        Manage Departments
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Batch */}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card shadow h-100 border-0 p-3 dash-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-semibold mb-3">Batch Management</h4>
                        <p className="text-muted">Manage academic batches.</p>
                        <ul className="text-start small text-muted ps-3">
                          <li>Create new batches</li>
                          <li>Update batch years</li>
                          <li>Delete obsolete batches</li>
                        </ul>
                      </div>
                      <Link to="batch/add" className="btn btn-outline-dark w-100 mt-3">
                        Manage Batches
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Authority */}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card shadow h-100 border-0 p-3 dash-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-semibold mb-3">Authority Management</h4>
                        <p className="text-muted">Manage faculty & admins.</p>
                        <ul className="text-start small text-muted ps-3">
                          <li>Add authorities</li>
                          <li>Update authority details</li>
                          <li>Remove inactive authorities</li>
                        </ul>
                      </div>
                      <Link to="authority/add" className="btn btn-outline-dark w-100 mt-3">
                        Manage Authorities
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Student */}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card shadow h-100 border-0 p-3 dash-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="fw-semibold mb-3">Student Management</h4>
                        <p className="text-muted">Handle student profiles.</p>
                        <ul className="text-start small text-muted ps-3">
                          <li>Add students</li>
                          <li>Update student records</li>
                          <li>Remove inactive students</li>
                        </ul>
                      </div>
                      <Link to="student/add" className="btn btn-outline-dark w-100 mt-3">
                        Manage Students
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Wide SignOra Card */}
                <div className="col-xl-9 col-lg-8 col-md-12">
                  <div className="card shadow h-100 border-0 p-3 signora-card">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                      <h4 className="fw-semibold mb-3">SignOra – Online Approval System</h4>
                      <p className="text-muted mb-4" style={{ maxWidth: "600px" }}>
                        Students upload documents and approvals move digitally across authorities —
                        eliminating manual follow-ups and physical visits.
                      </p>

                      <div className="d-flex justify-content-center align-items-center gap-3 mt-3 flow-container">
                        <div className="flow-step">Student</div>
                        <div className="flow-arrow">➜</div>
                        <div className="flow-step delay-1">Faculty</div>
                        <div className="flow-arrow">➜</div>
                        <div className="flow-step delay-2">HOD</div>
                        <div className="flow-arrow">➜</div>
                        <div className="flow-step delay-3">Principal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>

      <style>{`
        .submenu-link {
          display: block;
          padding: 6px 10px;
          font-size: 0.9rem;
          color: #d1d1d1;
          text-decoration: none;
          border-left: 2px solid transparent;
          margin-bottom: 4px;
          transition: all 0.2s ease;
        }
        .submenu-link:hover {
          color: #ffffff;
          border-left: 2px solid #ffffff;
          background-color: rgba(255,255,255,0.05);
          padding-left: 14px;
        }

        .dashboard-fade {
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dash-card {
          transition: all 0.25s ease;
        }
        .dash-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 22px rgba(0,0,0,0.12);
        }

        .signora-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          transition: all 0.25s ease;
        }
        .signora-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(0,0,0,0.14);
        }

        .flow-step {
          padding: 10px 18px;
          border-radius: 22px;
          background: #212529;
          color: white;
          font-size: 0.85rem;
          opacity: 0.4;
          animation: stepPulse 6s infinite ease-in-out;
        }

        .flow-arrow {
          color: #6c757d;
          font-weight: bold;
        }

        .delay-1 { animation-delay: 1.5s; }
        .delay-2 { animation-delay: 3s; }
        .delay-3 { animation-delay: 4.5s; }

        @keyframes stepPulse {
          0%   { opacity: 0.4; transform: scale(1); }
          25%  { opacity: 1; transform: scale(1.05); }
          50%  { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
