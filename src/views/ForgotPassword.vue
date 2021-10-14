<template>
<div class="reset-password">
    <Modal v-if="modalActive" @close-modal="closeModal" :modalMessage="modalMessage"/>
    <Loading v-if="loading" />
      <div class="form-wrap">
          <form class="reset">        
               <p class="login-register">
                   Go back to 
                   <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
               </p>                 
              <h2>Reset Password</h2>
              <p>Enter your email to reset your password</p>
              <div class="form-control">
                   <input type="text" placeholder="Email" v-model="email" autocomplete>
                   <Email class="icon"/>    
              </div>
              <button @click.prevent="resetPassword" class="button-click">Reset</button>
              <div class="angle"></div>
          </form>
          <div class="background"></div>
     </div>
</div>
</template>

<script>
import Email from "../assets/Icons/envelope-regular.svg"
import Modal from "../components/Modal.vue"
import Loading from "../components/Loading.vue"
import firebase from "firebase/app";
import "firebase/auth";

    export default {
        name:'ForgotPassword',
        components:{ Email,Modal,Loading},
        data(){
            return{
                email: "",
                modalActive: false,
                modalMessage:"",
                loading:null
            }
        },
        methods:{
            resetPassword(){
                if(this.email !== ""){
                    this.loading = true;
                    firebase.auth().sendPasswordResetEmail(this.email).then(()=> {
                    this.modalMessage = "You will recieve an email shortly, if your account exist!"
                    this.loading = false;
                    this.modalActive =true
                    return;
                  }).catch(err => {
                    this.modalMessage = err.message
                    this.loading = false;
                    this.modalActive = true
                  });
                  return;
               }else{
                this.modalMessage = "Oops!!! input feild is required"
                this.modalActive = true
                return;
               }
            },
            closeModal(){
                this.modalActive = !this.modalActive
                this.email = ""
            }
        }
    }
</script>

<style lang="scss" scoped>
.reset-password{
     position: relative;

     .form-wrap{
         .reset{
             h2{
                 margin-bottom: 8px;
             }
             p{
                 text-align: center;
                 margin-bottom: 32px;
             }
         }
     }
}
</style>