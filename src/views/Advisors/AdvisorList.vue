<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Advisor List</H1>
    <br>
    <br>
     <h2><v-btn v-if='user.adminID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Advisor</v-btn></h2>
   <br>
     <v-card width="100vw">
       <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by First or Last Name"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
        :headers="headers"
        :items="advisors"
        item-key="advisor.advisorID"
        :items-per-page="25"
        :search="search"
        @click:row="viewAdvisor">
      </v-data-table>
    </v-card>
  </div>
</v-container>
</template>


<script>
import courseServices from '@/services/courseServices.js'
import Utils from '@/config/utils.js';

export default {
    components: {},

    data() {
        return {
          users: {},
           search: '',
          headers: [
            {
            text: 'Advisor ID',
            align: 'start',
            filterable: false,
            value: 'advisorID',
            },
            {
            text: 'First Name',
            align: 'start',
            filterable: true,
            value: 'fName'
            },
            {
            text: 'Last Name',
            align: 'start',
            filterable: true,
            value: 'lName',
            },
            {
            text: 'Email',
            align: 'start',
            filterable: false,
            value: 'email',
            }
          ],
            advisors: [
              {

              },
            ],
        };
    },
  created() {
      this.user = Utils.getStore('user');
      courseServices.getAdvisors() 
      .then(response => {
        this.advisors = response.data
      })
      .catch(error => {
        console.log(error)
        alert("ERROR: Retrieve advisors failed.");
      })
  },
  methods: {
  checkToken(){
      return localStorage.getItem("token");
  },
  goToAdd() {
    this.$router.push({ name: 'addAdvisor'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewAdvisor(advisor) {
     let id = advisor.advisorID
        if(this.user.adminID != null)
          this.$router.push({ name: 'viewAdvisor', params: {id: id}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
      
      },

  }
</script>

<style>
H1 {
  text-align: center;
  font-size: 3.5rem !important;
  
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}

</style>
