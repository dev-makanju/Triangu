<template>
    <div class="modal" ref="modal">
        <div class="modal-content">
            <close @click="closePreview" class="icon"/>
            <img :src="this.blogCoverPhoto" alt="">
        </div>
    </div>
</template>

<script>
import close from "../assets/Icons/times-circle-light.svg";
    export default {
        components:{
            close
        },
        methods:{
            closePreview(){
                this.$store.commit("openPhotoPreview");
            }
        },
        computed:{
            blogCoverPhoto(){
                return this.$store.state.blogPhotoFileUrl;
            }
        }
    }
</script>

<style lang="scss" scoped>

.modal{
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0 , .5);
    z-index: 99;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;    

    .modal-content{
        display: flex;
        justify-content: center;
        position: relative;
        border-radius: 12px;
        background: #eee;
        height: 400px;
        width: 600px;
        padding: 50px;
        box-shadow: 0px 2px 5px rgba(0 , 0 , 0 , .3);

        .icon{
            width: 24px;
            height: auto;
            cursor: pointer;
            font-size: 24px;
            position: absolute;
            top: 15px;
            right: 15px;
            color:  #080866;
        }

        img{
            margin-top: 16px;
            display: block;
            width: auto;
            height: 100%;
            box-shadow: 0px 2px 5px rgba(0 , 0 , 0 , .3);
        }
    }
}

</style>