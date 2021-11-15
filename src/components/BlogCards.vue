<template>
    <div v-scrollanimation class="blog-card">
        <div v-show="editPost" class="icons">
            <div class="icon" @click="editBlog">
                 <Edit/>
            </div>
            <div class="icon" @click="deletePost">
                 <Delete/>
            </div>
        </div>
        <img :src="post.blogCoverPhoto" alt="">
        <div class="info">
            <h3>{{ post.blogTitle }}</h3>
            <h6>Posted on: {{ new Date(post.BlogDate).toLocaleString('en-us' , {dateStyle: "long"} ) }}</h6>
            <router-link class="link" :to="{name:'ViewBlog' , params:{blogid:this.post.blogID}} ">
                View The Post <Arrow class="arrow"/>
            </router-link>
        </div>
    </div>
</template>

<script>

import Arrow from "../assets/Icons/arrow-right-light.svg"
import Edit from "../assets/Icons/edit-regular.svg"
import Delete from "../assets/Icons/trash-regular.svg"

export default{

    name:"BlogCards",
    props:['post'],
    components:{
        Arrow,
        Edit,
        Delete
    },
    methods:{
        deletePost(){
             this.$store.dispatch("deletePost" , this.post.blogID)
        },
        editBlog(){
            this.$router.push({name:'EditPost' , params:{blogid: this.post.blogID }})
        }

    },
    computed:{
        editPost(){
            return this.$store.state.editPost;
        }
    }
}
</script>

<style lang="scss" scoped>
    .blog-card{
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background-color: #eee;
        height: 400px;
        min-height: 420px;
        transition: .5s ease all    ;
        box-shadow: 0px 4px 6px -1px rgba( 0 , 0 , 0 , .1) , 0 2px 4px -1px rgba(0 , 0 , 0 , .6);

    

        @media (max-width: 450px) {
            &.before-enter{
                opacity: 0;
                transform: scale(.5) scale(.2) rotateZ(-25deg);
                transition: .3s ease-in-out all; 
            }

            &.enter{
                opacity: 1;
                transform: scale(1) rotateZ(0deg);;
            }
        }

        &:hover{
            transform: rotateZ(-1deg) scale(1.01);
        }

        .icons{
            display: flex;
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 88;

            .icon{
                display: flex;
                justify-content: content;
                align-items: center;
                width: 25px;
                padding: 4px;
                height: 25px;
                border-radius: 50%;
                background: #eee;
                transition: .5s ease all;
                color: #000;

                &:hover{
                    background-color: #30303030;
                    color:  rgb(84, 84, 228);

                    .edit,
                    .delete{
                        path{
                            fill: #eee ;
                        }
                    }
                }

                &:nth-child(1){
                    margin-right: 8px;
                }
                
                .edit,
                .delete{
                    pointer-events: none;
                    height: 15px;
                    width: auto;
                }
            }
        }

        img{
            display: block;
            border-radius:8px 8px 0 0;
            z-index: 1;
            width: 100%;
            min-height: 200px;
            object-fit: cover;
        }


        .info{
            display: flex;
            flex-direction: column ;
            height: 100%;
            z-index: 3;
            padding: 32px 16px;
            color: #000;


            h4{
                padding-bottom: 8px ;
                font-size: 20px ;
                font-weight: 300;
            }

            h6{
                font-size:12px;
                font-weight: 400;
                padding-bottom: 16px;

            }

            .link{
                display: inline-flex;
                align-items: center;
                margin-top: auto;
                font-weight: 500;
                padding-top: 20px;
                font-size: 12px;
                padding-bottom: 4px;
                transition: .5s ease all;

                &:hover{
                    color:  rgb(43, 43, 151);
                }

                .arrow{
                    width: 12px;  
                }
            }
        }
    }
</style>