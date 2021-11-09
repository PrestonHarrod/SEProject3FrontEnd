<template>
   <div style="background-color: #811429; height: 665px">
      <v-container>
         <v-row>
            <v-col>
               <H1 style="color: white" v-if=user>Welcome, {{user.user}}</H1>
               <H1 style="color: white" v-else> {{ message }} </H1>
               <div class="v-main__wrap">
                  <div class="container">
                     <div class="row">
                         <div v-if="getAuth() == 0" class="col col-4" />
                        <div v-if="getAuth() > 1" class="col col-4">
                           <div  class="v-card v-sheet theme--light" style="cursor: grab"  v-on:click.prevent="goToStudents()">
                              <v-img style="margin-left: 22%; margin-right: 20%"  max-width="200" max-height="200" src="@/assets/student.png" />
                              <H2 style="text-align: center"> Students </H2>
                           </div>
                        </div>
                        <div v-if="getAuth() > 1" class="col col-4">
                           <div v-if="getAuth() > 1" class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="goToAdvisors()">
                              <v-img style="margin-left: 22%; margin-right: 20%" max-width="200" max-height="200" src="@/assets/teacher.png" />
                              <H2 style="text-align: center"> Advisors </H2>
                           </div>
                        </div>
                        <div class="col col-4">
                           <div v-if="getAuth() > 0" class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="goToCourses()">
                              <v-img style="margin-left: 22%; margin-right: 20%" max-width="200" max-height="200" src="@/assets/course.png" />
                              <H2 style="text-align: center"> Courses </H2>
                           </div>
                        </div>
                        <div class="col col-4">
                           <div v-if="getAuth() > 0" class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="goToDegrees()">
                              <v-img style="margin-left: 22%; margin-right: 20%"  max-width="200" max-height="200" src="@/assets/degree.png" />
                              <H2 style="text-align: center"> Degrees </H2>
                           </div>
                        </div>
                        <div class="col col-4">
                           <div v-if="getAuth() > 0" class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="goToSemesters()">
                              <v-img style="margin-left: 22%; margin-right: 20%" max-width="200" max-height="200" src="@/assets/semester.png" />
                              <H2 style="text-align: center"> Semesters </H2>
                           </div>
                        </div>
                        <div v-if="getAuth() == 1" class="col col-4"/>
                        <div class="col col-4">
                           <div v-if="getAuth() == 0" class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="loginWithGoogle()()">
                              <v-img style="margin-left: 25%; margin-right: 20%" max-width="200" max-height="200" src="@/assets/login.png" />
                              <H2 style="text-align: center"> Login </H2>
                           </div>
                           <div v-else class="v-card v-sheet theme--light" style="cursor: grab" v-on:click.prevent="goToLogin()">
                              <v-img style="margin-left: 25%; margin-right: 20%" max-width="200" max-height="200" src="@/assets/logout.png" />
                              <H2 style="text-align: center"> Logout </H2>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script>
import Utils from '@/config/utils.js';
import StudentServices from '@/services/studentServices.js';
import AdvisorServices from '@/services/advisorServices.js';
import AuthServices from '@/services/AuthServices.js';


export default {

    data() {
        return {
            user: {},
            message: "Please log in"
        };
    },
    async created() {
        this.user = Utils.getStore('user');
        if (this.user != null && this.user.advisorID != null) {
            await AdvisorServices.getAdvisor(this.user.advisorID)
                .catch(() => {
                    Utils.setStore("user", null);
                    this.$router.push({
                        name: 'home'
                    });
                });
        } else {
            if (this.user != null && this.user.studentID != null) {
                await StudentServices.getStudent(this.user.studentID)
                    .catch(() => {
                        Utils.setStore("user", null);
                        this.$router.push({
                            name: 'home'
                        });
                    });
            }
        }
    },
    methods: {
        loginWithGoogle() {
            this.$gAuth.signIn()
                .then(GoogleUser => {
                    // on success do something
                    console.log('GoogleUser', GoogleUser);
                    console.log('getId', GoogleUser.getId());
                    console.log('getBasicProfile', GoogleUser.getBasicProfile());
                    console.log('getAuthResponse', GoogleUser.getAuthResponse());

                    var userInfo = {
                        email: GoogleUser.getBasicProfile().Wt,
                        accessToken: GoogleUser.getAuthResponse().id_token
                    };
                    AuthServices.login(userInfo)
                        .then(response => {
                            var user = response.data;
                            console.log("Returned User:" + user);
                            //               this.$store.commit('setLoginUser', user);
                            Utils.setStore("user", user);
                            location.reload();
                        })
                        .catch(error => {
                            console.log(error);
                            this.message = error.response.data.message;
                        });
                })
                .catch(error => {
                    console.log('error login', error);
                })
        },
        getAuth() {
            if (this.user == null)
                return 0;
            else if (this.user.adminID != null)
                return 3;
            else if (this.user.advisorID != null)
                return 2;
            else
                return 1;
        },
        goToHome() {
            this.$router.push({
                    name: 'home'
                })
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })
        },
        goToCourses() {
            this.$router.push({
                    name: 'courses'
                })
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })
        },
        goToStudents() {
            this.$router.push({
                    name: 'studentlist'
                })
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })
        },
        goToAdvisors() {
            this.$router.push({
                    name: 'advisorlist'
                })
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })
        },
        goToDegrees() {
            this.$router.push({
                    name: 'degreelist'
                })
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })
        },
        goToSemesters() {
            this.$router.push({
                    name: 'semesterlist'
                })
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })
        },
        goToLogin() {
            Utils.setStore('user', null)
            location.reload();

        },
    }
}
</script>

<style></style>