<template>
    <v-app-bar >
    <v-toolbar-title>OC App</v-toolbar-title>
    <v-btn text>
      Students
    </v-btn>
    <v-btn text>
      Advisors
    </v-btn>
    <v-btn text v-on:click.prevent="goToCourses()">
      Courses
    </v-btn>
    <v-btn text>
      Degrees
    </v-btn>
    <v-btn text>
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
        
});
</script>
