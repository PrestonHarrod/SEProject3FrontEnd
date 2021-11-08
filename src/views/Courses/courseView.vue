<template>
  <div>
    <Nav/>
<H1 style="background-color: #811429; color:#f2f2f2">Course View</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <h3><v-btn v-if='user.adminID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateCourse(course)" text rounded>Edit</v-btn>
    <v-btn v-else-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateCourse(course)" text rounded>Edit</v-btn>
    <br>
    <v-btn color="#E53935" v-if='user.advisorID != null' :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="deleteCourse(course)" text rounded>Delete</v-btn>
   </h3>
  <v-form>
        <v-col>
            <v-text-field readonly label="Course Number" v-model="course.courseNum" type="text" id="courseNum"/>
            <v-text-field readonly label="Course Name" v-model="course.name" type="text" id="courseNum"/>
            <v-text-field readonly label="Department" v-model="course.dept" type="text" id="dept" />
            <v-text-field readonly label="Hours" v-model="course.hours" type="text" id="hours"/>
            <v-text-field readonly label="Level" v-model="course.level" type="text" id="level"/>
            <v-textarea readonly label="Description" v-model="course.desc" type="text" id="desc" />
       </v-col>
    </v-form>
<confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Utils from '@/config/utils.js'

export default {
  props: ['id'],
  components: {ConfirmDialog},
  data() {
    return {
      user: {},
      course: {}
      
    }
  },
  created() {
      this.user = Utils.getStore('user')
      courseServices.getCourse(this.id)
      .then(response => {
        this.course = response.data,
        console.log(this.course)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
        alert("ERROR: retrieve course failed");
      })
  },
  methods: {
    addForm(){
      this.addCourseDisplay = true;
    },
    updateCourse(course) {
          this.$router.push({ name: 'edit', params: {id: course.courseID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'courses' })
    },

    async deleteCourse(course){
      let id = course.courseID
      if(confirm("Do you really want to delete?")){
    courseServices.deleteCourse(id)
      .then(() => {
         this.$router.push({ name: 'courses' }) 
        })
       
        
        .catch(error => {
          console.log(error)
        })
      }
    },
    
}
}
</script>

<style>
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style> 
