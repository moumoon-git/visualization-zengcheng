<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗-出入统计页面
-->

<template>
    <div class="in-out-stat">
        <!-- 1. 顶部日期范围选择器 -->
        <div class="in-out-stat__date">
            <span
                :class="['in-out-stat__date__button', { 'in-out-stat__date__button--active': dateIntervals === 1 }]"
                @click="dateIntervals = 1"
            >
                今日
            </span>
            <span
                :class="['in-out-stat__date__button', { 'in-out-stat__date__button--active': dateIntervals === 2 }]"
                @click="dateIntervals = 2"
            >
                本周
            </span>
            <span
                :class="['in-out-stat__date__button', { 'in-out-stat__date__button--active': dateIntervals === 3 }]"
                @click="dateIntervals = 3"
            >
                本月
            </span>
            <span
                :class="['in-out-stat__date__button', { 'in-out-stat__date__button--active': dateIntervals === 4 }]"
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
        <!-- 2. 统计数据 -->
        <div class="in-out-stat__statistics">
            <span>
                <div>{{ statistics.inMemberCount || statistics.inMemberCount == 0 ? statistics.inMemberCount : '-' }}</div>
                <div>进门人数</div>
            </span>
            <span>
                <div>{{ statistics.inCount || statistics.inCount == 0 ? statistics.inCount : '-' }}</div>
                <div>进门人次</div>
            </span>
            <span>
                <div>{{ statistics.outMemberCount || statistics.outMemberCount == 0 ? statistics.outMemberCount : '-' }}</div>
                <div>出门人数</div>
            </span>
            <span>
                <div>{{ statistics.outCount || statistics.outCount == 0 ? statistics.outCount : '-' }}</div>
                <div>出门人次</div>
            </span>
        </div>
        <!-- 3. 筛选搜索框 -->
        <div class="in-out-stat__search">
            <span 
                :class="['in-out-stat__search__button', { 'in-out-stat__search__button--active': this.statParams.crlx === '' }]"
                @click="handleButton('')"
            >
                全部
            </span>
            <span
                :class="['in-out-stat__search__button', { 'in-out-stat__search__button--active': this.statParams.crlx === '1' }]"
                @click="handleButton('1')"
            >
                进门
            </span>
            <span
                :class="['in-out-stat__search__button', { 'in-out-stat__search__button--active': this.statParams.crlx === '2' }]"
                @click="handleButton('2')"
            >
                出门
            </span>
            <el-input
                v-model="keyword"
                placeholder="请输入人员姓名或卡号查询"
                :clearable="true"
                @change="
                    stat = []
                    statParams.search = keyword
                "
            />
        </div>
        <!-- 4. 数据列表 -->
        <div
            class="in-out-stat__list"
            v-infinite-scroll="handleScroll"
        >
            <div
                class="in-out-stat__list__item"
                v-for="(item, index) in stat"
                :key="`stat_item_${index}`"
                @click="item.people && item.people.id ? $emit('show-detail', item.people.id) : null"
            >
                <div class="in-out-stat__list__item__header">
                    <span>时间：{{ item.rycrsj ? transformDate(item.rycrsj) : '-' }}</span>
                    <span>{{ item.crlx ? item.crlx : '-' }}</span>
                </div>
                <div class="in-out-stat__list__item__content">
                    <span> 姓名：{{ item.people && item.people.ryxm ? item.people.ryxm : '-' }}</span>
                    <span style="margin-left: 50px;">性别：{{ item.people && item.people.ryxb ? item.people.ryxb : '-' }}</span>
                    <span style="margin-left: 50px;">房间号：{{ item.room && item.room.fjh ? item.room.fjh : '-' }}</span>
                </div>
            </div>
            <!-- 载入中提示词 -->
            <div v-show="loading" style="text-align: center;">加载中...</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InOutStat',

    props: {
        // 房屋编码
        fwbm: {
            type: [Number, String]
        }
    },

    data() {
        return {
            dateRange: '', // 日期范围选择器取值
            dateIntervals: 0, // 日期范围选择快捷键取值：0-自定义日期，1-今日，2-本周，3-本月，4-本年
            stat: '', // 列表数据
            statParams: { // 列表请求参数
                fwbm: '',
                startTime: '',
                endTime: '',
                page: 1,
                limit: 10,
                crlx: '',
                search: ''
            },
            statistics: '', // 统计数据
            keyword: '', // 搜索框取值
            totalPage: 1, // 列表总页数，用于滚动时判断是否请求更多数据
            loading: false, // 是否显示列表“载入中...”提示词
        }
    },

    methods: {
        // 获取列表数据
        getData() {
            this.loading = true
            const request = {
                method: 'post',
                url: '/renting/rentingAcscomegoInfo/list',
                baseURL: window.SITE_CONFIG.baseUrl,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: {...this.statParams},
            }
            this.apix(request).then(response => {
                if (response.code === 0) {
                    this.stat.push(...response.data.list)
                    this.totalPage = response.data.totalPage
                }
                this.loading = false
            }).catch(error => {
                this.loading = false
            })
        },

        // 获取统计数据
        getStatistics() {
            const request = {
                method: 'post',
                url: '/renting/rentingAcscomegoInfo/count',
                baseURL: window.SITE_CONFIG.baseUrl,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: {
                    fwbm: this.statParams.fwbm,
                    startTime: this.statParams.startTime,
                    endTime: this.statParams.endTime,
                }
            }
            this.apix(request).then(response => {
                if (response.code === 0) {
                    this.statistics = response.data
                }
            })
        },

        /**
         * @description 全部、进门、出门按钮点击，修改请求参数crlx
         * @param {String} flag ''-全部，'1'-进门，'2'-出门
         */
        handleButton(flag) {
            this.stat = []
            Object.assign(
                this.statParams,
                {
                    page: 1,
                    crlx: flag
                }
            )
        },

        // 列表滚动请求更多列表数据
        handleScroll() {
            if (this.statParams.page < this.totalPage) {
                this.statParams.page += 1
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
        // 选中落点变更，更新数据
        fwbm: {
            immediate: true,
            handler: function(fwbm) {
                // 初始化数据
                this.dateIntervals = 0
                this.dateRange = ''
                this.statParams.fwbm = fwbm
                this.statParams.page = 1
                this.statParams.crlx = ''
                this.statParams.search = ''
                this.stat = []
                // 请求统计数据
                this.getStatistics()
            }
        },

        // 请求参数变更，请求列表数据
        statParams: {
            deep: true,
            immediate: true,
            handler: function(val) {
                this.getData()
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
                this.stat = []
                this.statParams.page = 1
                if (Array.isArray(val)) {
                    this.statParams.startTime = val[0] + ' 00:00:00'
                    this.statParams.endTime = val[1] + ' 23:59:59'
                } else {
                    this.statParams.startTime = ''
                    this.statParams.endTime = ''
                }
                // 请求统计数据
                this.getStatistics()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.in-out-stat {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 10px;

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

    // 搜索
    &__search {
        padding: 0 10px;
        text-align: center;
        margin-bottom: 10px;
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
        // 搜索框
        /deep/ .el-input {
            width: 400px;
            height: 30px;
            &__inner {
                width: 100%;
                height: 100%;
                background: transparent;
                border: 1px solid #3F92FE;
                font-size: 14px;
            }
            &__icon {
                line-height: 28px;
            }
        }
    }

    // 数据列表
    &__list {
        height: 550px;
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
