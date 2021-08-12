<template>
  <div class="wrapper">
  <h1>{{id ?'编辑' : '新增'}}广告位{{id}}</h1>
  <el-form label-width="120px" @submit.native.prevent="">
  <el-form-item label='名称' label-width='120px'>
<el-input v-model="model.name"  style="width: 220px"></el-input>  
  </el-form-item>
   <el-form-item label="广告">
   <el-button @click="model.items.push({})" size="small"><i class="el-icon-plus"></i>添加广告</el-button>
  <el-row type="flex" style="flex-wrap:wrap">
    <el-col :md="12" v-for="(item,i) in model.items" :key="i">
      <el-form-item label="跳转链接">
        <el-input v-model="item.url"></el-input>
      </el-form-item>
      <el-form-item label="图片" style="margin-top:2rem">
        <el-upload
  class="avatar-uploader"
  :headers="myHeaders"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="res=>$set(item,'image',res.url)"
  >
  <img v-if="item.image" :src="item.image" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> 
      </el-form-item>
      <el-form-item>
      <el-button size="small" type="danger"
      @click="model.items.splice(i,1)"
      >删除</el-button>
      
      </el-form-item>
    
    </el-col>

  </el-row>
   </el-form-item>
  <el-form-item >
<el-button type='primary' native-type="submit" @click="save">保存</el-button>  
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
          items:[],
          
        },
        myHeaders: {Authorization:token}
       
        
    };
  },
  watch: {},
  computed: {},
  methods: {
     async save(){
      let res
       if(this.id){
         res=await this.$http.put(`rest/ads/${this.id}`,this.model)
       }
       else{
       res= await this.$http.post('rest/ads',this.model)
       }
       console.log(res.data.name);
       
       this.$router.push('/ads/list')
       this.$message({
         type:'success',
         message:'保存成功'
       })
       
      },
      async fetch(){
        const res =await this.$http.get(`rest/ads/${this.id}`)
        this.model=Object.assign({},this.mode1,res.data)
      },
      
      
  },
  created() {
    
    this.id && this.fetch()
  },
  mounted() {}
};
</script>
<style  scoped>
</style>