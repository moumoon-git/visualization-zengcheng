<template>
  <div class="right_content_bottom_wrap">
    <!--      盒子1-->
    <div class="right_content_bottom_content_wrap">
      <div class="blueTitle">要情动态</div>
      <div class="right_content_bottom_content">
        <ul class="table">
          <li class="table-column" style="background-color: #3B87AA;">
            <div class="title">
              要情标题
            </div>
            <div class="detail">
              详情
            </div>
            <div class="address">
              事发地点
            </div>
          </li>
          <li
            class="table-column"
            v-for="item in tableData"
            :key="item.id"
            style="font-size:13px"
          >
            <div class="title">
              {{ item.title }}
            </div>
            <div class="detail">
              <el-tooltip :content="item.detail" effect="dark" placement="top">
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.detail }}</div>
              </el-tooltip>
            </div>
            <div class="address">
              {{ item.address }}
            </div>
          </li>
        </ul>
        <!-- <el-table
            :data="tableData"
            style="width: 100%"
            height="295">
            <el-table-column
              label=""
              width="30">
            </el-table-column>
            <el-table-column
              prop="title"
              label="要情标题"
              width="270">
            </el-table-column>
            <el-table-column
              prop="detail"
              label="来源"
              width="131">
            </el-table-column>
            <el-table-column
              prop="address"
              label="详情"
              width="200">
            </el-table-column>
          </el-table> -->
      </div>
    </div>

    <!--      盒子2-->
    <div class="right_content_bottom_content_wrap">
      <div class="blueTitle">风险预警</div>
      <div class="right_content_bottom_content">
        <ul class="table">
          <li class="table-column" style="background-color: #3B87AA;">
            <div class="name">
              风险点
            </div>
            <div class="basisInfo">
              预警依据
            </div>
          </li>
          <li
            class="table-column"
            v-for="item in tableData2"
            :key="item.id"
            style="font-size:13px"
          >
            <div class="name">
              {{ item.name }}
            </div>
            <div class="basisInfo">
              <el-tooltip :content="item.basisInfo" effect="dark" placement="top">
                <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.basisInfo }}</div>
              </el-tooltip>
            </div>
          </li>
        </ul>
        <!-- <el-table
            :data="tableData2"
            style="width: 100%"
            height="295">
                <el-table-column
      type="selection"
      width="55">
    </el-table-column>
            <el-table-column
              label=""
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="预警事项"
              width="275">
            </el-table-column>
            <el-table-column
              prop="basisInfo"
              label="预警依据"
              width="275">
            </el-table-column>
          </el-table> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "right_content_bottom",
  data() {
    return {
      tableData: [],
      tableData2: []
    };
  },
  methods: {
    bottomLeftInit(data) {
      this.tableData = data;
    },
    bottomRightInit(data) {
      this.tableData2 = data;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.right_content_bottom_wrap {
  display: flex;
}
.right_content_bottom_wrap > div:nth-child(1) {
  margin-right: 50px;
}
.right_content_bottom_content {
  margin-top: 25px;
  width: 631px;
  height: 295px;
  border: 1px solid rgba(21, 61, 150, 1);
}
.right_content_bottom_content .table {
  list-style: none;
  padding: 0;
  height: 270px;
  overflow: scroll;
  -ms-overflow-style: none;
}
.right_content_bottom_content .table::-webkit-scrollbar {
  width: 0;
  height: 0 !important;
}
.right_content_bottom_content .table-column {
  color: white;
  text-align: center;
  height: 45px;
  line-height: 45px;
  display: flex;
}
.right_content_bottom_content .table-column > div {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid rgba(59, 144, 238, 1);
}
.right_content_bottom_content_thear {
  width: 100%;
  height: 40px;
}
.right_content_bottom_content /deep/ .el-table {
  background: none;
}
.right_content_bottom_content /deep/ .el-table thead {
  background: url("../../../assets/images/bor.png") no-repeat;
}
.right_content_bottom_content /deep/ .el-table tr,
.right_content_bottom_content /deep/ .el-table th {
  background: none;
}
.right_content_bottom_content
  /deep/
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td {
  background: rgba(0, 0, 0, 0.2) !important;
}
.right_content_bottom_content /deep/ .el-table__body tr > td {
  padding: 0;
  height: 35px;
  border-bottom: 1px solid rgba(191, 208, 244, 0.15);
}
.right_content_bottom_content /deep/ .el-table__body tr {
  height: 36.4px;
}
.right_content_bottom_content /deep/ .el-table__body tr > td {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(91, 157, 223, 1);
}
.right_content_bottom_content /deep/ .el-table__body tr > td:nth-child(2) {
  color: #c7d6ec;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
.right_content_bottom_content /deep/ .el-table th:last-child {
  width: 0;
}
.right_content_bottom_content /deep/ .el-table th {
  padding: 0;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(217, 213, 237, 1);
}
.right_content_bottom_content /deep/ .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.right_content_bottom_content /deep/ .el-table th.is-leaf {
  border-bottom: 1px solid rgba(191, 208, 244, 0.15);
}
.right_content_bottom_content /deep/ .el-table::before {
  background: none !important;
}
</style>
