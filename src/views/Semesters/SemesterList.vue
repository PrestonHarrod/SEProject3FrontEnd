<template>
<v-container fluid fill-height> 
  <div>
    <Nav/>
    <H1 style="background-color: #811429; color:#f2f2f2">Semester List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Semester</v-btn></h2>
  <br>
   <v-card width="100vw">
       <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Season"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
        :headers="headers"
        :items="semesters"
        item-key="semester.semesterID"
        :items-per-page="25"
        :search="search"
        @click:row="viewSemester">
      </v-data-table>
    </v-card>
  </div>
</v-container>
</template>


<script>
import courseServices from '@/services/courseServices.js'
import Nav from '@/components/Nav.vue'

export default {
    components: {Nav},
    data() {
        return {
           search: '',
          headers: [
            {
            text: 'Semester ID',
            align: 'start',
            filterable: false,
            value: 'semesterID',
            },
            {
            text: 'Season',
            align: 'start',
            filterable: true,
            value: 'season'
            },
            {
            text: 'Start Date',
            align: 'start',
            filterable: false,
            value: 'startDate',
            },
            {
            text: 'End Date',
            align: 'start',
            filterable: false,
            value: 'endDate',
            }
          ],
            semesters: [
              {

              },
            ],
          
        };
    },
  created() {

      courseServices.getSemesters() 
      .then(response => {
        this.semesters = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
  
  goToAdd() {
    this.$router.push({ name: 'addSemester'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewSemester(semester) {
     let id = semester.semesterID
          this.$router.push({ name: 'viewSemester', params: {id: id}})
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
