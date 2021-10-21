import axios from "axios";
import Utils from '@/config/utils.js';

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:8080/api/";
} else {
  baseurl = "/api/";
}

export const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true
  },
  transformRequest: (data, headers) => {
    let user = Utils.getStore("user");
    if (user != null) {
      let token = user.token;
      let authHeader = "";
      if (token != null && token != "") authHeader = "Bearer " + token;
      headers.common["Authorization"] = authHeader;
    }
      return JSON.stringify(data);
 
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
    if (!data.success && data.code == "expired-session") {
      localStorage.deleteItem("user");
    }
    return data;
  }
});


export default {
  getStudents(index) {
    return apiClient.get("students?index=" + index);
  },
  getStudent(id) {
    return apiClient.get("students/" + id);
  },
  addStudent(student) {
    return apiClient.post("students", student);
  },
  updateStudent(studentId, student) {
    return apiClient.put("students/" + studentId, student);
  },
  deleteStudent(studentId) {
    return apiClient.delete("students/" + studentId);
  },
};
