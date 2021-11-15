<template>
<header>
     <nav class="container">
         <div class="branding">
             <router-link class="header" :to="{name :'Home'}">Triangu</router-link>
         </div>
         <div class="nav-links">
             <ul v-show="!isMobile">
                <router-link class="link" :to="{name :'Home'}">Home</router-link>
                <router-link class="link" :to="{name :'Blogs'}">Blogs</router-link>
                <router-link  class="link" :to="{name:'CreatePost'}">Create Posts</router-link>
                <router-link v-if="!user" class="link" :to="{name :'Login'}">Login/Register</router-link>
             </ul>
             <div v-if="user" @click="toggleProfileTab" class="profile" ref="profile">
                   <span>{{ this.$store.state.profileInitials }}</span>
                   <div v-show="profileTab" class="profile-menu">
                       <div class="info">
                           <p class="initials">{{ this.$store.state.profileInitials }}</p>
                           <div class="right">
                               <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                               <p>{{ this.$store.state.profileUserName }}</p>
                               <p>{{ this.$store.state.profileEmail }}</p>
                           </div>
                       </div>
                       <div class="options">
                           <div class="option">
                               <router-link class="option" :to="{name:'Profile'}">
                                   <userIcon class="icon"/>
                                   <p>Profile</p> 
                               </router-link>
                           </div>
                           <div class="option">
                               <router-link class="option" :to="{name:'Admin'}">
                                   <adminIcon class="icon"/>
                                   <p>Admin</p>
                               </router-link>
                           </div>
                           <div @click="signOut" class="option">
                                <signOutIcon class="icon"/>
                                <p>Sign Out</p>
                           </div>
                       </div>
                   </div>
             </div> 
         </div>
     </nav>
     <menuIcon @click="toggleNavbar" class="menu-icon" v-show="isMobile"/>
     <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="showMobileNavbar">
                <li class="user-nav" @click="close">
                    <router-link class="link" :to="{name :'Home'}">Home</router-link>
                </li>
                <li class="user-nav" @click="close">
                    <router-link @click="$emit('disable-overlay')" class="link" :to="{name :'Blogs'}">Blogs</router-link>
                </li>
                <li class="user-nav" @click="close">
                     <router-link class="link" :to="{name:'CreatePost'}">Create Posts</router-link>
                </li>
                <li class="user-nav" @click="close">
                     <router-link class="link" :to="{name :'Login'}">Login/Register</router-link>
                </li>

                <div class="col-1">
                    <router-link class="header" :to="{name:'Home'}" style="color:blue">Triangu</router-link>
                    <ul>
                         <li>
                             <a href="#"><twitter class="svg-icon"/></a>
                         </li>
                         <li>
                             <a href="#"><linkedIn class="svg-icon"/></a>
                         </li>
                          <li>
                             <a href="#"><linkedIn class="svg-icon"/></a>
                         </li>
                    </ul>
                </div>
             </ul>
     </transition>
     <div v-if="showMobileNavbar" class="overlay" @click="closeNav"></div>  
</header>
</template>

<script>
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg"
import userIcon from "../assets/Icons/user-alt-light.svg"
import adminIcon from "../assets/Icons/user-crown-light.svg"
import menuIcon from "../assets/Icons/bars-regular.svg";
import twitter from "../assets/Icons/twitter-brands.svg"
import linkedIn from "../assets/Icons/linkedin-brands.svg"
import firebase from "firebase/app";
import "firebase/auth";

export default {
    name: "Navigation",
    components:{
        menuIcon,
        twitter,
        linkedIn, 
        signOutIcon,
        userIcon,
        adminIcon
    },
    data(){
        return{
            isMobile:null,
            showMobileNavbar:null,
            browserWidth: null,
            profileTab:null
        }
    },

    created(){
        addEventListener('resize' , this.checkMobileDevice),
        this.checkMobileDevice();
    },

    methods:{
        checkMobileDevice(){
            this.browserWidth = window.innerWidth;
            if(this.browserWidth <= 768 ){
                this.isMobile = true;
                return;
            }
            this.showMobileNavbar = false;
            this.isMobile = false;
            return;
        },
        toggleNavbar(){
            this.showMobileNavbar = !this.showMobileNavbar;
            this.$emit('toggle-navbar');
        },
        close(){
            this.showMobileNavbar = !this.showMobileNavbar
            this.$emit("close-overlay")
        },
        toggleProfileTab(e){
            if(e.target === this.$refs.profile){
                this.profileTab = !this.profileTab;
            }
        },
        closeNav(){
            this.showMobileNavbar = !this.showMobileNavbar
        },
        signOut(){
            firebase.auth().signOut();
            window.location.reload();
        }
    },
    watch: {
        showMobileNavbar: function(){
            if(this.showMobileNavbar){
                document.documentElement.style.overflow = 'hidden'
                return;
            }
            document.documentElement.style.overflow = 'auto'
        },
        // $router(to , from){
        //      document.documentElement.style.overflow = null;
        // }
    },
    computed:{
        user(){
            return this.$store.state.user;
        }
    }

    
}
</script>

<style lang="scss" scoped>
    .overlay{
  position: fixed;
  top: 0;
  background: rgba(0 , 0 , 0 , .5);
  height: 100%;
  width: 100%;
  z-index: 1;
} 
    header{
        background-color: rgb(8, 8, 102);
        padding: 0 25px;
        z-index: 99;

        .link{
            font-weight: 600;
            padding: 0 4px;
            &:hover{
                color: blue;
                transition: .2s all; 
            }
            &.router-link-exact-active{
                color: blue;
            }
        }

        nav{
            display: flex;
            padding: 25px 0;
            align-items: center;
            width: 80%;
            @media (max-width: 768px) {
                width: 100%;
            }
            @media (max-width: 994px){
                width: 90%;
            }

            @media (max-width: 768px){
                width: 100%;
                margin: 0px auto;
            }

            .branding{
                display: flex;
                align-items: center;

                .header{
                    font-weight: 600;
                    font-size: 24px;
                    color: #eee;
                    text-decoration: none;
                }
            }

            .nav-links{
                display: flex;
                justify-content: flex-end;
                position: relative;
                align-items: center;
                flex: 1;


                ul{
                   margin-right: 32px;

                   .link{
                       margin-right:32px;
                       color: #eee;

                       &:hover{
                           color: rgb(247, 247, 95);
                       }
                       &.router-link-exact-active{
                           color: rgb(247, 247, 95);
                       }
                   }

                   .link:last-child{
                        margin-right: 0;
                   }
                }

                .profile{
                    position: relative;
                    display: flex;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center ;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    color:  rgb(8, 8, 102);
                    background-color: #eee;

                    @media (max-width: 768px) {
                        margin-right: 30px;
                    }
                    
                    span{
                        font-weight: 800;
                        font-size: 24px;
                        pointer-events: none;
                    }

                    .profile-menu{
                        position: absolute;
                        top: 60px;
                        right: 0;
                        width: 350px;
                        background-color: #eee;
                        box-shadow: 0px 2px 5px rgba(0 , 0 , 0 , .3);
                        z-index: 1111;

                        @media (max-width: 450px){
                             width: 250px;
                        }

                        .info{
                            display: flex;
                            align-items: center;
                            padding: 15px;
                            border-bottom: 2px solid rgb(8, 8, 102);

                            .initials{
                                display: flex;
                                position: initials;
                                width: 40px;
                                height: 40px;
                                background-color:  rgb(8, 8, 102);
                                color: #eee;
                                align-items: center;
                                justify-content: center;
                                border-radius: 50%;
                            }

                            .right{
                                flex: 1;
                                margin-left: 24px;
                                
                                p:nth-child(1){
                                    font-size: 14px;
                                    font-weight:500;
                                }

                                p:nth-child(2),
                                p:nth-child(3){
                                    font-size: 12px;
                                }

                            }
                        }

                        .options{
                            padding: 15px;
                            .option{
                                display: flex;
                                color:  rgb(8, 8, 102);
                                align-items: center;
                                text-decoration: none;
                                margin-bottom: 12px;

                                .icon{
                                    width: 18px;
                                    height: auto;
                                }

                                p{
                                    font-size: 14px;
                                    margin-left: 12px;
                                }
                            }

                            .option:last-child{
                                margin-bottom: 0px;
                            }
                        }
                    }
                }

            } 

        }

        .menu-icon{
            position: absolute;
            cursor: pointer;
            top: 32px;
            right: 25px;
            height: 25px;
            width: auto;
            color: #eee;
        }

        /***
        **Mobile responsive navbar*
        **/

        .mobile-nav {    
            padding: 20px;
            width: 70%;
            max-width: 250px;
            display: flex;
            flex-direction: column;
            position: fixed;
            height: 100%;
            background-color: #eee;
            top: 0;
            left: 0;
            z-index: 99;

            .link{
                  padding: 15px 0;
            }

            .user-nav{
                list-style-type: none;
                padding: 10px 5px;
            }

            .header{
                text-align: center;
                font-size: 24px;
                text-decoration: none;
                font-weight: 600;
            }

            .col-1{
                position: absolute;
                bottom: 0;

                ul li{
                    margin-right: 6px;
                    display: inline;
                }

                .svg-icon{
                    width: 25px;

                }
            }
        }

        /*****
        **Add transitionn to the mobile navbar
        **
        ***/
        .mobile-nav-enter-active,
        .mobile-nav-leave-active{
            transition: all 1s ease;
        }

        .mobile-nav-enter{
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to{
            transform: translateX(0);
        }

        .mobile-nav-leave-to{
            transform: translateX(-250px);
        }

    }
</style>