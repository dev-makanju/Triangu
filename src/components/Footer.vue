<template>
    <footer>
         <div class="container">
            <div class="left">
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
                <div class="col-2">
                    <ul>
                         <router-link class="link" :to="{name:'home'}">Home</router-link>
                         <router-link class="link" :to="{name:'blogs'}">Blogs</router-link>
                         <router-link class="link" :to="{name:'CreatePost'}">Create Post</router-link>
                         <router-link class="link" :to="{name:'auth'}">
                             Login in / Register
                         </router-link>
                    </ul>
                </div>
            </div>
            <div class="right">
                 <p>Copyright 2021 all right reserved</p>
            </div>
         </div>
    </footer>
</template>
<script>

import twitter from "../assets/Icons/twitter-brands.svg"
import linkedIn from "../assets/Icons/linkedin-brands.svg"

export default {
    name:'Footer',
    components:{
        twitter,
        linkedIn
    }
}
</script>

<style lang="scss" scoped>
footer{
    background:  rgb(8, 8, 102);
    margin-top: auto ;
    padding: 100px 85px;

    @media screen and (max-width: 450px){
        padding: 100px 5px;    
    }

    .container{
        display: flex;
        flex-direction: column;
        gap: 32px;
        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0px;
        }

        >div{
            display: flex;
            flex: 1;
        }

        .left{
            gap: 32px;
            color: #eee;
            display: flex;
            flex-direction: row;
            @media screen and (max-width: 800px) {
                flex-direction: column;
            }
        }

        .header{
            text-align: center;
            font-size: 24px;
            color: #eee;
            text-decoration: none;
            font-weight: 600;
        }

        ul{
            gap: 16px;
            list-style: none;
            display: flex;
        }

        .col-1,
        .col-2{
            gap: 32px;
            display: flex;
            flex: 1;
            @media (min-width: 800px){
                gap: 0;
            }
        }

        .col-1{
            flex-direction: column;

            h2{
                text-align: center;

                @media (min-width: 800px){
                    text-align: initial;
                }
            }

            ul{
                margin: auto;

                li{
                    display: flex;
                    align-items: center;
                    .svg-icon{
                       height: 25px;
                       padding: 4px;
                       background: #eee;
                       border-radius: 4px;
                    }
                }
            }
        }

        .col-2{
            justify-content: center;
            ul{
                height: 100%;
                justify-content: center;
                flex-direction: row;
                flex-wrap: wrap;
                @media (min-width: 800px){
                    flex-direction: column;
                    justify-content: flex-start ;
                }

                .link{
                    font-size:16px;
                    font-weight: 500;
                    color: #eee;
                    text-decoration: none;

                    @media (max-width: 800px){
                           font-size: 13px;
                    }

                }
            }
        }
    }

    .right{
         gap: 32px;
         color: #eee;
         align-items: center;
         flex-direction: column;
         @media (min-width: 800px){
             align-items: flex-end;
             gap: 0;
         }
    }
    p{
        margin-top: auto;
    }
}

</style>