<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Edit Course</H1>
  
    <form @submit.prevent="editCourse">
      <table class="center">
      <tr>
      <td style="height: 30px; width: 80px; display: inline-block">  Department: </td>    
      <td style="height: 30px; display: inline-block" > <input v-model="course.dept" type="text" id="courseDept"> </td>    
      </tr>
      <tr>
      <td style="height: 30px; width: 80px; display: inline-block"> Course Number: </td>
      <td style="height: 30px;  display: inline-block"><input v-model="course.courseNum" type="text" id="courseNumber"> </td>
      </tr>
      <tr>
      <td style="height: 30px; width: 80px; display: inline-block"> Level: </td>
      <td style="height: 30px;  display: inline-block"> <input v-model="course.level" type="text" id="courseLevel"> </td> 
      </tr>
      <tr>
      <td style="height: 30px; width: 80px; display: inline-block"> Hours: </td>
      <td style="height: 30px;  display: inline-block"> <input v-model="course.hours" type="text" id="courseHours"> </td>
      </tr>
      <tr>
      <td style="height: 30px; width: 80px; display: inline-block"> Course Name: </td>
      <td style="height: 30px; display: inline-block"> <input v-model="course.name" type="text" id="courseName"> </td>
      </tr>
      <tr>
      <td style="width: 80px; display: inline-block"> Description: </td>
      <br>
      <textarea v-model="course.desc" type="text" style='height:80px; width:500px; white-space: pre-line;' id="courseDescription"></textarea> 
      </tr>
      <br> <br>
      <tr>
      <td style="height: 30px; width: 80px; display: inline-block"> SemesterID: </td>
      <td style="height: 30px;  display: inline-block"> <input v-model="course.semesterID" type="text" id="courseHours"> </td>
      </tr>
      <tr>
      <input type="submit" name="submit" v-on:click.prevent="updateCourse(course)" >
      <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
      </tr>

     
      </table>
    </form>
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
    updateCourse(course){
      courseServices.updateCourse(this.id, course)
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
