<template>
  <div>
 <button name="cancel" v-on:click.prevent="cancel()">Go Back</button>

<p></p>
<button name="edit" v-on:click.prevent="updateStudent(student)">Edit</button>
<p></p>
   


 <table class="table table-striped table-bordered">
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
                    <td>{{student.studentID}}</td>
                    <td>{{student.fName}}</td>
                    <td>{{student.lName}}</td>
                    <td>{{student.email}}</td>
                    <td>{{student.major}}</td>
            </tbody>
        </table>

  </div>
</template>

<script>
import studentServices from '@/services/studentServices.js'
export default {
  props: ['id'],
  components: {},
  data() {
    return {
      student: {}
      
    }
  },
  created() {
      studentServices.getStudent(this.id)
      .then(response => {
        this.student = response.data,
        console.log(this.student)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    addForm(){
      this.addCourseDisplay = true;
    },
    updateStudent(student) {
          this.$router.push({ name: 'stuedit', params: {id: student.studentID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'students' })
    },

    deleteStudent(id){
    studentServices.deleteStudent(id)
      .then(() => {
        this.students.forEach((student,i) => {
          if (student.id == id) {
            this.students.splice(i, 1);
          }
        })
          
        })
        .catch(error => {
         this.message = error.response.data.message
        })
    },
    
}
}
</script>

<style></style> 

