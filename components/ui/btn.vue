<template>
  <div>
    <button
      :class="[
        'btn',
        { btn__blue: buttonCol == 'blue' },
        { btn__lemon: buttonCol == 'lemon' },
      ]"
      @click="chengeColor"
    >
      <!-- {{ buttonCol }} -->
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonColor: String,
    glassesColor: Object,
  },

  data() {
    return {
      buttonCol: this.buttonColor,
      glass: this.glassesColor,
    };
  },
  methods: {
    chengeColor() {
      this.$emit("generate", this.glassesColor, this.buttonCol);
    },
  },
};
</script>

<style lang="scss">
.btn {
  padding: 15px;
  margin-right: 10px;
  background-color: #a20016;
  border-radius: 50%;
  color: black;
  font-weight: 600;
  cursor: pointer;
  transition-property: background-color, color,transform;
  transition-duration: 0.25s;
  transition-timing-function: ease;

  &:hover {
    background-color: #f33232;
    color: white;
    transform:scale(1.2)
  }
  &__blue {
    background-color: #00527C;
    color: rgb(0, 0, 0);
    &:hover {
      background-color: #0127ff;
      color: white;
      transform:scale(1.2)
    }
  }
  &__lemon {
      background-color: #9fc924;
      color: rgb(0, 0, 0);
      &:hover {
        background-color: rgb(255, 255, 28);
        color: white;
        transform:scale(1.2)
      }
    }
}
</style>