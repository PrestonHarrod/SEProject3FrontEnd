<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Course Plan</H1>               
                <h2 v-if=user>Hello, {{user.user}}</h2>    
                <h2 v-if=!user>Please Login</h2>        
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Utils from '@/config/utils.js';
import StudentServices from '@/services/studentServices.js';
import AdvisorServices from '@/services/advisorServices.js';

export default {

    data() {
        return {
            user: {},
        };
    },
    async created()  {
        this.user = Utils.getStore('user');
        document.title = "OC Course Plan"
        console.log("advisorId="+this.user.advisorID+" studentId="+this.user.studentID)
        if(this.user != null && this.user.advisorID != null) {
          await AdvisorServices.getAdvisor(this.user.advisorID)
          .catch(() => {
            console.log("no admin login");
            Utils.setStore("user",null);
            this.$router.push({ name: 'main' });
                   
            });
        } else {
            if(this.user != null && this.user.studentID != null){
              await StudentServices.getStudent(this.user.studentID)
                .catch(() => {
                  console.log("no student login");
                  Utils.setStore("user",null);
                  this.$router.push({ name: 'main' });
              });
          }
        }
    }
}
</script>

<style></style>