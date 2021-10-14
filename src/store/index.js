import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
       sampleBlogCards:[
         {
            blogTitle:"Blog Card #1",
            blogCoverPhoto: "stock-1",
            blogDate:"May 1, 2021"
             
         },
         {
            blogTitle:"Blog Card #2",
            blogCoverPhoto: "stock-1",
            blogDate:"May 2, 2022"
         },
         {
            blogTitle:"Blog Card #3",
            blogCoverPhoto: "stock-1",
            blogDate:"May 3, 2021"
         },
         {
            blogTitle:"Blog Card #4",
            blogCoverPhoto: "stock-1",
            blogDate:"May 4, 2021"
         }
       ],
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
  mutations: {
     toggleEditPost(state , payload){
        state.editPost = payload
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
        state.profileFirstName.match(/(\b\S)?/g);
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
     }

  },
  modules: {
  }
})
