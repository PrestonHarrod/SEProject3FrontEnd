
<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Course Edit</H1>
    <v-app>
    <v-form>
        <v-col>
          <v-text-field label="Course Name" v-model="course.name" type="text" id="name" />
          <v-text-field label="Semester ID" v-model="course.semesterID" type="text" id="semesterID"/>
          <v-text-field label="Dept" v-model="course.dept" type="text" id="courseDept"/>
          <v-text-field label="Number" v-model="course.courseNum" type="text" id="courseNumber"/>
          <v-select id='hours' v-model="course.hours"
            :items= "hoursItems"
            label="Hours"
          ></v-select>
          <v-select id='level' v-model="course.level"
            :items= "levelItems" 
            label="Level"
          ></v-select>
          <v-textarea label="Description" v-model="course.desc" type="text" id="courseDescription" />
       </v-col>
      <v-btn v-if='user.advisorID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="updateCourse()" text rounded>Submit</v-btn>
      <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
    </v-app>
  </div>
</template> 
<script>
import courseServices from '@/services/courseServices.js'
import Utils from '@/config/utils.js'

export default {
  props: ['id'],
  components: {

  },
  data() {
    return {
      user: {},
      course: {},
      hoursItems: [0, 1, 2, 3, 4],
      levelItems: ['0000', '1000', '2000', '3000', '4000', '5000'],
    }
  },
  created() {
      this.user = Utils.getStore('user');
      courseServices.getCourse(this.id)
      .then(response => {
        this.course = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'view' })
    },
    updateCourse(){
      courseServices.updateCourse(this.course)
      .then(() => {
        this.$router.push({name: 'view'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        console.log(this.id)
        })
        
    },
    deleteCourse(id){
    courseServices.deleteCourse(this.id)
      .then(() => {
        this.courses.forEach((course,i) => {
          if (course.id == id) {
            this.courses.splice(i, 1);
          }
        })
          
        })
        .catch(error => {
         this.message = error.response.data.message
        })
    },
    
}
}
</script>

<style></style> 