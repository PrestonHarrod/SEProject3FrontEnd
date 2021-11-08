<template>
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Semester Edit</H1>
<v-app>
<v-form>
    <v-col>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="semester.startDate"
            label="Start Date"
            placeholder="yyyy/mm/dd"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="semester.startDate"
          color="#811429"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="semester.endDate"
            label="End Date"
            placeholder="yyyy/mm/dd"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="semester.endDate"
          color="#811429"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
        <v-select prepend-inner-icon="mdi-sun-snowflake" id='season' v-model="semester.season"
          :items= "items" 
          label="Season"
        ></v-select>
       </v-col>
       
      <v-btn v-if='user.advisorID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="updateSemester()" text rounded>Submit</v-btn>
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
      items: ['Fall', 'Winter', 'Spring', 'Summer'],
      semester: { startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                  endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)},
      menu: false,
      menu2: false,
    }
  },
  created() {
      this.user = Utils.getStore('user')
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
        console.log('There was an error:', error.response),
        alert("ERROR: Add student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system.");
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
         this.message = error.response.data.message,
         alert("ERROR: Add student unsuccessful. Make sure that fields are entered correctly and that the Advisor ID and Degree ID exists in the system.");
        })
    },
    
}
}
</script>

<style></style> 