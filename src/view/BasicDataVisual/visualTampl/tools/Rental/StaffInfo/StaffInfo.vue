<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗-人员信息页面
-->

<template>
    <div class="staff-info">
        <!-- 1. 顶部统计数据 -->
        <div class="staff-info__header">
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
        <!-- 2. 人员信息列表 -->
        <div
            class="staff-info__list"
            v-infinite-scroll="handleScroll"
        >
            <div
                class="staff-info__list__item"
                v-for="(item, index) in data"
                :key="`staff_info_item_${index}`"
                @click="$emit('show-detail', item.id)"
            >
                <div class="staff-info__list__item__header">
                    <span>入住日期：{{ item.ryrzrq ? translateRZRQ(item.ryrzrq) : '-' }}</span>
                    <span
                        v-if="item.ryrzzt == 1"
                        class="staff-info__list__item__header__icon--green"
                    >
                        入住
                    </span>
                    <span
                        v-else-if="item.ryrzzt == 2"
                        class="staff-info__list__item__header__icon--red"
                    >
                        注销
                    </span>
                    <span v-else-if="item.ryrzzt == 3">其他</span>
                </div>
                <div class="staff-info__list__item__content">
                    <span>姓名：{{ item.ryxm ? item.ryxm : '-' }}</span>
                    <span style="margin-left: 50px;">性别：{{ item.ryxb ? item.ryxb : '-' }}</span>
                    <span style="margin-left: 50px;">身份：{{ item.rysf ? item.rysf : '-' }}</span>
                    <span v-if="item.sfldrk == 0">非流动人口</span>
                    <span v-else-if="item.sfldrk == 1">流动人口</span>
                </div>
            </div>
            <div v-show="loading" style="text-align: center;">载入中...</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StaffInfo',

    props: {
        // 房屋编码
        fwbm: {
            type: [Number, String]
        }
    },

    data() {
        return {
            data: '', // 列表数据
            statistics: '', // 统计数据
            page: 1, // 当前页,
            loading: false,
            totalPage: 1,
        }
    },
    methods: {
        // 请求列表数据
        getData() {
            this.loading = true
            const request = {
                method: 'post',
                url: '/renting/rentingPeopleInfo/list',
                baseURL: window.SITE_CONFIG['baseUrl'],
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    fwbm: this.fwbm,
                    page: this.page,
                    limit: 10
                }
            }
            this.apix(request).then(response => {
                if (response.code === 0) {
                    this.data.push(...response.data.list)
                    this.totalPage = response.data.totalPage
                }
                this.loading = false
            })
        },

        // 请求统计数据
        getStatistics() {
            this.apix(`${window.SITE_CONFIG['baseUrl']}/renting/rentingPeopleInfo/count?fwbm=${this.fwbm}`).then(response => {
                if (response.code === 0) {
                    this.statistics = response.data
                }
            })
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

        // 列表滚动请求更多列表数据
        handleScroll() {
            if (this.page < this.totalPage) {
                this.page += 1
                this.getData()
            }
        },
    },

    watch: {
        // 选中落点改变，初始化data，请求数据
        fwbm: {
            immediate: true,
            handler: function() {
                // 页面data初始化
                this.data = []
                this.statistics = {}
                this.page = 1
                this.totalPage = 1
                // 请求数据
                this.getData()
                this.getStatistics()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$headerHeight: 90px;
.staff-info {
    width: 100%;
    height: 100%;
    // 统计数据
    &__header {
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
            height: $headerHeight;
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
    // 数据列表
    &__list {
        height: calc(100% - #{$headerHeight});

        // 滚动条
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
                    &.staff-info__list__item__header__icon--green {
                        color: white;
                        background: #0BD295;
                        border-color: #0BD295;
                    }
                    &.staff-info__list__item__header__icon--red {
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
</style>
