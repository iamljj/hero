<template>
  <div class="home">
    <swiper :options="swiperOptions">
    <swiper-slide><img class="w-100" src="../assets/images/810d2343427fa066b43e1b31e44958ba.jpeg"></swiper-slide>
    <swiper-slide><img class="w-100" src="../assets/images/ae37bd718aa19d57ae7c80e0843aef86.jpeg"></swiper-slide>
    <swiper-slide><img class="w-100" src="../assets/images/bd21db0f4413b94efe9827155657d789.jpeg"></swiper-slide>
   <div class="swiper-pagination pagination-home text-black text-right px-3 py-2" slot="pagination"></div>
    </swiper>
    <!--end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
    <div class="d-flex flex-wrap ai-center jc-center">
      <div class="nav-item mb-3">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-story"></i>
            <div class="py-2">故事站</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-shops"></i>
            <div class="py-2">周边商场</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-experience"></i>
            <div class="py-2">体验服</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-new"></i>
            <div class="py-2">新人专区</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-honor"></i>
            <div class="py-2">荣耀-传承</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-camp"></i>
            <div class="py-1">王者营地</div></div>
      <div class="nav-item mb-3">
            <i class="sprite sprite-vx"></i>
            <div class="py-2">公众号</div></div>
    </div>
    <div class="bg-light py-2 ft-sm">
    <i class="sprite sprite-arrow mr-1"></i>
    <span>收起</span>
    </div>
    </div>
    <!--ebd of nav icons-->
    <m-list-card icon="caidan" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/artcles/${items._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(items,i) in category.newsList" :key="i">
              <div class="text-info newborder fs-sm mr-2" style="width:33px">{{items.categoryName}}</div>
              <div class="flex-grow-1 text-dark-1  text-ellipsis">{{items.title}}</div>
              <div class="ml-1 text-grey-1 fs-sm">{{items.createdAt | date}}</div>
         </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="yingxiong" title="英雄列表" :categories="heroesCats">
      <template #items="{category}">
        <div 
        class="d-flex flex-wrap" style="margin:0 -0.45rem">
          <router-link
            tag="div"
            :to="`/heroes/${items._id}`"
            class="p-2 text-center" style="width:20%" v-for="(items,i) in category.heroList" :key="i">
            <img :src="items.avatar" class="w-100">
            <div>{{items.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import Swiper2,{Navigation,Pagination} from 'swiper';
Swiper2.use([Navigation,Pagination]);
export default {
  filters:{
    date(val){
return dayjs(val).format('MM/DD')
    }
  },
   data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home',
            loop:true,
          },
          // Some Swiper option/callback...
        },
        newsCats:
        [

        ],
        heroesCats:[]
      };

   
    },
    methods:{
      async fetchNewCats(){
          const res =await this.$http.get('news/list')
          this.newsCats =res.data
      },
      async fetchHeroesCats(){
          const res =await this.$http.get('heroes/list')
          this.heroesCats =res.data
      }
    },
    created() {
      this.fetchNewCats()
      this.fetchHeroesCats()
    },
  
}
</script>
<style lang="scss">
.nav-icons{
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
  .nav-item{
    border-right:1px solid #d4d9de;
    width: 25%;
    &:nth-child(4n){
      border-right:none; 
    }
  }
}
.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background: white;
    &.swiper-pagination-bullet-active{
    background:#4b67af;
  }
  } 
}
.newborder{

border: 1px solid #4b67af;
padding: 0px;
}

</style>

