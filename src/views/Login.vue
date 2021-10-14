<template>
     <div class="form-wrap">
          <form class="login">
               <div :class="[error ? 'error-show' : '' , 'error']">{{ errorMsg }}</div>    
              <p class="login-register">
                   Don't have an account?
                   <router-link class="router-link" :to="{name:'Register'}">register here</router-link>
              </p>            
              <h2>Login</h2>
              <div class="form-control">
                   <input type="text" placeholder="Email" v-model="email" autocomplete>
                   <Email class="icon"/>
              </div>
              <div class="form-control">
                   <input type="password" placeholder="Password" v-model="password" autocomplete>
                   <Password class="icon"/>
              </div>
              <router-link class="forgot-password" :to="{name:'ForgotPassword'}">
                   forgot your password?
              </router-link>
              <button @click.prevent="logUser" class="button-click">Sign In</button>
              <div class="angle"></div>
          </form>
          <div class="background"></div>
     </div>
</template>

<script>
import Email from "../assets/Icons/envelope-regular.svg"
import Password from "../assets/Icons/lock-alt-solid.svg"
import firebase from "firebase/app";
import "firebase/auth";

export default {
     name:'login',
     components:{
        Email,Password
     },
     data(){
          return{
               email: null,
               password: null,
               error:null,
               errorMsg: ""
          }
     },
     methods:{
          logUser(){
               firebase.auth().signInWithEmailAndPassword(this.email , this.password).then(()=> {
                    this.$router.push({name:"Home"});
                    this.error = false;
                    this.errorMsg = ""
               }).catch(err => {
                    this.error = true;
                    this.errorMsg = err.message;
               });
          },
     }
}

</script>

<style lang="scss">
   .form-wrap{
        overflow: hidden ;
        display: flex;
        height: 100vh;
        justify-content: space-between;
        align-self: center;
        margin: 0 auto;
        width: 90%;

        @media (min-width: 900px) {
             width: 100%;
        }

        @media (min-width: 900px) {
             widows: 100%;
        }

        .login-register{
            margin-bottom: 32px;

            .router-link{
                 color: #000;
            }
        }

     form{
          padding: 0px 10px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;

          @media (min-width: 900px) {
               padding: 0 50px;
          }

          h2{
               text-align:center;
               font-size: 32px;
               margin-bottom: 40px;
               color:  rgb(8, 8, 102) ;

               @media (min-width: 900px) {
                    font-size: 40px;
               }

          }

          .form-control{
               width: 100%;
               max-width: 350px;
               position: relative;
               display: flex;
               justify-content: center;
               align-items: center;
               margin-bottom: 8px;

               input{
                    width: 100%;
                    border: none;
                    background: #eee;
                    padding: 4px 4px 4px 30px;
                    border-radius: 17px;
                    height: 50px;
                    font-size: 14px;

                    &:focus{
                         outline: none;
                    }
               }

               .icon{
                    width: 14px;
                    position: absolute;
                    right: 20px;
               }

          }

          .button-click{
               padding: 8px;
               border: none;
               border-radius: 17px;
               width: 100%;
               max-width: 350px;
               font-size: 16px;
               background:  rgb(8, 8, 102);
               color: #fff;
               cursor: pointer;
          }

          .forgot-password{
               text-decoration: none;
               color: #000;
               cursor: pointer;
               font-size: 14px;
               margin: 16px 0 32px;
               border-bottom: 1px solid transparent;
               transition: .5s ease all;

               &:hover{
                    border-color:  rgb(8, 8, 102);
               }
          }
     }   

     .angle{
          display:none;
          position: absolute;
          background-color:  rgb(8, 8, 102);
          height: 101%;
          width: 60px;
          right: -30px;
          @media (min-width:900px) {
               display: initial;
          }
     }

     .background{
          display: none;
          flex: 3;
          background-size: cover ;
          background-image: url("../assets/abstractBg.jpg");
          width: 100%;
          height: 100%;

          @media (min-width: 900px){
                display: initial;               
          }
     }
   }

</style>