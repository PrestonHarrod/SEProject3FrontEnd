<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Student Add</H1>

<v-form>
        <v-col>
            <v-text-field label="advisorID" v-model="student.advisorID" type="text" id="advisorID"/>
            <v-text-field label="Degree" v-model="student.degreeID" type="text" id="degreeID"/>
            <v-text-field label="First Name" placeholder="John" v-model="student.fName" type="text" id="fName" />
            <v-text-field label="Last Name" placeholder="Smith" v-model="student.lName" type="text" id="lName"/>
            <v-text-field label="Major" placeholder="Computer Science" v-model="student.major" type="text" id="major"/>
            <v-text-field label="Graduation Date" placeholder="2020/01/01" v-model="student.grad_date" type="text" id="grad_date"/>
            <v-text-field label="Email" placeholder="john.smith@eagles.oc.edu" v-model="student.email" type="text" id="email" />
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="addStudent()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
    
</div>

</template>


<script>
import courseServices from '@/services/courseServices.js'
export default {
  data() {
    return {
      student: {}
    }
  },
  methods: {
    addStudent() {
     
        courseServices.addStudent(this.student)
        .then(() => {
          this.$router.push({ name: 'studentlist' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'studentlist' })
    },
  },
}
</script>
<style>
</style>