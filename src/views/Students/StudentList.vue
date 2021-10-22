<template>
  <div>
    <h1>Students</h1>
    <button @click="getAddPage()">Add Student</button>
    <button @click="getNextPage(--index)">Prev</button>
    <button @click="getNextPage(++index)">Next</button>


         <table class="center">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Major</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student.studentID" :student="student">
                    <td>{{student.studentID}}</td>
                    <td>{{student.fName}}</td>
                    <td>{{student.lName}}</td>
                    <td>{{student.email}}</td>
                    <td>{{student.major}}</td>
                    <button name="view" v-on:click.prevent="viewStudent(student)">View Student</button>
                    <button class="delete-btn" @click="doDelete(students, student.studentID)">
            Delete
          </button>
          <confirm-dialog ref="confirmDialog"></confirm-dialog>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>  
import studentServices from '@/services/studentServices.js'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
export default {
    components: {ConfirmDialog},
    data() {
        return {
            students: {},
            index: 0
        };
    },
  created() {

      studentServices.getStudents(this.index) 
      .then(response => {
        this.students = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
   viewStudent(student) {
          this.$router.push({ name: 'stuview', params: {id: student.studentID}})
        .then(() => {
          console.log(student.studentID)
        })
        .catch(error => {
         console.log(error)
        })
    },
    async doDelete(students, id) {
            if(confirm("Do you really want to delete?")){
                studentServices.deleteStudent(id)
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
      getNextPage(num){
      if (num < 0) //dont allow index more less than 0
      {
        num = 0;
        this.index = 0;
      }
      console.log("Number: " + num);
      console.log("Index: " + this.index);
      studentServices.getStudents(num * 50)
      .then(response => {
        this.students = response.data
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        })
    },
    getAddPage() {
      this.$router.push({name:'add'})
      .then(()=> {
        console.log('routing to add student page');
      })
      .catch(error => {
        console.log(error);
      })
    }
      },

  }
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  background-color: #811429;
  color: white;
}
.delete-btn {
  margin-left: 100px;
  padding: 0.5em 1em;
  background-color: #eccfc9;
  color: #c5391a;
  border: 2px solid #ea3f1b;
  border-radius: 5px;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
