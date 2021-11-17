<template>
    <div class="button-overlay">
        <span></span>
    </div>
</template>

<script>
    export default {
        name:'userAuthLoading',
    }
</script>

<style lang="scss" scoped>

.button-overlay{
    top: 0;
    z-index: 101;
    width: 100%;
    background: rgba(0 , 0 , 0 , .5);
    position: absolute;
    display: flex;
    justify-content: center ;
    align-items: center;
    border-radius: 17px;

    @keyframes spin {
        to{
            transform: rotateZ(360deg);
        }
    }

    span{
        display: block;
        width: 35px;
        height: 35px;
        margin: 0 auto;
        border: 3px solid transparent ;
        border-top-color:  rgb(8, 8, 102);
        border-bottom-color:  #fff;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
}
</style>