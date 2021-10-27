
<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Advisor Add</H1>

<v-form>
        <v-col>
            
           <!-- <v-text-field label="Advisor ID" v-model="advisor.advisorID" type="text" id="advisorDept"/> -->
            <v-text-field label="First Name" placeholder="Jane" v-model="advisor.fName" type="text" id="advisorName" />
            <v-text-field label="Last Name" placeholder="Doe" v-model="advisor.lName" type="text" id="advisorHours"/>
            <v-text-field label="Email" placeholder="jane.doe@oc.edu" v-model="advisor.email" type="text" id="advisorLevel"/>
            <v-text-field label="Department" placeholder="Computer Science" v-model="advisor.dept" type="text" id="advisorLevel"/>
       
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="addAdvisor()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
    
</div>

</template>


<script>
import courseServices from '@/services/courseServices.js'
export default {
  data() {
    return {
      advisor: {}
    }
  },
  methods: {
    addAdvisor() {
     
        courseServices.addAdvisor(this.advisor)
        .then(() => {
          this.$router.push({ name: 'advisorlist' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'advisorlist' })
    },
  },
}
</script>
<style>
</style>