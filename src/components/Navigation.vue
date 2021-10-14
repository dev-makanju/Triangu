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
                <router-link class="link" to="#">Create Posts</router-link>
                <router-link class="link" :to="{name :'Login'}">Login/Register</router-link>
             </ul>
         </div>
     </nav>
     <menuIcon @click="toggleNavbar" class="menu-icon" v-show="isMobile"/>
     <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="showMobileNavbar">
                <router-link class="link" :to="{name :'Home'}">Home</router-link>
                <router-link class="link" :to="{name :'Home'}">Blogs</router-link>
                <router-link class="link" to="#">Create Posts</router-link>
                <router-link class="link" :to="{name :'Blogs'}">Login/Register</router-link>

                <div class="col-1">
                    <router-link class="header" :to="{name:'Home'}">Triangu</router-link>
                    <ul>
                         <li>
                             <a href="#"><twitter class="svg-icon"/></a>
                         </li>
                         <li>
                             <a href="#"><linkedIn class="svg-icon"/></a>
                         </li>
                    </ul>
                </div>
             </ul>
     </transition>
</header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import twitter from "../assets/Icons/twitter-brands.svg"
import linkedIn from "../assets/Icons/linkedin-brands.svg"

export default {
    name: "Navigation",
    components:{
        menuIcon,
        twitter,
        linkedIn
    },
    data(){
        return{
            isMobile:null,
            showMobileNavbar:null,
            browserWidth: null
        }
    },

    created(){
        addEventListener('resize' , this.checkMobileDevice),
        this.checkMobileDevice;
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
        }
    }

    
}
</script>

<style lang="scss" scoped>
    header{
        background-color: rgb(8, 8, 102);
        padding: 0 25px;
        z-index: 99;

        .link{
            font-weight: 600;
            padding: 0 4px;
            :hover{
                color: blue;
                transition: .2s all; 
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
                   }

                   .link:last-child{
                        margin-right: 0;
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