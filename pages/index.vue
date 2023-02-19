<template lang="">
 
    <div>
        <gltitle :title = "'Home'"></gltitle> 
    </div>
  
</template>
<script>
import gltitle from '~~/components/gltitle.vue';
export default {
  components: {
    gltitle,
  },
};
</script>
<style lang="scss">

    body {
        background-color: #000000;
        font-family: sans-serif;
        overflow: hidden;
    }
    .webgl{
        &__contant{
            display: flex;
            align-items: flex-start;
            justify-content:flex-start;
            width: 100%;
            height: 100%;
            min-height: 100vh;
        }
    }
    .h1{
        margin-left: 50px;
        color: white;
        font-size: 200px;
        font-weight: 600;
        @media (max-width: 719px) {
            margin-left: 25px;
            font-size: 75px;
		}
    }


</style>