<template>
    <v-app-bar >
    <v-toolbar-title>OC App</v-toolbar-title>
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
    <v-btn text>
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>

export default ({
    data: () => ({}),
    methods: {
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
    }
});
</script>
