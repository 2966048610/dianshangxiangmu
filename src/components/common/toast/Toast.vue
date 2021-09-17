<template>
  <div class="toast" v-show="show">
    {{message}}
  </div>
</template>

<script>
  export default {
    name:'Toast',
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   show: {
    //     type:Boolean,
    //     default:false
    //   }
    // },

    data() {
      return {
        message: '',
        show:false
      }
    },

    methods:{
      // 可以给 duration 一个默认值 ，message也可以给默认值 ：message=‘默认文字’
      toast(message , duration = 2000 ) {
        this.show = true;
        this.message = message;

        setTimeout(() => {
          this.show = false;
          this.message = '';
        },duration)
      }
    }


  }
</script>

<style >
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    background-color: rgba(0,0,0,.75);
    color: #FFFFFF;


    z-index: 9999;
  }
</style>
