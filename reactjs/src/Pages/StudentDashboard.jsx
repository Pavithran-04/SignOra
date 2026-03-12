import { useEffect, useState, useCallback } from "react";
import RequestForm from "../Component/RequestForm";
import useStudentService from "../hooks/useStudentService";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function StudentDashboard({ role }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId") || id;

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [driveLink, setDriveLink] = useState("");
  const [requestData, setRequestData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("PENDING");
  const [studentInfo, setStudentInfo] = useState({ name: "", rollNo: "" });

  const { isLoading, error, getRequestDetails, getStudent, uploadCertificate } =
    useStudentService();

  const onClickApplicationForm = () => {
    setShowModal(true);
  };

  // Fetch data: use id for forms API, userId for getStudent API
  const fetchFormData = useCallback(async () => {
    if (!id || !role) return;

    try {
      const response = await getRequestDetails({
        identifier: id,
        role: role,
      });
      setRequestData(response.data?.requestForms || []);

      if (userId) {
        try {
          const studentResponse = await getStudent({ studentId: userId });
          const studentData = studentResponse.data;
          if (studentData) {
            const fullName =
              `${studentData.firstName || ""} ${studentData.lastName || ""}`.trim();
            setStudentInfo({
              name: fullName,
              rollNo: studentData.rollNo || "",
            });
          }
        } catch (err) {
          console.error("Error calling getStudent API:", err);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [id, role, userId]);

  useEffect(() => {
    if (!submitMessage) return;
    const timer = setTimeout(() => setSubmitMessage(null), 6000);
    return () => clearTimeout(timer);
  }, [submitMessage]);

  // Fetch data on mount and when id/role changes
  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  // Filter directly (no extra state needed)
  // const filteredData = requestData.filter(
  //   (data) => data.status === 'PENDING'
  //   return
  // );

  const filteredData = requestData.filter((data) => {
    if (filterStatus === "PENDING") {
      return data.status.startsWith("MOVED");
    }

    if (filterStatus === "APPROVED") {
      return data.status.startsWith("APPROVED");
    }

    if (filterStatus === "REJECTED") {
      return data.status.startsWith("REJECTED");
    }

    return true;
  });

  const getStatusBadgeClass = (status) => {
    if (status?.startsWith("APPROVED")) return "badge bg-success";
    if (status?.startsWith("REJECTED")) return "badge bg-danger";
    if (status?.startsWith("MOVED")) return "badge bg-warning";
    return "badge bg-secondary";
  };

  const formatStatus = (status) => {
    if (!status) return "";
    return status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleLogout = () => {
    // Clear authentication tokens and user data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("studentInfo");
    // Navigate to login page
    navigate("/");
  };

  const handleUploadClick = (request) => {
    setSelectedRequest(request);
    setDriveLink(request.certificateLink || "");
    setShowUploadModal(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!driveLink.trim()) {
      alert("Please enter a valid drive link");
      return;
    }

    try {
      await uploadCertificate({
        requestId: selectedRequest.id,
        link: driveLink.trim(),
      });
      setShowUploadModal(false);
      setDriveLink("");
      setSelectedRequest(null);
      fetchFormData();
      alert("Certificate link uploaded successfully!");
    } catch (err) {
      console.error("Error uploading certificate:", err);
      alert("Failed to upload certificate link. Please try again.");
    }
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setDriveLink("");
    setSelectedRequest(null);
  };

  return (
    <div className="w-100 min-vh-100 p-4">
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "1000px", width: "100%" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">Student Dashboard</h2>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>

          {/* Student Information and Application Form Button */}
          <div className="mb-4 d-flex justify-content-between align-items-center p-3 bg-light rounded">
            {(studentInfo.name || studentInfo.rollNo) && (
              <div className="fw-bold fs-5 mb-0">
                {studentInfo.name || ""} {studentInfo.name && studentInfo.rollNo ? " / " : ""} {studentInfo.rollNo || ""}
              </div>
            )}
            <button
              type="button"
              className="btn btn-dark py-2"
              onClick={onClickApplicationForm}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Application Form
            </button>
          </div>

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
                  {filterStatus.startsWith("APPROVED") && (
                    <th scope="col">Certificate Upload</th>
                  )}
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
                          {formatStatus(data.status)}
                        </span>
                      </td>
                      {filterStatus.startsWith("APPROVED") && (
                        <td>
                          {data.certificateLink ? (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleUploadClick(data)}
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Edit
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleUploadClick(data)}
                            >
                              <i className="bi bi-plus-circle me-1"></i>
                              Add
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={filterStatus.startsWith("APPROVED") ? 4 : 3}
                      className="text-center py-5 text-muted"
                    >
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

      {showModal && (
        <RequestForm
          showModal={showModal}
          setShowModal={setShowModal}
          onFormSubmitted={fetchFormData}
          onSubmitSuccess={() =>
            setSubmitMessage(
              "Your application has been submitted successfully. It will be reviewed by the authorities."
            )
          }
        />
      )}

      {submitMessage && (
        <div
          className="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow"
          style={{ zIndex: 1050, minWidth: "320px", maxWidth: "90vw" }}
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          {submitMessage}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setSubmitMessage(null)}
          />
        </div>
      )}

      {/* Upload Certificate Modal */}
      {showUploadModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-cloud-upload me-2"></i>
                  Upload Certificate Drive Link
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseUploadModal}
                ></button>
              </div>
              <form onSubmit={handleUploadSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="requestTitle" className="form-label fw-semibold">
                      Request Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="requestTitle"
                      value={selectedRequest?.requestTitle || ""}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="driveLink" className="form-label fw-semibold">
                      Google Drive Link <span className="text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="driveLink"
                      placeholder="https://drive.google.com/..."
                      value={driveLink}
                      onChange={(e) => setDriveLink(e.target.value)}
                      required
                    />
                    <div className="form-text">
                      <i className="bi bi-info-circle me-1"></i>
                      Paste your Google Drive shareable link here
                    </div>
                  </div>
                  <div className="alert alert-info mb-0">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Tip:</strong> Make sure your Google Drive file is set to "Anyone with the link can view"
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseUploadModal}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading || !driveLink.trim()}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Upload Link
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
