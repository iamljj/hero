<template>
<div>
         <div class="card p-3 mt-3 bg-white ">
      <div class="card-header d-flex ai-center pb-3">
          <div class="iconfont" :class="`icon-${icon}`"></div>
          <div class="flex-grow-1 ml-2 fs-xl">{{title}}</div>
          <i class="sprite sprite-menu " v-if="!plain"></i>
      </div>
      <div class="card-body mt-3 fs-md !improtant" style="line-height:1.2rem">
       <slot></slot>
      </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
title:{type:String,required:true},
icon:{type:String,required:true},
plain:{type:Boolean},
    },
    name: 'VueCard',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss">
.card{
    .card-header{
        border-bottom: 1px solid #d4d9de;
    }
}

</style>