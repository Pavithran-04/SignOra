import { useState } from "react";
import RequestForm from "../Component/RequestForm";

function StudentDashboard() {
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const onClickApplicationForm = () => {
    // navigate("/student/requestForm");
    setShowModal(true);
  };

  // useEffect(() => {}, [showModal]);

  //   useEffect(() => {}, []);

  // const table = ()=>{

  // }

  return (
    <>
      <div>
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => onClickApplicationForm()}
        >
          Application Form
        </button>
      </div>
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              Pending
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Approved
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Rejected
            </a>
          </li>
        </ul>
      </div>
      {showModal && (
        <RequestForm showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
}

export default StudentDashboard;
