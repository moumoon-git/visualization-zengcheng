<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗-人员详情页面
-->

<template>
  <div class="staff-detail">
    <div class="staff-detail__header">
      <!-- 后退按钮 -->
      <div
        class="rental__backward el-icon-arrow-left"
        @click="$emit('go-back')"
      ></div>
      <!-- 标题 -->
      <span>人员详情</span>
    </div>
    <!-- 顶部页面切换标签 -->
    <div class="staff-detail__tab">
      <span
        :class="['staff-detail__tab__item', { 'staff-detail__tab__item--active': tabIndex === 1 }]"
        @click="tabIndex = 1"
      >
        人员信息
      </span>
      <span
        :class="['staff-detail__tab__item', { 'staff-detail__tab__item--active': tabIndex === 2 }]"
        @click="tabIndex = 2"
      >
        出入记录
      </span>
    </div>
    <!-- A. 人员信息页面 -->
    <div
      class="staff-detail__content"
      v-show="tabIndex === 1"
    >
      <div class="staff-detail__content__item">
        <span>人员姓名</span>
        <span>{{data.ryxm ? data.ryxm : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>证件芯片号</span>
        <span>{{data.cardNum ? data.cardNum : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员性别</span>
        <span>{{data.ryxb ? data.ryxb : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员民族</span>
        <span>{{data.rymz ? data.rymz : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员身份证号码</span>
        <span>{{data.rysfzhm ? data.rysfzhm : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员出生日期</span>
        <span>{{data.rycsrq ? data.rycsrq : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>身份证签发日期</span>
        <span>{{data.rysfzqfrq ? data.rysfzqfrq : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>身份证截止日期</span>
        <span>{{data.rysfzjzrq ? data.rysfzjzrq : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员户籍全址</span>
        <span>{{data.ryhjqz ? data.ryhjqz : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员居住房屋地址</span>
        <span>{{data.ryjzfwdz ? data.ryjzfwdz : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员居住房间号</span>
        <span>{{data.ryjzfjhbm ? data.ryjzfjhbm : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员联系电话</span>
        <span>{{data.rylxdh ? data.rylxdh : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员入住状态</span>
        <span v-if="data.ryrzzt == 1">入住</span>
        <span v-else-if="data.ryrzzt == 2">注销</span>
        <span v-else-if="data.ryrzzt == 3">其他</span>
        <span v-else>-</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员入住日期</span>
        <span>{{data.ryrzrq ? data.ryrzrq : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>人员身份</span>
        <span>{{data.rysf ? data.rysf : '-'}}</span>
      </div>
      <div class="staff-detail__content__item">
        <span>是否流动人口</span>
        <span v-if="data.sfldrk == 0">否</span>
        <span v-else-if="data.sfldrk == 1">是</span>
      </div>
    </div>
    <!-- B. 出入记录页面 -->
    <div
      class="staff-detail__record"
      v-show="tabIndex === 2"
    >
      <!-- B-1. 日期范围选择器 -->
      <div class="staff-detail__record__date">
        <span
          :class="['staff-detail__record__date__button', { 'staff-detail__record__date__button--active': dateIntervals === 1 }]"
          @click="dateIntervals = 1"
        >
          今日
        </span>
        <span
          :class="['staff-detail__record__date__button', { 'staff-detail__record__date__button--active': dateIntervals === 2 }]"
          @click="dateIntervals = 2"
        >
          本周
        </span>
        <span
          :class="['staff-detail__record__date__button', { 'staff-detail__record__date__button--active': dateIntervals === 3 }]"
          @click="dateIntervals = 3"
        >
          本月
        </span>
        <span
          :class="['staff-detail__record__date__button', { 'staff-detail__record__date__button--active': dateIntervals === 4 }]"
          @click="dateIntervals = 4"
        >
          本年
        </span>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="dateIntervals = 0"
        />
      </div>
      <!-- B-2. 统计数据 -->
      <div  class="staff-detail__record__statistics">
        <span>
          <div>{{ statistics.inCount || statistics.inCount === 0 ? statistics.inCount : '-' }}</div>
          <div>进门次数</div>
        </span>
        <span>
          <div>{{ statistics.outCount || statistics.outCount === 0 ? statistics.outCount : '-' }}</div>
          <div>出门次数</div>
        </span>
      </div>
      <!-- B-3. 列表数据 -->
      <div
        class="staff-detail__record__list"
        v-infinite-scroll="handleScroll"
      >
        <div
          class="staff-detail__record__list__item"
          v-for="(item, index) in record"
          :key="`record_item_${index}`"
        >
          <span>时间：{{ item.rycrsj ? transformDate(item.rycrsj) : '-' }}</span>
          <span style="float: right;">{{ item.crlx ? item.crlx : '-' }}</span>
        </div>
        <!-- 数据加载中提示 -->
        <div v-show="loading" style="text-align: center;">加载中...</div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffDetail',

  data() {
    return {
      tabIndex: 1, // 1-人员信息，2-出入记录
      data: '', // 人员信息
      recordParams: { // 出入记录请求参数
        id: '',
        startTime: '',
        endTime: '',
        page: 1,
        limit: 10
      },
      statistics: '', // 出入统计
      dateIntervals: 0, // 日期范围选择快捷键
      dateRange: '', // 日期范围取值
      record: '', // 出入记录
      loading: false, // 是否显示”加载中...“提示词
      totalPage: 1, // 列表总页数，用于判断scroll是否触发数据请求
    }
  },

  methods: {
    /**
     * @description 初始化人员详情页面
     * @param {String|Number} id 人员id
     */
    init(id) {
      // 初始化页面data
      this.tabIndex = 1
      this.record = []
      this.data= ''
      this.dateIntervals = 0
      this.dateRange = ''
      this.recordParams.page = 1
      // 赋值并请求数据
      this.recordParams.id = id
      this.getDetail(id)
      this.getRecordStatistics()
    },

    /**
     * @description 获取人员信息
     * @param {String|Number} id 人员id
     */
    getDetail(id) {
      this.apix(`${window.SITE_CONFIG['baseUrl']}/renting/rentingPeopleInfo/info?id=${id}`).then(response => {
        if (response.code === 0) {
          this.data = {...response.data}
        }
      })
    },

    // 获取出入记录
    getRecord() {
      this.loading = true
      const request = {
        method: 'post',
        url: '/renting/rentingPeopleInfo/record',
        baseURL: window.SITE_CONFIG.baseUrl,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: this.recordParams
      }
      this.apix(request).then(response => {
        if (response.code === 0) {
          this.record.push(...response.data.list)
          this.totalPage = response.data.totalPage
        }
        this.loading = false
      })
    },

    // 获取出入统计
    getRecordStatistics() {
      const request = {
        method: 'post',
        url: '/renting/rentingPeopleInfo/recordCount',
        baseURL: window.SITE_CONFIG.baseUrl,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: {
          id: this.recordParams.id,
          startTime: this.recordParams.startTime,
          endTime: this.recordParams.endTime
        }
      }
      this.apix(request).then(response => {
        if (response.code === 0) {
          this.statistics = response.data
        }
      })
    },

    // 列表滚动请求更多列表数据
    handleScroll() {
      if (this.recordParams.page < this.totalPage) {
        this.recordParams.page += 1
      }
    },

    /**
     * @description 给日期字符串添加日期单位
     * @param {String} date 日期字符串
     * @return {String} 带格式的日期字符串
     */
    transformDate(date) {
      if (date.length === 14) {
        return `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(6, 8)}日${date.slice(8, 10)}:${date.slice(10, 12)}:${date.slice(12, 14)}`
      } else {
        return date || '-'
      }
    }
  },
  
  watch: {
    // 出入记录请求参数变化时，请求数据
    recordParams: {
      deep: true,
      handler: function(val) {
        this.getRecord()
      }
    },

    // 根据快捷键取值变化修改dateRange取值
    dateIntervals: {
      handler: function(val) {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const weekStart = new Date(date.setDate(day - date.getDay()))
        const weekEnd = new Date(date.setDate(day - date.getDay() + 6))
        const thisDay = [`${year}-${month}-${day}`, `${year}-${month}-${day}`]
        const thisWeek = [
          `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`,
          `${weekEnd.getFullYear()}-${weekEnd.getMonth() + 1}-${weekEnd.getDate()}`
        ]
        const thisMonth = [`${year}-${month}-01`, `${year}-${month}-${(new Date(year, month, 0)).getDate()}`]
        const thisYear = [`${year}-01-01`, `${year}-12-31`]
        switch(val) {
          case 1:
            this.dateRange = thisDay
            break
          case 2:
            this.dateRange = thisWeek
            break
          case 3:
            this.dateRange = thisMonth
            break
          case 4:
            this.dateRange = thisYear
            break
        }
      }
    },

    // 根据dateRange取值修改请求参数startTime和endTime取值
    dateRange: {
      deep: true,
      handler: function(val) {
        this.record = []
        this.recordParams.page = 1
        if (Array.isArray(val)) {
          this.recordParams.startTime = val[0] + ' 00:00:00'
          this.recordParams.endTime = val[1] + ' 23:59:59'
        } else {
          this.recordParams.startTime = ''
          this.recordParams.endTime = ''
        }
        this.getRecordStatistics()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.staff-detail {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  
  // 标题
  &__header {
    color: #00F2FF;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: relative;
  }

  // 切换标签
  &__tab {
    cursor: pointer;
    display: flex;
    height: 40px;
    &__item {
      flex-grow: 1;
      height: 100%;
      line-height: 40px;
      text-align: center;
      color: #00AAC3;
      font-size: 20px;
      font-weight: bold;
      border: 1px solid #1D5ABF;
      transition: text-shadow 0.3s;
      &:hover {
        color: #00F2FF;
      }
      &--active {
        color: #00F2FF;
        text-shadow: 0 0 3px #00F2FF;
        border-color: #3BACC6;
        background: linear-gradient(to right, rgba(71, 224, 255, 0.7), rgba(71, 224, 255, 0.1) 30% 70%, rgba(71, 224, 255, 0.7));
      }
    }
  }

  // 人员信息列表
  &__content {
    margin-top: 10px;
    overflow-y: auto;
    flex-grow: 1;
    &::-webkit-scrollbar {
      width: 5px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #3B90EE;
      border-radius: 10px;
    }
    &__item {
      color: white;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      position: relative;
      margin: 0 10px 10px 150px;
      font-size: 14px;
      padding: 5px;
      // label
      & > span:first-child {
        position: absolute;
        left: -130px;
        top: 50%;
        transform: translateY(-50%);
        color: #99C9E7;
      }
    }
  }

  // 出入记录
  &__record {
    margin-top: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    // 上方日期选择器
    &__date {
      padding: 0 10px;
      text-align: center;
      // 按钮
      &__button {
        display: inline-block;
        color: #99C9E7;
        border: 2px solid transparent;
        cursor: pointer;
        text-align: center;
        padding: 0 5px;
        position: relative;
        top: 2px;
        &:hover {
          color: white;
        }
        &--active {
          color: white;
          border-color: #6FFAFD;
        }
      }
      // el-date-picker
      /deep/ .el-date-editor {
        padding: 0 5px;
        background: transparent;
        border: 1px solid #3F92FE;
        border-radius: 3px;
        color: white;
        width: 330px;
        height: 30px;
        margin-left: 20px;
        .el-range__icon,
        .el-range__close-icon {
          line-height: 28px;
        }
        .el-range-separator {
          color: white;
          display: inline-block;
          height: 28px;
          line-height: 28px;
        }
        .el-range-input {
          background: transparent;
          color: white;
        }
      }
    }

    // 统计
    &__statistics {
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      // 统计项
      & > span {
        flex-grow: 1;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        width: 100px;
        height: 90px;
        text-align: center;
        position: relative;
        // 统计项数值
        & > div:first-child {
          font-family: 'DCM';
          font-size: 40px;
          color: #99C9E7;
        }
        // 间隔竖线
        &:not(:last-child):after {
          content: '';
          display: block;
          height: 50px;
          width: 1px;
          background: linear-gradient(to bottom, transparent, white 20% 80%, transparent);
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    // 记录列表
    &__list {
      flex-grow: 1;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 5px;
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #3B90EE;
        border-radius: 10px;
      }
      &__item {
        background: rgba(24, 81, 154, 0.36);
        margin: 0 20px 10px;
        position: relative;
        padding: 5px 10px;
      }
    }
  }
}
</style>
