<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Student Course Plan</H1>

                <H2>{{student.fName}} {{student.lName}}</H2>
                <SemesterCourse v-for="semesterCourse in semesterCourses" :key="semesterCourse[0].code" :studentCourses="semesterCourse" />
               
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import StudentServices from '@/services/studentServices.js';
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
export default {
    components: {
      
  
    },
    props :['id'],
    data() {
        return {
            student: {},
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
               
        await DegreeCourseServices.getDegreeCoursesForDegree(this.student.degreeID)
            .then(response => {
              let dc = response.data;
              dc.forEach(degreeCourse => this.degreeCourses.push(degreeCourse.courseID));
            })
            .catch(error => {
                console.log(error)
            });
          
    }
  }
</script>

