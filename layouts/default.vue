<template >
  <div>
    <webGl></webGl>
    <navigation></navigation>
    <transition @enter="enter" @leave="leave" mode="out-in">
      <div :key="$route.name" class="webgl__contant">
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>

import navigation from "../components/navigation.vue";
import webGl from "../components/webGl.vue"

export default {

  components: {
    navigation,webGl
  },
};
</script>

<script setup>

import gsap from "gsap"

const enter = (el, done) => {

    let t1 = gsap.timeline({onComplete: done});
    let letter = gsap.utils.toArray(".letter").forEach((text,i)=>{
        t1.fromTo(text,{y:-50, opacity:0},{y:0, opacity:1, duration:0.08}) 
    })

    // t1.fromTo(el, 0.3,{x:-100,opacity:0},{x:0, opacity:1})
};
const leave = (el, done) => {
    let t1 = gsap.timeline({onComplete: done});
    t1.fromTo(el,{y:0,opacity:1},{y:100, opacity:0,duration:0.3})
};


</script>
<style lang="scss">
.letter{
    display: inline-block;
    position: relative;
}
</style>