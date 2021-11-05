<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student Edit</H1>
  <v-app>
    <v-form>
        <v-col>
            <!-- <v-text-field label="ID" v-model="student.studentID" type="text" id="ID" /> -->
            <v-text-field label="First Name" v-model="student.fName" type="text" id="fName" />
            <v-text-field label="Last Name" v-model="student.lName" type="text" id="lName"/>
            <v-text-field label="Email" v-model="student.email" type="text" id="email" />
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="student.grad_date"
              label="Graduation Date"
              placeholder="yyyy/mm/dd"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker
              v-model="student.grad_date"
              color="#811429"
              @input="menu = false"
            ></v-date-picker>
            </v-menu>
            <v-text-field label="Major" v-model="student.major" type="text" id="major"/>
            <v-text-field label="advisorID" v-model="student.advisorID" type="text" id="advisorID"/>
            <v-text-field label="Degree" v-model="student.degreeID" type="text" id="degreeID"/>
            <!-- <v-text-field label="Create At" v-model="student.createdAt" type="text" id="createdAt"/>  -->
            <!-- <v-text-field label="Updated At" v-model="student.updatedAt" type="text" id="updatedAt"/>  -->
            <!-- <v-text-field label="advisorAdvisorID" v-model="student.advisorAdvisorID" type="text" id="advisorAdvisorID"/> -->
       </v-col>
      <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="updateStudent()" text rounded>Submit</v-btn>
      <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
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
      student: {grad_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)},
      menu: false,
    }
  },
  created() {
      courseServices.getStudent(this.id)
      .then(response => {
        this.student = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'viewStudent' })
    },
    updateStudent(){
      courseServices.updateStudent(this.student)
      .then(() => {
        this.$router.push({name: 'viewStudent'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        })
        
    },
    deleteStudent(id){
    courseServices.deleteStudent(this.id)
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

<style></style> 