import Vue from 'vue'
import Vuex from 'vuex'

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
       editPost:null
  },
  mutations: {
     toggleEditPost(state , payload){
        state.editPost = payload
     }
  },
  actions: {
  },
  modules: {
  }
})
