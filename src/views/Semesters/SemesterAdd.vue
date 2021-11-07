<template>
<div>
<H1 style="background-color: #811429; color:#f2f2f2">Semester Add</H1>
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
       
      <v-btn v-if='user.advisorID != null' :style="{transform:'translateX(-50%)'}" v-on:click.prevent="addSemester()" text rounded>Submit</v-btn>
      <v-btn :style="{transform:'translateX(-50%)'}" v-on:click.prevent="cancel()" color="black" text rounded>Cancel</v-btn>
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
      items: ['Fall', 'Winter', 'Spring', 'Summer'],
      semester: { startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                  endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)},
      menu: false,
      menu2: false,
    }
  },
  created() {
    this.user = Utils.getStore('user')
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
.select {
    font-size: .9rem;
    padding: 2px 5px;
}

</style>