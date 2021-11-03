<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Student List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Student</v-btn></h2>
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
        :items="students"
        item-key="student.studentID"
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


export default {
    components: {},

    data() {
        return {
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

      courseServices.getStudents() 
      .then(response => {
        this.students = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
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
     console.log(student + "here")
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
