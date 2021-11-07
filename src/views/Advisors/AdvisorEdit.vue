<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Advisor Edit</H1>

    <v-form>
        <v-col>
            <v-text-field label="First Name" v-model="advisor.fName" type="text" id="advisorName" />
            <v-text-field label="Last Name" v-model="advisor.lName" type="text" id="advisorHours"/>
            <v-text-field label="Email" v-model="advisor.email" type="text" id="advisorLevel"/>
            <v-text-field label="Department" v-model="advisor.dept" type="text" id="advisorLevel"/>
       </v-col>
      <v-btn v-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateAdvisor()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
  </div>
</template>
<script>
import courseServices from '@/services/courseServices.js'
import Utils from '@/config/utils.js'

export default {
  user: {},
  props: ['id'],
  components: {

  },
  data() {
    return {
      advisor: {},
    }
  },
  created() {
      this.user = Utils.getStore('user')
      courseServices.getAdvisor(this.id)
      .then(response => {
        this.advisor = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'viewAdvisor' })
    },
    updateAdvisor(){
      courseServices.updateAdvisor(this.advisor)
      .then(() => {
        this.$router.push({name: 'viewAdvisor'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        })
        
    },
    deleteAdvisor(id){
    courseServices.deleteAdvisor(this.id)
      .then(() => {
        this.advisors.forEach((advisor,i) => {
          if (advisor.id == id) {
            this.advisors.splice(i, 1);
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