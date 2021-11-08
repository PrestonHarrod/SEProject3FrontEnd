<template>
<v-container fluid fill-height>
  <div>
  
<H1 style="background-color: #811429; color:#f2f2f2">{{student.fName + ' ' + student.lName + "'s Courses"}}</H1>
<H2>Hours: {{totalHours}}   GPA: {{gpa}}   Major: {{student.major}}   Major Hours: {{majorHours}}</H2>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
 
 <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="generatePDF()"  color="black"  text rounded>Print Degree Plan</v-btn>
 <br>
 <v-btn color="#E53935" :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="deleteStudentCourse(selected)" text rounded>Remove Course</v-btn>

  <v-card width="100vw">
       <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Semester or Course Name"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
      v-model="selected"
      show-select
      single-select
        :headers="headers"
        :items="studentCourses"
        item-key="course.name"
        :items-per-page="25"
        :search="search"
        @click:row="viewStudentCourse"
        class="elevation-1"
        >
        
         </v-data-table>
    </v-card>
  </div>
</v-container>
</template>

<script>
import img from '@/assets/ocBanner.png';
import StudentServices from '@/services/studentServices.js';
import StudentCourseServices from '@/services/StudentCourseServices.js';
import courseServices from '@/services/courseServices.js'
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
import Utils from '@/config/utils.js';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
    components: {
        
    },
    
    props :['id'],
    data() {
        return {
          user: {},
          selected: [],
            student: {},
            studentCourses : [],
            degreecourses: [],
             search: '',
          headers: [
            {
            text: 'Semester',
            align: 'start',
            filterable: true,
            value: 'semester.season',
            },
            {
            text: 'Start Date',
            align: 'start',
            filterable: false,
            value: 'semester.startDate'
            },
            {
            text: 'Course Name',
            align: 'start',
            filterable: true,
            value: 'course.name',
            },
            {
            text: 'Grade',
            align: 'start',
            filterable: false,
            value: 'grade',
            },
            {
            text: 'Status',
            align: 'start',
            filterable: false,
            value: 'status',
            },
          ],
        };
    },
    methods: {
 async deleteStudentCourse(selected) {
      let obj = selected[0];
      let id = obj.id
      if (obj.status == "Registered") {
        if(confirm("Do you really want to delete?")){
           courseServices.deleteStudentCourse(id)
      .then(() => {
         this.$router.push({ name: 'courses' }) 
        })
       
        
        .catch(error => {
          console.log(error)
        })
      }
      }
      else {
          alert("ERROR: Cannot remove course once start date has passed. Contact Registrar's Office for further assistance.");

      }
    
},

      viewStudentCourse(studentCourse) {
        let id = studentCourse.id
         if (this.user != null && this.user.advisorID != null) {
     
          this.$router.push({ name: 'studentcourselistedit', params: {id: id}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
         }
         else {
          alert("ERROR: Do not have permissions to edit");

         }
    },
        cancel() {
           if (this.user != null && this.user.advisorID == null) {
      this.$router.push({ name: 'courses' })
           }
           else {
             this.$router.push({ name: 'studentlist' })
           }
    },
     generatePDF() {
    
          const columns = [
            { title: "Semester", dataKey: "semester" },
            { title: "Start Date", dataKey: "semesterStartDate" },
            { title: "Course Number", dataKey: "number" },
            { title: "Course Name", dataKey: "name" },
            { title: "Grade", dataKey: "grade" },
            { title: "Status", dataKey:"status"}
          ];
          const doc = new jsPDF({
            
            orientation: "portrait",
            unit: "in",
            format: "letter"
          });
           let courseList = [];
           this.studentCourses.forEach(function (studentCourse){
              let course ={};
              course.semester=studentCourse.semester.season;
              course.semesterStartDate = studentCourse.semester.startDate.substring(0,4);
              course.number=studentCourse.course.courseNum;
              course.name=studentCourse.course.name;
              course.grade=studentCourse.grade;
              course.status=studentCourse.status;
              courseList.push(course);
            });
           let header = "Degree Plan for: " + this.student.fName +" "+this.student.lName;
           let currentDate = "As of: " + new Date(Date.now()).toLocaleDateString(); 
           
           
           doc.addImage(img, "PNG", .55, .5, 7.4,2)
           doc.autoTable({
                headStyles: {
                fillColor: [140, 0, 0],
            },
            margin: { top: 3.25 },
            didDrawPage: function () { doc.text(.55, 3, header), doc.text(6.35, 3, currentDate)},
            columns,
            body: courseList,
            
           });
           doc.save(`degreeplan.pdf`); 
     },
        
    },
    async created() {
      this.user = Utils.getStore('user');
         await StudentServices.getStudent(this.id)
            .then(response => {
                this.student = response.data;
                
            })
            .catch(error => {
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
        await StudentCourseServices.getStudentCoursesForStudent(this.id) //this.student.studentID
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
