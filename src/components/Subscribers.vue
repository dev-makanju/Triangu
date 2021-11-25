<template>
    <div class="subscribers">
          <p  @click="clickBox" class="subclear">X</p>
          <h1>Join us</h1>
          <form action="">
              <div class="form-control">
                   <input type="text" 
                   placeholder="Enter your email" 
                   v-model="email">
              </div>
              <button class="router-button" @click.prevent="submitSubcribers">Submit</button>
          </form>
    </div>
</template>

<script>
    export default {
        name:'Subscribers',
        data(){
            return{
                email:'',
            }
        },
        methods:{
            submitSubcribers(){
                console.log("ok")
            },
            clickBox(){
                this.$emit("close-box");
            }
        }
    }
</script>

<style lang="scss" scoped>
.subscribers{
    background-color: #eee;
    padding: 60px 20px;
    width: 450px;
    max-width: 360px;
    border-radius: 5px;
    box-shadow:  0px 2px 5px rgba(0 , 0 , 0 , .3);
    position: relative ;

    &.before-enter{
        opacity: 0;
        transform: scale(.5) scale(.2) rotateZ(-45deg);
        transition: .3s ease-in-out all; 
    }

    &.enter{
        opacity: 1;
        transform: scale(1) rotateZ(0deg);
    }

    @media (max-width: 360px) {
        max-width: 280px;
    }

    @media (max-width: 500px) {

        max-width: 310px;
    }

    .subclear{
        position: absolute;
        font-weight: 600;
        padding: 4px 6px ;
        top: 0px;
        right: 0px;
        cursor: pointer;
    }

    h1{
        text-align: center;
        font-size: 40px;
        font-weight: 400;
        margin-bottom: 6px;
    }

    .form-control input{
        width: 100%;
        padding: 7px;
        border: none;
        background: none;
        border-bottom: 1px solid   rgb(8, 8, 102);
        font-size: 18px;


        &:focus{
            outline: none;
        }
    }

    .router-button{
        display: flex;
        align-items: center;
        justify-content: center ;
        align-self: center;
        width: 100%;
    }
}


.subscribers.leave{
    display: none;
}
</style>