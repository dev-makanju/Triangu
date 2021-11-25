<template>
     <center>
          <ErrorImage class="errorImg"/> 
          <div class="error-info">
               <h1>Not Found!</h1>
               <p>
                  <a href="/">Go home?</a>
               </p>
          </div>
     </center>
</template>

<script>
    import ErrorImage from "../components/ErrorImage.vue"
    export default {
        name:'NotFound',
        components:{
            ErrorImage
        }
    }
</script>

<style lang="scss" scoped>
center{
    padding: 40px 40px;
    position: relative;

    .errorImg{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100vw;
        @media (min-width: 768px) {
            position: absolute;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%; 
        }
    }

    .error-info{
        position: absolute;
        inset: 0px;
        margin: auto;
    }

    h1{
        color: #080866;
        font-weight: 600;
        font-size: 60px;
    }

    p{
        a{      
            font-weight: 400;
            text-decoration: none;
            padding: 20px 2px;

            &:hover{
                 color: #080866;
                 font-weight: 600;
            }
        }
    }
}
</style>