<template>
  <div>
<H1 style="background-color: #811429; color:#f2f2f2">{{degree.degree + ' ' + " Courses"}}</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
 <v-btn v-if="selected[0] != null" color="#E53935" :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="deleteDegreeCourse(selected)" text rounded>Remove Course</v-btn>

    <v-card width="100vw">
       <v-card-title>  
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by Degree or Department"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
      <v-data-table
        v-model="selected"
        show-select
        single-select
        :headers="headers"
        :items="degreecourses"
        :items-per-page="25"
        :search="search">
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
// import StudentServices from '@/services/studentServices.js';
// import StudentCourseServices from '@/services/StudentCourseServices.js';
import courseServices from '@/services/courseServices.js'
//import SemesterCourse from '@/components/SemesterCourse';
import DegreeCourseServices from '@/services/DegreeCourseServices.js';
export default {
    components: {
        
    },
    props :['id'],
    data() {
        return {
            degree: {},
            degreecourses: [],
            selected: [],
            search: '',
            headers: [
            {
            text: 'Course Name',
            align: 'start',
            filterable: true,
            value: 'course.name',
            },
            {
            text: 'Department',
            align: 'start',
            filterable: true,
            value: 'course.dept'
            },
            {
            text: 'Hours',
            align: 'start',
            filterable: false,
            value: 'course.hours',
            },
            ],
        };
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
          
    },
    methods: {
        cancel() {
      this.$router.push({ name: 'degreelist' })
    },
    
    async deleteDegreeCourse(selected) {
      let obj = selected[0];
      let id = obj.id

       DegreeCourseServices.deleteDegreeCourse(id)
      .then(() => {
         location.reload();
        })
        .catch(error => {
          console.log(error)
        })
    },
        
    },
  }
</script>

