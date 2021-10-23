<template>
  <div>
<H1 style="background-color: #811429; color:#f2f2f2">Semester View</H1>
<br>
 <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Go Back</v-btn></h2>
    <h3><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="updateSemester(semester)" text rounded>Edit</v-btn>
   </h3>
  <v-form>
        <v-col>
            <v-text-field readonly label="Start Date" v-model="semester.startDate" type="text" id="startDate"/>
            <v-text-field readonly label="End Date" v-model="semester.endDate" type="text" id="endDate" />
            <v-text-field readonly label="Season" v-model="semester.season" type="text" id="season"/>
       </v-col>
    </v-form>

  </div>
</template>

<script>
import courseServices from '@/services/courseServices.js'
export default {
  props: ['id'],
  components: {},
  data() {
    return {
      semester: {}
      
    }
  },
  created() {
      courseServices.getSemester(this.id)
      
      .then(response => {
        
        this.semester = response.data
        
      })
        
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  methods: {
    addForm(){
      this.viewSemesterDisplay = true;
    },
    updateSemester(semester) {
          this.$router.push({ name: 'editsemester', params: {id: semester.semesterID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'semesterlist' })
    },

    deleteSemester(id){
    courseServices.deleteSemester(id)
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

<style>
th {
  text-align: left;
  font-size: 1.5rem !important;
}
</style> 