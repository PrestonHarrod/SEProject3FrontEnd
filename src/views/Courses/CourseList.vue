<template>
<v-container fluid fill-height> <!--fluid fill-height-->
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Course List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Course</v-btn></h2>
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
                    <th>Course Name</th>
                    <th>Course number</th>
                    <th>Hours</th>
                    <th>Level</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="course in courses" :key="course.courseID" :course="course">
                    <td>{{course.name}}</td>
                    <td>{{course.courseNum}}</td>
                    <td>{{course.hours}}</td>
                    <td>{{course.level}}</td>
                    <td><v-btn color="#66BB6A" @click="viewCourse(course.courseID)">Details</v-btn></td>
                    <td><v-btn color="#E53935" @click="doDelete(courses, course.courseID)">Delete</v-btn></td>       
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
export default {
    components: {ConfirmDialog},
    data() {
        return {
            courses: {},
            page: 1
        };
    },
  created() {

      courseServices.getCourses(this.page) 
      .then(response => {
        this.courses = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    next (page) {
  
  courseServices.getCourses(page * 50)
    .then(response => {
      
      this.courses = response.data
      console.log(this.page)
    })
    .catch(error => {
      console.log(error)
      alert("ERROR: retrieve courses failed");
    })
},
  goToAdd() {
    this.$router.push({ name: 'add'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewCourse(course) {
     
          this.$router.push({ name: 'view', params: {id: course}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
   async doDelete(students, id) {
            if(confirm("Do you really want to delete?")){
                courseServices.deleteCourse(id)
                .then(() => {
        this.courses.forEach((course,i) => {
          if (course.courseID == id) {
            this.courses.splice(i, 1);
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
