<template>
    <div class="not-found">
        <img :src="require(`../assets/blogPhotos/404image.png`)"  alt="">    
    </div>
</template>

<style lang="scss" scoped>
 .not-found{
     width: 100%;   
     @media (min-width: 768 px) {
          max-width: 800px;   
     }
     img{
         width: 100%;
         height: 100vh;
     }
 }
</style>