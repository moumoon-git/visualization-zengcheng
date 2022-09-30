<template>
  <div class="OutbreakBottomLeft_wrap">

        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            prop="date"
            label="街道/社区"
            width="150"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="确诊"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="疑似">
          </el-table-column>
          <el-table-column
            prop="address"
            label="居家观察">
          </el-table-column>
        </el-table>

  </div>
</template>

<script>
  export default{
    name:'OutbreakBottomLeft',
    data () {
      return {
         tableData: [{
                   id: 1,
                   date: '2016-05-02',
                   name: '23',
                   address: '1518'
                 }, {
                   id: 2,
                   date: '2016-05-04',
                   name: '23',
                   address: '1518'
                 }, {
                   id: 3,
                   date: '2016-05-01',
                   name: '23',
                   address: '1518',
                   children: [{
                       id: 31,
                       date: '2016-05-01',
                       name: '23',
                       address: '1518'
                     }, {
                       id: 32,
                       date: '2016-05-01',
                       name: '23',
                       address: '1518'
                   }]
                 }, {
                   id: 4,
                   date: '2016-05-03',
                   name: '23',
                   address: '1518'
                 }],
      }
    },
     methods: {

    }
  }
</script>

<style scoped>
.OutbreakBottomLeft_wrap /deep/ .el-table .cell{
  font-size:16px;
  font-weight:400;
  text-align: center;
  position: relative;
}
.OutbreakBottomLeft_wrap /deep/ .el-table .cell>span{
  display: none;
}
.OutbreakBottomLeft_wrap /deep/ .el-table [class*=el-table__row--level] .el-table__expand-icon{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 9px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.OutbreakBottomLeft_wrap /deep/ .el-table th{
 padding: 16px 0 11px;
}
.OutbreakBottomLeft_wrap /deep/ .el-table td{
 padding: 17px 0 14px;
}
.OutbreakBottomLeft_wrap /deep/ .el-table tr>th{
  color:#666666 ;
}
.OutbreakBottomLeft_wrap /deep/ .el-table tr>th:nth-child(1),
.OutbreakBottomLeft_wrap /deep/ .el-table tr>th:nth-child(2){
  color:rgba(81,138,251,1);
}
.OutbreakBottomLeft_wrap /deep/ .el-table tr>td:nth-child(1),
.OutbreakBottomLeft_wrap /deep/ .el-table tr>td:nth-child(2){
  color:rgba(81,138,251,1);
}
.OutbreakBottomLeft_wrap /deep/ .el-table__row--level-1>td{
  color:#666666 !important;
}
.OutbreakBottomLeft_wrap /deep/ .el-icon-arrow-right{
  position: relative;
  width: 10px;
  height: 8px;
}
.OutbreakBottomLeft_wrap /deep/ .el-icon-arrow-right:before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  margin: auto;
  width:10px;
  height:8px;
  background: url('../../../assets/images/sjx.png')no-repeat;
  background-size: 100% 100%;
}
.OutbreakBottomLeft_wrap /deep/ .el-table__expand-icon{
  transition: 0s;
}
.OutbreakBottomLeft_wrap /deep/ .el-table__expand-icon--expanded{
  transform: rotate(180deg);
}
</style>
