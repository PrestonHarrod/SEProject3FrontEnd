import {apiClient} from './apiClient.js'



export default {
  getCourses(index) {
    return apiClient.get("courses?index=" + index);
  },
  getCourse(id) {
    return apiClient.get("courses/" + id);
  },
  addCourse(course) {
    return apiClient.post("courses", course);
  },
  updateCourse(courseId, course) {
    return apiClient.put("courses/" + courseId, course);
  },
  deleteCourse(courseId) {
    return apiClient.delete("courses/" + courseId);
  },
};
