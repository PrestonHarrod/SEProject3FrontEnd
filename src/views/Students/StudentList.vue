<template>
<v-container fluid fill-height> <!--fluid fill-height-->
  <div>
    <Nav/>
    <H1 style="background-color: #811429; color:#f2f2f2">Student List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Student</v-btn></h2>
  <br>
  
   <v-pagination
      v-model="page"
      :length="62"
      :total-visible="12"
      @input="next"
    ></v-pagination>
  <br>
    <v-card width="100vw">
         <v-simple-table height="1000px" fixed-header>
          <template v-slot:default>   
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student.studentID" :student="student">
                    <td>{{student.fName}}</td>
                    <td>{{student.lName}}</td>
                    <td>{{student.email}}</td>
                    <td><v-btn color="#66BB6A" @click="viewStudent(student.studentID)">Details</v-btn></td>
                    <td><v-btn color="#E53935" @click="doDelete(students, student.studentID)">Delete</v-btn></td>       
                    <confirm-dialog ref="confirmDialog"></confirm-dialog>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>
  </div>
</v-container>
</template>


<script>
//import CourseListDisplay from '@/components/CourseListDisplay.vue'
import courseServices from '@/services/courseServices.js'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Nav from '@/components/Nav.vue'

export default {
    components: {ConfirmDialog, Nav},
    data() {
        return {
            students: {},
            page: 1
        };
    },
  created() {

      courseServices.getStudents(this.page) 
      .then(response => {
        this.students = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    next (page) {
  
  courseServices.getStudents(page * 50)
    .then(response => {
      
      this.students = response.data
      console.log(this.page)
    })
    .catch(error => {
      console.log(error)
    })
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
     console.log(student + "here")
          this.$router.push({ name: 'viewStudent', params: {id: student}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
   async doDelete(students, id) {
            if(confirm("Do you really want to delete?")){
                courseServices.deleteStudent(id)
                .then(() => {
        this.students.forEach((student,i) => {
          if (student.studentID == id) {
            this.students.splice(i, 1);
          }
        })
        })
                .catch(error => {
                    console.log(error);
                })
   }
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
