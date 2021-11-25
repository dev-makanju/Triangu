<template>
  <div>
    <div class="app" v-if="this.$store.state.postLoaded">
        <div v-if="NavActive" class="overlay" @click="closeNav"></div>    
          <div class="nav-wrapper">
              <Navigation v-if="!NavigationDisabled" @toggle-navbar="showContainerOverlay"  @close-overlay="closeOverlay"/>
          </div>
          <router-view />
          <Footer v-if="!NavigationDisabled"/>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import firebase from "firebase/app";
import "firebase/auth";


export default{
  name: "app",
  components:{
      Navigation,
      Footer
  },

  data() {  
    return {
       NavigationDisabled: null,
       NavActive:null
    };
  },

  created(){
      //listen to whenever there is an auth state change to 
      //fire the action setprofileinfo in store action
      //user parameter is used to know if user is authenticated;
      firebase.auth().onAuthStateChanged( (user) => {
          this.$store.commit("updateUser" , user);
          if(user){
             this.$store.dispatch("getCurrentUser");
          }
      })
      this.$store.dispatch("getPost");
      this.checkRoute();
  },

  mounted(){

  },

  methods:{
      checkRoute(){
        if(this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword" || this.$route.name === "NotFound"){
            this.NavigationDisabled = true;
            return;
        }this.NavigationDisabled = false;
      },
      showContainerOverlay(){
          this.NavActive = !this.NavActive;
      },
      closeNav(){
          this.NavActive = !this.NavActive
      },
      closeOverlay(){
        this.NavActive = !this.NavActive
      }
  },

  watch:{
      $route(){
        this.checkRoute();
      }
  },
};
</script>

<style lang="scss">


@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}


.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}


.container {
  max-width: 1440px;
  margin: 0 auto;
}


.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow{
    margin-left: 8px;
    width: 12px;
    path{
        fill:#000;
    }
}

.arrow-light{
    path{
        fill: #fff ;
    }
}

.button,
.router-button{
    transition: 500;
    cursor: pointer;
    margin-top: 24px;
    padding: 12px 24px;
    background: #303030;
    color: #fff;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;


    &:focus{
      outline: none;
    }

    &:hover{
       background: rgb(81, 81, 185);
    }
}

.button-ghost{
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background: transparent ;

  @media (min-width: 768px) {
      margin-top: 0;
      margin-left: auto;
  }

  i{
    margin-left: 8px;
  }
}

.button-light{
  background-color: transparent ;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive{
   pointer-events: none !important;
   cursor: none !important;
   background-color: green;
}

.blog-card-wrap{
    position: relative;
    padding: 80px 16px;
    background-color: #f1f1f1;

    @media (min-width:450px) {
       padding: 100px 16px;
    }

    .blog-cards{
       display: grid;
       gap: 32px;
       grid-template-columns: 1fr;

       @media (min-width: 450px) {
           grid-template-columns: repeat(2 , 1fr);
       }

       @media (min-width: 900px) {
           grid-template-columns: repeat(3 , 1fr);
       }

       @media (min-width: 1200px) {
           grid-template-columns: repeat(4 , 1fr);
       }
    }
}

.error{
    background: #e74e3c;
    color: #eee;
    text-align: center;
    border-radius:5px;
    width: 100%;
    max-width: 350px;
    padding: 7px;
    transition: .5s ease all;
    visibility: hidden;
    font-size: 10px;
}

.error-show{
    visibility: visible ;
}
</style>
