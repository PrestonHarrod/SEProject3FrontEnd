import {apiClient} from "./apiClient.js";
export default {
  getStudents(index) {
    return apiClient.get("students?index=" + index);
  },
  getStudent(id) {
    return apiClient.get("students/" + id);
  },
  addStudent(student) {

    return apiClient.post("students/", student);
  },
  updateStudent(student) {
    return apiClient.put("students/" + student.id, student);
  },
  deleteStudent(id) {
    return apiClient.delete("students/" + id);
  }

}
