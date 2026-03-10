import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "../Component/Toast";
import axiosInstance from "../api/CommonUrl";

export default function AddStudent() {

  const navigate = useNavigate();

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [rollNumber,setRollNumber] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);

  const [college,setCollege] = useState(null);
  const [department,setDepartment] = useState(null);
  const [batch,setBatch] = useState(null);

  const [collegeOptions,setCollegeOptions] = useState([]);
  const [departmentOptions,setDepartmentOptions] = useState([]);
  const [batchOptions,setBatchOptions] = useState([]);

  const [errors,setErrors] = useState({});
  const [toastMsg,setToastMsg] = useState("");
  const [toastType,setToastType] = useState("success");

  const nameRegex = /^[A-Za-z ]+$/;

  /* FETCH COLLEGES */

  useEffect(()=>{

    const fetchColleges = async()=>{

      try{

        const res = await axiosInstance.get("/admin/colleges");

        const options = res.data.collegeInfoList.map((c)=>({
          value:c.id,
          label:c.name,
          code:c.code
        }));

        setCollegeOptions(options);

      }catch(error){

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

      const options = res.data.departments.map((d)=>({
        value:d.id,
        label:d.name
      }));

      setDepartmentOptions(options);

    }catch(error){

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

      const options = batchList.map((b)=>({
        value:b.id,
        label:`${b.startYear} - ${b.endYear}`
      }));

      setBatchOptions(options);

    }catch(error){

      console.error(error);
      setToastType("error");
      setToastMsg("Failed to load batches");

    }

  };

  /* PASSWORD STRENGTH */

  const getPasswordStrength=(pwd)=>{

    let score=0;

    if(pwd.length>=8) score++;
    if(/[A-Z]/.test(pwd)) score++;
    if(/[a-z]/.test(pwd)) score++;
    if(/[0-9]/.test(pwd)) score++;
    if(/[^A-Za-z0-9]/.test(pwd)) score++;

    if(score<=2) return {label:"Weak",color:"danger"};
    if(score<=4) return {label:"Medium",color:"warning"};
    return {label:"Strong",color:"success"};

  };

  /* VALIDATION */

  const validateField=(field,value)=>{

    if(field==="firstName"){
      if(!value.trim()) return "First name is required";
      if(!nameRegex.test(value)) return "Only letters allowed";
    }

    if(field==="lastName"){
      if(!value.trim()) return "Last name is required";
      if(!nameRegex.test(value)) return "Only letters allowed";
    }

    if(field==="rollNumber"){
      if(!value.trim()) return "Roll number is required";
    }

    if(field==="username"){
      if(!value.trim()) return "Username required";
      if(value.length<4) return "Username must have at least 4 characters";
    }

    if(field==="password"){
      if(!value) return "Password required";
      if(getPasswordStrength(value).label==="Weak") return "Password too weak";
    }

    return "";

  };

  const handleValidation=(field,value)=>{

    const error = validateField(field,value);

    setErrors(prev=>({
      ...prev,
      [field]:error
    }));

  };

  /* COLLEGE CHANGE */

  const handleCollegeChange=(v)=>{

    setCollege(v);
    setDepartment(null);
    setBatch(null);

    setDepartmentOptions([]);
    setBatchOptions([]);

    if(v){
      fetchDepartments(v.value);
    }

  };

  /* DEPARTMENT CHANGE */

  const handleDepartmentChange=(v)=>{

    setDepartment(v);
    setBatch(null);
    setBatchOptions([]);

    if(v){
      fetchBatches(v.value);
    }

  };

  /* SUBMIT */

  const handleSubmit=(e)=>{

    e.preventDefault();

    const newErrors={
      firstName:validateField("firstName",firstName),
      lastName:validateField("lastName",lastName),
      rollNumber:validateField("rollNumber",rollNumber),
      username:validateField("username",username),
      password:validateField("password",password),
      college:!college?"College required":"",
      department:!department?"Department required":"",
      batch:!batch?"Batch required":""
    };

    setErrors(newErrors);

    if(Object.values(newErrors).some(err=>err)){
      setToastType("error");
      setToastMsg("Please fix validation errors");
      return;
    }


    console.log({
      firstName,
      lastName,
      rollNumber,
      username,
      password,
      collegeId:college.value,
      departmentId:department.value,
      batchId:batch.value
    });


    setToastType("success");
    setToastMsg("Student created successfully");

    setFirstName("");
    setLastName("");
    setRollNumber("");
    setUsername("");
    setPassword("");
    setCollege(null);
    setDepartment(null);
    setBatch(null);

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
        )
      }

      <div className="w-100 min-vh-100 p-4">

        <div className="d-flex align-items-center justify-content-center">

          <div
            className="card shadow border-0 p-5"
            style={{maxWidth:"700px",width:"100%"}}
          >

            <h2 className="fw-bold text-center mb-4">Add Student</h2>

            <p className="text-muted text-center mb-4">
              Create a new student by entering student details.
            </p>

            <form onSubmit={handleSubmit}>

              {/* FIRST NAME */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">First Name</label>

                <input
                  type="text"
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

              {/* LAST NAME */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">Last Name</label>

                <input
                  type="text"
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

              {/* ROLL NUMBER */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">Roll Number</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={rollNumber}
                  onChange={(e)=>{
                    setRollNumber(e.target.value);
                    handleValidation("rollNumber",e.target.value);
                  }}
                />

                {errors.rollNumber && (
                  <small className="text-danger">{errors.rollNumber}</small>
                )}

              </div>

              {/* USERNAME */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">Username</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e)=>{
                    setUsername(e.target.value);
                    handleValidation("username",e.target.value);
                  }}
                />

                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}

              </div>

              {/* PASSWORD */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">Password</label>

                <div className="input-group input-group-lg">

                  <input
                    type={showPassword?"text":"password"}
                    className="form-control"
                    value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value);
                      handleValidation("password",e.target.value);
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash":"bi-eye"}`}></i>
                  </button>

                </div>

                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}

                {password && (
                  <div className={`form-text text-${getPasswordStrength(password).color}`}>
                    Password strength: <b>{getPasswordStrength(password).label}</b>
                  </div>
                )}

              </div>

              {/* COLLEGE */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">College</label>

                <Select
                  options={collegeOptions}
                  value={college}
                  onChange={handleCollegeChange}
                  placeholder="Select college"
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

              {/* DEPARTMENT */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">Department</label>

                <Select
                  options={departmentOptions}
                  value={department}
                  onChange={handleDepartmentChange}
                  placeholder="Select department"
                  isSearchable
                  maxMenuHeight={160}
                  isDisabled={!college}
                />

              </div>

              {/* BATCH */}

              <div className="mb-4 text-start">

                <label className="form-label fw-semibold">Batch</label>

                <Select
                  options={batchOptions}
                  value={batch}
                  onChange={setBatch}
                  placeholder="Select batch"
                  isSearchable
                  maxMenuHeight={160}
                  isDisabled={!department}
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

