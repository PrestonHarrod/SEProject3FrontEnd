import {apiClient} from './apiClient.js'




export default {
  getCourses() {
    return apiClient.get("/courses");
  },
  getCourse(id) {
    return apiClient.get("courses/" + id);
  },
  addCourse(course) {
    return apiClient.post("courses/", course);
  },
  updateCourse(course) {
    return apiClient.put("courses/" + course.courseID, course);
  },
  deleteCourse(courseID) {
    return apiClient.delete("courses/" + courseID);
  },
  getStudents(index) {
    return apiClient.get("students?index=" + index);
  },
  addStudent(student) {
    return apiClient.post("students/", student);
  },
  getStudent(id) {
    return apiClient.get("students/" + id);
  },
  updateStudent(student) {
    return apiClient.put("students/" + student.studentID, student);
  },
  deleteStudent(studentID) {
    return apiClient.delete("students/" + studentID);
  },
  getAdvisors(index) {
    return apiClient.get("advisors?index=" + index);
  },
  addAdvisor(student) {
    return apiClient.post("advisors/", student);
  },
  getAdvisor(id) {
    return apiClient.get("advisors/" + id);
  },
  updateAdvisor(advisor) {
    return apiClient.put("advisors/" + advisor.advisorID, advisor);
  },
  deleteAdvisor(advisorID) {
    return apiClient.delete("advisors/" + advisorID);
  },
  getDegrees(index) {
    return apiClient.get("degrees?index=" + index);
  },
  addDegree(degree) {
    return apiClient.post("degrees/", degree);
  },
  getDegree(id) {
    return apiClient.get("degrees/" + id);
  },
  updateDegree(degree) {
    return apiClient.put("degrees/" + degree.degreeID, degree);
  },
  deleteDegree(degreeID) {
    return apiClient.delete("degrees/" + degreeID);
  },
  getSemesters(index) {
    return apiClient.get("semesters?index=" + index);
  },
  addSemester(semester) {
    return apiClient.post("semesters/", semester);
  },
  getSemester(id) {
    return apiClient.get("semesters/" + id);
  },
  updateSemester(semester) {
    return apiClient.put("semesters/" + semester.semesterID, semester);
  },
  deleteSemester(semesterID) {
    return apiClient.delete("semesters/" + semesterID);
  },
};
