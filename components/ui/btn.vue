<template>
    <div>
        <button
        :class="['btn',{'btn__blue' : buttonCol == 'BLUE'}]"
        @click="chengeColor"
        >
        {{ buttonCol }}
        </button>
    </div>
</template>

<script>
export default {
    props:{
        meshColor: String,
        buttonColor: String
    },

    data(){
    return {
        buttonCol: this.buttonColor,
        objectColor: '#' + this.meshColor
    }
    },
    methods:{
        chengeColor(){
            this.$emit('generate','something',this.objectColor)
        }
    },
 
}
</script>

<style lang="scss">

.btn{
    padding: 15px;
    background-color: rgba(231, 100, 100, 0.541);
    border-radius: 5px;
    color: black;
    font-weight: 600;
    cursor: pointer;
    transition-property: background-color, color;
    transition-duration: 0.25s;
    transition-timing-function: ease;
    &:hover{
        background-color: #f33232;
        color: white;
    }
    &__blue{
        background-color: #304df59d;
        color: rgb(0, 0, 0);
        &:hover{
        background-color: #0127ff;
        color: white;
    }
    }
}
    
</style>