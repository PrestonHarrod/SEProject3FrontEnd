<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Add Course</H1>
<v-form>
        <v-col>
           <v-text-field label="Dept" v-model="course.Dept" type="text" id="courseDept"/>
            <v-text-field label="Number" v-model="course['Course Number']" type="text" id="courseNumber"/>
            <v-text-field label="Name" v-model="course.Name" type="text" id="courseName" />
            <v-text-field label="Hours" v-model="course.Hours" type="text" id="courseHours"/>
            <v-text-field label="Level" v-model="course.Level" type="text" id="courseLevel"/>
             <v-textarea label="Description" v-model="course.Description" type="text" id="courseDescription" />
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="addCourse()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
</div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
export default {
  data() {
    return {
      course: {}
    }
  },
  methods: {
    addCourse() {
     
        courseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: 'list' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'list' })
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
