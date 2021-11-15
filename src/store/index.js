import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
       blogPosts: [],
       postLoaded:null,
       //create nlog content
       blogHTML:"write your blog title here...",
       blogTitle:"",
       blogPhotoName:"",
       blogPhotoFileUrl: null,
       blogPhotoPreview:null,
       editPost:null,
       //since we are going to be using this in multiple places
       //the best practises it to use state management
       user:null,
       profileEmail:null,
       profileFirstName:null,
       profileLastName:null,
       profileUserName:null,
       profileId:null,
       profileInitials:null
  },
  getters: {
      blogPostFeeds(state){
         return state.blogPosts.slice(0 , 2)
      },
      blogPostsCards(state){
         return state.blogPosts.slice(2 , 6)
      }
  },
  mutations: {
    showPreviewPhoto(state){
        state.blogPhotoPreview = true; 
    },

    openPhotoPreview(state){
        state.blogPhotoPreview = !state.blogPhotoPreview
    },
   
     //mutation for pics uplaod
     updateFileName(state , payload){
         state.blogPhotoName = payload;
     },
     createFileUrl(state , payload){
         state.blogPhotoFileUrl = payload
     },
     //updateBlogPost and blogHTML
     updateBlogTitle(state , payload){
        state.blogTitle = payload;
     },
     newBlogPost(state , payload){
        state.blogHTML = payload;
     },
     toggleEditPost(state , payload){
        state.editPost = payload
     },
      SetBlogState(state , payload){
         state.blogTitle = payload.blogTitle;
         state.blogHTML = payload.blogHTML;
         state.blogPhotoFileUrl = payload.blogCoverPhoto;
         state.blogPhotoName = payload.blogCoverPhotoName 
      },
     filterBlogPost(state , payload){
         state.blogPosts = state.blogPosts.filter( post => post.blogID !== payload)
     },
     updateUser(state , payload){
        state.user = payload;
     },
     setProfileInfo(state , doc){
        state.profileId = doc.id;
        state.profileEmail = doc.data().Email;
        state.profileFirstName = doc.data().firstName;
        state.profileLastName = doc.data().lastName;
        state.profileUserName = doc.data().userName;
     },
     setProfileInitials(state){
        state.profileInitials = 
        state.profileFirstName.match(/(\b\S)?/g).join("");
     },
     //update users profiles
     updateFirstName(state , payload){
        state.profileFirstName = payload;
     },
     updateLastName(state , payload){  
        state.profileLastName = payload;
     },
     updateUsername(state , payload){
        state.profileUserName = payload;
     }
  },
  actions: {
     //best practises is to create action for our state here
     //update in mutation above ..do not make change here.
     async getCurrentUser({ commit }){
        const dataBase = await db.collection("user").doc(firebase.auth().currentUser.uid);
        const dbResult = await dataBase.get();
        commit("setProfileInfo" , dbResult);
        commit("setProfileInitials");
        console.log(dbResult);
     },
     async updateUserProfile({commit , state}){
      const dataBase = await db.collection("user").doc(state.profileId);
      await dataBase.update({
         firstName:state.profileFirstName,
         lastName:state.profileLastName,
         userName:state.profileUserName
      });
      commit("setProfileInitials");
     },
     async getPost({state}){
         const dataBase = await db.collection("blogPosts").orderBy("date" , 'desc');
         const dataBaseResults = await dataBase.get();
         dataBaseResults.forEach( (doc) => {
            if(!state.blogPosts.some(post => post.blogId === doc.id)){
                  const data = {
                     blogID:doc.id,
                     blogHTML: doc.data().blogHTML,
                     blogCoverPhoto: doc.data().blogCoverPhoto,
                     blogCoverPhotoName: doc.data().blogCoverPhotoName,
                     blogTitle:doc.data().blogTitle,
                     BlogDate: doc.data().date,
                  }
                  state.blogPosts.push(data);
            }
         });
         state.postLoaded = true;
     },
      async deletePost({commit} , payload ){
         const getPost = await db.collection("blogPosts").doc(payload);
         await getPost.delete();
         commit('filterBlogPost' , payload);
      }, 
      async updatePost({commit , dispatch} , payload){
         commit('filterBlogPost' , payload);
         await dispatch('getPost')

      }
  },

  modules: {
  }
})
