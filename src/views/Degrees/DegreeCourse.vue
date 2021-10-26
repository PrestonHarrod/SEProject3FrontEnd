<template>
<v-container fluid fill-height> <!--fluid fill-height-->
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Degree Courses</H1>
    <br>
    <br>
  <br>
  <br>
    <v-card width="100vw">
         <v-simple-table height="1000px" fixed-header>
          <template v-slot:default>   
            <thead>
                <tr>
                    <th>Degree Course ID</th>
                    <th>Dept</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="degreecourse in degreecourses" :key="degreecourse.id" :degreecourse="degreecourse">
                        <td>{{degreecourse.id}}</td>
                        <td>{{getCourseDept(degreecourse)}}</td>
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
export default {
    components: {},
    data() {
        return {
            degreecourses: {},
            course: {}
        };
    },
  created() {

      courseServices.getDegreeCourse() 
      .then(response => {
        this.degreecourses = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getCourseDept(degreecourse) {
        courseServices.getCourse(degreecourse.courseID)
        .then(response => {
            this.course = response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
  }
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