<template>
  <div class="wrapper">
  <h1>{{id ?'编辑' : '新增'}}分类{{id}}</h1>
  <el-form label-width="120px" @submit.native.prevent="">
  <el-form-item label='上级分类'>
<el-select v-model="model.parent">
<el-option v-for="item in parentOption" :key='item._id'
:label="item.name"
:value="item._id"></el-option>
</el-select>  
  </el-form-item>
  <el-form-item label='名称' label-width='120px'>
<el-input v-model="model.name"  style="width: 220px"></el-input>  
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
         res=await this.$http.put(`rest/categories/${this.id}`,this.model)
       }
       else{
       res= await this.$http.post('rest/categories',this.model)
       console.log(this.model);
       }
       console.log(res.data.name);
       
       this.$router.push('/categories/list')
       this.$message({
         type:'success',
         message:'保存成功'
       })
       
      },
      async fetch(){
        const res =await this.$http.get(`rest/categories/${this.id}`)
        this.model=res.data
      },
      async fetchparentOption(){
        const res =await this.$http.get(`rest/categories`)
        this.parentOption=res.data
      },
      
  },
  created() {
    this.fetchparentOption()
    this.id && this.fetch()
  },
  mounted() {}
};
</script>
<style  scoped>
</style>