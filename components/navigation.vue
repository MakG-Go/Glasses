<template >
  <div>
    <nav>
      <ul class="webgl__navigation">
        <li class="webgl__navigation_item">
          <nuxt-link class="webgl__navigation_btn" to="/">HOME</nuxt-link>
        </li>
        <li class="webgl__navigation_item">
          <nuxt-link class="webgl__navigation_btn" to="/about">ABOUT</nuxt-link>
        </li>
        <li class="webgl__navigation_item">
          <nuxt-link class="webgl__navigation_btn" to="/portfolio">Portfolio</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss">

.webgl {
  &__navigation {
    z-index: 1;
    position: fixed;
    display: flex;
    padding: 40px;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    @media (max-width: 719px) {
      justify-content:center;
    }

    &_item{
        &:not(:last-child){
        margin-right: 15px;
      }
    }
    &_btn {
      padding: 15px;
      color: white;
      border: 1px solid white;
      text-decoration: none;
      transition-property: background-color, color;
      transition-duration: 0.25s;
      transition-timing-function: ease;
      &:hover {
        background-color: white;
        color: black;
      }
      &.router-link-exact-active{
        background-color: white;
        color: black;
      }
    }
  }
}
</style>