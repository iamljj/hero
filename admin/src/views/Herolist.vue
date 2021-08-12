<template>
  <div>
        <el-select filterable  v-model="hero">
        <el-option 
        v-for="hero in heroes"
        :key="hero._id" 
        :value="hero._id"
        :label="hero.name"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:20px"
        @click="save">
        搜索</el-button>
    <h1>英雄列表</h1>
    <el-table :data='model'>
<el-table-column prop='_id' label='ID' width='220'></el-table-column>
<el-table-column prop='name' label='英雄名称' ></el-table-column>
<el-table-column prop='title' label='称号' ></el-table-column>
<el-table-column prop='avatar' label='英雄头像' >
<template slot-scope="scope">
  <img :src="scope.row.avatar" style="height:3rem;">
</template>

</el-table-column>
<el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button @click="remove(scope.row)" type="primary" size="small">删除</el-button>
        <el-button type="primary" size="small"
        @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      model:[],
      hero:[],
      heroes:[]
    }
  },
  methods:{
   async fetch(){
const res = await this.$http.get('rest/heroes') 
this.model =res.data
    },
    async fetchHeroes(){
        const res =await this.$http.get(`rest/heroes`)
        this.heroes=res.data
      },
     async  save(){
          console.log(this.hero);
        await this.$router.push(`/heroes/edit/${this.hero}`)
       },
      
    async remove(row){
this.$confirm(`是否要删除该分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await this.$http.delete(`rest/heroes/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
        
      },
  },
  created() {
   this.fetch()
   this.fetchHeroes()
  },
}
</script>