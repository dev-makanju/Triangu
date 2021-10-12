<template>
  <div class="home">
       <Welcome :post="welcomeScreen"/>
       <BlogPost :post="welcomeScreen"/>
       <BlogPost :post="post" v-for="(post , index) in sampleBlogPost" :key="index"/>
       <div class="blog-card-wrap">
            <div class="container">
               <h2>View more recent posts</h2>
               <div class="blog-cards">
                    <BlogCards :post="post" v-for="(post , index) in sampleBlogCards" :key="index"/>
               </div>
            </div>
       </div>
       <div class="updates">
             <div class="container">
                 <h2>Stay updated with us , register to see more of our latest blogpost</h2>
                 <router-link class="router-button" to="#">
                       Register for our newsletter <Arrow class="arrow arrow-light"/>
                 </router-link>
             </div>
       </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import Welcome from "../components/Welcome.vue";
import BlogCards from "../components/BlogCards.vue";
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: { BlogPost , Welcome , BlogCards , Arrow },
  data(){
    return{
       welcomeScreen:{
           title:"people don't take trips, trips take people.",
           blogPost:"This is a beautify landing page with my blogpost ",
           welcomeScreen:true,
           photo:"man-preview"
       },
       sampleBlogPost:[
         {
             title:'This is a filter title',
             blogHTML:'this is blog html',
             blogCoverPhoto: 'robot'
         }, 
         {
             title:'This is a filter title2',
             blogHTML:'this is blog html2',
             blogCoverPhoto: 'software-developer'
         }
       ]
      }
   },
   computed:{
       sampleBlogCards(){
          return this.$store.state.sampleBlogCards
       }
   }
}
</script>

<style lang="scss" scoped>
.blog-card-wrap{
    h2{
        font-size: 30px;
        font-weight: 600;
        padding: 5px;
    }
}

.updates{
   .container{
      padding: 100px 25px ;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 768px){
         padding: 125px 25px;
         flex-direction: row;
      }

      .router-button{
         display: flex;
         font-size: 14px;
         text-decoration: none;

         @media (min-width: 768px) {
             margin-left: auto;
         }
      }

      h2{
         font-weight: 300;
         font-size: 32px;
         max-width: 425px;
         width: 100%;
         text-align: center;
         text-transform: uppercase;

         @media (min-width:800px) {
             text-align: initial;
             font-size: 40px;
         }
      }
   }
}
</style>