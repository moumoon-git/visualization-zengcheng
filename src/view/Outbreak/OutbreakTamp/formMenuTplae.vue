<template>
  <div class="formMenuTplae_wrap">
   <div class="blueTitleTow"  style="margin: 24px 20px 18px;" >疫情态势</div>

   <div class="tablexx" >
     <el-table
           :data="tableData"
           style="width: 100%">
           <el-table-column
             prop="date"
             label="防控指标"
             width="272">
           </el-table-column>
           <el-table-column
             prop="name"
             label="今日">
           </el-table-column>
           <el-table-column
             prop="address"
             label="累计">
           </el-table-column>
         </el-table>
   </div>

  </div>
</template>

<script>
  export default{
    name:'formMenuTplae',
    data () {
      return {
        tableData: [{
          date: '大数据提供的湖北来深人数',
          name: '1516',
          address: '1518'
        }, {
          date: '大数据提供的湖北来深人数',
          name: '1516',
          address: '1517'
        }, {
          date: '大数据提供的湖北来深人数',
          name: '1516',
          address: '1519'
        }, {
          date: '大数据提供的湖北来深人数',
          name: '1516',
          address: '1516'
        }, {
          date: '大数据提供的湖北来深人数',
          name: '1516',
          address: '1516'
        }]
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
.formMenuTplae_wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tablexx /deep/ .el-table tr>th:nth-child(1),.tablexx /deep/ .el-table tr>td:nth-child(1){
  padding-left: 22px;
}
.tablexx /deep/ .el-table th>.cell{
  font-size:18px;
  color:rgba(59,59,59,1);
  font-weight: 400;
}
.tablexx /deep/ .el-table td{
  padding: 9px 0;
}
.tablexx /deep/ .el-table tr{
  background: #F9FBFF;
}
.tablexx /deep/ .el-table th{
  background: #F9FBFF;
}




</style>
