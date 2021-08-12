<template>
  <div class="about" v-if="model">
  <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30px">
      <div class="px-2 flex-grow-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-2">攻略战</span>
      </div>
      <router-link :to="'/'" tag="div" class="text-white">
      更多英雄 &gt;&gt;
      </router-link>
   </div>
   <div class="top" 
   :style="{'background-image':`url(${model.banner})`}"
   >
<div class="info text-light p-3 h-100 d-flex flex-column jc-end">
<div>{{model.title}}</div>
<h2 class="my-2">{{model.name}}</h2>
<div>{{model.categories.map(v=>v.name).join('/')}}</div>
<div class="d-flex jc-between">
  <div class="mt-2 scores" v-if="model.scores">
    <span>难度</span>
    <span class="badge bg-primary">{{model.scores.difficult}}</span> 
    <span>技能</span>
    <span class="badge bg-info-1">{{model.scores.skills}}</span> 
    <span>生存</span>
    <span class="badge bg-dark">{{model.scores.survive}}</span> 
    <span>攻击</span>
    <span class="badge bg-danger">{{model.scores.attack}}</span> 
    </div>
  <router-link tag="span" class="text-grey fs-sm" to="/">
  皮肤2 &gt;
  
  
  </router-link>  
</div>
</div>

</div>
<!--end of top-->
<div>
  <div class="px-3 bg-white">
    <div class="nav d-flex py-3 jc-around border-bottom">
      <div class="nav-item active">
        <div class="nav-link">英雄初识</div>
      
      </div>
      <div class="nav-item">
        <div class="nav-link">进阶攻略</div>
      
      </div>
    
    </div>
  
  </div>
  <swiper>
    <swiper-slide>
      <div>
        <div class="p-3 bg-white border-bottom ">
           <div class="d-flex ">
             <router-link tag="button" to="/" class="bth bth-lg flex-grow-1">
                <i class="iconfont icon-shipinti-copy"></i>
                  英雄视频介绍 
            </router-link>
             <router-link tag="button" to="/" class="bth bth-lg flex-grow-1 ml-2">
                <i class="iconfont icon-image"></i>
                  一图识英雄 
            </router-link>
           </div>
           <!--skills-->
           <div class="skills bg-white">
          <div class="d-flex jc-around  pt-4">
            <img class="icon"
            @click="currenSkillIdex=i"
            :class="{active: currenSkillIdex === i}"
            :src="item.icon" v-for="(item,i) in model.skills" :key="item.name" width="60" height="60">
          </div>
          <div v-if="currenSkill">
            <div class="d-flex py-4">
               <h3>{{currenSkill.name}}</h3>
               <span class=" text-grey-1 ml-4">
                {{currenSkill.tips}}
               </span>
            </div>
            <p>{{currenSkill.description}}</p>
          </div>
        </div>
        </div>
        
      <m-card icon="caidan" title="出装推荐" class="hero-items">
        <div class="fs-xl">顺风出装</div>
            <div class="d-flex jc-around text-center">
              <div v-for="item in model.items1" :key="item.name">
                <img :src="item.icon" class="icon">
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>   
      </m-card>
      <m-card icon="caidan" title="出装推荐" class="hero-items">
        <div class="fs-xl">逆风出装</div>
            <div class="d-flex jc-around text-center">
              <div v-for="item in model.items2" :key="item.name">
                <img :src="item.icon" class="icon">
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>   
      </m-card>
       
        <m-card plain icon="caidan" title="使用技巧">
          <div class="fs-md" style="line-height:1.5rem">{{model.usegeTips}}</div>
        
        </m-card>
        <m-card  plain icon="caidan" title="对抗技巧">
          <div class="fs-md" style="line-height:1.5rem">{{model.battleTips}}</div>
        
        </m-card>
        <m-card plain icon="caidan" title=" 团战思路">
          <div class="fs-md" style="line-height:1.5rem">{{model.teamTips}}</div>
        
        </m-card>
      
        <m-card plain icon="caidan" title="英雄关系">
        <div class="fs-xl">最佳搭档</div>
          <div v-for="item in model.partners" :key="item.name" class="d-flex pt-4">
              <img :src="item.hero.avatar" height="50px">
              <div class="flex-grow-1 ml-3 m-0">
                {{item.description}}
              </div>
          </div>
           <div class="border-bottom mt-3"></div>
        <div class="fs-xl mt-3">被谁克制</div>
          <div v-for="item in model.partners1" :key="item.name" class="d-flex pt-4">
              <img :src="item.hero.avatar" height="50px">
              <div class="flex-grow-1 ml-3 m-0">
                {{item.description}}
              </div>
          </div>
           <div class="border-bottom mt-3"></div>
        <div class="fs-xl mt-3">克制谁</div>
          <div v-for="item in model.partners2" :key="item.name" class="d-flex pt-4">
              <img :src="item.hero.avatar" height="50px">
              <div class="flex-grow-1 ml-3 m-0">
                {{item.description}}
              </div>
          </div>
           <div class="border-bottom mt-3"></div>
        </m-card>
      

    </div>
    </swiper-slide>
    <swiper-slide></swiper-slide>
  
  </swiper>


</div>
  </div>
</template>
<script>
export default {
  props:{
    id:{required:true}
  },
  data(){
    return{
      model:null,
      currenSkillIdex:0,
    }
  },
  methods: {
   async fetch(){
    const res = await this.$http.get(`heroes/${this.id}`)
    this.model =res.data
    }
  },
  computed:{
    currenSkill(){
      return this.model.skills[this.currenSkillIdex]
    }
  },
  created() {
    this.fetch()
  },
}
</script>
<style lang="scss">
.about{
  .top{
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%
  }

} 
.info{
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores{
    .badge{margin: 0 0.25rem;
    display: inline-block;
    width: 1rem;
    height:1rem;
    line-height: 0.9rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.5rem;
    border: 1px solid rgba(255,255,255,0.3);
    }
  }
}
.skills{
  img.active{
    border: 3px solid #db9e3f;
    border-radius: 50%; 
  }
}
.hero-items{
  img.icon{
    width: 45px;
    height: 45px;
    border-radius: 50%
  }
}
</style>

