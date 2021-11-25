<template>
  <div class="home">
       <Welcome v-if="!user" :post="welcomeScreen"/>
       <BlogPost :post="post" v-for="(post , index) in blogPostFeeds " :key="index"/>
       <div class="blog-card-wrap">
            <div class="container">
               <h2>View more recent posts</h2>
               <div class="blog-cards">
                    <BlogCards :post="post" v-for="(post , index) in blogPostsCards" :key="index"/>
               </div>
            </div>
       </div>
       <div class="updates">
             <div class="container">
                 <h2>Stay updated with us , register to see more of our latest blogpost</h2>
                 <div class="subscribers">
                     <p>
                        <transition name="animate-subcribers">
                            <Subscribers @close-box="toggleSubscribe" v-if="isSubcribing"/>
                        </transition>    
                     </p>
                     <p v-show="!isSubcribing" class="router-button"  @click="toggleSubscribe">
                       Register for our newsletter <Arrow class="arrow arrow-light"/>
                     <p/>
                 </div>
             </div>
       </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import Welcome from "../components/Welcome.vue";
import BlogCards from "../components/BlogCards.vue";
import Arrow from "../assets/Icons/arrow-right-light.svg";
import Subscribers from "../components/Subscribers.vue"

export default {
  name: "Home",
  components: { BlogPost , Welcome , BlogCards , Arrow , Subscribers},
  data(){
    return{
       welcomeScreen:{
           title:"people don't take trips, trips take people.",
           blogPost:"This is a beautify landing page with my blogpost ",
           welcomeScreen:true,
           photo:"man-preview"
       },
       isSubcribing: true,
      }
   },
   methods:{
      toggleSubscribe(){
          this.isSubcribing = !this.isSubcribing
      }
   },
   computed:{
       blogPostsCards(){
          return this.$store.getters.blogPostsCards
       },
       blogPostFeeds(){
          return this.$store.getters.blogPostFeeds
       },
       user(){
          return this.$store.state.user;
       }
    
   }
}
</script>

<style lang="scss" scoped>

// animated invoice
.animate-subcribers-enter-active,
.animate-subcribers-leave-active{
   opacity: 0;
   transform: scale(.5) scale(.2) rotateZ(-45deg);
   transition: .3s ease-in-out all; 
}

.animate-subcribers-enter-from,
.animate-subcribers-enter-to{
   opacity: 1;
   transform: scale(1) rotateZ(0deg);
}


.blog-card-wrap{
   
    h2{
        font-size: 30px;
        font-weight: 600;
        padding: 5px;
    }
}

.updates{
   .container{
      padding: 100px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3em;
      @media (min-width: 768px){
         height: 500px;
         padding: 125px 25px;
         flex-direction: row;
         justify-content: space-between;
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