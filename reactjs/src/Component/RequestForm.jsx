import { useState } from "react";

function RequestForm({ showModal, setShowModal }) {
  const [formData, setFormData] = useState({
    subject: "",
    requestBody: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setShowModal(false);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      {console.log("lskdnfkj")}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Application Form</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onclick={onClose}
            />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Request Body</label>
              <textarea
                className="form-control"
                rows="4"
                name="requestBody"
                value={formData.requestBody}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestForm;
