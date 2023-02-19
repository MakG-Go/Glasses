<template >
    <div>
       
        <h1 class="h1 js-splitme">
            {{ title }}
        </h1>

    </div>
</template>


<script>
import Splitter from "split-html-to-chars";

export default {

    props:{
        title: String
    },

    mounted() {
    let els = document.querySelectorAll(".js-splitme");
    [].forEach.call(els, function (el) {
        el.outerHTML = Splitter(el.outerHTML, '<span class="letter">$</span>');
    });

  },
}
</script>

<style lang="">
    
</style>