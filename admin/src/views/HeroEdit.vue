<template>
  <div class="wrapper">
  <h1>{{id ?'编辑' : '新增'}}英雄{{id}}</h1>
  <el-form label-width="120px" @submit.native.prevent="">
  <el-tabs  type="border-card" value="basic">
  <el-tab-pane label="基本信息" name="basic">
  <el-form-item label='名称' label-width='120px'>
<el-input v-model="model.name" style="width:220px"></el-input>  
  </el-form-item>
  <el-form-item label='称号' label-width='120px'>
<el-input v-model="model.title" style="width:220px"></el-input>  
  </el-form-item>
  <el-form-item label='头像' label-width='120px'>
<el-upload
  class="avatar-uploader"
  :headers="myHeaders"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="afteruolode"
  >
  <img v-if="model.avatar" :src="model.avatar" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> 
  </el-form-item>
  <el-form-item label='背景图' label-width='120px'>
<el-upload
  class="avatar-uploader"
  :headers="myHeaders"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="afteruolode1"
  >
  <img v-if="model. banner" :src="model. banner" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> 
  </el-form-item>
  <el-form-item label='职业'>
  <el-select v-model="model.categories" multiple>
  <el-option v-for="item of categories"
  :label='item.name'
  :value="item._id" :key="item._id"></el-option>
  </el-select>
    </el-form-item>
    <el-form-item label='难度' label-width='120px'>
<el-rate  :max="9" show-score v-model="model.scores.difficult" style="width:240px;margin-top:0.6rem"></el-rate>  
  </el-form-item>
    <el-form-item label='技能' label-width='120px'>
<el-rate  :max="9" show-score v-model="model.scores.skills" style="width:240px;margin-top:0.6rem"></el-rate>  
  </el-form-item>
    <el-form-item label='攻击' label-width='120px'>
<el-rate  :max="9" show-score v-model="model.scores.attack" style="width:240px;margin-top:0.6rem"></el-rate>  
  </el-form-item>
    <el-form-item label='生存' label-width='120px'>
<el-rate  :max="9" show-score v-model="model.scores.survive" style="width:240px;margin-top:0.6rem"></el-rate>  
  </el-form-item>
  <el-form-item label='顺风出装'>
  <el-select v-model="model.items1" multiple>
  <el-option v-for="item of items"
  :label='item.name'
  :value="item._id" :key="item._id"></el-option>
  </el-select>
    </el-form-item>
   <el-form-item label='顺风出装'>
   <el-select v-model="model.items2" multiple>
   <el-option v-for="item of items"
   :label='item.name'
   :value="item._id" :key="item._id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="使用技巧">
  <el-input type="textarea" v-model="model.usegeTips"></el-input>
  </el-form-item>
  <el-form-item label="对抗技巧">
  <el-input type="textarea" v-model="model.battleTips"></el-input>
  </el-form-item>
  <el-form-item label="团战思路">
  <el-input type="textarea" v-model="model.teamTips"></el-input>
  </el-form-item>
  </el-tab-pane>
  <el-tab-pane label="技能信息" name="skills">
  <el-button @click="model.skills.push({})" size="small"><i class="el-icon-plus"></i>添加技能</el-button>
  <el-row type="flex" style="flex-wrap:wrap">
    <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
      <el-form-item label="名称">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
  class="avatar-uploader"
  :headers="myHeaders"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="res=>$set(item,'icon',res.url)"
  >
  <img v-if="item.icon" :src="item.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> 
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item label="提示">
        <el-input type="textarea" v-model="item.tips"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button size="small" type="danger"
      @click="model.skills.splice(i,1)"
      >删除</el-button>
      
      </el-form-item>
    
    </el-col>
  </el-row>
  </el-tab-pane >
  <el-tab-pane label="最佳搭档" name="partners">
  <el-button @click="model.partners.push({})" size="small"><i class="el-icon-plus"></i>添加英雄</el-button>
  <el-row type="flex" style="flex-wrap:wrap">
    <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
      <el-form-item label="英雄">
        <el-select filterable  v-model="item.hero">
        <el-option 
        v-for="hero in heroes"
        :key="hero._id" 
        :value="hero._id"
        :label="hero.name"></el-option>
        
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button size="small" type="danger"
      @click="model.partners.splice(i,1)"
      >删除</el-button>
      
      </el-form-item>
    
    </el-col>

  </el-row>
  </el-tab-pane >
  <el-tab-pane label="被克制英雄" name="partners1">
  <el-button @click="model.partners1.push({})" size="small"><i class="el-icon-plus"></i>添加英雄</el-button>
  <el-row type="flex" style="flex-wrap:wrap">
    <el-col :md="12" v-for="(item,i) in model.partners1" :key="i">
      <el-form-item label="英雄">
        <el-select filterable  v-model="item.hero">
        <el-option 
        v-for="hero in heroes"
        :key="hero._id" 
        :value="hero._id"
        :label="hero.name"></el-option>
        
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button size="small" type="danger"
      @click="model.partners1.splice(i,1)"
      >删除</el-button>
      
      </el-form-item>
    
    </el-col>

  </el-row>
  </el-tab-pane >
  <el-tab-pane label="克制英雄" name="partners2">
  <el-button @click="model.partners2.push({})" size="small"><i class="el-icon-plus"></i>添加英雄</el-button>
  <el-row type="flex" style="flex-wrap:wrap">
    <el-col :md="12" v-for="(item,i) in model.partners2" :key="i">
      <el-form-item label="英雄">
        <el-select filterable  v-model="item.hero">
        <el-option 
        v-for="hero in heroes"
        :key="hero._id" 
        :value="hero._id"
        :label="hero.name"></el-option>
        
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button size="small" type="danger"
      @click="model.partners2.splice(i,1)"
      >删除</el-button>
      
      </el-form-item>
    
    </el-col>

  </el-row>
  </el-tab-pane >
  </el-tabs>
  <el-form-item >
  <el-button type='primary' native-type="submit" @click="save" style="margin-left:40%">保存</el-button>  
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
var token =  localStorage.getItem('token')
export default {
  components: {},
  props: {
    id:{}
  },
  data() {
    return {
        model:{
          name:'',
          avatar:'',
          scores:{
            difficult:0
          },
          skills:[],
          partners:[],
          heroes:[]
        },
        categories:{},
        items:{},
         myHeaders: {Authorization:token}
       
         
        
        
    };
  },
  watch: {},
  computed: {},
  methods: {
     async save(){
      let res
       if(this.id){
         res=await this.$http.put(`rest/heroes/${this.id}`,this.model)
       }
       else{
       res= await this.$http.post('rest/heroes',this.model)
       }
       console.log(res.data.name);
       
      //  this.$router.push('/heroes/list')
       this.$message({
         type:'success',
         message:'保存成功'
       })
       
      },
      async fetch(){
        const res =await this.$http.get(`rest/heroes/${this.id}`)
        this.model=Object.assign({},this.model,res.data)
        console.log(this.myHeaders);
      },
      async fetchcategories(){
        const res =await this.$http.get(`rest/categories`)
        this.categories=res.data
      },
      async fetchHeroes(){
        const res =await this.$http.get(`rest/heroes`)
        this.heroes=res.data
      },
      async fetchitems(){
        const res =await this.$http.get(`rest/items`)
        this.items=res.data
      },
      afteruolode(res){
        this.$set(this.model,'avatar',res.url)
      },
      afteruolode1(res){
        this.$set(this.model,'banner',res.url)
      },

      
      
  },
  created() {
    this.fetchcategories()
    this.fetchitems()
    this.id && this.fetch()
    this.fetchHeroes()
  },
  mounted() {}
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
    
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    max-width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center 18px;
    
  }
  .avatar {
   max-width: 178px;
    height: 80px;
    display: block;
    
  }
</style>