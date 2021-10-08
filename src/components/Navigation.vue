<template>
<header>
     <nav class="container">
         <div class="branding">
             <router-link class="header" :to="{name :'Home'}">Triangu</router-link>
         </div>
         <div class="nav-links">
             <ul v-show="!isMobile">
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Create Posts</router-link>
                <router-link class="link" to="#">Login/Register</router-link>
             </ul>
         </div>
     </nav>
     <menuIcon @click="toggleNavbar" class="menu-icon" v-show="isMobile"/>
     <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="showMobileNavbar">
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Create Posts</router-link>
                <router-link class="link" to="#">Login/Register</router-link>
             </ul>
     </transition>
</header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";

export default {
    name: "Navigation",
    components:{
        menuIcon
    },
    data(){
        return{
            isMobile:null,
            showMobileNavbar:null,
            browserWidth: null
        }
    },

    created(){
        addEventListener('resize' , this.checkMobileDevice)
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
    header {
        border: 1px solid #000;
        background-color: rgb(8, 8, 102);
        padding: 0 25px;
        box-shadow: 0 4px 6px -1px rgba(0 , 0 , 0 , 0.1) , opx 2px 4px -1px rgba(0 , 0 , 0 , 0.06);
        z-index: 99;

        .link{
            font-weight: 500;
            padding: 0 8px;

            &:hover{
                color: blue;
                transition: .5s all; 
            }
        }

        nav{
            display: flex;
            padding: 25px 0;
            align-items: center;

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

            .link{
                  padding: 15px 0;
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