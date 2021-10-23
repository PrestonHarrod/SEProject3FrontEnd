
<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Course Edit</H1>

    <v-form>
        <v-col>
          <v-text-field label="Course Name" v-model="course.name" type="text" id="name" />
          <v-text-field label="Semester ID" v-model="course.semesterID" type="text" id="semesterID"/>
          <v-text-field label="Dept" v-model="course.dept" type="text" id="courseDept"/>
          <v-text-field label="Number" v-model="course.courseNum" type="text" id="courseNumber"/>
          <v-text-field label="Hours" v-model="course.hours" type="text" id="courseHours"/>
          <v-text-field label="Level" v-model="course.level" type="text" id="courseLevel"/>
          <v-textarea label="Description" v-model="course.desc" type="text" id="courseDescription" />
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateCourse()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
  </div>
</template>
<script>
import courseServices from '@/services/courseServices.js'

export default {
  props: ['id'],
  components: {

  },
  data() {
    return {
      course: {},
    }
  },
  created() {
      courseServices.getCourse(this.id)
      .then(response => {
        this.course = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'view' })
    },
    updateCourse(){
      courseServices.updateCourse(this.course)
      .then(() => {
        this.$router.push({name: 'view'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        console.log(this.id)
        })
        
    },
    deleteCourse(id){
    courseServices.deleteCourse(this.id)
      .then(() => {
        this.courses.forEach((course,i) => {
          if (course.id == id) {
            this.courses.splice(i, 1);
          }
        })
          
        })
        .catch(error => {
         this.message = error.response.data.message
        })
    },
    
}
}
</script>

<style></style> 