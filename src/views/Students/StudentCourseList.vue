<template>
  <div>
      <Nav/>
<H1 style="background-color: #811429; color:#f2f2f2">{{student.fName + ' ' + student.lName + "'s Courses"}}</H1>
<H2>Hours: {{totalHours}}   GPA: {{gpa}}   Major: {{student.major}}   Major Hours: {{majorHours}}</H2>
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
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
export default {
    components: {
        Nav
    },
    props :['id'],
    data() {
        return {
            student: {},
            studentCourses : [],
            degreecourses: [],
            degreeCourses : [],
            totalHours : 0,
            majorHours : 0,
            degree:{},
            gpa : 0,
            grades :[],
            gpaGrades : ['A','B','C','D','F'], 
        };
    },
    methods: {
        cancel() {
      this.$router.push({ name: 'studentlist' })
    },
            calcTotalHours() {
          this.totalHours = 0;
          this.studentCourses.forEach(studentCourse => { 
            this.totalHours += studentCourse.course.hours
            });
        },
        calcMajorHours() {
          this.majorHours = 0;
          this.studentCourses.filter(studentCourse => this.degreeCourses.includes(studentCourse.courseID))
            .forEach(studentCourse => { 
                this.majorHours += studentCourse.course.hours;
                });
        },
        calcGPA() {
          let totalHours = 0;
          let totalPoints = 0;
          this.studentCourses.filter(studentCourse => this.gpaGrades.includes(studentCourse.grade)).forEach(studentCourse => { 
            totalHours += studentCourse.course.hours;
            totalPoints += studentCourse.course.hours * this.grades[studentCourse.grade];
            });
          if (totalHours == 0) {
            this.gpa=0;
            this.gpa.toPrecision(3);
          }
          else {
            this.gpa = totalPoints/totalHours;
            this.gpa = this.gpa.toPrecision(3);
          }
          
        },

        
    },
    async created() {
        this.grades["A"] = 4;
        this.grades["B"] = 3;
        this.grades["C"] = 2;
        this.grades["D"] = 1;
        this.grades["F"] = 0;
         await StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data;
                
            })
            .catch(error => {
                console.log("getStudent"+error)
                console.log(error)
            });
            let semesters = [];
        
        await DegreeCourseServices.getDegreeCoursesForDegree(this.student.degreeID)
            .then(response => {
              let dc = response.data;
              dc.forEach(degreeCourse => this.degreeCourses.push(degreeCourse.courseID))
            })
            .catch(error => {
                console.log(error)
            });
        await StudentCourseServices.getStudentCoursesForStudent(this.id) 
            .then(response => {
              this.studentCourses = response.data;
              this.studentCourses.forEach(function (studentCourse) {
                  if (!((semesters).includes(studentCourse.semester)))
                    semesters.push(studentCourse.semester)
                });
              
            })
            .catch(error => {
                console.log(error)
            });
            this.calcTotalHours();
            this.calcMajorHours();
            this.calcGPA();
               
        
          
    }
  }
</script>

