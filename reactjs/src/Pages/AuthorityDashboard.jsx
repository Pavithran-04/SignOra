import { useEffect, useState, useCallback } from "react";
import useAuthorityService from "../hooks/useAuthorityService";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function AuthorityDashboard({ role }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const [requestData, setRequestData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("PENDING");

  const { isLoading, error, getRequestDetails, updateStatus } = useAuthorityService();

  // Fetch data function - can be called from anywhere
  const fetchFormData = useCallback(async () => {
    if (!id || !role) return;

    try {
      const response = await getRequestDetails({
        identifier: id,
        role: role,
      });

      // Safe fallback
      setRequestData(response.data?.requestForms || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [id, role]);

  // Fetch data on mount and when id/role changes
  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  // Handle approve/reject
  const handleStatusUpdate = async (requestId, isApproved) => {
    try {
      await updateStatus({
        requestId: requestId,
        isApproved: isApproved,
      });
      // Refetch data after status update
      await fetchFormData();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Filter data based on status
  const filteredData = requestData.filter((data) => {
    if (filterStatus === "PENDING") {
      return (
        data.status === "MOVED_TO_FACULTY" ||
        data.status === "MOVED_TO_HOD" ||
        data.status === "MOVED_TO_PRINCIPAL"
      );
    }

    if (filterStatus === "APPROVED") {
      return (
        data.status?.startsWith("APPROVED") ||
        data.status === "APPROVED_BY_FACULTY" ||
        data.status === "APPROVED_BY_HOD" ||
        data.status === "APPROVED_BY_PRINCIPAL"
      );
    }

    if (filterStatus === "REJECTED") {
      return (
        data.status?.startsWith("REJECTED") ||
        data.status === "REJECTED_BY_FACULTY" ||
        data.status === "REJECTED_BY_HOD" ||
        data.status === "REJECTED_BY_PRINCIPAL"
      );
    }

    return true;
  });

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    if (status?.startsWith("APPROVED")) return "badge bg-success";
    if (status?.startsWith("REJECTED")) return "badge bg-danger";
    if (
      status === "MOVED_TO_FACULTY" ||
      status === "MOVED_TO_HOD" ||
      status === "MOVED_TO_PRINCIPAL"
    ) {
      return "badge bg-warning";
    }
    return "badge bg-secondary";
  };

  // Check if form can be approved/rejected by current authority
  const canTakeAction = (status) => {
    if (role === "FACULTY") {
      return status === "MOVED_TO_FACULTY";
    }
    if (role === "HOD") {
      return status === "MOVED_TO_HOD";
    }
    if (role === "PRINCIPAL") {
      return status === "MOVED_TO_PRINCIPAL";
    }
    return false;
  };

  const getRoleDisplayName = () => {
    if (role === "FACULTY") return "Faculty";
    if (role === "HOD") return "HOD";
    if (role === "PRINCIPAL") return "Principal";
    return "Authority";
  };

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem("accessToken");
    // Navigate to login page
    navigate("/");
  };

  return (
    <div className="w-100 min-vh-100 p-4">
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "1000px", width: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">{getRoleDisplayName()} Dashboard</h2>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
          <p className="text-muted text-center mb-4">
            Review and manage request forms for approval or rejection.
          </p>

          {/* Filter Tabs */}
          <div className="mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    filterStatus === "PENDING" ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus("PENDING")}
                >
                  Pending
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${
                    filterStatus === "APPROVED" ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus("APPROVED")}
                >
                  Approved
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${
                    filterStatus === "REJECTED" ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus("REJECTED")}
                >
                  Rejected
                </button>
              </li>
            </ul>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">S.no</th>
                  <th scope="col">Request Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr key={data.id || index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link
                          to={`/form?formId=${data.id}`}
                          className="text-decoration-none text-primary fw-semibold"
                          style={{ cursor: "pointer" }}
                        >
                          {data.requestTitle}
                        </Link>
                      </td>
                      <td>
                        <span className={getStatusBadgeClass(data.status)}>
                          {data.status}
                        </span>
                      </td>
                      <td>
                        {canTakeAction(data.status) ? (
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleStatusUpdate(data.id, true)}
                              disabled={isLoading}
                            >
                              <i className="bi bi-check-circle me-1"></i>
                              Approve
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleStatusUpdate(data.id, false)}
                              disabled={isLoading}
                            >
                              <i className="bi bi-x-circle me-1"></i>
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted">No action available</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isLoading && (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorityDashboard;
