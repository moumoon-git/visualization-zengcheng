<template>
  <div class="plan-mission-release">
    <!-- 头部统计数据 -->
    <header>
      <span>已选择组织架构成员：<span>{{ selectedContacts.size }}人</span></span>
      <span>自定义成员：<span>{{ selectedCustomMemberList.length }}人</span></span>
    </header>
    <main>
      <!-- 第一列 -->
      <div>
        <!-- 树形 -->
        <el-tree
          ref="tree"
          node-key="id"
          :data="treeData"
          :props="{
            children: 'children',
            label: 'name',
            value: 'id',
          }"
          :expand-on-click-node="false"
          show-checkbox
          @check="handleTreeCheck"
          @node-click="handleTreeClick"
          @node-expand="handleTreeClick"
          @node-collapse="handleTreeClick"
        />
      </div>
      <!-- 第二列 -->
      <div>
        <!-- 联系人列表 -->
        <div>
          <div
            v-for="(contact, contactIndex) in contactsList"
            :key="`contact_${contactIndex}_${contact.identifyId}`"
            :class="{ 'plan-mission-release__active-contact': Object.is(activeContact, contact)}"
            @click="activeContact = contact;"
          >
            <el-checkbox
              :checked="selectedContacts.has(contact.identifyId)"
              @change="handleCheckboxChange($event, contact)"
            />
            {{ contact.name }}
          </div>
        </div>
        <button
          class="plan-mission-release__add-button"
          @click="handleAddMember"
        >
          新增成员
        </button>
        <!-- 新增成员列表 -->
        <div>
          <div
            v-for="(customMember, customMemberIndex) in customMemberList"
            :key="`customMember_${customMemberIndex}`"
            :class="{ 'plan-mission-release__active-contact': Object.is(activeContact, customMember)}"
            @click="activeContact = customMember;"
          >
            <el-checkbox
              @change="handleCustomMemberCheckboxChange($event, customMember)"
            />
            <span>{{ customMember.name }}</span>
            <i @click="deleteCustomMember(customMember)">×</i>
          </div>
        </div>
      </div>
      <!-- 第三列 -->
      <div>
        <!-- 事件内容 -->
        <div>
          <div class="plan-mission-release__title">事件内容</div>
          <div style="height: 100px;">
            标题：{{ eventData.title }}<br>
            于{{ eventData.reportTime }}{{ platformName }}{{ eventData.reportName ? eventData.reportName : '群众' }}（{{ eventData.reportPhone ? eventData.reportPhone : '暂无联系信息' }}）报，
            {{ eventData.time }}在{{ eventData.address }}发生一起{{ eventData.emergencyTypeName }}，详细说明如下：
            {{ eventData.detail }}<br>
            拟办意见：{{ eventData.opinion }}<br>
            领导批示：{{ eventData.leadershipDirective }}
          </div>
        </div>
        <div>
          <div class="plan-mission-release__title">职责内容</div>
          <div style="height: 50px;">{{ responsibility }}</div>
        </div>
        <div>
          <div class="plan-mission-release__title">自定义内容</div>
          <div style="height: 90px;">
            <textarea
              v-model="activeContact.customContent"
              :maxlength="500 - SMSContent.length + (activeContact.customContent ? activeContact.customContent : '').length"
            />
            <div>
              <button
                v-if="activeContact.customContent"
                @click="activeContact.customContent = '';"
              >
                全部清除
              </button>
              <span>{{ activeContact.customContent ? activeContact.customContent.length : 0 }}/{{ 500 - SMSContent.length + (activeContact.customContent ? activeContact.customContent : '').length }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="plan-mission-release__title">短信内容预览</div>
          <div style="height: 90px;">{{ SMSContent }}</div>
        </div>
      </div>
    </main>
    <footer>
      <button @click="sendSMS">发送短信</button>
    </footer>
    <!-- 新增成员弹窗 -->
    <AddMemberDialog
      :is-visible.sync="isAddMemberDialogVisible"
      :plan-id="formData.id"
      @refresh-custom="handleRefreshCustom"
    />
  </div>
</template>

<script>
import Axios from 'axios';
import AddMemberDialog from './AddMemberDialog';

export default {
  name: 'PlanMissionRelease',
  components: {
    // 新增成员弹窗
    AddMemberDialog,
  },
  props: {
    // 事件内容
    eventData: {
      required: true,
    },
    // 预案数据
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 平台名称
      platformName: '',
      // 新增成员弹窗是否可见
      isAddMemberDialogVisible: false,
      // 经过处理后的树形数据
      treeData: [],
      // 当前显示的联系人列表
      contactsList: [],
      // 勾选的所有联系人
      selectedContacts: new Map(),
      // 自定义成员列表
      customMemberList: [],
      // 勾选的所有自定义成员
      selectedCustomMemberList: [],
      // 点击的联系人
      activeContact: {},
      // 正在发送
      isSending: false,
    };
  },
  computed: {
    // 职责内容
    responsibility() {
      return this.activeContact.responsibilities || this.activeContact.position || '';
    },
    // 短信内容预览
    SMSContent() {
      return `【紧急通知】标题：${this.eventData.title}
              于${this.eventData.reportTime}${this.platformName}${this.eventData.reportName ? this.eventData.reportName : '群众'}（${this.eventData.reportPhone ? this.eventData.reportPhone : '暂无联系信息'}）报，${this.eventData.time}在${this.eventData.address}发生一起${this.eventData.emergencyTypeName}，详细说明如下：
              ${this.eventData.detail}
              拟办意见：${this.eventData.opinion}
              领导批示：${this.eventData.leadershipDirective}
              职责内容：${this.responsibility}
              ${this.activeContact.customContent || ''}`;
    },
  },
  watch: {
    eventData: {
      deep: true,
      immediate: true,
      // 获取平台名称
      handler(val) {
        if (val.platformId) {
          Axios({
            method: 'get',
            url: `${window.SITE_CONFIG['baseUrl']}/sys/platform/platformName?id=${val.platformId}`,
            headers: {
              token: this.$store.state.token,
            },
          }).then((res) => {
            this.platformName = res.data;
          });
        }
      },
    },
    formData: {
      immediate: true,
      deep: true,
      // 将子部门和子职务拼接在一起
      handler(val) {
        if (val && val.incidentMailgroup) {
          // 原始树形数据
          const rawData = JSON.parse(JSON.stringify(val.incidentMailgroup));
          const formatChildren = (data) => {
            data.forEach((parent) => {
              const children = [];
              // 子部门
              if (parent.children && parent.children.length) {
                formatChildren(parent.children);
                children.push(...parent.children);
              }
              // 子职务
              if (parent.rpIncidentUnitEntityList && parent.rpIncidentUnitEntityList.length) {
                children.push(...parent.rpIncidentUnitEntityList);
              }
              // 子部门+子职务
              parent.children = children;
              parent.contactsList = this.findAllContacts(parent);
            });
          };
          formatChildren(rawData);
          this.treeData = rawData;
          // 清空已选择的联系人
          this.selectedContacts.clear();
          // 自定义成员列表
          this.customMemberList = val.rpIncidentCustomMemberEntityList || [];
        }
      },
    },
  },
  methods: {
    /**
     * @description 添加成员
     */
    handleAddMember() {
      this.isAddMemberDialogVisible = true;
    },
    /**
     * @description 递归所有后代职务中的人
     * @param {Object} nodeObj 节点数据
     * @return {Array} 所有联系人
     */
    findAllContacts(nodeObj) {
      const contactsList = [];
      const findAllContacts = (node) => {
        // 当前节点是职务
        if (node.mailContactorEntityList && node.mailContactorEntityList.length) {
          // 同一个人只能添加一次
          node.mailContactorEntityList.forEach((contact) => {
            if (!contactsList.find((item) => item.identifyId === contact.identifyId)) {
              contactsList.push(contact);
            }
          });
        }
        // 当前节点是部门
        if (node.children && node.children.length) {
          node.children.forEach((children) => {
            findAllContacts(children);
          });
        }
      };
      findAllContacts(nodeObj);
      return contactsList;
    },
    /**
     * @description 点击树节点，更换所属成员
     * @param {Object} nodeObj 节点对象
     */
    handleTreeClick(nodeObj) {
      // 点击的联系人置空
      this.activeContact = {};
      this.$refs.tree.setCurrentKey(nodeObj.id);
      this.contactsList = nodeObj.mailContactorEntityList || nodeObj.contactsList || [];
    },
    /**
     * @description 树节点勾选
     * @param {Object} nodeObj 节点对象
     * @param {Object} checkStatus 勾选状态
     */
    handleTreeCheck(nodeObj, checkStatus) {
      this.handleTreeClick(nodeObj);
      const contactsList = nodeObj.mailContactorEntityList || nodeObj.contactsList || [];
      const isChecked = checkStatus.checkedKeys.includes(nodeObj.id);
      contactsList.forEach((contact) => {
        if (isChecked) {
          this.selectedContacts.set(contact.identifyId, contact);
        } else {
          this.selectedContacts.delete(contact.identifyId);
        }
      });
      // 刷新联系人列表的勾选状态
      if (this.contactsList.length) {
        // this.handleTreeCheck会触发多次，所以要判断联系人列表是否为空来执行，防止空数组覆盖掉tmp
        const tmp = [...this.contactsList];
        this.contactsList = [];
        this.$forceUpdate();
        this.$nextTick(() => {
          this.contactsList = tmp;
        })
      }
    },
    /**
     * @description 联系人勾选
     * @param {Boolean} isChecked 是否勾选
     * @param {Object} contact 联系人
     */
    handleCheckboxChange(isChecked, contact) {
      if (isChecked) {
        this.selectedContacts.set(contact.identifyId, contact);
      } else {
        this.selectedContacts.delete(contact.identifyId);
      }
      this.refreshTreeCheck();
    },
    /**
     * @description 自定义成员勾选
     * @param {Boolean} isChecked 是否勾选
     * @param {Object} contact 自定义成员
     */
    handleCustomMemberCheckboxChange(isChecked, contact) {
      if (isChecked) {
        this.selectedCustomMemberList.push(contact);
      } else {
        this.selectedCustomMemberList.splice(
          this.selectedCustomMemberList.findIndex((item) => item.id === contact.id),
          1,
        );
      }
    },
    /**
     * @description 刷新树形勾选状态
     */
    refreshTreeCheck() {
      const checkedKeys = [];
      const refreshTree = (tree) => {
        tree.forEach((node) => {
          if (node.children && node.children.length) {
            refreshTree(node.children);
          }
          let count = 0;
          const contactsList = node.mailContactorEntityList || node.contactsList || [];
          contactsList.forEach((contact) => {
            if (this.selectedContacts.has(contact.identifyId)) {
              count += 1;
            }
          });
          if (count > 0 && count === contactsList.length) {
            checkedKeys.push(node.id);
          }
        });
      };
      refreshTree(this.treeData);
      this.$refs.tree.setCheckedKeys(checkedKeys);
      // 刷新Map.size
      this.$forceUpdate();
    },
    /**
     * @description 刷新自定义成员列表
     */
    handleRefreshCustom() {
      this.apix(`${window.SITE_CONFIG.baseUrl}/incidentplan/rpIncidentPlan/getOneAndLink?id=${this.formData.id}`)
        .then((response) => {
          if (response.code === 0 && response.data) {
            this.customMemberList = response.data.rpIncidentCustomMemberEntityList || [];
          } else {
            this.$message.error(`刷新自定义成员列表失败，错误代码${response.code}，错误信息：${reponse.msg}`);
          }
        })
        .catch((error) => {
          this.$message.error(`刷新自定义成员列表失败，错误信息：${error}`);
        });
    },
    /**
     * @description 删除自定义成员
     * @param {Object} member 成员对象
     */
    deleteCustomMember(member) {
      this.$confirm(
        '确定删除？删除后数据无法恢复',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.apix(`${window.SITE_CONFIG.baseUrl}/incidentplan/rpCustomMember/delete/${member.id}`)
            .then((response) => {
              if (response.code === 0) {
                this.$message.success('删除成功');
                this.handleRefreshCustom();
              } else {
                this.$message.error(`删除失败，错误代码${response.code}，错误信息：${response.msg}`);
              }
            })
            .catch((error) => {
              this.$message.error(`删除失败，错误信息：${error}`);
            });
        })
        .catch(() => {});
    },
    /**
     * @description 发送短信
     */
    sendSMS() {
      if (this.isSending) {
        this.$message.error('发送太频繁，请稍等');
        return;
      }
      if (this.selectedContacts.size + this.selectedCustomMemberList.length === 0) {
        this.$message.error('请选择联系人');
        return;
      }
      const memberList = [];
      this.selectedContacts.forEach((contact) => {
        memberList.push({
          identifyId: contact.identifyId,
          content: contact.customContent || '',
        })
      });
      const customMemberList = this.selectedCustomMemberList.map((contact) => ({
        id: contact.id,
        content: contact.customContent || '',
      }));
      const request = {
        method: 'post',
        baseURL: window.SITE_CONFIG.baseUrl,
        url: '/incidentplan/rpIncidentPlan/sendRpMessage',
        headers: {
          token: this.$store.state.token,
        },
        data: {
          eventContent: `标题：${this.eventData.title}
            于${this.eventData.reportTime}${this.platformName}${this.eventData.reportName ? this.eventData.reportName : '群众'}（${this.eventData.reportPhone ? this.eventData.reportPhone : '暂无联系信息'}）报，${this.eventData.time}在${this.eventData.address}发生一起${this.eventData.emergencyTypeName}，详细说明如下：
            ${this.eventData.detail}
            拟办意见：${this.eventData.opinion}
            领导批示：${this.eventData.leadershipDirective}`,
          memberList,
          customMemberList,
          eventId: this.eventData.id,
          rpId: this.formData.id,
        },
      }
      this.isSending = true;
      Axios(request)
        .then((response) => {
          if (response.data.code === 0) {
            this.$message.success('发送短信成功');
          } else {
            this.$message.error(`发送短信失败，错误代码${response.data.code}，错误信息：${response.data.msg}`);
          }
        })
        .catch((error) => {
          this.$message.error(`发送短信失败，错误信息：${error}`);
        })
        .finally(() => {
          this.isSending = false;
        });
    },
  },
}
</script>

<style lang="scss" src="./PlanMissionRelease.scss"></style>
