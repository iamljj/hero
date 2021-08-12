<template>
  <div class="wrapper">
  <h1>{{id ?'编辑' : '新增'}}管理员{{id}}</h1>
  <el-form label-width="120px" @submit.native.prevent="">
  <el-form-item label='名称' label-width='120px'>
<el-input v-model="model.username"  style="width: 220px"></el-input>  
  </el-form-item>
  <el-form-item label='密码' label-width='120px'>
<el-input v-model="model.password"  style="width: 220px" type="password"></el-input>  
  </el-form-item>
  <el-form-item >
<el-button type='primary' native-type="submit" @click="save">保存</el-button>  
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    id:{}
  },
  data() {
    return {
        model:{},
        parentOption:[],
        
    };
  },
  watch: {},
  computed: {},
  methods: {
     async save(){
      let res
       if(this.id){
         res=await this.$http.put(`rest/admin_users/${this.id}`,this.model)
       }
       else{
       res= await this.$http.post('rest/admin_users',this.model)
       }
       console.log(res.data.name);
       
       this.$router.push('/admin_users/list')
       this.$message({
         type:'success',
         message:'保存成功'
       })
       
      },
      async fetch(){
        const res =await this.$http.get(`rest/admin_users/${this.id}`)
        this.model=res.data
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