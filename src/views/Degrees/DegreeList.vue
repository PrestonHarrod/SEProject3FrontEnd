<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Degree List</H1>
    <br>
    <br>
     <h2><v-btn v-if='user.adminID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Degree</v-btn>
     <v-btn v-else-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Degree</v-btn></h2>
  <br>
   <v-card width="100vw">
       <v-card-title>  
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Degree or Department"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
        :headers="headers"
        :items="degrees"
        item-key="degree.degreeID"
        :items-per-page="25"
        :search="search"
        @click:row="viewDegree">
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
          user: {},
           search: '',
          headers: [
            {
            text: 'Department',
            align: 'start',
            filterable: true,
            value: 'dept',
            },
            {
            text: 'Degree Name',
            align: 'start',
            filterable: true,
            value: 'degree'
            },
            {
            text: 'Hours',
            align: 'start',
            filterable: false,
            value: 'hours',
            },
          ],
            degrees: [
              {

            },
            ],
            
        };
    },
  created() {
      this.user = Utils.getStore('user');
      courseServices.getDegrees() 
      .then(response => {
        this.degrees = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    
  goToAdd() {
    this.$router.push({ name: 'addDegree'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewDegree(degree) {
     let id = degree.degreeID
      if(this.user.advisorID != null || this.user.adminID != null)
            this.$router.push({ name: 'viewDegree', params: {id: id}})
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
