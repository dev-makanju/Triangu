<template>
    <div class="create-post">
        <blogCoverPreview v-if="this.$store.state.blogPhotoPreview"/>
        <Loading v-if="loading" />
        <div class="container">
             <div :class="{'invisibe':!error}" class="err-message">
                 <p><span>Error:</span>{{ this.errorMsg }}</p>
             </div>
             <div class="blog-info">
                 <input type="text" placeholder="Enter Blog Title" autocomplete="on" v-model="blogTitle">
                 <div class="upload-file">
                     <label for="blog-photo">Upload Cover Photo</label>
                     <input type="file" ref="blogPhoto" id="blog-photo"  @change="fileChange" accept=".png,.jpg , .jpeg">
                     <button  :class="{'button-inactive': !this.$store.state.blogPhotoFileUrl}" class="preview" @click="showPreviewPhoto">Preview Photo</button>
                     <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
                 </div>
             </div>
             <div class="editor">
                 <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler"/>
             </div>
             <div class="blog-actions">
                 <button @click="updateBlog">Save Changes</button>
                 <router-link :to="{name:'BlogPreview'}" class="router-button">Preview Changes</router-link>
             </div>
        </div>
    </div>
</template>

<script>

import blogCoverPreview from "../components/blogCoverPreview.vue"
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize" , ImageResize);
import firebase from "firebase/app";
import Quill from "quill";
import "firebase/storage"
import db from "../firebase/firebaseInit"
import Loading from "../components/Loading.vue"

    export default {
        name:"Createpost",
        components:{
            blogCoverPreview , Loading 
        },
        data(){
            return{
                file:null,
                loading:null,
                error: null,
                errorMsg: null,
                routeID: null,
                currentBlog: null,
                editorSettings:{
                    modules:{
                        imageResize:{},
                    }
                }
            }
        },
        async mounted(){
            this.routeID = this.$route.params.blogid;
            this.currentBlog = await this.$store.state.blogPosts.filter( post => {
                return post.blogID === this.routeID;
            }); 
            this.$store.commit('SetBlogState' , this.currentBlog[0]);
        },
        methods:{
            fileChange(){
                this.file = this.$refs.blogPhoto.files[0];
                const fileName = this.file.name;
                this.$store.commit("updateFileName" , fileName);
                this.$store.commit("createFileUrl" , URL.createObjectURL(this.file));
            },
            showPreviewPhoto(){
                if(this.$store.state.blogPhotoFileUrl){
                    this.$store.commit("showPreviewPhoto");
                }
            },
            imageHandler(file , Editor , cursorLocation , resetUploader){
                const storageRef = firebase.storage().ref()
                console.log(storageRef)
                const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`)
                docRef.put(file).on("state_change" , (snapshot) => {
                    console.log(snapshot)
                } , (err) => {
                    console.log(err)
                }, async () => {
                    const downloadURL = await docRef.getDownloadURL();
                    Editor.insertEmbed(cursorLocation, "image" , downloadURL)
                    resetUploader();
                }
                );
            },
            async updateBlog(){
                const dataBase = db.collection("blogPosts").doc(this.routeID)
                if(this.blogTitle.length !== 0 && this.blogHTML.length !== 0){
                     if(this.file){
                         this.loading = true
                         console.log(this.loading)
                         const storageRef = firebase.storage().ref()
                         const docRef = storageRef.child(`documents/blogCoverPhotos/${this.$store.state.blogPhotoName}`)
                         docRef.put(this.file).on("state_change" , (snapshot) => {
                               console.log(snapshot)
                         } ,
                         (err) => {
                             this.loading = false;
                             this.error = true;
                             this.errorMsg = err;
                         }, async () => {
                            const downloadURL = await docRef.getDownloadURL(); 
                            dataBase.update({
                                blogHTML: this.blogHTML,
                                blogCoverPhoto: downloadURL,
                                blogCoverPhotoName: this.blogCoverPhotoName,
                                blogTitle:this.blogTitle,
                            })
                            await this.$store.dispatch('updatePost' , this.routeID);
                            this.loading = false
                            this.$router.push({name:'ViewBlog' , params:{blogid: dataBase.id }})
                         });
                         return;
                     }
                     this.loading = true;
                     await dataBase.update({
                         blogHTML: this.blogHTML,
                         blogTitle: this.blogTitle
                     })

                     await this.$store.dispatch('updatePost' , this.routeID)
                     this.loading = false;
                     this.$router.push({name:"ViewBlog" , params:{blogid:dataBase.id}});
                     return;
                }
                this.error = true;
                this.errorMsg = "Please ensured blogTitle and blog post has been filled!`;";
                setTimeout( () => {
                    this.error = false;
                } , 5000)
            }
        },
        computed:{
            profileId(){
                return this.$store.state.profileId;
            },
            blogCoverPhotoName(){
                return this.$store.state.blogPhotoName;
            },
            blogTitle:{
                get(){
                    return this.$store.state.blogTitle;
                },
                set(payload){
                    this.$store.commit("updateBlogTitle" , payload);
                }
            },
            blogHTML:{
                get(){
                    return this.$store.state.blogHTML;
                },
                set(payload){
                    this.$store.commit("newBlogPost" , payload);
                }
            }
        }
    }
</script>

<style lang="scss">

.create-post{
    position: relative;
    height: 100%;
    
    @media (min-width: 900px) {
        width: 100%;
        margin: 0px auto;
    }

    button{
        margin-top: 0;
    }

    .router-button{
        text-decoration: none;
        color: #fff;
    }

    label,
    button, 
    .router-button{
        transition: .5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #eee;
        background:  rgb(8, 8, 102)  ;
        text-decoration: none;
        border: none;
    }

    .container{
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;

        @media (min-width: 900px){
            width: 80%;
        }
    }

    .invisibe{
         opacity: 0 !important;
    }

    .err-message{
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background: #e74e3c ;
        opacity: 1;
        transition: .5s ease all ;

        p{
            font-size: 14px;
        }

        span{
            font-weight: 600 ;
        }
    }

    .blog-info{
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1){
            min-width: 300px;
        }

        input{
            transition: .5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid   rgb(8, 8, 102) ;

            &:focus{
                outline: none;
                box-shadow:  0px 1px 0 0 rgb(8, 8, 102);
            }
        }

        .upload-file{
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;

            input{
                display: none;
            }

            .preview{
                margin-left: 16px;
                text-transform: initial;

                &.button-inactive{
                     background: rgb(174, 174, 235)  ;
                }
            }


            span{
                font-size: 12px;
                margin-left: 16px;
            }
        }
    }

    .editor{
        display: flex;
        height: 60vh;
        flex-direction: column;


        .quillWrapper{
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container{
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll ;
        }

        .ql-editor{
            padding: 20px 16px 30px;
        }
    }

    .blog-actions{
        margin-top: 32px;

        button{
            margin-right: 16px;
        }
    }
}

</style>