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
    height: 100vh ;

    .errorImg{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
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