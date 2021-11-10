<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Degree List</H1>
    <br>
    <br>
     <h2><v-btn v-if='user.adminID != null || user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="addToDegreeCourseList(selected)" color="black" text rounded>Add {{name}} to Degree</v-btn></h2>
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
        v-model="selected"
        show-select
        single-select
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
  props: ['id'],
    components: {},
    data() {
        return {
          user: {},
          selected: [],
          search: '',
          name: '',
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

      courseServices.getCourse(this.id) 
      .then(response => {
        this.name = response.data.name
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
  goToDegreeCourses(selected) {
    console.log(selected);
    let obj = selected[0]
    let id = obj.degreeID
    this.$router.push({ name: 'degreecourse', params: {id: id}})
  },
  addToDegreeCourseList(selected) {
      let degreeCourseList = {};
      let obj = selected[0];
      console.log(this.id + " " + obj.degreeID);
      
       degreeCourseList.courseID = this.id;
       degreeCourseList.degreeID = obj.degreeID;  

       courseServices.addCourseToDegreeList(degreeCourseList)
         .then(() => {
           this.$router.push({ name: 'courses'})
           //this.checkError(false);
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