<template>
  <div>
<H1 style="background-color: #811429; color:#f2f2f2">Student View</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <h3><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updatestudent(student)" text rounded>Edit</v-btn>
   </h3>
  <v-form>
        <v-col>
            <v-text-field readonly label="advisorID" v-model="student.advisorID" type="text" id="advisorID"/>
            <v-text-field readonly label="Degree" v-model="student.degreeID" type="text" id="degreeID"/>
            <v-text-field readonly label="First Name" v-model="student.fName" type="text" id="fName" />
            <v-text-field readonly label="Last Name" v-model="student.lName" type="text" id="lName"/>
            <v-text-field readonly label="Major" v-model="student.major" type="text" id="major"/>
            <v-text-field readonly label="Graduation Date" v-model="student.grad_date" type="text" id="grad_date"/>
             <v-text-field readonly label="Email" v-model="student.email" type="text" id="email" />
       </v-col>
    </v-form>

  </div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
export default {
  props: ['id'],
  components: {},
  data() {
    return {
      student: {}
      
    }
  },
  created() {
    console.log(this.id + "here again")
      courseServices.getStudent(this.id)
      
      .then(response => {
        
        this.student = response.data
        
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    addForm(){
      this.addStudentDisplay = true;
    },
    updatestudent(student) {
          this.$router.push({ name: 'editstudent', params: {id: student.studentID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'studentlist' })
    },

    deletestudent(id){
    courseServices.deleteStudent(id)
      .then(() => {
        this.students.forEach((student,i) => {
          if (student.id == id) {
            this.students.splice(i, 1);
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

<style>
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style> 