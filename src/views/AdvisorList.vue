<template>
<v-container fluid fill-height> <!--fluid fill-height-->
  <div>
    <H1 style="background-color: #811429; color:#f2f2f2">Advisor List</H1>
    <br>
    <br>
     <h2><v-btn :style="{left: '50%', transform:'translateX(-50%)'}" @click="goToAdd()" color="black" text rounded>Add Advisor</v-btn></h2>
 
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
                    <th>Advisor ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>View Advisor</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="advisor in advisors" :key="advisor.advisorID" :advisor="advisors">
                    <td>{{advisor.advisorID}}</td>
                    <td>{{advisor.fName}}</td>
                    <td>{{advisor.lName}}</td>
                    <td>{{advisor.email}}</td>
                    <td><v-btn color="#66BB6A" @click="viewAdvisor(advisor)">Details</v-btn></td>
                    <td><v-btn color="#E53935" @click="doDelete(advisors, advisor.advisorID)">Delete</v-btn></td>       
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
            advisors: {},
            page: 1
        };
    },
  created() {

      courseServices.getAdvisors(this.page) 
      .then(response => {
        this.advisors = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    next (page) {
  
  courseServices.getAdvisors(page * 50)
    .then(response => {
      
      this.advisors = response.data
      console.log(this.page)
    })
    .catch(error => {
      console.log(error)
    })
},
  goToAdd() {
    this.$router.push({ name: 'addAdvisor'})
    .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
  },
   viewAdvisor(advisor) {
          this.$router.push({ name: 'viewAdvisor', params: {id: advisor.advisorID}})
        .then(() => {
        })
        .catch(error => {
         console.log(error)
        })
    },
   async doDelete(advisors, id) {
            if(confirm("Do you really want to delete?")){
              console.log(id)
                courseServices.deleteAdvisor(id)
                .then(() => {
        this.advisors.forEach((advisor,i) => {
          if (advisor.advisorID == id) {
            this.advisors.splice(i, 1);
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
