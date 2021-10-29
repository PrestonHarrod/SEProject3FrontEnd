<template>
  <div>
      <Nav/>
<H1 style="background-color: #811429; color:#f2f2f2">{{degree.degree + ' ' + "'s Courses"}}</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
  <v-card width="100vw">
         <v-simple-table height="1000px" fixed-header>
          <template v-slot:default>   
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Department</th>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="degreecourse in degreecourses" :key="degreecourse.id" :degreecourse="degreecourse">
                    <td>{{degreecourse.course.name}}</td>
                    <td>{{degreecourse.course.dept}}</td>
                    <td>{{degreecourse.course.hours}}</td>      
                    
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>

  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
// import StudentServices from '@/services/studentServices.js';
// import StudentCourseServices from '@/services/StudentCourseServices.js';
import courseServices from '@/services/courseServices.js'
//import SemesterCourse from '@/components/SemesterCourse';
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
export default {
    components: {
        Nav
    },
    props :['id'],
    data() {
        return {
            degree: {},
            degreecourses: []
        };
    },
    methods: {
        cancel() {
      this.$router.push({ name: 'degreelist' })
    },

        
    },
    async created() {
         await courseServices.getDegree(this.id)
            .then(response => {
                this.degree = response.data;
                
            })
            .catch(error => {
                console.log("getDegree"+error)
                console.log(error)
            });
        
        await DegreeCourseServices.getDegreeCoursesForDegree(this.id)
            .then(response => {
              let dc = response.data;
              dc.forEach(degreecourse => this.degreecourses.push(degreecourse))
            })
            .catch(error => {
                console.log(error)
            })       
          
    }
  }
</script>

