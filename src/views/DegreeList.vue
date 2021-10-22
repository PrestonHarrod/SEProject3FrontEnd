<template>
<v-container fluid fill-height> <!--fluid fill-height-->
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Degree List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Degree</v-btn></h2>
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
                    <th>Degree ID</th>
                    <th>Dept</th>
                    <th>Degree</th>
                    <th>Hours</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="degree in degrees" :key="degree.degreeID" :degree="degree">
                    <td>{{degree.degreeID}}</td>
                    <td>{{degree.dept}}</td>
                    <td>{{degree.degree}}</td>
                    <td>{{degree.hours}}</td>
                    <td><v-btn color="#66BB6A" @click="viewDegree(degree.degreeID)">Details</v-btn></td>
                    <td><v-btn color="#E53935" @click="doDelete(degrees, degree.degreeID)">Delete</v-btn></td>       
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
export default {
    components: {ConfirmDialog},
    data() {
        return {
            degrees: {},
            page: 1
        };
    },
  created() {

      courseServices.getDegrees(this.page) 
      .then(response => {
        this.degrees = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    next (page) {
  
  courseServices.getDegrees(page * 50)
    .then(response => {
      
      this.degrees = response.data
    })
    .catch(error => {
      console.log(error)
    })
},
  goToAdd() {
    this.$router.push({ name: 'addDegree'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewDegree(degree) {
          this.$router.push({ name: 'viewDegree', params: {id: degree}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
   async doDelete(degrees, id) {
            if(confirm("Do you really want to delete?")){
                courseServices.deleteDegree(id)
                .then(() => {
        this.degrees.forEach((degree,i) => {
          if (degree.degreeID == id) {
            this.degrees.splice(i, 1);
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
