<template>
  <div class="fhmb">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="1062px"
      :visible.sync="visible"
      title="防护目标"
    >
      <el-form :model="dataForm" ref="dataForm" label-width="125px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="dataForm.name" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="防护目标类型" prop="protectType">
              <el-input
                v-model="dataForm.protectTypeParentName"
                v-popover:eventTypeListPopover
                placeholder="选择分组"
                :readonly="true"
                style="width:71%;"
              ></el-input>

              <el-input
                v-show="false"
                v-model="dataForm.protectType"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="地址">
          <el-input
            v-model="dataForm.location"
            style="width: 90%"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <!--<el-row>
          <el-col :span="12">
            <el-form-item label="经度">
              <el-input style="width:100%;" readonly v-model="dataForm.longitude"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度">
              <el-input style="width:100%;" readonly v-model="dataForm.latitude"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->

        <el-row>
          <el-col :span="8">
            <el-form-item label="等级">
              <!-- <el-input v-model="dataForm.level" placeholder="级别  1:国家级2:省级3:市级 4:县级 5:乡镇级 5:其他"></el-input> -->
              <el-select
                v-model="dataForm.level"
                placeholder="请选择"
                style="width:100%;"
                :disabled="true"
              >
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面积(m²)">
              <el-input-number
                v-model="dataForm.areaSize"
                controls-position="right"
                style="width:100%;"
                :min="0"
                :disabled="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前人数">
              <el-input-number
                v-model="dataForm.nowNumber"
                controls-position="right"
                style="width:100%;"
                :min="0"
                :disabled="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="可容纳人数">
              <el-input-number
                v-model="dataForm.canuseNumber"
                controls-position="right"
                style="width:100%;"
                :min="0"
                :disabled="true"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="防护等级">
              <el-select
                v-model="dataForm.protectLevel"
                placeholder="请选择"
                style="width:100%;"
                :disabled="true"
              >
                <el-option
                  v-for="item in natureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立时间">
              <el-date-picker
                unlink-panels
                v-model="dataForm.useTime"
                type="date"
                style="width:100%;"
                value-format="yyyy-MM-dd HH:mm:ss"
                :readonly="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-form-item label="风险缘由">
          <el-dialog title="选择防护目标类型" :visible.sync="riskReasonVisible" width="30%" append-to-body>
            <el-tree
              :data="riskReasonList"
              :props="eventTypeListTreeProps"
              node-key="id"
              ref="riskReasonTree"
              @current-change="riskReasonListTreeCurrentChangeHandle"
              :default-expand-all="true"
              :auto-expand-parent="true"
              :highlight-current="true"
              :expand-on-click-node="false"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="riskReasonVisible = false">取 消</el-button>
              <el-button type="primary" @click="riskReasonVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-input
            v-popover:eventTypeListPopover
            placeholder="选择分组"
            :readonly="true"
            style="width:88%"
            v-model="dataForm.riskReasonParentName"
          ></el-input>
          <el-button class="button" @click="riskReasonGettingFocus">选择</el-button>
          <el-button class="button" @click="dataForm.riskReasonParentName=''">清除</el-button>
          <el-input v-show="false" v-model="dataForm.riskReason" :readonly="true"></el-input>
        </el-form-item>-->

        <el-row>
          <el-col :span="12">
            <el-form-item label="行政区划">
              <el-input
                v-model="dataForm.areaParentName"
                v-popover:eventTypeListPopover
                placeholder="选择分组"
                :readonly="true"
                style="width:71%"
              ></el-input>

              <el-input
                v-show="false"
                v-model="dataForm.area"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主体单位">
              <el-input v-model="dataForm.chargeUnit" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-row>
          <el-col :span="12">
            <el-form-item label="受灾形式">
              <el-input v-model="dataForm.layout"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监测方式">
              <el-input v-model="dataForm.monitorWay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->

        <!--<el-row>
          <el-col :span="12">
            <el-form-item label="数据来源单位">
              <el-input v-model="dataForm.dataSourceUnit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="防护区域">
              <el-input v-model="dataForm.defenseArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->

        <!--<el-form-item label="周边交通状况">
          <el-input :rows="2" v-model="dataForm.trafficConditions"></el-input>
        </el-form-item>-->

        <!--<el-form-item label="基本情况">
          <el-input  :rows="2" v-model="dataForm.generalSituation"></el-input>
        </el-form-item>-->

        <el-form-item label="防护措施">
          <el-input
            :rows="2"
            v-model="dataForm.conservatoryMeasure"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="应急通讯方式">
          <el-input
            type="textarea"
            :rows="1"
            v-model="dataForm.communicationMode"
            resize="none"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            v-model="dataForm.remark"
            resize="none"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <smsDialog ref="smsDialog"></smsDialog>
        <el-form-item label="联系人">
          <div class="allCheckContact">
            <ul class="checkContact">
              <li
                class="oneContact"
                v-for="item in dataForm.contactsId"
                :key="item.id"
              >
                <!-- {{ item.name }}&nbsp;&nbsp;&nbsp;&nbsp; -->
                <div>{{item.name}}</div>
                <div>
                  <el-tooltip class="item" effect="dark" content="发短信" placement="top">
                    <img
                      @click="sendSms(item)"
                      style="cursor: pointer;"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAD20lEQVRYhaWXXYhNURTH//tjLve6ykf5fOBNIYmUF0lR8nolz/LiI96MTNPkO6Z5oCghhfJ08y2ZFA9TeFESkUdFSh5mblfu2XvrnHvOad1117kzw6rd+djr7P3ba6299jqq/jWCIIq8UqybP09FAtMJ7JqLFSZT7F569y8wQWiKw1EgDqDZlcNNB4g3nzYKk8BlQByENsP6wKC42aW+DCgDcameJ+87LMRhDGlWsFIRTBEUBXLpeFGq54h+4C7LYGza+tKrKXAXnYyC6AI9l7ZWqkt3VAJmBetkIHErpVdD+iUXcOtotgCq22Lvsz4xhgwBmnG3pJffLqkBKGzp4Z6pSgz5dWWEsyeb7imD0RkUBdLMZX23S+okFDbN8njg2tZKxAMhKITkykAVoDSgVGhbIb6P9TTgfmus+WBxGcAK4j5DLATLgpVDLYyVbjbcecH8Lo0Bx2JIk7jT5Du/b5bZ+0NjD9kwXZuFBh/f6mZmwMe4o1Y1N95ZNZ/FEs9NUsvH3F01ZxKYgM9sHArdlVc6BvmjUAUwAYV5x8v6Xn/F7BICtkiS/lNls60227xoKWxAwGu0x5TSSHJPLdSl4IFF8cf1cbdzjsejLwb7a1Vz5Y1VcycL5C9GVXZWzfBbi0EEvK2Pu+2rHJ4DWMKMAMllRTkm3qKV2P/XG254cxSOQGHFubJ+cKxsdrAclO+aobLZ2l/Ro0Fh45oIJ+oT7lD8/rvGMpKVxV3LExgHyiQJ4ENNP3ax4beUPB5/shisVc21JyW9IJvkYUkvqlXN1fcWp3XA6GDTbxtqusdp8EfpAsHOsQ7hpz1Y9g0EKHle6kPrTsMNnSubJ28sLl2foZ69NuZwC7CfLEZi5XURDg403ViPo4aPn0svIJqB6dZOVtffdGPftFp/sKJH3ltcSL98erXhjs4LeV7pAHJsDAmKAgU+qfBM7/1iH6L6hDtwrGy29gGt4033Mu2b7DDmIPm9ZQqBlQTUQpJeonum6UYLJuwACt3f8pqoy2W8ZimyGC+yaBan0rG1fbHL8nEtm4CWCfFzH7EQN7EUA3RCxWEtME7OLhGKu8x3WEi1+4fLZi1beazgfbdFctFCJv+lsJoskLstByqs6OZ73PqpMfDK4kbRxNOUCAH3yUnfBRT/BtFKkVaLWV0kVYvUNZL0qi6zijEi1UIG53gMKWFHTbV8zaTo4KVeiAS3eeoyRZSlFRX9AhUBQdh5PCzoVcxD1AVZcstgpd+f6QjfTY7AdfTxTA3iuuydVLdMFwYClHh8UAvx31qeaf8XSILiwF1nGYfjk/+Py3pBtgXAX7tr7Hp4jZJhAAAAAElFTkSuQmCC"
                      alt
                    />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="电话" placement="top">
                    <img
                      @click.stop="callPhone(item)"
                      style="cursor: pointer;"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="
                      alt
                    />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="会议" placement="top">
                    <img
                      @click="createMeeting(item)"
                      style="cursor: pointer;"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg=="
                      alt
                    />
                  </el-tooltip>
                </div>
              </li>
            </ul>
          </div>
        </el-form-item>

        <!--<el-form-item label="负责人">
          <div class="allCheckContact">
            <ul class="checkContact">
              <li class="oneContact" v-for="item in dataForm.chargeId" :key="item.id">
                {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <i class="el-icon-close" @click="delIt('charge',item.id)"></i>
              </li>
            </ul>
            <div class="operation" @click="addContactHandle('负责人')">
              <input type="”button”" class="addContact" />
              <i class="el-icon-plus"></i>
            </div>
          </div>
          &lt;!&ndash; 添加负责人 &ndash;&gt;
          <add-contact ref="AddContactView"></add-contact>
        </el-form-item>-->

        <el-form-item label="附件">
          <!--<el-upload
            class="upload-demo"
            :action="this.$http.adornUrl(`/upload/incidentDocument`)"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
          >
          </el-upload>-->
          <div
            v-for="(item, index) in fileList"
            :key="index"
            style="display: inline-block;box-sizing:border-box;width:99%;margin-right: 5px;margin-bottom: 5px;position:relative;"
          >
            <div class="fileList__show">
              <div class="fileList__name">
                <i class="el-icon-document"></i
                ><span
                  style="margin-left: 5px;cursor: pointer"
                  @click="downloadDocument(item)"
                  :title="tip"
                  >{{ item.name }}</span
                >
              </div>
              <div
                class="fileList__button"
                style="height:100%;display:flex;align-items:center"
              >
                <el-button
                  type="success"
                  size="mini"
                  style="height: 80%;line-height:80%;"
                  @click="previewDocument(item)"
                  >预览</el-button
                >

                <i
                  class="el-icon-success"
                  style="color:#67c23a;margin-left:15px;margin-right: 5px"
                ></i>
              </div>
            </div>

            <!--<viewer
                          v-if="item.type == 0"
                          :images="[item.temporaryUrl]"
                        >
                          <img
                            :src="item.temporaryUrl"
                            style="width:100%;height:100px;"
                          />
                        </viewer>-->
          </div>
        </el-form-item>
      </el-form>
      <el-dialog
        title="查看附件"
        :visible.sync="dialogDocumentVisible"
        :destroy-on-close="true"
        style="text-align:center;"
      >
        <img v-if="getDocumentType" :src="documentUrl" />
        <preplan-document v-else :document="document"></preplan-document>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import PreplanDocument from "@/view/common/PreplanDocument";
import smsDialog from './smsDialog';
export default {
  components: {
    PreplanDocument,
    smsDialog
  },
  data() {
    return {
      natureOptions: [
        {
          value: "1",
          label: "特别重要防护"
        },
        {
          value: "2",
          label: "重要防护"
        },
        {
          value: "3",
          label: "较高防护"
        },
        {
          value: "4",
          label: "一般防护"
        }
      ],
      levelOptions: [
        {
          value: "1",
          label: "国家级"
        },
        {
          value: "2",
          label: "省级"
        },
        {
          value: "3",
          label: "市级"
        },
        {
          value: "4",
          label: "县级"
        },
        {
          value: "5",
          label: "乡镇级"
        },
        {
          value: "6",
          label: "其他"
        }
      ],
      secretLevelOptions: [
        {
          value: "1",
          label: "机密"
        },
        {
          value: "2",
          label: "秘密"
        },
        {
          value: "3",
          label: "限制"
        },
        {
          value: "4",
          label: "公开"
        },
        {
          value: "5",
          label: "其他"
        }
      ],

      visible: false,
      dataForm: {
        id: 0,
        name: "",
        protectType: "",
        protectTypeName: "",
        groupId: "",
        location: "",
        longitude: "",
        latitude: "",
        level: "",
        protectLevel: "",
        area: "",
        areaParentName: "",
        areaSize: "",
        riskReason: "",
        riskReasonParentName: "",
        chargeUnit: "",
        nowNumber: "",
        useTime: "",
        canuseNumber: "",
        layout: "",
        monitorWay: "",
        dataSourceUnit: "",
        defenseArea: "",
        trafficConditions: "",
        generalSituation: "",
        conservatoryMeasure: "",
        communicationMode: "",
        remark: "",
        contactsId: [],
        chargeId: []
      },

      fileList: [], // 上传文件

      dialogDocumentVisible: false, // 预览文件弹窗
      documentUrl: "", // 预览文件路径
      document: {},
      tip: ""
    };
  },
  computed: {
    getDocumentType() {
      if (
        [
          "png",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "webp",
          "psd",
          "svg",
          "tiff"
        ].indexOf(
          this.documentUrl
            .substr(this.documentUrl.lastIndexOf(".") + 1)
            .toLowerCase()
        ) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    // // 获取已选联系人
    // bus.$off("getCheckContact");
    // bus.$on("getCheckContact", val => {
    //   // console.log(val);
    //   this.dataForm.contactsId = val;
    // });
    // // 获取已选负责人
    // bus.$off("getCheckCharge");
    // bus.$on("getCheckCharge", val => {
    //   // console.log(val);
    //   this.dataForm.chargeId = val;
    // });
  },
  methods: {
    init(data) {
      this.dataForm.name = data.ResoureProtectTargetEntity.name;
      this.dataForm.protectType = data.ResoureProtectTargetEntity.protectType;
      this.dataForm.protectTypeParentName =
        data.ResoureProtectTargetEntity.protectTypeParentName;
      this.dataForm.groupId = data.ResoureProtectTargetEntity.groupId;
      this.dataForm.location = data.ResoureProtectTargetEntity.location;
      this.dataForm.longitude = data.ResoureProtectTargetEntity.longitude;
      this.dataForm.latitude = data.ResoureProtectTargetEntity.latitude;
      this.dataForm.level = data.ResoureProtectTargetEntity.level;
      this.dataForm.protectLevel = data.ResoureProtectTargetEntity.protectLevel;
      this.dataForm.area = data.ResoureProtectTargetEntity.area;
      this.dataForm.areaParentName = data.ResoureProtectTargetEntity.areaName;
      this.dataForm.areaSize = data.ResoureProtectTargetEntity.areaSize;
      this.dataForm.riskReason = data.ResoureProtectTargetEntity.riskReason;
      this.dataForm.riskReasonParentName =
        data.ResoureProtectTargetEntity.riskReasonParentName;
      this.dataForm.chargeUnit = data.ResoureProtectTargetEntity.chargeUnit;
      this.dataForm.nowNumber = data.ResoureProtectTargetEntity.nowNumber;
      this.dataForm.useTime = data.ResoureProtectTargetEntity.useTime;
      this.dataForm.canuseNumber = data.ResoureProtectTargetEntity.canuseNumber;
      this.dataForm.layout = data.ResoureProtectTargetEntity.layout;
      this.dataForm.monitorWay = data.ResoureProtectTargetEntity.monitorWay;
      this.dataForm.dataSourceUnit =
        data.ResoureProtectTargetEntity.dataSourceUnit;
      this.dataForm.defenseArea = data.ResoureProtectTargetEntity.defenseArea;
      this.dataForm.trafficConditions =
        data.ResoureProtectTargetEntity.trafficConditions;
      this.dataForm.generalSituation =
        data.ResoureProtectTargetEntity.generalSituation;
      this.dataForm.conservatoryMeasure =
        data.ResoureProtectTargetEntity.conservatoryMeasure;
      this.dataForm.communicationMode =
        data.ResoureProtectTargetEntity.communicationMode;
      this.dataForm.remark = data.ResoureProtectTargetEntity.remark;
      this.dataForm.contactsId = data.ResoureProtectTargetEntity.contactsList;
      this.dataForm.chargeId = data.ResoureProtectTargetEntity.responsiblesList;
      this.fileList = data.ResoureProtectTargetEntity.documentList;

      this.visible = true;
    },

    // 预览文件
    previewDocument(file) {
      console.log("aaaaaaaaaaaaaaaaaaaaa", file);

      var index = file.name.lastIndexOf(".");
      var ext = file.name.substr(index + 1);
      if (
        [
          "png",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "webp",
          "psd",
          "svg",
          "tiff"
        ].indexOf(ext.toLowerCase()) !== -1
      ) {
        // console.log('该文件是图片')
        this.dialogDocumentVisible = false;
        this.documentUrl =
          this.$window.SITE_CONFIG["cloudUrl"] + "/" + file.url;
        this.document = file;
        console.log("文件路径1", this.documentUrl);
        return true;
      } else {
        this.dialogDocumentVisible = true;
        this.documentUrl = this.$window.SITE_CONFIG["cloudUrl"] + file.url;
        this.document = file;
        console.log("文件路径2", this.documentUrl);
        return false;
      }
    },

    // 下载文件
    downloadDocument(file) {
      console.log("asfff", file);

      var index = file.name.lastIndexOf(".");
      var ext = file.name.substr(index + 1);
      if (
        [
          "png",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "webp",
          "psd",
          "svg",
          "tiff"
        ].indexOf(ext.toLowerCase()) !== -1
      ) {
        // console.log('该文件是图片')
        this.documentUrl =
          this.$window.SITE_CONFIG["cloudUrl"] + "/" + file.url;
        console.log("文件路径1", this.documentUrl);
        return true;
      } else {
        this.documentUrl = this.$window.SITE_CONFIG["cloudUrl"] + file.url;
        this.tip = "点击下载";
        console.log("文件路径2", this.documentUrl);
        window.open(this.documentUrl, "_blank");
        return false;
      }
    },
    sendSms(data) {
      let self = this
      this.$nextTick(_ => {
        self.$refs.smsDialog.init(data)
      })
    }
  }
};
</script>
<style scoped lang="scss">
button {
  background-color: #00a9f2;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 10px 5px;
}
.addContact {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  outline: none;
}
/deep/ .el-message-box .el-message-box__btns .el-button--primary {
  background-color: #00a9f2;
}
/deep/ .el-button--primary:focus,
.el-button:hover {
  background-color: #00a9f2;
  border: none;
  color: white;
}
.allCheckContact {
  display: flex;
  flex-wrap: wrap;
}
.checkContact {
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-right: 5px;
}
.oneContact {
  color: #00a9f2;
  border: 1px solid #00a9f2;
  padding: 0 5px;
  border-radius: 3px;
  display: flex;
}
.operation {
  width: 30px;
  height: 30px;
  position: relative;
}
.addContact {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  outline: none;
  border: none;
  background-color: #00a9f2;
}
.el-icon-plus {
  position: absolute;
  top: 40%;
  left: 30%;
  color: white;
}


.fhmb {
  /deep/ .el-dialog {
    background: rgba(10, 29, 81, .8);
    border: 1px solid #3B75DE;
    padding: 0;
    color: white;
    &__header {
      background: linear-gradient(to right, #3B75DE, transparent, #3B75DE);
      padding: 10px 20px;
      &btn {
        background: no-repeat center/100% 100% url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAgACADAREAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAQoLBQYJ/8QAIRAAAgIDAQADAQEBAAAAAAAABQYDBAIHCAEJChUWESX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5C/Xx+vkR+UskU6L6LKM6Bxnr9oxXcIl7GrRat/NVGpclOqSkektyWVJeUrUgD1tbcgJH9PwjZV1ezVO1S5dZCl5zXwZxnx8tiVfmnmjT2oqQYfWGwFFhJD4t9+CrF5FhOwPd+vddGcjL557naKMR4mSuTZyTWrUssmeeQDpbgrjLsNaLq3S3NGntuUjQ6yMnLMyUH/sR8FqL2LOdefB9ek6rBGLz3zOoVXT4wlTmwjnq2opY8M/Ame/YM+voZ+LM0P6H53IMT/xS/sUS/hmwS177loVyv18JBaa5FI5IZWdZZ5YCkqY6RiqmVXOr/Jtf/b/ABDbiFMLgvmpa484y5o5pVhA8NS1Hp5KWSsA2tHVgIOH49cg+MM+EXnnkpFndbp9iK2pPc5rhInatTySSy55+grDvzc3d/14vkHfehNvu22ev/iL7a3EZZXQqdKE3Bw5lfXcxHey8g9uQ2fF4mrQT2BimDG2RqdtdDFwh/IBDsujsg4bNzR1B8g/z6/IWjb554fducZfEZxjtoWboGgRMuoNXW7UqFJLky+ehqRQVHCq4VoK4txSC05RH1iiFZK5OA09nIsLwM8d6c0LfYnGfS3M7SKoF6W3tPuiwKiIV47MI9w9ETkERhgxk8/yIgsOtIAwjLOHuEtUgMrWIs8JI8cvAHBPSy32JxjzP0urlqBelt3TyUzFZR1iOzCPcfyK458Xp84/ffIyCw60T68TrZ+YS1SIyzXmwwkjyx8BWnfvLHyE/YH+Q121R06gbe4w+JPi/bZkBGmsAw0mtnT7OrEcB3p0XnanioOdxxrQWyC7sQPXKourUAxjVWbZ1yOkCRwM/wA86A78+v537r/n7RaNtvsv4h+ztvDV1YBAhhNwdeS3ZyKzQzXiEtaSaJaqrME2JlsZisQxJ2Uki7ZS1MDewdqSAGd+9ellvjzjLpfpZpLjw1LUennVmFTkrMVWAg4/kWByGvQZy+/5KRZ3a8AXRVXDzOa4SJ1a0EcksuGGQTPfr5/YKM/FkaI88dDjmJ/4q2CxyMMuK/FAQctDOV+tnCUck0XJjBIzrLPLAKidEuUpVzq5U/6tT/7f7YRxCmHzV3rxl2GtiGnmnpfT23KRkfWJQCll1D/2I+C1F5LhAwoZCxRdVgjH577haFMQAWSqTYSQ2asUuGeHgDpfvbjLjtbKtHS/S+ntRUxFCwRlEszoI/sSENaP2TOBfQx9i86sxCTzzzCsMXgBMhalywir1pJM8cfQmhfYN+wYS+U0oK5351FtWvuM9fM+bDn6xZ1KTTv1rpVakQJvbgMNOSypgFKxIewUlLxgJYkfCMDQz16p2sJELIf/2Q==');
        top: 12px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        display: block;
        font-size: 0;
      }
    }
    &__title {
      color: #0EF3FE;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0 0 5px #0EF3FE;
    }
    &__body {
      padding-left: 0;
    }
  }

  /deep/ .el-form-item__label {
    color: #B0E4FF;
    font-size: 14px;
  }

  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    background: transparent;
    border: 1px solid #4390FB;
    color: #9598A1;
    font-size: 14px;
  }

  /deep/ .el-input-number__decrease,
  /deep/ .el-input-number__increase {
    display: none;
  }
}

</style>
