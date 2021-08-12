<template>
  <div class="about" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom text-info-1">
      <div class="iconfont icon-back text-info-1 fs-xl"></div>
      <strong class="flex-grow-1 ">{{model.title}}</strong>
      <div class="text-grey fs-sm">
        2019-06-02
      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 py-3 border-top">
      <div class="d-flex ai-center ">
        <i class="iconfont icon-caidan"></i>
      <strong class="text-info-1 fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 ">
        <router-link 
        class="py-1 mt-2"
        tag="div"
        :to="`/artcles/${item._id}`"
        v-for="item in model.related"
        :key="item._id">
        {{item.title}}
        </router-link>
      
      
      </div>
    </div>
  </div>
</template>
<script>
export default{
  watch:{
    id(){
      this.fetch()
    }
  },
   props:{
        id:{required:true}
   },
   data(){
        return{
          model:null

  
    };
   },
   methods: {
    async fetch(){
          const res =await this.$http.get(`artcles/${this.id}`)
          this.model=res.data

     }
   },
   created() {
     this.fetch()
   },
}
</script>
<style lang="scss">
.about{
  .icon-back{  
    font-size: 1.8462rem
    }
  .body{
  line-height: 2.2em  !important; 
      img{
      
      max-width: 100%;
      height: auto;

      
      }
      iframe{
      width: 100%;
      height: auto;
      }

  }

}

</style>