<template>
<div class="reset-password">
    <Loading v-if="loading" />
       <div class="form-wrap">
        <form class="register">
            <div :class="[error ? 'error-show' : '' , 'error']">{{ errorMsg }}</div>     
            <p class="login-register">
                   Already a member?
                   <router-link class="router-link" :to="{name:'Login'}">Login here</router-link>
            </p>            
            <h2>Register</h2>
            <div class="form-control">
                   <input type="text" placeholder="First Name" v-model="firstName" autocomplete>
                   <User class="icon"/>
            </div>
            <div class="form-control">
                   <input type="text" placeholder="Last Name" v-model="lastName" autocomplete>
                   <User class="icon"/>
            </div>
            <div class="form-control">
                   <input type="text" placeholder="Username" v-model="userName" autocomplete>
                   <User class="icon"/>
            </div>
            <div class="form-control">
                   <input type="email" placeholder="Email" v-model="Email" autocomplete>
                   <Email class="icon"/>
            </div>
            <div class="form-control">
                   <input type="password" placeholder="Password" v-model="password" autocomplete>
                    <Password class="icon"/>
            </div>
            <button class="button-click" @click.prevent="registerUser">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
     </div>
</div>
</template>

<script>
import Loading from "../components/Loading.vue"
import Email from "../assets/Icons/envelope-regular.svg";
import Password from "../assets/Icons/lock-alt-solid.svg";
import User from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";



export default {
        name:"register",
        components:{
          Email , Password , User , Loading
        },
        data(){
              return{
                     firstName:"",
                     lastName: "",
                     Email: "",
                     userName: "",
                     password: "",
                     error: null,
                     errorMsg: "",
                     modalActive:null,
                     loading:null
              }
         },
         methods:{
              async registerUser(){
                   if(
                          this.firstName !== "" &&
                          this.lastName !== "" &&
                          this.Email !== "" &&
                          this.userName !== "" &&
                          this.password !== "" 
                   ){
                      this.error = false
                      this.errorMsg = ""
                      this.loading = true;    
                      const firebaseAuth = await firebase.auth();
                      const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.Email , this.password); 
                      const result = await createUser;
                      const dataBase = db.collection("user").doc(result.user.uid);
                      await dataBase.set({
                             firstName:this.firstName,
                             lastName:this.lastName,
                             userName:this.userName,
                             Email:this.Email 
                      })
                      this.loading = false;
                      this.$router.push({name:'Home'});
                      return;
                   }
                   this.errorMsg = "Oops!! input feild is required"
                   this.error = !this.error
                   return
              },
              closeModal(){
                  this.modalActive = !this.modalActive;
              }
         },        
         watch:{
            loading: function(){
                if(this.loading){
                    document.documentElement.style.overflow = 'hidden'
                    return;
                }document.documentElement.style.overflow = 'auto' 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>