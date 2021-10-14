<template>
    <div class="welcome">
        <div class="col-1">
            <div class="welcome-1">
                 <h1>{{ post.title }}</h1>
                 <div class="welcome-1-link-wrapper">
                    <router-link class="link link-wrapper" :to="{name :'Login'}">
                       Sign in/ Sign up
                    </router-link>
                    <Arrows class="arrow arrow-light"/>
                 </div>
            </div>
            <div class="welcome-1">
                <img class="images-welcome" :src="require(`../assets/blogPhotos/${post.photo}.png`)" alt="">
            </div>
        </div>
        <div class="overlay"></div>
    </div>
</template>

<script>
import Arrows from "../assets/Icons/arrow-right-light.svg"

export default {
    name:"welcome",
    props:['post'],
    components:{
        Arrows,
    }
}
</script>

<style lang="scss" scoped>
     .welcome{
         height: 400px;
         background:  rgb(8, 8, 102);
         overflow: hidden;

         &-1 {

             .images-welcome{
                 width: 400px;

                 @media (max-width: 768px) {
                     width: 300px;
                 }
             }

             &-link-wrapper{
                padding: 5px 0px;
                display: flex;
             }

             .link{
                 border: 1px solid yellow;
                 padding: 5px 5px ;
                 border-radius: 17px;
                 box-shadow: 0px 2px 5px rgba(0 , 0 , 0 , 3);
                 font-weight: 600;
                 text-align: center;
                 font-size: 14px;
                 color: #eee;
                 transition: .5s all;

                 &:hover{
                     color: #000;
                     background: yellow;
                 }
             }

             .arrow{
                 width: 25px;
                 color: #eee;
                 padding: 4px 4px ;
             }

             h1{
                   color: #eee;
                   font-size: 60px;

                   @media (max-width: 994px) {
                      font-size: 40px;
                   }
                   @media (max-width: 768px) {
                      font-size: 30px;
                   }
                   @media (max-width: 430px) {
                      font-size: 24px;
                   }
             }

         }
        
         .col-1{
              display: flex;
              flex-direction: row ;
              width: 80% ;
              margin: 0px auto;
              justify-content: center;
              align-items: center;
              height: 400px;
              gap: 40px;
              transition: .5s all;

              @media (max-width: 768px) {
                   flex-direction: row;
                   width: 90%;
                   gap: 10px;
              }
              @media (max-width: 550px) {
                   flex-direction: flex-end;
                   margin-right: -70px;
                   width: fit-content;
                   padding: 10px;
                   gap: 0;
              }
              @media (max-width: 430px) {
                   flex-direction: flex-end;
                   margin-right: -130px;
                   width: fit-content;
                   padding: 10px;
                   gap: 0;
              }
              @media (max-width: 370px) {
                   margin-right: -170px;
              }
         }   
    }


</style>