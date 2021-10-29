<template>
  <div>
<H1 style="background-color: #811429; color:#f2f2f2">Degree View</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <h3><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateDegree(degree)" text rounded>Edit</v-btn>
   </h3>
  <v-form>
        <v-col>
            <v-text-field readonly label="Department" v-model="degree.dept" type="text" id="department"/>
            <v-text-field readonly label="Degree" v-model="degree.degree" type="text" id="degree" />
            <v-text-field readonly label="Hours" v-model="degree.hours" type="text" id="hours"/>
           
       </v-col>
    </v-form>
    <h3><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="courses(degree)" text rounded>View Courses in Degree</v-btn></h3>
  </div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
export default {
  props: ['id'],
  components: {},
  data() {
    return {
      degree: {}
      
    }
  },
  created() {
      courseServices.getDegree(this.id)
      
      .then(response => {
        
        this.degree = response.data
        
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    addForm(){
      this.viewDegreeDisplay = true;
    },
    courses(degree) {
      this.$router.push({name: 'degreecourse', params: {id: degree.degreeID}})
      .then(() => {})
      .catch(error => {
        console.log(error)
      })
    },
    updateDegree(degree) {
          this.$router.push({ name: 'editdegree', params: {id: degree.degreeID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'degreelist' })
    },

    deleteDegree(id){
    courseServices.deleteDegree(id)
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

<style>
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style> 