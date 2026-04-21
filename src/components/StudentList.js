import React, { useEffect, useState } from "react";
import API from "../services/api";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      {students.map((s) => (
        <p key={s.id}>{s.name} - {s.email}</p>
      ))}
    </div>
  );
}

export default StudentList;