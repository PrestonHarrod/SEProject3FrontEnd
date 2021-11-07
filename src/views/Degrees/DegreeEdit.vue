<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Degree Edit</H1>

    <v-form>
        <v-col>
            <v-text-field label="Department" v-model="degree.dept" type="text" id="department"/>
            <v-text-field label="Degree" v-model="degree.degree" type="text" id="degree" />
            <v-text-field label="Hours" v-model="degree.hours" type="text" id="hours"/>
       </v-col>
      <v-btn v-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateDegree()" text rounded>Submit</v-btn>
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
      degree: {},
    }
  },
  created() {
      this.user = Utils.getStore('user')
      courseServices.getDegree(this.id)
      .then(response => {
        this.degree = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'viewDegree' })
    },
    updateDegree(){
      courseServices.updateDegree(this.degree)
      .then(() => {
        this.$router.push({name: 'viewDegree'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        alert("ERROR: Edit degree unsuccessful. alert. Make sure that fields are entered correctly");
        })
        
    },
    deleteDegree(id){
    courseServices.deleteDegree(this.degreeID)
      .then(() => {
        this.degrees.forEach((degree,i) => {
          if (degree.id == id) {
            this.degrees.splice(i, 1);
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