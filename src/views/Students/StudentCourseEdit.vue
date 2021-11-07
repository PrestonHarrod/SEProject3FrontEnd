<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student Course Edit</H1>

    <v-form>
        <v-col>
            <v-text-field label="Grade" v-model="studentCourse.grade" type="text" id="grade"/>
            <v-text-field label="Status" v-model="studentCourse.status" type="text" id="status"/>
           

       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateGrade()" text rounded>Submit</v-btn>
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
      studentCourse: {},
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
    
    cancel() {
      this.$router.push({ name: 'studentcourselist' })
    },
    updateGrade(){
      courseServices.updateStudentCourse(this.studentCourse)
      .then(() => {
        this.$router.push({name: 'studentcourselist'});
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