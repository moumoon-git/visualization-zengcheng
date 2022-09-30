<template>
  <el-scrollbar style="height: 100%;">
    <div class="organization">
      <div class="organization__left">
        <ul class="organization__main">
          <li class="organization__main-video" v-for="(city, index) in tableList" :key="index">
            <div class="organization__top">
              <div class="organization__audio-name">
                <div class="organization__zhiwu">{{ city.name }}</div>
              </div>
              <div class="organization__img-r" @click="showHide(index, city.id)" ref="arrow">
                <img
                  src="../../../../../../assets/images/triangle-left.png"
                  ref="iconfont1"
                  class="organization__icon1"
                  alt
                />
                <img
                  src="../../../../../../assets/images/triangle.png"
                  ref="iconfont2"
                  class="organization__icon2"
                  alt
                />
              </div>
            </div>
            <div class="organization__audio-body" ref="child" style="display:none;">
              <ul class="organization__teamMember">
                <li
                  class="organization__oneTeam"
                  v-for="(item, idx) in city.rpIncidentUnitEntityList"
                  :key="idx"
                  @click="detailHandle(idx, item.id)"
                >
                  <div>{{ item.name }}</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="organization__right" v-show="showTable">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="position" label="职务" align="center"></el-table-column>
          <el-table-column prop="mobile1" label="移动电话" align="center"></el-table-column>
          <el-table-column prop="homeTel" label="固定电话" align="center"></el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <!-- <template slot-scope="scope">
            <div>
              <div class="call" @click="handleCallOut (scope.$index, scope.row)"></div>
            </div>
            </template>-->
            <!-- 电话短信按钮 -->
            <template slot-scope="scope">
              <div style="display: flex;justify-content: space-around">
                <el-tooltip class="item" effect="dark" content="发短信" placement="top">
                  <img
                    @click="showSmsDialog(scope)"
                    style="cursor: pointer;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAD20lEQVRYhaWXXYhNURTH//tjLve6ykf5fOBNIYmUF0lR8nolz/LiI96MTNPkO6Z5oCghhfJ08y2ZFA9TeFESkUdFSh5mblfu2XvrnHvOad1117kzw6rd+djr7P3ba6299jqq/jWCIIq8UqybP09FAtMJ7JqLFSZT7F569y8wQWiKw1EgDqDZlcNNB4g3nzYKk8BlQByENsP6wKC42aW+DCgDcameJ+87LMRhDGlWsFIRTBEUBXLpeFGq54h+4C7LYGza+tKrKXAXnYyC6AI9l7ZWqkt3VAJmBetkIHErpVdD+iUXcOtotgCq22Lvsz4xhgwBmnG3pJffLqkBKGzp4Z6pSgz5dWWEsyeb7imD0RkUBdLMZX23S+okFDbN8njg2tZKxAMhKITkykAVoDSgVGhbIb6P9TTgfmus+WBxGcAK4j5DLATLgpVDLYyVbjbcecH8Lo0Bx2JIk7jT5Du/b5bZ+0NjD9kwXZuFBh/f6mZmwMe4o1Y1N95ZNZ/FEs9NUsvH3F01ZxKYgM9sHArdlVc6BvmjUAUwAYV5x8v6Xn/F7BICtkiS/lNls60227xoKWxAwGu0x5TSSHJPLdSl4IFF8cf1cbdzjsejLwb7a1Vz5Y1VcycL5C9GVXZWzfBbi0EEvK2Pu+2rHJ4DWMKMAMllRTkm3qKV2P/XG254cxSOQGHFubJ+cKxsdrAclO+aobLZ2l/Ro0Fh45oIJ+oT7lD8/rvGMpKVxV3LExgHyiQJ4ENNP3ax4beUPB5/shisVc21JyW9IJvkYUkvqlXN1fcWp3XA6GDTbxtqusdp8EfpAsHOsQ7hpz1Y9g0EKHle6kPrTsMNnSubJ28sLl2foZ69NuZwC7CfLEZi5XURDg403ViPo4aPn0svIJqB6dZOVtffdGPftFp/sKJH3ltcSL98erXhjs4LeV7pAHJsDAmKAgU+qfBM7/1iH6L6hDtwrGy29gGt4033Mu2b7DDmIPm9ZQqBlQTUQpJeonum6UYLJuwACt3f8pqoy2W8ZimyGC+yaBan0rG1fbHL8nEtm4CWCfFzH7EQN7EUA3RCxWEtME7OLhGKu8x3WEi1+4fLZi1beazgfbdFctFCJv+lsJoskLstByqs6OZ73PqpMfDK4kbRxNOUCAH3yUnfBRT/BtFKkVaLWV0kVYvUNZL0qi6zijEi1UIG53gMKWFHTbV8zaTo4KVeiAS3eeoyRZSlFRX9AhUBQdh5PCzoVcxD1AVZcstgpd+f6QjfTY7AdfTxTA3iuuydVLdMFwYClHh8UAvx31qeaf8XSILiwF1nGYfjk/+Py3pBtgXAX7tr7Hp4jZJhAAAAAElFTkSuQmCC"
                    alt
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="电话" placement="top">
                  <img
                    @click.stop="handleCallOut(scope)"
                    style="cursor: pointer;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                    alt
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="会议" placement="top">
                  <img
                    @click="handleMeeting(scope)"
                    style="cursor: pointer;"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                    alt
                  />
                </el-tooltip>
              </div>
            </template>>
          </el-table-column>
        </el-table>
      </div>
      <!-- 短信 -->
      <el-dialog
        title="短信"
        :visible.sync="smsDialogVisible"
        width="50%"
        style="z-index:9999;!important"
        :modal="false"
        :close-on-click-modal="false"
      >
        <div style="background-color:white;margin-top:15px;padding:15px 15px 7px;">
          <div style="display: flex;margin-bottom:15px;justify-content: space-between">
            <textarea
              style="height:227px;width:100%;resize:none;outline:none;border:none;border:1px solid rgba(222,222,222,1);"
              v-model="content"
              maxlength="500"
              class="textarea"
            >123
      </textarea>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="smsDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="toSend" size="small">发 送</el-button>
        </span>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>
<script>
import bus from "@/assets/js/bus";
import allUrl from "@/assets/api/allApiUrl";

export default {
  props: ["tableList", "eventId"],
  data() {
    return {
      // tableList: this.organizationData,
      //   tableList: [],

      tableData: [],
      multipleSelection: [],
      showTable: false,
      smsDialogVisible: false,
      content: "",
      phone: "",
      userIds: ""
    };
  },

  mounted() {
    console.log("拿到的预案数据222", this.tableList);
    // bus.$off("incidentMailgroup");
    // bus.$on("incidentMailgroup", val => {
    //   consoel.log(val);
    //   this.tableList = val;
    // });
  },
  methods: {
    showHide(index, id) {
      if (this.$refs.child[index].style.display === "none") {
        this.$refs.child[index].style.display = "block";
        this.$refs.iconfont1[index].style.display = "none";
        this.$refs.iconfont2[index].style.display = "inline-block";
        // this.$refs.arrow[index].style.transform = "rotateZ(0deg)";
      } else {
        this.$refs.child[index].style.display = "none";
        this.$refs.iconfont1[index].style.display = "inline-block";
        this.$refs.iconfont2[index].style.display = "none";
        // this.$refs.arrow[index].style.transform = "rotateZ(90deg)";
      }
    },

    detailHandle(index, id) {
      let data = {
        ...allUrl.getContactorByUnit,
        // data: this.qs.stringify({
        //   // id: 19
        //   id:newVal
        // })
        params: {
          id: id
        }
      };
      this.apix(data)
        .then(res => {
          console.log(data);
          if (res.code == 0) {
            this.tableData = res.data;
            this.showTable = true;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCallOut(scope) {
      console.log("callPhone", scope.row);
      this.callPhone(scope.row); //一键呼出
    },
    handleMeeting(scope) {
      console.log("handleMeeting", scope.row);
      this.createMeeting(scope.row); //一键会议
    },

    showSmsDialog(scope) {
      console.log(scope.row);
      console.log("拿到的预案数据222", this.tableList);
      this.phone = scope.row.mobile1;
      this.userIds = scope.row.id + "";
      this.smsDialogVisible = true;
    },
    toSend() {
      if (this.content == "") {
        this.$message.error("请填写内容");
        console.log(this.eventId);
        return;
      } else {
        this.$http({
          url: this.$http.adornUrl("/message/messageinfor/sendmessage"),
          method: "post",
          data: this.$http.adornData({
            content: this.content,
            doDatas: "",
            doSpace: 0,
            doTime: 0,
            doWay: "0",
            eventId: this.eventId,
            mailGroup: [],
            messageGroup: [],
            phone: this.phone,
            sendWay: 0,
            signature: "",
            type: "",
            userIds: this.userIds
          })
        }).then(data => {
          if (data && data.data.code == "0") {
            this.$message({
              message: "发送成功",
              type: "success"
            });
            this.phone = "";
            this.userIds = "";
            this.content = "";
            this.smsDialogVisible = false;
          } else {
            this.$message.error("发送失败");
          }
        });
      }
    }

    // // 修改table tr行的背景色
    // tableRowStyle({ row, rowIndex }) {
    //   return { "background-color": "rgba(0,0,100,0.1)" };
    // },
    // // 修改table header的背景色
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: lightblue;color: #fff;font-weight: 500;";
    //   }
    // }
  }
};
</script>

<style lang="less" scope>
/* .call {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  vertical-align: middle;
  cursor: pointer;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAACEklEQVRIS72UP2gTcRTH3/cuLbGIiIMUdHOTuFQxaVREqiKCg4KTgrlEEBGcpP4ZSsWlKm4iSm2iVRwKdRCEDEUHTXqKHR26CFZ0kIKDFKpefl9fUq5cc9f0MqQ/OLjf7733eX9/P0iHFjrElfUHj1e41UtIyq7J7LksvrebWWTEY1WvYMG6r/kkSfEsG9dye3GvHXgI/LTKbcbiF4V0+yCKGHrYWdiPWf+sOM3D6vjYXFkGh4dhmp2GwR940pAvQ9EBZ5w0XjyucovVJZvVcIfUOCmCya9lKTTDQ+DSR57Q+F6FI8CeXAYzRde4apQOygkM5NN4EzwLgTXFPoAzK8F44GRwqX726BO7EouS1DKkLFvKChhVh1fWLMXEZ3Yv/OYvVexZUsZ1hY40GxarzALmgNNv345qauRUlFxOiPB0AyuY0oiOtDMRS3YRqxGNxfe+XOF5hZd81dI0TwnMUYr1409NHl7ch59rlsJXeOLyGYVn63sdt3805nwhmxgvurWb6mhoGUSZ+7uI3RcOYb5l83zhc5ebPLCiFyQVMHit/wP6JVdAgKu5NO7EAteVdPR6dfTqsL7WNeZdJ2MPxgY34G+ZxAa5pWW5rNvl2xiAUICDennetQUOlGa7J5LXeh/Xlu8Sskf/50Fzw+lPjMZuXsvUSYxVZOO3KVmIeidWHbfW9YwnXf+HPl5cq2t1LOL/UxmzF7u08HkAAAAASUVORK5CYII=");
  background-size: 100% 100%;
  background-repeat: no-repeat;
} */

.organization {
  width: 100%;
  display: flex;
  // flex-direction: column;
  // justify-content: space-around;
  // align-items: center;
  margin-left: 15px;

  color: white;
}

ul {
  list-style: none;
  padding: 0;
}

.organization__left {
  text-align: center;
}

.organization__right {
  margin-left: 15px;
}

.organization__main {
  width: 120px;
}

.organization__top {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  background-color: rgba(200, 200, 200, 0.5);
}

.organization__zhiwu {
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 9px;
}

.organization__oneTeam {
  // width: 87%;
  border: 1px solid #ccc;
  margin: 8px 0;
  padding: 2px 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.organization__img-r {
  text-align: right;
}

.organization__icon1 {
  width: 16px;
  transform: rotateX(180deg);
}
.organization__icon2 {
  display: none;
  width: 16px;
}

.el-table,
.el-table__expanded-cell {
  background-color: transparent;
  color: white;
}
.el-table th,
.el-table tr {
  background-color: transparent;
  color: white;
}

.el-table tbody tr:hover > td {
  background-color: rgba(0, 0, 50, 0.5) !important;
}
</style>
