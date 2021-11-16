<template>
      <div v-scrollanimation class="blog-wrapper no-user">
           <div class="blog-content">
               <div>
                   <h1>{{ post.blogTitle }}</h1>
                   <p class="content-preview" v-html="post.blogHTML"></p>
                   <router-link class="link" :to="{name:'ViewBlog' , params:{slug:post.slug} }">
                        View the post<Arrows class="arrow"/>
                   </router-link>
               </div>
           </div>
           <div class="blog-photo">
                <img  :src="post.blogCoverPhoto" alt="">
            </div>
      </div>
</template>

<script>
import Arrows from "../assets/Icons/arrow-right-light.svg"

export default {
    name:'BlogPost',
    props:['post'],
    components:{
        Arrows
    }
}
</script>

<style lang="scss" scoped>

.blog-wrapper{
    background: #eee;
    display: flex;
    flex-direction: column ;
    box-shadow: 0px 4px 6px -1px rgba( 0 , 0 , 0 , .1) , 0 2px 4px -1px rgba(0 , 0 , 0 , .6);
    &.before-enter{
         opacity: 0;
         transform: translateY(100px);
         transition: .2s ease-in-out all;
    }

    &.enter{  
        opacity: 1;
        transform: translateX(0px);
    }
    @media (min-width: 769px){
        flex-direction: row;
        max-height: 400px;
        min-height: 400px;
    }

    .blog-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;
        @media (min-width: 768px) {
            order: 1;
        }
        @media (min-width: 800px) {
            flex: 3;
        }

        div{
            max-width: 375px;
            padding: 72px 24px;

            @media (min-width: 768px) {
                padding : 0 24px;
            }

            h2{
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;

                @media (min-width: 768) {
                    font-size: 40px;
                }
            }

            p{
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview{
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .link{
                position: inline-flex;
                align-items: center;
                padding-bottom: 4px;
                margin-top: 32px;
                border-bottom: 1px solid transparent;
                transition: .5s ease-in all;
                color: rgb(143, 143, 243);
                font-style: italic ;

                &:hover{
                    border-bottom-color: rgb(143, 143, 243);
                }
            }

            .link-light{
                &:hover{
                    border-bottom-color: #eee;
                }
            }

            .link-icon{
                width: 25px;
                padding: 5px;
                position: absolute;
            }
        }
    }

    .blog-photo{
        order: 1 ;
        flex: 3 ;
        box-shadow: 0px 4px 6px -1px rgba( 0 , 0 , 0 , .1) , 0 2px 4px -1px rgba(0 , 0 , 0 , .6);

        @media (min-width: 768px) {
            order: 2;
        }

        @media (min-width: 800px){
            flex: 3;
        }

        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:nth-child(even){
        .blog-content{
            order: 2;
        }
        .blog-photo{
            order: 1;
        }
    }

}

</style>