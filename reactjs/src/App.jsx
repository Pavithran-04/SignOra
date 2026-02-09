import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import RequestForm from "./Component/RequestForm";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
      {/* <Route path="/staff" element={<StudentDashboard />} /> */}
      <Route path="/student/requestForm" element={<RequestForm />} />
    </Routes>
  );
}

export default App;
