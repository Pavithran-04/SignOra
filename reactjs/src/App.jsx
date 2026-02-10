import RequestForm from "./Component/RequestForm";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import AddCollege from "./Pages/AddCollege";
import AddDepartment from "./Pages/AddDepartment";
import AddBatch from "./Pages/AddBatch";
import AddAuthority from "./Pages/AddAuthority";
import AddStudent from "./Pages/AddStudent";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
      {/* <Route path="/staff" element={<StudentDashboard />} /> */}
      <Route path="/student/requestForm" element={<RequestForm />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="college/add" element={<AddCollege />} />
        <Route path="department/add" element={<AddDepartment />} />
        <Route path="batch/add" element={<AddBatch />} />
        <Route path="authority/add" element={<AddAuthority />} />
        <Route path="student/add" element={<AddStudent />} />
      </Route>
    </Routes>
  );
}

export default App;
