<template>
  <div>
      <Nav/>
<H1 style="background-color: #811429; color:#f2f2f2">{{student.fName + ' ' + student.lName + "'s Courses"}}</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
  <v-card width="100vw">
         <v-simple-table height="1000px" fixed-header>
          <template v-slot:default>   
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="studentCourse in studentCourses" :key="studentCourse.id" :studentCourse="studentCourse">
                    <td>{{studentCourse.course.name}}</td>
                    <td>{{studentCourse.grade}}</td>
                    <td>{{studentCourse.status}}</td>      
                    
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>

  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import StudentServices from '@/services/studentServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';
//import courseServices from '@/services/courseServices.js'
//import SemesterCourse from '@/components/SemesterCourse';
//import DegreeCourseServices from '@/services/DegreeCourseServices.js';
export default {
    components: {
        Nav
    },
    props :['id'],
    data() {
        return {
            student: {},
            studentCourses : {},
            course: {},
            degreecourses: []
        };
    },
    methods: {
        
    },
    async created() {
         await StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data;
                
            })
            .catch(error => {
                console.log("getStudent"+error)
                console.log(error)
            });
        await StudentCourseServices.getStudentCoursesForStudent(this.id)
            .then(response=> {
                this.studentCourses = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
               
        
          
    }
  }
</script>

