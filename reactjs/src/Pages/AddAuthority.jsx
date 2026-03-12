import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "../Component/Toast";
import axiosInstance from "../api/CommonUrl";

export default function AddAuthority() {

const navigate = useNavigate();

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [employeeId,setEmployeeId] = useState("");

const [designation,setDesignation] = useState(null);

const [college,setCollege] = useState(null);
const [department,setDepartment] = useState(null);
const [batch,setBatch] = useState(null);

const [isAdvisor,setIsAdvisor] = useState(false);

const [collegeOptions,setCollegeOptions] = useState([]);
const [departmentOptions,setDepartmentOptions] = useState([]);
const [batchOptions,setBatchOptions] = useState([]);

const [errors,setErrors] = useState({});
const [toastMsg,setToastMsg] = useState("");
const [toastType,setToastType] = useState("success");

const nameRegex = /^[A-Za-z ]+$/;

const designationOptions = [
{ value:"FACULTY",label:"Faculty"},
{ value:"HOD",label:"HOD"},
{ value:"PRINCIPAL",label:"Principal"}
];

/* FETCH COLLEGES */

useEffect(()=>{

const fetchColleges = async()=>{

try{

const res = await axiosInstance.get("/admin/colleges");

const options = res.data.collegeInfoList.map(c=>({
value:c.id,
label:c.name,
code:c.code
}));

setCollegeOptions(options);

}
catch(error){

console.error(error);
setToastType("error");
setToastMsg("Failed to load colleges");

}

};

fetchColleges();

},[]);

/* FETCH DEPARTMENTS */

const fetchDepartments = async(collegeId)=>{

try{

const res = await axiosInstance.get(`/admin/departments?collegeId=${collegeId}`);

const options = res.data.departments.map(d=>({
value:d.id,
label:d.name
}));

setDepartmentOptions(options);

}
catch(error){

console.error(error);
setToastType("error");
setToastMsg("Failed to load departments");

}

};

/* FETCH BATCHES */

const fetchBatches = async(departmentId)=>{

try{

const res = await axiosInstance.get(`/admin/batch-details?departmentId=${departmentId}`);

const batchList = res.data.batchDetailsByDepartment.batchDetails || [];

const options = batchList.map(b=>({
value:b.id,
label:`${b.startYear} - ${b.endYear}`
}));

setBatchOptions(options);

}
catch(error){

console.error(error);
setToastType("error");
setToastMsg("Failed to load batches");

}

};

/* VALIDATION */

const validateField = (field,value)=>{

if(field==="firstName"){
if(!value.trim()) return "First name is required";
if(!nameRegex.test(value)) return "Only letters allowed";
}

if(field==="lastName"){
if(!value.trim()) return "Last name is required";
if(!nameRegex.test(value)) return "Only letters allowed";
}

if(field==="employeeId"){
if(!value.trim()) return "Employee ID is required";
}

if(field==="designation"){
if(!value) return "Designation required";
}

return "";

};

const handleValidation = (field,value)=>{

const error = validateField(field,value);

setErrors(prev=>({
...prev,
[field]:error
}));

};

/* COLLEGE CHANGE */

const handleCollegeChange = (v)=>{

setCollege(v);

setDepartment(null);
setBatch(null);
setIsAdvisor(false);

setDepartmentOptions([]);
setBatchOptions([]);

if(v) fetchDepartments(v.value);

};

/* DEPARTMENT CHANGE */

const handleDepartmentChange = (v)=>{

setDepartment(v);

setBatch(null);
setBatchOptions([]);

setIsAdvisor(false);

if(v) fetchBatches(v.value);

};

/* SUBMIT */

const handleSubmit = async(e)=>{

e.preventDefault();

const newErrors = {

firstName:validateField("firstName",firstName),
lastName:validateField("lastName",lastName),
employeeId:validateField("employeeId",employeeId),
designation:validateField("designation",designation),

college:!college ? "College required" : "",

department:
designation?.value !== "PRINCIPAL" && !department
? "Department required"
: ""

};

setErrors(newErrors);

if(Object.values(newErrors).some(err=>err)){
setToastType("error");
setToastMsg("Please fix validation errors");
return;
}

try{

const payload = {

firstName,
lastName,
employeeId,
designation:designation.value,
collegeId:college.value,
departmentId:department?.value || null,
batchId:isAdvisor ? batch?.value || null : null

};

const response = await axiosInstance.post("/admin/authority",payload);

const data = response.data;

if(data?.status==="Bad Request" && data?.validationErrorInfo?.length>0){

setToastType("error");
setToastMsg(data.validationErrorInfo[0].message);
return;

}

setToastType("success");
setToastMsg("Authority created successfully");

setFirstName("");
setLastName("");
setEmployeeId("");

setDesignation(null);
setCollege(null);
setDepartment(null);
setBatch(null);

setIsAdvisor(false);

setDepartmentOptions([]);
setBatchOptions([]);

}
catch(error){

console.error(error);

if(error?.response?.data?.validationErrorInfo?.length>0){

setToastMsg(error.response.data.validationErrorInfo[0].message);

}
else if(error?.response?.data?.message){

setToastMsg(error.response.data.message);

}
else{

setToastMsg("FAILED TO CREATE AUTHORITY");

}

setToastType("error");

}

};

return(

<>

{toastMsg &&
ReactDOM.createPortal(

<div className="content-success-overlay">

<Toast
message={toastMsg}
type={toastType}
onClose={()=>setToastMsg("")}
duration={3000}
/>

</div>,

document.getElementById("content-overlay-root")

)}

<div className="w-100 min-vh-100 p-4">

<div className="d-flex align-items-center justify-content-center">

<div
className="card shadow border-0 p-5"
style={{maxWidth:"700px",width:"100%"}}
>

<h2 className="fw-bold text-center mb-4">Add Authority</h2>

<form onSubmit={handleSubmit}>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">First Name</label>
<input
className="form-control form-control-lg"
value={firstName}
onChange={(e)=>{
setFirstName(e.target.value);
handleValidation("firstName",e.target.value);
}}
/>
{errors.firstName && (
<small className="text-danger">{errors.firstName}</small>
)}
</div>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">Last Name</label>
<input
className="form-control form-control-lg"
value={lastName}
onChange={(e)=>{
setLastName(e.target.value);
handleValidation("lastName",e.target.value);
}}
/>
{errors.lastName && (
<small className="text-danger">{errors.lastName}</small>
)}
</div>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">Employee ID</label>
<input
className="form-control form-control-lg"
value={employeeId}
onChange={(e)=>{
setEmployeeId(e.target.value);
handleValidation("employeeId",e.target.value);
}}
/>
{errors.employeeId && (
<small className="text-danger">{errors.employeeId}</small>
)}
</div>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">Designation</label>
<Select
options={designationOptions}
value={designation}
onChange={(v)=>{
setDesignation(v);
handleValidation("designation",v);
}}
isSearchable
maxMenuHeight={160}
/>
</div>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">College</label>
<Select
options={collegeOptions}
value={college}
onChange={handleCollegeChange}
isSearchable
maxMenuHeight={160}
formatOptionLabel={(option)=>(
<div className="d-flex justify-content-between">
<span>{option.label}</span>
<span className="text-muted">{option.code}</span>
</div>
)}
/>
</div>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">Department</label>
<Select
options={departmentOptions}
value={department}
onChange={handleDepartmentChange}
isSearchable
maxMenuHeight={160}
isDisabled={!college}
/>
</div>

<div className="form-check mb-4 text-start">
<input
className="form-check-input"
type="checkbox"
checked={isAdvisor}
disabled={!designation || !department}
onChange={(e)=>{
setIsAdvisor(e.target.checked);
if(!e.target.checked){
setBatch(null);
}
}}
/>
<label className="form-check-label fw-semibold">
Faculty Advisor
</label>
</div>

<div className="mb-4 text-start">
<label className="form-label fw-semibold">Batch</label>
<Select
options={batchOptions}
value={batch}
onChange={setBatch}
isSearchable
maxMenuHeight={160}
isDisabled={!isAdvisor}
/>
</div>

<div className="d-flex gap-3 mt-4">

<button type="submit" className="btn btn-dark w-50 py-2">
Create
</button>

<button
type="button"
className="btn btn-outline-dark w-50 py-2"
onClick={()=>navigate("/admin")}
>
Cancel
</button>

</div>

</form>

</div>

</div>

</div>

</>

);

}