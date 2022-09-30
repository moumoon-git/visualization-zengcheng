<template>
  <div class="particulars_wrap_dl">
    <ul class="particulars_tab">
      <li
        :class="item.flag?'liActive':''"
        @click="clickTab(item)"
        v-for="(item,index) in tabData"
        :key="index"
      >{{item.name}}</li>
    </ul>

    <!-- 要情信息 -->
    <div v-show="tabData.find(item => item.ind == 0).flag">
      <el-scrollbar style="height: 100%;">
        <h3 class="particulars_title">要情登记表</h3>
        <!-- 只读 -->
        <div class="readOnly_wrap">
          <ul class="readOnly_left">
            <li>
              <span>报送人：</span>
              <span>{{data.reportName}}</span>
            </li>
            <li>
              <span>来电号码：</span>
              <span>{{data.reportPhone}}</span>
            </li>
            <li>
              <span>要情标题：</span>
              <span>{{data.title}}</span>
            </li>
            <li>
              <span>事发时间：</span>
              <span>{{data.time}}</span>
            </li>
            <!-- <li>
              <span>事发地点：</span>
              <span>{{data.address}}</span>
            </li> -->
          </ul>
          <ul class="readOnly_right">
            <li>
              <span>接报时间：</span>
              <span>{{data.reportTime}}</span>
            </li>
            <li>
              <span>要情来源：</span>
              <span v-if="data.sourceId==100">12345分拨</span>
              <span v-else>部门上报</span>
            </li>
            <li>
              <span>要情分类：</span>
              <div class="typeAll">
                <ul class="selectOptions">
                  <li>
                    <span :class="data.emergencyType === '1' ? 'selectOptionActive' : ''"></span>普通事件
                  </li>
                  <li>
                    <span :class="data.emergencyType === '2' ? 'selectOptionActive' : ''"></span>突发事件
                  </li>
                </ul>
                <span class="nameOfType"> {{ typeName }} </span>
              </div>
            </li>
            <li>
              <span>事发状态：</span>
              <ul class="selectOptions">
                <li>
                  <span :class="data.status==0?'selectOptionActive':''"></span>待办
                </li>
                <li>
                  <span :class="data.status==1?'selectOptionActive':''"></span>办理中
                </li>
                <li>
                  <span :class="data.status==2?'selectOptionActive':''"></span>已完成
                </li>
              </ul>
            </li>
          </ul>
          <div class="readOnly_bottom_place">
            <span>事发地点：</span>
            <span>{{data.address}}</span>
          </div>
          <div class="readOnly_bottom">
            <span>要情详情：</span>
            <div>
              <el-scrollbar style="height: 100%;">{{data.detail}}</el-scrollbar>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 应急预案 -->
    <div class="plan_big_wrap" v-show="tabData.find(item => item.ind == 2).flag">
      <plan ref="plan"></plan>
    </div>

    <!-- 事件过程 -->
    <!-- <div class="eventProcedure" v-show="tabData.find(item => item.ind == 1).flag"> -->
    <div class="eventProcedure" v-show="tabData.find(item => item.ind == 1)">
      <el-scrollbar style="height: 100%;">
        <ul class="eventProcedure_Ul">
          <li v-for="(item,index) in csData" :key="index">
            <div class="circle"></div>
            <div class="line" v-show="index!=csData.length-1"></div>
            <div class="visTime">{{item.createTime}}</div>
            <div class="visCentent">
              <!-- 2020-11-10 tanjinfeng 增加图片、文件预览 -->
              <!-- 原来的代码 -->
              <!-- <el-scrollbar style="height: 100%;">{{item.content}}</el-scrollbar> -->
              <!-- 修改的代码 -->
              <el-scrollbar style="height: 100%;">
                <div>{{item.content}}</div>
                <template v-if="item.annexs">
                  <div
                    v-for="(file, fileIndex) in item.annexs"
                    :key="`file_${fileIndex}`"
                    @click="$refs.FilePreviewDialog.init(file.url)"
                    style="cursor:pointer;font-size:12px;color:white;"
                  >
                    {{file.name}}
                  </div>
                </template>
              </el-scrollbar>
              <!-- 结束 -->
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>

    <!-- 新事件过程 -->
    <div class="eventProcess" v-show="tabData.find(item => item.ind == 3).flag">
      <!-- 参与人员 -->
      <div class="eventProcess_margin eventProcess_font">
        工单处置人员（共{{
          workSheetInfo.allContactorList
            ? workSheetInfo.allContactorList.length - manListLength
            : 0
        }}人）
        <span>
          主责部门：
          {{
            workSheetInfo.mailGroupName ? workSheetInfo.mailGroupName : ""
          }}</span
        >
        <!-- 负责人 -->
        <!-- <div> -->
        <!-- <span class="eventProcess_person">
            {{ workSheetInfo.chargeMan ? workSheetInfo.chargeMan.name : '' }}
            （{{
              workSheetInfo.allContactorList ?
              (workSheetInfo.allContactorList[0]
              ? workSheetInfo.allContactorList[0].mailGroupName
              : '') : ''
            }}
            {{
              workSheetInfo.chargeMan ? workSheetInfo.chargeMan.position : ''
            }}）
          </span> -->
        <!-- 参与人 -->
        <!-- <span
            v-for="(item, index) in workSheetInfo.allContactorList"
            :key="index"
          >
            <span
              v-if="item.type == 2"
            >
              {{ item.contactorIdString ? item.contactorIdString : '' }}
              （{{ item.mailGroupName ? item.mailGroupName : '' }}
              {{ item.position ? item.position : '' }}）
            </span>
          </span> -->
        <!-- </div> -->
        <div>
          <!-- 负责人 -->
          <span
            class="task-management-single-participants-list task-management-single-participants-list-block"
          >
            <el-tooltip placement="top">
              <div class="task-management-single-tooltip-tip" slot="content">
                <span>
                  {{
                    workSheetInfo.chargeMan ? workSheetInfo.chargeMan.name : ""
                  }}
                  （{{
                    workSheetInfo.allContactorList
                      ? workSheetInfo.allContactorList[0]
                        ? workSheetInfo.allContactorList[0].mailGroupName
                        : ""
                      : ""
                  }}
                  {{
                    workSheetInfo.chargeMan
                      ? workSheetInfo.chargeMan.position
                      : ""
                  }}）
                </span>
                <img
                  @click.stop="calling(workSheetInfo.allContactorList[0].contactorEntity)"
                  class="task-management-single-tooltip-icon-phone"
                  alt="电话icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                />
                <img
                  @click.stop="meeting(workSheetInfo.allContactorList[0].contactorEntity)"
                  class="task-management-single-tooltip-icon-meeting"
                  alt="会议icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                />
              </div>
              <div class="task-management-single-tooltip-item">
                {{
                  workSheetInfo.chargeMan ? workSheetInfo.chargeMan.name : ""
                }}
              </div>
            </el-tooltip>
          </span>
          <!-- 参与人 -->
          <span
            class="task-management-single-participants-list task-management-single-participants-list-block"
            v-for="(item, index) in workSheetInfo.allContactorList"
            :key="'item' + index"
          >
            <span v-if="item.type == 2">
              <el-tooltip placement="top">
                <div class="task-management-single-tooltip-tip" slot="content">
                  <span>
                    {{ item.contactorIdString ? item.contactorIdString : "" }}
                    （{{ item.mailGroupName ? item.mailGroupName : "" }}
                    {{ item.position ? item.position : "" }}）
                  </span>
                  <img
                    @click.stop="calling(item.contactorEntity)"
                    class="task-management-single-tooltip-icon-phone"
                    alt="电话icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                  />
                  <img
                    @click.stop="meeting(item.contactorEntity)"
                    class="task-management-single-tooltip-icon-meeting"
                    alt="会议icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                  />
                </div>
                <div class="task-management-single-tooltip-item">
                  {{ item.contactorIdString ? item.contactorIdString : "" }}
                </div>
              </el-tooltip>
            </span>
          </span>
        </div>
      </div>
      <!-- 抄送人员 -->
      <div class="eventProcess_margin eventProcess_font">
        <div>已抄送（共{{ manListLength }}人）</div>
        <!-- <span
          v-for="(item, index) in workSheetInfo.allContactorList"
          :key="index"
        >
          <span
            v-if="item.type == 3"
          >
            {{ item.contactorIdString ? item.contactorIdString : '' }}
            （{{ item.mailGroupName ? item.mailGroupName : '' }}
            {{ item.position ? item.position : '' }}）
          </span>
        </span> -->
        <div
          class="task-management-single-participants-list"
          v-for="(item, index) in workSheetInfo.allContactorList"
          :key="'item' + index"
        >
          <span v-if="item.type === '3'">
            <el-tooltip placement="top">
              <div class="task-management-single-tooltip-tip" slot="content">
                <span>
                  {{ item.contactorIdString ? item.contactorIdString : "" }}
                  （{{ item.mailGroupName ? item.mailGroupName : "" }}
                  {{ item.position ? item.position : "" }}）
                </span>
                <img
                  @click.stop="calling(item.contactorEntity)"
                  class="task-management-single-tooltip-icon-phone"
                  alt="电话icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                />
                <img
                  @click.stop="meeting(item.contactorEntity)"
                  class="task-management-single-tooltip-icon-meeting"
                  alt="会议icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                />
              </div>
              <div class="task-management-single-tooltip-item">
                {{ item.contactorIdString ? item.contactorIdString : "" }}
              </div>
            </el-tooltip>
          </span>
        </div>
      </div>
      <!-- 历史状态 -->
      <div>
        <div class="eventProcess_margin eventProcess_font">所有动态</div>
        <statusMoment
          ref="statusMoment"
          :handleResponseEntities="workSheetInfo.handleResponseEntities"
          :workId="viewWhich"
          @getSingleData="getWorkSheetInfo"
        />
      </div>
    </div>
    <FilePreviewDialog ref="FilePreviewDialog"/>
  </div>
</template>

<script>
import allUrl from "../../../../../assets/api/allApiUrl";
import plan from "./plan";
import FilePreviewDialog from './FilePreviewDialog'
import statusMoment from './statusMoment'
export default {
  name: "particulars",
  components: {
    plan,
    FilePreviewDialog,
    statusMoment
  },
  data() {
    return {
      tabData: [
        { name: "要情信息", flag: true, ind: 0 },
        { name: "应急预案", flag: false, ind: 2 },
        // { name: "事件过程", flag: false, ind: 1 },
        { name: "事件过程", flag: false, ind: 3 }
      ],
      csData: [],
      data: {},
      // 要情分类具体选择名称
      typeName: "",   
      workSheetInfo: {},
      // 人员列表长度
      manListLength: 0,
      viewWhich: '',
    };
  },
  methods: {
    /**
     * @method
     * @desc 点击按钮拨打电话
     * @param {object} man 需要拨打的人的对象
     */
    calling(man) {
        console.log("正在拨打【", man, "】的电话...");
        this.callPhone(man);
    },

    /**
     * @method
     * @desc 点击按钮邀请会议
     * @param {object} man 需要邀请的人的对象
     */
    meeting(man) {
        console.log("正在邀请【", man, "】参加会议...");
        this.createMeeting(man);
    },
    clickTab(item) {
      // console.log("当前事件", this.data);
      let data = this.tabData;
      data.forEach(ele => {
        ele.flag = false;
      });
      item.flag = true;
      if (item.ind == 1) {
        this.getProcessList();
      }
      if (item.ind == 2) {
        this.$refs.plan.getPlanList(this.data);
      }
      if (item.ind === 3) {
        // 获取工单列表
        this.getWorkSheetList();
      }
    },
    /**
     * @description: 获取工单详情
     * @param {Number} id 工单目标id
     */
    getWorkSheetInfo(id){
      let data = {
        url: '/work/workSheet/info/' + id,
        method: 'get',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      };
      this.apix(data)
        .then(res => {
          this.workSheetInfo = res.data;
          let count = 0;
          for (let item of this.workSheetInfo.allContactorList) {
            if (item.type == 3) {
              count++;
            }
          }
          this.manListLength = count;
        })
        .catch(err => {
          console.log(err);
        })
    },
    /**
     * @description: 获取工单列表
     */
    getWorkSheetList(){
      let data = {
        url: '/work/workSheet/list',
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        data: {
          endTime: '',
          groupIds: [-1],
          limit: 10,
          module: '',
          page: 1,
          property: '',
          search: '',
          startTime: '',
          status: '',
          type: '',
          targetId: this.data.id
        }
      };
      this.apix(data)
        .then(res => {
          // 获取工单详情
          this.getWorkSheetInfo(res.page.list[0].id);
          this.viewWhich = res.page.list[0].id;
        })
        .catch(err => {
          console.log(err);
        })
    },
    init(item) {
      this.data = item;
      this.clickTab(this.tabData.find(item => item.ind == 0));
      // 获取要情分类，先判断类型：1为普通事件，2为突发事件
      this.apix(`${window.SITE_CONFIG.baseUrl}/sys/sysdictionary/getSysDictionaryListByCode2tree?code=${
        this.emergencyType === 1 ? "emergencyType" : "tufa_type"
      }`)
        .then(response => {
          if (response.code === 0) {
            // 递归结果
            const emergencyClassificationList = []
            
            /**
             * @IIFE
             * @description 递归找到所有id-name对
             * @param { Array } parent
             */
            const findAllChildren = parent => {
              parent.forEach(item => {
                emergencyClassificationList.push({
                  typeId: item.id,
                  name: item.name
                })

                if (item.children) {
                  findAllChildren(item.children)
                }
              })
            }
            
            findAllChildren(response.data)
            console.log('get emergencyClassificationList result:', emergencyClassificationList)
            // 获取typeId对应的要情分类名称
            this.typeName = emergencyClassificationList.find(
              (v) => v.typeId === this.data.typeId
            ).name;
            console.log("this.typeName", this.typeName) 
          }
      })
    },   
    getProcessList() {
      let data = {
        ...allUrl.processList,
        params: {
          emergencyInfoId: this.data.id
        }
      };
      this.apix(data)
        .then(res => {
          this.csData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
h3,
ul,
li {
  padding: 0;
  margin: 0;
}
ul,
li {
  list-style: none;
}
.particulars_wrap_dl {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.particulars_tab {
  display: flex;
  justify-content: space-between;
  height: 42px;
  padding: 0;
}
.particulars_tab > li {
  flex: 1;
  text-align: center;
  line-height: 42px;
  color: #00aac3;
  list-style: none;
  font-size: 20px;
  border: 1px solid #1d5abf;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.particulars_tab > .liActive {
  background: url("../../../../../assets/images/cszh/tbgr.png") no-repeat;
  background-size: 100% 100%;
  border-color: rgba(59, 172, 198, 1);
  color: #00f2ff;
}
.particulars_title {
  width: 160px;
  height: 17px;
  line-height: 17px;
  margin: auto;
  text-align: center;
  margin-top: 17px;
  margin-bottom: 40px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background: url("../../../../../assets/images/cszh/cs1.png") no-repeat;
  background-size: 100% 100%;
}
.readOnly_wrap {
  width: 100%;
  flex: 1;
  min-height: 584px;
  max-height: 584px;
  padding: 0 30px;
  box-sizing: border-box;
}
.readOnly_left {
  width: 42%;
  float: left;
  list-style: none;
}
.readOnly_right > li,
.readOnly_left > li {
  display: flex;
  margin-bottom: 60px;
}
.readOnly_left > li:nth-child(4) {
  padding-top: 23px;
}
.readOnly_right > li > span,
.readOnly_left > li > span,
.readOnly_right > li > .typeAll > span {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(196, 214, 238, 1);
}
.readOnly_right > li > span:first-child,
.readOnly_left > li > span:first-child {
  text-align: right;
  width: 33%;
}
.readOnly_right > li > span:last-child,
.readOnly_left > li > span:last-child {
  flex: 1;
  padding-left: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.readOnly_right {
  width: 58%;
  float: right;
  list-style: none;
}
.typeAll {
  display: flex;
  flex-direction: column;
}
.nameOfType {
  margin-top: 5px;
  text-align: center;
}
.readOnly_bottom_place {
  display: flex;
  width: 100%;
  margin-bottom: 60px;
  white-space: nowrap;
}
.readOnly_bottom_place > span:first-child {
  flex: left;
}
.readOnly_bottom_place > span:last-child {
  flex: right;
}
.readOnly_bottom {
  width: 100%;
}
.selectOptions {
  display: flex;
}
.selectOptions > li:last-child {
  margin: 0;
}
.selectOptions > li {
  display: flex;
  font-size: 14px;
  font-weight: 400;
  color: rgba(196, 214, 238, 1);
  list-style: none;
  margin-right: 9px;
}
.selectOptions > li > span {
  display: block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(73, 149, 225, 1);
  border-radius: 50%;
  margin-right: 5px;
  position: relative;
}
.selectOptionActive:before {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(63, 146, 254, 1);
  border-radius: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.readOnly_bottom_place, .readOnly_bottom > span {
  font-size: 14px;
  font-weight: 400;
  color: rgba(196, 214, 238, 1);
}
.readOnly_bottom > div {
  width: 494px;
  height: 125px;
  border: 1px solid rgba(63, 146, 254, 1);
  border-radius: 3px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(196, 214, 238, 1);
  margin-left: 22px;
  margin-top: 11px;
  padding: 15px 20px;
  box-sizing: border-box;
}
.readOnly_bottom /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

.eventProcedure {
  flex: 1;
  padding: 25px 40px;
  box-sizing: border-box;
  min-height: 658px;
  max-height: 658px;
  height: 658px;
}
.eventProcedure /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.eventProcedure /deep/ .el-scrollbar__bar.is-horizontal > div {
  display: none;
}
.eventProcedure_Ul > li {
  position: relative;
  margin-bottom: 20px;
}
.eventProcess{
  color: rgba(196, 214, 238, 1);
  font-size: 14px;
  font-weight: 400;
  height: 658px;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}
.eventProcess_margin{
  margin-bottom: 20px;
}
.eventProcess_font{
  font-size: 16px;
}
.task-management-single-participants-list {
  margin-left: 19px;
  margin-top: 9px;
}
.task-management-single-participants-list-block {
  display: inline-block;
}
.task-management-single-tooltip-item {
  margin-right: 10px;
  width: 74px;
  height: 24px;
  display: inline-block;
  line-height: 24px;
  text-align: center;
  background-size: 100% 100%;
  background-image: url("data:image/png;base64,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");
}
.task-management-single-tooltip-item:hover {
  background-size: 100% 100%;
  background-image: url("data:image/png;base64,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");
}
.task-management-single-tooltip-tip {
  font-size: 14px;
  min-width: 150px;
  text-align: center;
  width: auto;
  height: 20px;
  white-space: nowrap;
}
.task-management-single-tooltip-tip > span {
  position: relative;
  left: 0px;
  top: -18px;
}
.task-management-single-tooltip-tip > img {
  cursor: pointer;
  position: relative;
  top: -8px;
}
/* .eventProcess_main{
  border: 1px solid rgba(196, 214, 238, 1);
  padding: 6px 2px;
  display: inline-block;
  margin-top: 10px;
  position: relative;
} */
/* .eventProcess_main::after{
  content: '主责人';
  display: inline-block;
  width: 50px;
  top: -14px;
  right: 0;
  position: absolute;
  color: #fff;
} */
.circle {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(73, 149, 225, 1);
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}
.line {
  width: 2px;
  height: 250px;
  background: rgba(62, 128, 197, 1);
  position: absolute;
  top: 16px;
  left: 8px;
}
.visTime {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 242, 255, 1);
  border: 2px solid rgba(73, 149, 225, 1);
  border-radius: 8px;
  padding: 2px 8px;
  width: 165px;
  margin-left: 40px;
}
.visCentent {
  background: url("../../../../../assets/images/cszh/bor.png") no-repeat;
  background-size: 100% 100%;
  width: 80%;
  height: 186px;
  padding: 5px 20px;
  color: #00f2ff;
  margin-left: 59px;
  margin-top: 20px;
}
</style>
