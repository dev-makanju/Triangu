import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import firebase from "firebase/app";
import NotFound from "../views/NotFound.vue"
import "firebase/auth";
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:"Home",
      requireAuths:false
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title:"Blogs",
      requireAuths:false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title:"Login",
      requireAuths:false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      title:"Register",
      requireAuths:false
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta:{
      title:"Forgot Password",
      requireAuths:false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta:{
      title:"Profile",
      requireAuths:true,
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta:{
      title:"Admin",
      requireAuths:true,
      requiresAdmin:true,
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta:{
      title:"Create Post",
      requireAuths:true,
      requiresAdmin:true,
    }
  },
  {
    path: "/edit-post/:slug",
    name: "EditPost",
    component: EditBlog,
    meta:{
      title:"Edit Post",
      requireAuths:true,
      requiresAdmin:true
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta:{
      title:"Preview Post",
      requireAuths:true,
      requiresAdmin:true
    }
   },
  {
    path: "/view-blog/:slug",
    name: "ViewBlog",
    component: ViewBlog,
    meta:{
      title:"View blog post",
      requireAuths:false
    }
  },
  {
    path:'*',
    name:'NotFound',
    component:NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to , from , next) => {
   let documentTitle = `${process.env.VUE_APP_TITLE} | ${to.params.slug ? to.params.slug : to.name}`;
   document.title = documentTitle;
   next()
});

router.beforeEach((to , from , next) => {
    let user = firebase.auth().currentUser;
    let userRole = null;
    if(user){
        userRole = store.state.userRole;
    }
    if(to.matched.some( (res) => res.meta.requireAuths)){
        if(user){
           if(to.matched.some( (res) => res.meta.requiresAdmin)){
               if(userRole === 'Admin'){
                   return next();
               }
               return next({name:'Home'})
           }
           return next()
        }  
        return next({name: 'Login'})
    }
    return next();
});

export default router;
