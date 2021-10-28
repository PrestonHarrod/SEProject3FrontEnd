<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Degree Add</H1>

<v-form>
        <v-col>
            <v-text-field label="Department" placeholder="CMCS" v-model="degree.dept" type="text" id="dept"/>
            <v-text-field label="Degree" placeholder="Computer Science w/ Business" v-model="degree.degree" type="text" id="degree" />
            <v-text-field label="Hours" placeholder="100" v-model="degree.hours" type="text" id="hours"/>
       </v-col>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="addDegree()" text rounded>Submit</v-btn>
      <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
    </v-form>
    
</div>

</template>


<script>
import courseServices from '@/services/courseServices.js'
export default {
  data() {
    return {
      degree: {}
    }
  },
  methods: {
    addDegree() {
     
        courseServices.addDegree(this.degree)
        .then(() => {
          this.$router.push({ name: 'degreelist' })
        })
        .catch(error => {
          console.log(error)
          alert("ERROR: Add Degree unsuccessful. Make sure that fields are entered correctly");
        })
    },
    cancel() {
      this.$router.push({ name: 'degreelist' })
    },
  },
}
</script>
<style>
</style>