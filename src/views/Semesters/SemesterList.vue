<template>
<v-container fluid fill-height> <!--fluid fill-height-->
  <div>
    <Nav/>
    <H1 style="background-color: #811429; color:#f2f2f2">Semester List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Semester</v-btn></h2>
  <br>
  
   <v-pagination
      v-model="page"
      :length="62"
      :total-visible="12"
      @input="next"
    ></v-pagination>
  <br>
    <v-card width="100vw">
         <v-simple-table height="1000px" fixed-header>
          <template v-slot:default>   
            <thead>
                <tr>
                    <th>Semester ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Season</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="semester in semesters" :key="semester.semesterID" :semester="semester">
                    <td>{{semester.semesterID}}</td>
                    <td>{{semester.startDate}}</td>
                    <td>{{semester.endDate}}</td>
                    <td>{{semester.season}}</td>
                    <td><v-btn color="#66BB6A" @click="viewSemester(semester.semesterID)">Details</v-btn></td>
                    <td><v-btn color="#E53935" @click="doDelete(semesters, semester.semesterID)">Delete</v-btn></td>       
                    <confirm-dialog ref="confirmDialog"></confirm-dialog>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>
  </div>
</v-container>
</template>


<script>
//import CourseListDisplay from '@/components/CourseListDisplay.vue'
import courseServices from '@/services/courseServices.js'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Nav from '@/components/Nav.vue'

export default {
    components: {ConfirmDialog, Nav},
    data() {
        return {
            semesters: {},
            page: 1
        };
    },
  created() {

      courseServices.getSemesters(this.page) 
      .then(response => {
        this.semesters = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    next (page) {
  
  courseServices.getSemesters(page * 50)
    .then(response => {
      
      this.semesters = response.data
    })
    .catch(error => {
      console.log(error)
    })
},
  goToAdd() {
    this.$router.push({ name: 'addSemester'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewSemester(semester) {
          this.$router.push({ name: 'viewSemester', params: {id: semester}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
   async doDelete(semesters, id) {
            if(confirm("Do you really want to delete?")){
                courseServices.deleteSemester(id)
                .then(() => {
        this.semesters.forEach((semester,i) => {
          if (semester.semesterID == id) {
            this.semesters.splice(i, 1);
          }
        })
        })
                .catch(error => {
                    console.log(error);
                })
   }
      },
      
      },

  }
</script>

<style>
H1 {
  text-align: center;
  font-size: 3.5rem !important;
  
}
th {
  text-align: left;
  font-size: 1.5rem !important;
}

</style>
