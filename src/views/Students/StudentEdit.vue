<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student Edit</H1>
<v-app>
<v-form>
  <v-col>
    <v-text-field label="First Name" placeholder="John" v-model="student.fName" type="text" id="fName" />
    <v-text-field label="Last Name" placeholder="Smith" v-model="student.lName" type="text" id="lName"/>
    <v-text-field label="Email" placeholder="john.smith@eagles.oc.edu" v-model="student.email" type="text" id="email" />
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto">
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
    <v-text-field label="advisorID" v-model="student.advisorID" type="text" id="advisorID"/>
    <v-text-field label="Major" placeholder="Computer Science" v-model="student.major" type="text" id="major"/>
    <v-text-field label="Degree" v-model="student.degreeID" type="text" id="degreeID"/> 
  </v-col>
  <v-btn v-if='user.advisorID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="updateStudent()" text rounded>Submit</v-btn>
  <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
</v-form>
</v-app>   
</div>
</template>
<script>
import courseServices from '@/services/courseServices.js'
import Utils from '@/config/utils.js'

export default {
  props: ['id'],
  components: {

  },
  data() {
    return {
      user: {},
      student: {},
      menu: false,
    }
  },
  created() {
      this.user = Utils.getStore('user')
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