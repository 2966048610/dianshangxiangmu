<template>
   <div id="">
     <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories">
       <div class="item" v-for="(item, index) in subcategories" :key="index">
         <a href="#">
           <img class="item-img" v-lazy="item.image" @load="TabContentCategoryImageLoad" >
           <div class="item-text">{{item.title}}</div>
         </a>
       </div>
     </grid-view>
   </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Array,
        default() {
          return []
        }
      },
    },

    data() {
      return {
        imgshuliang: 0,
      }
    },

    methods:{
      TabContentCategoryImageLoad() {
        this.imgshuliang++;
        // 判断 图片的数量 与 imgshuliang 是否相等，控制发送的数次
        if(this.imgshuliang === this.subcategories.length){
          this.$emit('TabContentCategoryImageLoad')
          this.imgshuliang = 0
        }

      }
    }




  }
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
