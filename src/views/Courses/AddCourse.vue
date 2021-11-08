<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Course Add</H1>
<v-app>
<v-form>
        <v-col>
          <v-text-field label="Course Name" placeholder="Course Name" v-model="course.name" type="text" id="name" />
          <v-text-field label="Semester ID" placeholder="" v-model="course.semesterID" type="text" id="semesterID"/>
          <v-text-field label="Dept" placeholder="CMCS" v-model="course.dept" type="text" id="courseDept"/>
          <v-text-field label="Number" placeholder="CMCS-0000" v-model="course.courseNum" type="text" id="courseNumber"/>
          <v-select id='hours' v-model="course.hours"
            :items= "hoursItems" 
            label="Hours"
          ></v-select>
          <v-select id='level' v-model="course.level"
            :items= "levelItems" 
            label="Level"
          ></v-select>
          <v-textarea label="Description" placeholder="This is a description of a course" v-model="course.desc" type="text" id="courseDescription" />
       </v-col>
      <v-btn v-if='user.adminID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="addCourse()" text rounded>Submit</v-btn>
      <v-btn v-else-if='user.advisorID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="addCourse()" text rounded>Submit</v-btn>
      <v-btn v-if='user.adminID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
      <v-btn v-else-if='user.advisorID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>

</v-app>

</div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
import Utils from '@/config/utils.js'
export default {
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
  },
  methods: {
    addCourse() {
        courseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: 'courses' })
        })
        .catch(error => {
          console.log(error)
          alert("ERROR: Add course unsuccessful. Make sure that fields are entered correctly and that the Semester ID  exists in the system.");
        })
    },
    cancel() {
      this.$router.push({ name: 'courses' })
    },
  }
}
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>
