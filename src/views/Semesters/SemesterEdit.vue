<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Semester Edit</H1>

    <v-form>
        <v-col>
            <v-text-field label="Start Date" v-model="semester.startDate" type="text" id="startDate"/>
            <v-text-field label="End Date" v-model="semester.endDate" type="text" id="endDate" />
            <v-text-field label="Season" v-model="semester.season" type="text" id="season"/>
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateSemester()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
  </div>
</template>
<script>
import courseServices from '@/services/courseServices.js'

export default {
  props: ['id'],
  components: {

  },
  data() {
    return {
      semester: {},
    }
  },
  created() {
      courseServices.getSemester(this.id)
      .then(response => {
        this.semester = response.data;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

  },
  methods: {
    
    cancel() {
      this.$router.push({ name: 'viewSemester' })
    },
    updateSemester(){
      courseServices.updateSemester(this.semester)
      .then(() => {
        this.$router.push({name: 'viewSemester'});
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        })
        
    },
    deleteSemester(id){
    courseServices.deleteSemester(this.id)
      .then(() => {
        this.semesters.forEach((semester,i) => {
          if (semester.id == id) {
            this.semesters.splice(i, 1);
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