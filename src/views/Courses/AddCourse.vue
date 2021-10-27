<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Course Add</H1>
<v-form>
        <v-col>
          <v-text-field label="Course Name" placeholder="Course Name" v-model="course.name" type="text" id="name" />
          <v-text-field label="Semester ID" placeholder="" v-model="course.semesterID" type="text" id="semesterID"/>
          <v-text-field label="Dept" placeholder="CMCS" v-model="course.dept" type="text" id="courseDept"/>
          <v-text-field label="Number" placeholder="CMCS-0000" v-model="course.courseNum" type="text" id="courseNumber"/>
          <v-text-field label="Hours" placeholder="3" v-model="course.hours" type="text" id="courseHours"/>
          <v-text-field label="Level" placeholder="2000" v-model="course.level" type="text" id="courseLevel"/>
          <v-textarea label="Description" placeholder="This is a description of a course" v-model="course.desc" type="text" id="courseDescription" />
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="addCourse()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
</div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
export default {
  data() {
    return {
      course: {}
    }
  },
  methods: {
    addCourse() {
     
        courseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: 'list' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'list' })
    },
  }
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>
