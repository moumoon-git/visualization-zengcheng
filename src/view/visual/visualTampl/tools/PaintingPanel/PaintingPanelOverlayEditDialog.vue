<!--
  @author tanjinfeng
  @date 2020-12-01
  @description 新建/编辑覆盖物设置弹窗
-->
<template>
  <div
    class="painting-panel-overlay-edit-dialog"
    v-if="visible"
  >
    <!-- 遮罩层 -->
    <div
      class="painting-panel-overlay-edit-dialog__modal"
      @click="visible = false"
    ></div>
    <!-- 弹窗主体 -->
    <div class="painting-panel-overlay-edit-dialog__main">
      <!-- 关闭按钮 -->
      <div
        class="painting-panel-overlay-edit-dialog__main__close-button el-icon-close"
        @click="visible = false"
      ></div>
      <el-radio-group v-model="baseType" class="coveringClass" v-if="type != 'polyline'">
        <el-radio-button :label="0">覆盖物信息</el-radio-button>
        <el-radio-button :label="1">网格信息</el-radio-button>
      </el-radio-group>

      <div v-if="!baseType">
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">覆盖物名称：</label>
            <el-input
            :clearable="true"
            v-model="text"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">覆盖物说明：</label>
            <el-input
            :clearable="true"
            :rows="3"
            resize="none"
            type="textarea"
            v-model="title"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">边线粗度：</label>
            <el-slider
            :min="0"
            :max="20"
            :step="1"
            v-model.number="weight"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">边线颜色：</label>
            <el-color-picker
            popper-class="color-picker"
            size="small"
            v-model="lineColor"
            />
        </div>
        <template v-if="type !== 'polyline' && type !== 'AMap.Polyline'">
            <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">填充颜色：</label>
            <el-color-picker
                popper-class="color-picker"
                size="small"
                v-model="color"
            />
            </div>
            <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">填充透明度：</label>
            <el-slider
                :min="0"
                :max="1"
                :step="0.01"
                :format-tooltip="formatTooltipPercentage"
                v-model.number="opacity"
            />
            </div>
        </template>
      </div>
      <div v-if="baseType && type != 'polyline'">
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">网格名称：</label>
            <el-input
            :clearable="true"
            v-model="gridName"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">网格面积：</label>
            <el-input
            placeholder="绘制后系统测量结果"
            readonly
            v-model="gridArea"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">负责人：</label>
            <div class="task-management-add-participant-container">
                <el-row class="personCharge">
                    <el-col :span="19" class="person">
                        <div
                            class="task-management-add-participant-item"
                            v-for="(man, index) in participantName"
                            :key="index"
                        >
                            {{man.name}}
                            {{man.groupName}}
                            {{man.position}}
                            <div class="task-management-add-participant-item-delete el-icon-circle-close" @click="deleteParticipant(man.id)"></div>
                        </div>
                    </el-col>
                    <el-col :span="5" class="choose">
                        <el-button @click="participantsDialogShow">选择</el-button>
                    </el-col>
                </el-row>
                
            </div>
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">网格编号：</label>
            <el-input
            :clearable="true"
            v-model="gridNumber"
            />
        </div>

        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">辖区范围：</label>
            <el-input
            :clearable="true"
            :rows="3"
            resize="none"
            type="textarea"
            v-model="jurisdictionalScope"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">基本情况：</label>
            <el-input
            :clearable="true"
            :rows="3"
            resize="none"
            type="textarea"
            v-model="basicInformation"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">工作职责：</label>
            <el-input
            :clearable="true"
            :rows="3"
            resize="none"
            type="textarea"
            v-model="operatingDuty"
            />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
            <label class="painting-panel-overlay-edit-dialog__main__item__label">备注：</label>
            <el-input
            :clearable="true"
            :rows="3"
            resize="none"
            type="textarea"
            v-model="remark"
            />
        </div>
      </div>
      
      <!-- 确定按钮 -->
      <button
        class="painting-panel-overlay-edit-dialog__main__confirm"
        @click="confirm"
      >确定</button>
    </div>

    <!-- 参与人弹窗 -->
    <linkman-draggable ref="participantsDialog" v-if="showParticipantsDialog" @OnchildByValue="handelLinkdata"></linkman-draggable>
  </div>
</template>

<script>
import LinkmanDraggable from "@/view/visual/visualTampl/tools/revealFile/taskManagement/add/LinkmanDraggable"
export default {
  name: 'PaintingPanelOverlayEditDialog',
  components: {
        LinkmanDraggable
  },
  data() {
    return {
      // 弹窗是否可见
      visible: false,
      // 覆盖物名称
      text: '',
      // 覆盖物说明
      title: '',
      // 覆盖物类型
      type: '',
      // 填充颜色
      color: '#0091ff',
      // 边线粗细程度
      weight: 2,
      // 填充透明度
      opacity: 0.35,
      // 是否编辑状态
      isEdit: false,
      // 边线颜色
      lineColor: '#0091ff',
      // 新增信息tab切换   
      baseType: 0,
      // 网格名称  
      gridName:"",
      // 网格面积  
      gridArea:"",
      // 网格编号  
      gridNumber:"",
      // 辖区范围  
      jurisdictionalScope:"",
      // 基本情况  
      basicInformation:"",
      // 工作职责  
      operatingDuty:"",
      // 备注  
      remark:"",
      /**
         * @var {array}
         * @desc 前端显示的参与人列表
      */
      participantName: [],
      /**
         * @var {boolen}
         * @desc 参与人弹窗显示判断
      */
      showParticipantsDialog: false,
    }
  },

  methods: {
    /**
     * @description 滑块提示语
     * @param { Number } value 透明度取值（0-1）
     * @return { String } 百分比
     */
    formatTooltipPercentage(value) {
      return `${ parseInt(value * 100, 10) }%`
    },

    /**
     * @description 打开弹窗，初始化数据
     * @param { String } type 新建覆盖物的类型
     */
    open(type) {
      this.isEdit = false
      this.text = ''
      this.title = ''
      this.color = '#0091ff',
      this.lineColor = '#0091ff',
      this.weight = 2,
      this.opacity = 0.35
      this.type = type
      this.baseType = 0
      this.visible = true
      this.gridName = ''
      this.gridArea = ''
      this.gridNumber = ''
      this.jurisdictionalScope = ''
      this.basicInformation = ''
      this.operatingDuty = ''
      this.remark = ''
      this.participantName = [];
    },

    /**
     * @description 打开编辑弹窗
     * @param { String } text 覆盖物名称
     * @param { String } title 覆盖物说明
     * @param { String } color 覆盖物颜色
     * @param { Number } weight 边框粗度
     * @param { Number } opacity 填充透明度
     * @param { String } type 覆盖物类型
     */
    edit(
      text,
      title,
      color,
      weight,
      opacity,
      type,
      lineColor,
      gridName,
      gridArea,
      gridNumber,
      jurisdictionalScope,
      basicInformation,
      operatingDuty,
      remark,
      personCharge,
    ) {
      this.isEdit = true
      this.text = text
      this.title = title
      this.color = color
      this.weight = weight
      this.opacity = opacity
      this.type = type
      this.lineColor = lineColor
      this.gridName = gridName
      this.gridArea = gridArea
      this.gridNumber = gridNumber
      this.jurisdictionalScope = jurisdictionalScope
      this.basicInformation = basicInformation
      this.operatingDuty = operatingDuty
      this.remark = remark
      this.visible = true
      this.baseType = 1
      this.participantName = personCharge?[...personCharge]:[]
    },

    /**
     * @description 确定提交更新覆盖物数据
     */
    confirm() {
      if (this.isEdit) {
        this.$emit('update', {
          text: this.text,
          title: this.title,
          color: this.color,
          weight: this.weight,
          opacity: this.opacity,
          lineColor: this.lineColor,
          gridName: this.gridName,
          gridArea: this.gridArea,
          gridNumber: this.gridNumber,
          jurisdictionalScope: this.jurisdictionalScope,
          basicInformation: this.basicInformation,
          operatingDuty: this.operatingDuty,
          remark: this.remark,
          personCharge: this.participantName,

        })
      } else {
        this.$emit('confirm', {
          text: this.text,
          title: this.title,
          color: this.color,
          weight: this.weight,
          opacity: this.opacity,
          type: this.type,
          lineColor:this.lineColor,
          gridName: this.gridName,
          gridArea: this.gridArea,
          gridNumber: this.gridNumber,
          jurisdictionalScope: this.jurisdictionalScope,
          basicInformation: this.basicInformation,
          operatingDuty: this.operatingDuty,
          remark: this.remark,
          personCharge: this.participantName,
        })
      }

      // 关闭弹窗
      this.visible = false
    },
    /**
     * @method
     * @desc 删除参与人
     * @param {num} id 需要删除的参与人id
     */
    deleteParticipant(id) {
        let self = this;
        // 删除前端显示的参与人
        for(let index in self.participantName) {
            if(self.participantName[index].id == id) {
                self.participantName.splice(index, 1);
            }
        }
    },
    /**
     * @method
     * @desc 点击显示选择参与人弹窗
     * @return {null}
     */
    participantsDialogShow(){
        this.showParticipantsDialog = true;
        this.$nextTick(()=>{
            this.$refs.participantsDialog.handleAddContacts(
            '/mail/mailgroup/list',
            "请选择",
            "",
            this.participantName
            );
        })
    },
    /**
     * @method
     * @desc 参与人弹窗返回值处理
     * @param {object} 选择的参与人
     */
    handelLinkdata({linkman}){
        console.log("获取到的联系人：", linkman);
        let that = this;
        that.participantName = linkman
        // for(let item of linkman) {
        //     that.participantName.push({
        //         name: item.name,
        //         id: item.id,
        //         groupName: item.groupName,
        //         position: item.position
        //     });
        // }
    },
  },
}
</script>

<style lang="scss" scoped>
.painting-panel-overlay-edit-dialog {
  position: fixed;
  z-index: 100;
  // 遮罩
  &__modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  // 弹窗主体
  &__main {
    width: 450px;
    background: rgba(12, 30, 71, 0.8);
    border: 1px solid #BBEBFF;
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    z-index: 1;
    padding: 30px 20px 20px 20px;
    text-align: center;

    // 关闭按钮
    &__close-button {
      color: #6CDEFF;
      font-weight: bolder;
      font-size: 18px;
      transition: color 0.1s;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
      &:hover {
        color: white;
      }
    }
    & .coveringClass {
        margin: 0 0 10px 10px;
        & /deep/ .el-radio-button__inner{
            color: rgba(12, 30, 71, 0.8);
        }
        & /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            color:white;
        }
    }

    // 选项
    &__item {
      position: relative;
      padding-left: 100px;
      margin-bottom: 15px;
      text-align: left;
      &__label {
        color: #47E0FF;
        font-size: 16px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      /deep/ .el-input { 
        &__inner {
          height: 30px;
          border: 1px solid #9AC9E7;
          background: transparent;
        }
        &__clear {
          line-height: 30px;
        }
      }
      /deep/ .el-color-picker__trigger {
        border: 1px solid #9AC9E7;
      }
      /deep/ .el-textarea__inner {
        border: 1px solid #9AC9E7;
        background: transparent;
        font-size: 16px;
        color: #9AC9E7;
        font-family: 'SourceHanSansCN-Regular';
      }

      .personCharge{
          width:100%;
          border: 1px solid #9AC9E7;
          padding:10px;
          .person{
              display:flex;
              flex-wrap: wrap;
          }
          .choose{
              float: right;
          }
      }
    }

    // 确定按钮
    &__confirm {
      color: #47E0FF;
      font-size: 16px;
      background: #062D5E;
      border: 1px solid #0D79FF;
      width: 76px;
      cursor: pointer;
      outline: none;
      &:hover {
        color: white;
      }
    }
  }
}
</style>
