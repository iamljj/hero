<template>
  <div class="wrapper">
  <h1>{{id ?'编辑' : '新增'}}物品{{id}}</h1>
  <el-form label-width="120px" @submit.native.prevent="">
  <el-form-item label='名称' label-width='120px'>
<el-input v-model="model.name" style="width:220px"></el-input>  
  </el-form-item>
  <el-form-item label='图标' label-width='120px'>
<el-upload
  class="avatar-uploader"
  :headers="myHeaders"
  :action="$http.defaults.baseURL+'/upload'"
  :show-file-list="false"
  :on-success="afteruolode"
  >
  <img v-if="model.icon" :src="model.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> 
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
        model:{},
        myHeaders: {Authorization:token}
       
         
        
        
    };
  },
  watch: {},
  computed: {},
  methods: {
     async save(){
      let res
       if(this.id){
         res=await this.$http.put(`rest/items/${this.id}`,this.model)
       }
       else{
       res= await this.$http.post('rest/items',this.model)
       }
       console.log(res.data.name);
       
       this.$router.push('/items/list')
       this.$message({
         type:'success',
         message:'保存成功'
       })
       
      },
      async fetch(){
        const res =await this.$http.get(`rest/items/${this.id}`)
        this.model=res.data
      },
      afteruolode(res){
        this.$set(this.model,'icon',res.url)

      }
      
      
  },
  created() {
    this.id && this.fetch()
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center 18px;
    
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    
  }
</style>