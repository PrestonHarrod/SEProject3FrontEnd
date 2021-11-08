<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student List</H1>
    <br>
    <br>
     <h2><v-btn v-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Student</v-btn></h2>
  <br>
  <h3><v-btn v-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToStudentCourses(selected)" color="black" text rounded>View Student's Courses</v-btn></h3>
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
        v-model="selected"
        show-select
        single-select
        :headers="headers"
        :items="students"
        item-key="email"
        :items-per-page="25"
        :search="search"
        @click:row="viewStudent">
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
          selected: [],
          user: {},
           search: '',
          headers: [
            {
            text: 'First Name',
            align: 'start',
            filterable: true,
            value: 'fName',
            },
            {
            text: 'Last Name',
            align: 'start',
            filterable: true,
            value: 'lName'
            },
            {
            text: 'Email',
            align: 'start',
            filterable: false,
            value: 'email',
            },
          ],
            students: [
              {

              },
            ],
        };
    },
  created() {
      this.user = Utils.getStore('user');
      courseServices.getStudents() 
      .then(response => {
        this.students = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    goToStudentCourses(selected) {
      let obj = selected[0]
      let id = obj.studentID
       this.$router.push({ name: 'studentcourselist', params: {id: id}})

    },
  goToAdd() {
    this.$router.push({ name: 'addStudent'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewStudent(student) {
     let id = student.studentID
     if(this.user.advisorID != null)
          this.$router.push({ name: 'viewStudent', params: {id: id}})
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
