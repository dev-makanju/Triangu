<template>
    <div class="profile">
         <Modal v-if="modalActive" @close-modal="closeModal" :modalMessage="modalMessage"/>
         <div class="container">
             <h2>Account Settings</h2>
             <div class="profile-info">
                 <div class="initials"></div>
                 <div class="admin-badge">
                     <adminIcon class="icon"/>
                     <span>admin</span>
                 </div>
                 <div class="input">
                     <label for="firstName">Firstname:</label>
                     <input type="text" id="firstName" v-model="firstName">
                 </div>
                  <div class="input">
                     <label for="lastname">lastname:</label>
                     <input type="text" id="lastname" v-model="lastName">
                 </div>
                  <div class="input">
                     <label for="username">Username:</label>
                     <input type="text" id="username" v-model="userName">
                 </div>
                  <div class="input">
                     <label for="email">Email:</label>
                     <input disabled type="text" id="email" v-model="Email">
                 </div>
                 <button @click="updateProfile">Save Changes</button>
             </div>
         </div>
    </div>
</template>
<script>

import Modal from "../components/Modal.vue"
import adminIcon from "../assets/Icons/user-crown-light.svg"
    export default {
        name:'Profile',
        components:{
            Modal,adminIcon
        },
        data(){
            return{
                modalMessage:"changes were saved",
                modalActive: null
            }
        },
        methods:{
            closeModal(){
                this.modalActive = !this.modalActive
            },
            updateProfile(){
                this.$store.dispatch("updateUserProfile")
                this.modalActive = !this.modalActive;
            }
        },
        computed:{
            firstName:{
                get(){
                     return this.$store.state.profileFirstName;
                },
                set(payload){
                     this.$store.commit("updateFirstName" , payload)
                }
            },
            lastName:{
                get(){
                     return this.$store.state.profileLastName;
                },
                set(payload){
                     this.$store.commit("updateLastName" , payload)
                }
            },
            userName:{
                get(){
                     return this.$store.state.profileUserName;
                },
                set(payload){
                    this.$store.commit("updateUsername" , payload)
                }
            },
            Email:{
                get(){
                     return this.$store.state.profileEmail;
                },
            },
        }
    }
</script>

<style lang="scss" scoped>

.profile{

    .container{
        max-width: 1000px;
        padding: 60px 25px;

        h2{
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .profile-info{
            border-radius: 8px;
            box-shadow:  0px 4px 6px -1px rgba( 0 , 0 , 0 , .1) , 0 2px 4px -1px rgba(0 , 0 , 0 , .6);
            padding: 32px;
            background: #eee;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            .initials{
                position: initial ;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: rgb(8, 8, 102);
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: center;
                border-radius: 50%;
            }

            .admin-badge{
                display: flex;
                align-self: center;
                color: #eee;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background:  rgb(8, 8, 102);
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;
            }

            .icon{
                width: 14px;
                height: auto;
                margin-right: 8px;
            }
        }

        .input{
            margin: 16px 0;

            label{
                font-size: 14px;
                display: block;
                padding-bottom: 6px;
            }

            input{
                width: 100%;
                border: none;
                background: #fff;
                padding: 8px;
                height: 50px;
                border-radius: 4px;
                @media (min-width: 900px) {
                    
                }

                &:focus{
                    outline: none;
                }
            }
        }

        button{
            align-self: center;
            background:  rgb(8, 8, 102);
            border: 1px solid  rgb(8, 8, 102);
            padding: 8px;
            color: #fff;
            font-weight: 600;
            border-radius: 4px;
        }
    }
}

</style>