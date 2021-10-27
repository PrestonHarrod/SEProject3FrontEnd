<template>
    <v-app-bar >
    <button v-on:click.prevent="goToHome()">
      <img alt="Vue logo" src="../assets/logo.png" contain height="50" width="80">
    </button>
    <v-btn text v-on:click.prevent="goToStudents()">
      Students
    </v-btn>
    <v-btn text v-on:click.prevent="goToAdvisors()">
      Advisors
    </v-btn>
    <v-btn text v-on:click.prevent="goToCourses()">
      Courses
    </v-btn>
    <v-btn text v-on:click.prevent="goToDegrees()">
      Degrees
    </v-btn>
    <v-btn text v-on:click.prevent="goToSemesters()">
      Semesters
    </v-btn>
    <v-btn text v-on:click.prevent="goToLogin()">
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>

export default ({
    data: () => ({}),
    methods: {
      goToHome() {
          this.$router.push({ name: 'home'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      }, 
      goToCourses() {
          this.$router.push({ name: 'courses'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },    
      goToStudents() {
          this.$router.push({ name: 'studentlist'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToAdvisors() {
          this.$router.push({ name: 'advisorlist'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToDegrees() {
          this.$router.push({ name: 'degreelist'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToSemesters() {
          this.$router.push({ name: 'semesterlist'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToSemesters() {
          this.$router.push({ name: 'semesterlist'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
      goToLogin() {
          this.$router.push({ name: 'login'})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
      },
    }
});
</script>
