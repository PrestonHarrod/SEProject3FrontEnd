<template>
    <v-container>
        <v-row>
            <v-col>
                <Nav/>              
                <p v-if=user>Welcome, {{user.user}}</p>          
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
        console.log("advisorId="+this.user.advisorID+" studentId="+this.user.studentID)
        if (this.user != null && this.user.advisorID != null) {
          await AdvisorServices.getAdvisor(this.user.advisorID)
            .catch(() => {
                Utils.setStore("user",null);
                this.$router.push({ name: 'home' });
            });
        } else {
            if (this.user != null && this.user.studentID != null){
              await StudentServices.getStudent(this.user.studentID)
                .catch(() => {
                  Utils.setStore("user",null);
                  this.$router.push({ name: 'home' });
              });
          }
        }
    }
}
</script>

<style></style>