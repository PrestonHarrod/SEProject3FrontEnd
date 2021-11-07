<template>
<v-container fluid fill-height>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Course List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Course</v-btn></h2>
  <br>
  <h3><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToDegreePlan(user.studentID)" color="black" text rounded>View Degree Plan</v-btn></h3>
  <br>
  <h4><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="addToStudentCourseList(selected, user.studentID)" color="black" text rounded>Register Course</v-btn></h4>
  
    
    <v-card width="100vw">
       <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Course Name or Number"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="courses"
        item-key="name"
        :items-per-page="25"
      
        :single-select="singleSelect"
        show-select
        :search="search"
        @click:row="viewCourse"
        class="elevation-1"
        >
         

    
      </v-data-table>
    </v-card>
  </div>
</v-container>
</template>


<script>
import courseServices from '@/services/courseServices.js'
import Utils from '@/config/utils.js';
import StudentServices from '@/services/studentServices.js';

export default {
    components: {},
    
    data() {
        return {
          selected: [],
          studentCourseList: {},
          user: {},
           singleSelect: true,
          search: '',
          headers: [
            {
            text: 'Course Name',
            align: 'start',
            filterable: true,
            //sortable: false,
            value: 'name',
            },
            {
            text: 'Course Number',
            align: 'start',
            filterable: true,
            value: 'courseNum'
            },
            {
            text: 'Hours',
            align: 'start',
            filterable: false,
            value: 'hours',
            },
            {
            text: 'Level',
            align: 'start',
            filterable: false,
            value: 'level',
            }
          ],
            courses: [
             
              {
                
              }
            ],
           
        };
    },
    
  created() {
      
       this.user = Utils.getStore('user')
       StudentServices.getStudent(this.user.studentID)
      courseServices.getCourses()
      .then(response => {
        this.courses = response.data
       
      })
      .catch(error => {
        console.log(error)
      })
  
  },
  methods: { 
    goToDegreePlan(studentID) {
                 this.$router.push({ name: 'studentcourselist', params: {id:studentID} })

    },
    addToStudentCourseList(selected, studentID) {
      let studentCourseList = {};
      let obj = selected[0];

      //console.log(studentID + " " + obj.courseID + " " +  obj.semesterID + " " + null + " " +  null);
      
       studentCourseList.studentID = studentID;
       studentCourseList.courseID = obj.courseID;
       studentCourseList.semesterID = obj.semesterID;
       studentCourseList.grade = null;
       if (studentCourseList.grade == null) {
       studentCourseList.status = "Registered";
       }
      
      
       courseServices.addCourseToStudentList(studentCourseList)
         .then(() => {
           this.$router.push({ name: 'studentcourselist', params: {id:studentID} })
           //this.checkError(false);
         })
         .catch(error => {
           console.log(error)
           alert("ERROR: Add course unsuccessful. Make sure that fields are entered correctly and that the Semester ID  exists in the system.");
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
        let id = course.courseID
          this.$router.push({ name: 'view', params: {id: id}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
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