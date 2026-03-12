import RequestForm from "./Component/RequestForm";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import AuthorityDashboard from "./Pages/AuthorityDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import AddCollege from "./Pages/AddCollege";
import AddDepartment from "./Pages/AddDepartment";
import AddBatch from "./Pages/AddBatch";
import AddAuthority from "./Pages/AddAuthority";
import AddStudent from "./Pages/AddStudent";
import RegisterAuthority from "./Pages/RegisterAuthority";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student" element={<StudentDashboard role="STUDENT" />} />
      <Route path="/faculty" element={<AuthorityDashboard role="FACULTY" />} />
      <Route path="/hod" element={<AuthorityDashboard role="HOD" />} />
      <Route path="/principal" element={<AuthorityDashboard role="PRINCIPAL" />} />
      <Route path="/student/requestForm" element={<RequestForm />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="college/add" element={<AddCollege />} />
        <Route path="department/add" element={<AddDepartment />} />
        <Route path="batch/add" element={<AddBatch />} />
        <Route path="authority/add" element={<AddAuthority />} />
        <Route path="authority/register" element={<RegisterAuthority />} />
        <Route path="student/add" element={<AddStudent />} />
      </Route>
    </Routes>
  );
}

export default App;
