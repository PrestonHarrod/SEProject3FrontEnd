<template>
  <div>
<H1 style="background-color: #811429; color:#f2f2f2">Advisor View</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <h3><v-btn v-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateAdvisor(advisor)" text rounded>Edit</v-btn>
    <br>
    <v-btn color="#E53935" v-if='user.adminID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="deleteAdvisor(advisor)" text rounded>Delete</v-btn>
   </h3>
  <v-form>
        <v-col>
            <v-text-field readonly label="First Name" v-model="advisor.fName" type="text" id="advisorName" />
            <v-text-field readonly label="Last Name" v-model="advisor.lName" type="text" id="advisorHours"/>
            <v-text-field readonly label="Email" v-model="advisor.email" type="text" id="advisorLevel"/>
            <v-text-field readonly label="Department" v-model="advisor.dept" type="text" id="advisorLevel"/>
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
      advisor: {}
      
    }
  },
  created() {
      this.user = Utils.getStore('user')
      courseServices.getAdvisor(this.id)
      .then(response => {
        this.advisor = response.data,
        console.log(this.id)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        alert("Error getting advisor");
        
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    addForm(){
      this.addAdvisorDisplay = true;
    },
    updateAdvisor(advisor) {
          this.$router.push({ name: 'editadvisor', params: {id: advisor.advisorID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
         alert("Error going to update failed");
        })
    },
    cancel() {
      this.$router.push({ name: 'advisorlist' })
    },

     async deleteAdvisor(advisor){
      let id = advisor.advisorID
      if(confirm("Do you really want to delete?")){
    courseServices.deleteAdvisor(id)
      .then(() => {
         this.$router.push({ name: 'advisorlist' }) 
        })
       
        
        .catch(error => {
         this.message = error.response.data.message
          alert("Error deleting advisor");

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