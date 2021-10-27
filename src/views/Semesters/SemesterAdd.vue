<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Semester Add</H1>

<v-form>
        <v-col>
            <v-text-field label="Start Date" placeholder="2020/01/01" v-model="semester.startDate" type="text" id="startDate"/>
            <v-text-field label="End Date" placeholder="2020/04/04" v-model="semester.endDate" type="text" id="endDate" />
            <v-text-field label="Season" placeholder="Spring" v-model="semester.season" type="text" id="season"/>
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="addSemester()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
    
</div>

</template>


<script>
import courseServices from '@/services/courseServices.js'
export default {
  data() {
    return {
      semester: {}
    }
  },
  methods: {
    addSemester() {
     
        courseServices.addSemester(this.semester)
        .then(() => {
          this.$router.push({ name: 'semesterlist' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'semesterlist' })
    },
  },
}
</script>
<style>
</style>