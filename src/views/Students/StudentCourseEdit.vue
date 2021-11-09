<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student Course Edit</H1>
  <v-app>
    <v-form>
        <v-col>
        <v-select id='grade' v-model="studentCourse.grade"
          :items= "gradeItems" 
          label="Grade"
        ></v-select>
        <v-select  id='status' v-model="studentCourse.status"
          :items= "statusItems" 
          label="Status"
        ></v-select>
           

       </v-col>
      <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="updateGrade(studentCourse.studentID)" text rounded>Submit</v-btn>
      <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel(studentCourse.studentID)" color="black" text rounded>Cancel</v-btn>
    </v-form>
  </v-app>
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
      studentCourse: {},
      gradeItems: ['A', 'B', 'C', 'D', 'F'],
      statusItems: ['Registered', 'In Progress', 'Completed'],
    }
  },
  created() {
      courseServices.getStudentCourse(this.id)
      .then(response => {
        this.studentCourse = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel(id) {
      this.$router.push({ name: 'studentcourselist', params: {id: id}})
    },
    updateGrade(id){
      courseServices.updateStudentCourse(this.studentCourse)
      .then(() => {
        this.$router.push({name: 'studentcourselist', params: {id: id}});
        })
        .catch(error => {
        console.log('There was an error:', error.response),
        alert("ERROR: Add student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system.");
        })
        
    },
    deleteSemester(id){
    courseServices.deleteSemester(this.id)
      .then(() => {
        this.semesters.forEach((semester,i) => {
          if (semester.id == id) {
            this.semesters.splice(i, 1);
          }
        })
          
        })
        .catch(error => {
         this.message = error.response.data.message,
         alert("ERROR: Add student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system.");
        })
    },
    
}
}
</script>

<style></style> 