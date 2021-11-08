<template>
  <div>
<H1 style="background-color: #811429; color:#f2f2f2">Degree View</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <h3><v-btn v-if='user.adminID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateDegree(degree)" text rounded>Edit</v-btn>
    <v-btn v-else-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateDegree(degree)" text rounded>Edit</v-btn>
   <br>
    <v-btn color="#E53935" v-if='user.adminID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="deleteDegree(degree)" text rounded>Delete</v-btn>
     <v-btn color="#E53935" v-else-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="deleteDegree(degree)" text rounded>Delete</v-btn>
   </h3>
  <v-form>
        <v-col>
            <v-text-field readonly label="Department" v-model="degree.dept" type="text" id="department"/>
            <v-text-field readonly label="Degree" v-model="degree.degree" type="text" id="degree" />
            <v-text-field readonly label="Hours" v-model="degree.hours" type="text" id="hours"/>
           
       </v-col>
    </v-form>

<confirm-dialog ref="confirmDialog"></confirm-dialog>

  </div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Utils from '@/config/utils.js'

export default {
  props: ['id'],
  components: {ConfirmDialog},
  data() {
    return {
      user: {},
      degree: {}
      
    }
  },
  created() {
      this.user = Utils.getStore('user')
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

     async deleteDegree(degree){
      let id = degree.degreeID
      if(confirm("Do you really want to delete?")){
    courseServices.deleteDegree(id)
      .then(() => {
         this.$router.push({ name: 'degreelist' }) 
        })
       
        
        .catch(error => {
          console.log(error)
        })
      }
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