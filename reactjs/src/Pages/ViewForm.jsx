import { useSearchParams } from "react-router-dom";
import useStudentService from "../hooks/useStudentService";
import { useEffect } from "react";

function ViewForm() {
  const { getForm } = useStudentService();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("id");
  const [formData, setFormData] = useEffect();

  useEffect(() => {
    const response = getForm(formId);
    setFormData(response.data);
  }, []);

  return (
    <div>
      <h3>Form Details</h3>
      <div>
        <label id="RequestTitle" />
        <div>{formData.requestTitle}</div>
      </div>
    </div>
  );
}

export default ViewForm;
