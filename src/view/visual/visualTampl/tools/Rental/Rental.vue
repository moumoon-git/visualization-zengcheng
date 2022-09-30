<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗
-->

<template>
    <!-- 弹框淡出淡入动效 -->
    <transition name="rental-fade">
        <div
            class="rental"
            v-if="visible"
        >
            <!-- 关闭窗口按钮 -->
            <span
                class="rental__close-button el-icon-close"
                @click="visible = false"
            ></span>
            <!-- 顶部标签导航栏 -->
            <div
                class="rental__nav"
                @click="showDetail = 1"
            >
                <span
                    :class="['rental__nav__tab', {'rental__nav__tab--active': tabIndex === 1}]"
                    @click="tabIndex = 1"
                >
                    出租屋信息
                </span>
                <span
                    :class="['rental__nav__tab', {'rental__nav__tab--active': tabIndex === 2}]"
                    @click="tabIndex = 2"
                >
                    人员信息
                </span>
                <span
                    :class="['rental__nav__tab', {'rental__nav__tab--active': tabIndex === 3}]"
                    @click="tabIndex = 3"
                >
                    房间信息
                </span>
                <span
                    :class="['rental__nav__tab', {'rental__nav__tab--active': tabIndex === 4}]"
                    @click="tabIndex = 4"
                >
                    出入统计
                </span>
            </div>
            <!-- 主体内容 -->
            <div class="rental__content">
                <!-- A. 主页 -->
                <div
                    v-show="showDetail === 1"
                    style="width: 100%; height: 100%;"
                >
                    <!-- A-1. 出租屋信息 -->
                    <RentalInfo
                        :id="id"
                        v-show="tabIndex === 1"
                    />
                    <!-- A-2. 人员信息 -->
                    <StaffInfo
                        :fwbm="fwbm"
                        v-show="tabIndex === 2"
                        @show-detail="handleShowDetail($event)"
                    />
                    <!-- A-3. 房间信息 -->
                    <RoomInfo
                        :fwbm="fwbm"
                        v-show="tabIndex === 3"
                        @show-detail="handleShowRoomDetail($event)"
                    />
                    <!-- A-4. 出入统计 -->
                    <InOutStat
                        :fwbm="fwbm"
                        v-show="tabIndex === 4"
                        @show-detail="handleShowDetail($event)"
                    />
                </div>
                <!-- B. 人员详情 -->
                <StaffDetail
                    v-show="showDetail === 2"
                    ref="StaffDetail"
                    @go-back="tabIndex === 3 ? showDetail = 3 : showDetail = 1"
                />
                <!-- C. 房间详情 -->
                <RoomDetail
                    v-show="showDetail === 3"
                    ref="RoomDetail"
                    @show-detail="handleShowDetail($event)"
                    @go-back="showDetail = 1"
                />
            </div>
        </div>
    </transition>
</template>

<script>
// 出租屋信息页面
import RentalInfo from './RentalInfo/RentalInfo'
// 人员信息页面
import StaffInfo from './StaffInfo/StaffInfo'
// 房间信息页面
import RoomInfo from './RoomInfo/RoomInfo'
// 出入统计页面
import InOutStat from './InOutStat/InOutStat'
// 人员详情页面
import StaffDetail from './StaffDetail/StaffDetail'
// 房间详情页面
import RoomDetail from './RoomDetail/RoomDetail'

export default {
    name: 'Rental',

    components: {
        RentalInfo,
        StaffInfo,
        RoomInfo,
        InOutStat,
        StaffDetail,
        RoomDetail
    },

    data() {
        return {
            visible: false, // 弹框显示
            tabIndex: 1, // 当前激活的标签页下标
            id: '', // 出租屋id
            fwbm: '', // 出租屋房屋编码
            showDetail: 1, // 显示详情页面，主页-1，人员详情-2，房间详情-3
        }
    },

    methods: {
        /**
         * @description 初始化弹框
         * @param {Object} data 落点数据
         */
        init(data) {
            // 切换到主页第一页
            this.showDetail = 1
            this.tabIndex = 1
            // 赋值
            this.id = data.id
            this.fwbm = data.fwbm
            // 显示弹框
            this.visible = true
        },

        /**
         * @description 切换显示人员详情页面并初始化数据
         * @param {String|Number} id 人员id
         */
        handleShowDetail(id) {
            this.showDetail = 2
            this.$refs.StaffDetail.init(id)
        },

        /**
         * @description 切换显示房间详情页面并初始化数据
         * @param {String|Number} id 房间id
         */
        handleShowRoomDetail(id) {
            this.showDetail = 3
            this.$refs.RoomDetail.init(id)
        },
    },
}
</script>

<style lang="scss" scoped>
.rental {
    width: 574px;
    height: 800px;
    color: white;
    font-family: 'SourceHanSansCN-Regular';
    
    // 定位
    position: fixed;
    right: 50px;
    top: 50vh;
    transform: translate(0, -50%);

    // 关闭窗口按钮
    &__close-button {
        display: block;
        width: 26px;
        height: 26px;
        line-height: 26px;
        color: white;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(-40deg, rgb(98, 127, 236), rgb(18, 196, 200));
        border-radius: 50%;
        position: absolute;
        right: -13px;
        top: -8px;
        cursor: pointer;
        &:hover {
            background: linear-gradient(-40deg, rgb(18, 196, 200), rgb(98, 127, 236));
        }
    }

    // 顶部标签导航栏
    &__nav {
        display: flex;
        justify-content: space-around;
        width: 574px;
        height: 66px;
        margin-bottom: 5px;
        background: no-repeat center/110% 110% url('./img/nav_bg.png');
        &__tab {
            margin-top: 16px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            display: inline-block;
            height: 27px;
            width: 82px;
            color: #3BB3B9;
            line-height: 27px;
            background: no-repeat center/100% 100% url('./img/nav_tab.png');
            transition: text-shadow 0.3s;
            &:hover {
                color: #00F2FF;
            }
            &--active {
                color: #00F2FF;
                text-shadow: 0 0 3px #00F2FF;
                background-image: url('./img/nav_tab_active.png');
            }
        }
    }

    // 主体内容
    &__content {
        width: 100%;
        height: calc(100% - 76px);
        background: rgba(10, 29, 81, .8);
        box-shadow: 3px 5px 13px 0px #031C3A;
        user-select: auto;
    }

    /deep/ &__backward {
        display: inline-block;
        width: 20px;
        height: 20px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        left: 20px;
        top: 15px;
        &:hover {
            color: #00F2FF;
        }
    }
}

// 弹框淡出淡入动效
.rental-fade-enter-active, .rental-fade-leave-active {
  transition: opacity .5s;
}
.rental-fade-enter, .rental-fade-leave-to {
  opacity: 0;
}
</style>
