import {apiClient} from "./apiClient.js";

export default {

  login(authToken) {
    console.log(authToken)
    return apiClient.post("/auth/login/", authToken);
  }

};