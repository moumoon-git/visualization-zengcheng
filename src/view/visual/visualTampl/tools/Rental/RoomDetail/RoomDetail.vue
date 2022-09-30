<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗-房间详情页面
-->

<template>
  <div class="room-detail">
    <div class="room-detail__header">
      <!-- 后退按钮 -->
      <div
        class="rental__backward el-icon-arrow-left"
        @click="$emit('go-back')"
      ></div>
      <!-- 标题 -->
      <span>{{ num }}房间信息</span>
    </div>
    <!-- 顶部页面切换标签 -->
    <div class="room-detail__tab">
      <span
        :class="['room-detail__tab__item', { 'room-detail__tab__item--active': tab === 1 }]"
        @click="tab = 1"
      >
        基本信息
      </span>
      <span
        :class="['room-detail__tab__item', { 'room-detail__tab__item--active': tab === 2 }]"
        @click="tab = 2"
      >
        居住人员
      </span>
    </div>
    <!-- A. 基本信息页面 -->
    <div
      class="room-detail__content"
      v-show="tab === 1"
    >
      <div class="room-detail__content__item">
        <span>房间状态</span>
        <span v-if="data.fjhzt && data.fjhzt == 0">注销</span>
        <span v-if="data.fjhzt && data.fjhzt == 1">正常</span>
        <span v-else>-</span>
      </div>
      <div class="room-detail__content__item">
        <span>房屋编码</span>
        <span>{{ data.fwbm ? data.fwbm : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房间号</span>
        <span>{{ data.fjh ? data.fjh : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>信息入库时间</span>
        <span>{{ data.xxrksj ? data.xxrksj : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>管理人姓名</span>
        <span>{{ data.glrxm ? data.glrxm : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>管理人联系电话</span>
        <span>{{ data.glrlxdh ? data.glrlxdh : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>管理人户籍地</span>
        <span>{{ data.glrhjd ? data.glrhjd : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>管理人身份证号码</span>
        <span>{{ data.glrsfzhm ? data.glrsfzhm : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房屋类别</span>
        <span>{{ data.fwlb ? data.fwlb : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房屋用途</span>
        <span>{{ data.fwyt ? data.fwyt : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房屋面积</span>
        <span>{{ data.fwmj ? data.fwmj : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>与产权人关系</span>
        <span>{{ data.ycqrgx ? data.ycqrgx : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房屋类型</span>
        <span v-if="data.fwlx === 'zz'">自住</span>
        <span v-else-if="data.fwlx === 'cz'">出租</span>
      </div>
      <div class="room-detail__content__item">
        <span>房东姓名</span>
        <span>{{ data.fdxm ? data.fdxm : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房东联系电话</span>
        <span>{{ data.fdlxdh ? data.fdlxdh : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房东户籍地</span>
        <span>{{ data.fdhjd ? data.fdhjd : '-' }}</span>
      </div>
      <div class="room-detail__content__item">
        <span>房东身份证号码</span>
        <span>{{ data.fdsfzhm ? data.fdsfzhm : '-' }}</span>
      </div>
    </div>
    <!-- B. 居住人员页面 -->
    <div
      class="room-detail__staff"
      v-show="tab === 2"
    >
      <!-- B-1. 统计数据 -->
      <div class="room-detail__staff__statistics">
        <span>
          <div>{{ statistics.memberCount || statistics.memberCount == 0 ? statistics.memberCount : '-' }}</div>
          <div>人员总数</div>
        </span>
        <span>
          <div>{{ statistics.liveCount || statistics.liveCount == 0 ? statistics.liveCount : '-' }}</div>
          <div>入住人数</div>
        </span>
        <span>
          <div>{{ statistics.logoutCount || statistics.logoutCount == 0 ? statistics.logoutCount : '-' }}</div>
          <div>注销人数</div>
        </span>
      </div>
      <!-- B-2. 列表数据 -->
      <div
        class="room-detail__staff__list"
        v-infinite-scroll="handleScroll"
      >
        <div
          class="room-detail__staff__list__item"
          v-for="(item, index) in staff"
          :key="`staff_item_${index}`"
          @click="$emit('show-detail', item.id)"
        >
          <div class="room-detail__staff__list__item__header">
            <span>入住日期：{{ item.ryrzrq ? translateRZRQ(item.ryrzrq) : '-' }}</span>
            <span
                v-if="item.ryrzzt == 1"
                class="room-detail__staff__list__item__header__icon--green"
            >
                入住
            </span>
            <span
                v-else-if="item.ryrzzt == 2"
                class="room-detail__staff__list__item__header__icon--red"
            >
                注销
            </span>
            <span v-else-if="item.ryrzzt == 3">其他</span>
          </div>
          <div class="room-detail__staff__list__item__content">
            <span>姓名：{{ item.ryxm ? item.ryxm : '-' }}</span>
            <span style="margin-left: 50px;">性别：{{ item.ryxb ? item.ryxb : '-' }}</span>
            <span style="margin-left: 50px;">身份：{{ item.rysf ? item.rysf : '-' }}</span>
            <span v-if="item.sfldrk == 0">非流动人口</span>
            <span v-else-if="item.sfldrk == 1">流动人口</span>
          </div>
        </div>
        <!-- 数据加载提示 -->
        <div v-show="loading" style="text-align: center;">加载中...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomDetail',
  data() {
    return {
      id: '', // 房间id
      num: '', // 房间号
      tab: 1, // 页面切换：1-基本信息页面，2-居住人员页面
      data: '', // 基本信息页面-数据
      statistics: '', // 居住人员页面-统计数据
      staff: [], // 居住人员页面-数据
      page: 1, // 居住人员页面-列表页
      totalPage: 1, // 居住人员页面-列表总页数，用于判断滚动是否请求数据
      loading: false, // 居住人员页面-加载中提示词是否显示
    }
  },
  methods: {
    /**
     * @description 初始化房间详情
     * @param {Object} 房间id和房间号
     */
    init({id, num}) {
      // 赋值并初始化数据
      this.id = id
      this.num = num
      this.tab = 1
      this.page = 1
      this.staff = []
      // 请求数据
      this.getData()
      this.getStatistics()
      this.getStaff()
    },

    // 请求基本信息数据
    getData() {
      this.apix(`${window.SITE_CONFIG.baseUrl}/renting/rentingAddrroomInfo/info?id=${this.id}`).then(response => {
        if (response.code === 0) {
          this.data = response.data
        }
      })
    },

    // 请求居住人员统计数据
    getStatistics() {
      this.apix(`${window.SITE_CONFIG.baseUrl}/renting/rentingAddrroomInfo/memberCount?id=${this.id}`).then(response => {
        if (response.code === 0) {
          this.statistics = response.data
        }
      })
    },

    // 请求居住人员列表数据
    getStaff() {
      this.loading = true
      const request = {
        method: 'post',
        url: '/renting/rentingAddrroomInfo/memberList',
        baseURL: window.SITE_CONFIG.baseUrl,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: {
          id: this.id,
          page: this.page,
          limit: 10
        }
      }
      this.apix(request).then(response => {
        if (response.code === 0) {
          this.staff.push(...response.data.list)
          this.totalPage = response.data.totalPage
        }
        this.loading = false
      })
    },

    // 居住人员列表滚动请求更多数据
    handleScroll() {
      if (this.page < this.totalPage) {
        this.page += 1
        this.getStaff()
      }
    },

    /**
     * @description 入住日期插入单位
     * @param {String} date 原始字符串，示例："20200301"
     * @return {String} 插入单位后的字符串
     */
    translateRZRQ(date) {
      if (date.length === 8) {
        return `${date.substring(0, 4)}年${date.substring(4, 6)}月${date.substring(6, 8)}日`
      } else {
        return date || '-'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.room-detail {
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

  // 基本信息
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

  // 居住人员
  &__staff {
    margin-top: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

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

    // 人员列表
    &__list {
      height: 530px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 5px;
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #3B90EE;
        border-radius: 10px;
      }
      // 列表项
      &__item {
        background: rgba(24, 81, 154, 0.36);
        border: 1px solid rgba(24, 81, 154, 0.36);
        margin: 0 20px 10px;
        cursor: pointer;
        position: relative;
        &:hover {
            border-color: rgba(27, 216, 250, 0.58);
        }
        &__header {
          background: rgba(23, 130, 230, 0.3);
          padding: 5px 10px;
          // 入住日期
          & > span:first-child {
            font-size: 16px;
            font-weight: bold;
            color: #00F2FF;
          }
          // 右边标签
          & > span:last-child {
            float: right;
            border-radius: 3px;
            border: 1px solid #1792FC;
            padding: 0 5px;
            font-size: 14px;
            &.room-detail__staff__list__item__header__icon--green {
              color: white;
              background: #0BD295;
              border-color: #0BD295;
            }
            &.room-detail__staff__list__item__header__icon--red {
              color: white;
              background: #F66E6E;
              border-color: #F66E6E;
            }
          }
        }
        &__content {
          padding: 10px;
        }
        // 四角
        @mixin corner {
          content: '';
          display: block;
          position: absolute;
          width: 6px;
          height: 7px;
          background: no-repeat center/100% 100% transparent;
        }
        &__header:before {
          @include corner;
          top: -1px;
          left: -1px;
          background-image: url('../img/corner_tl.png');
        }
        &__header:after {
          @include corner;
          top: -1px;
          right: -1px;
          background-image: url('../img/corner_tr.png');
        }
        &__content:before {
          @include corner;
          bottom: -1px;
          left: -1px;
          background-image: url('../img/corner_bl.png');
        }
        &__content:after {
          @include corner;
          bottom: -1px;
          right: -1px;
          background-image: url('../img/corner_br.png');
        }
      }
    }
  }
}
</style>
