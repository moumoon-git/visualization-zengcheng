/**
 * @author tanjinfeng
 * @date 2020-10-29
 * @desc 增城区矛盾纠纷调解信息看板
 */

<template>
    <div class="disputes">
        <!-- A. 左边栏 -->
        <div class="disputes__left">
            <!-- 1. 涉案数据统计 -->
            <div class="disputes__title">涉案数据统计</div>
            <div class="disputes__left__statistic">
                <span>
                    <img src="./img/human.png" alt width="72" height="74">
                    <div class="disputes__left__statistic__item">
                        <div>当事人数</div>
                        <div>{{caseStatistics.human}}</div>
                    </div>
                </span>
                <span>
                    <img src="./img/badge.png" alt width="72" height="74">
                    <div class="disputes__left__statistic__item">
                        <div>涉案人数</div>
                        <div>{{caseStatistics.badge}}</div>
                    </div>
                </span>
                <span>
                    <img src="./img/money.png" alt width="72" height="74">
                    <div class="disputes__left__statistic__item">
                        <div>涉案金额</div>
                        <div>{{caseStatistics.money}}</div>
                    </div>
                </span>
            </div>
            <!-- 2. 矛盾纠纷接办趋势 -->
            <div class="disputes__title" style="margin-bottom:240px;position:relative;">矛盾纠纷接办趋势</div>
            <BrokenLineGraph height="280px" :data="trendData"/>
            <!-- 3. 涉案精细化数据统计 -->
            <div class="disputes__title">涉案精细化数据统计</div>
            <div class="disputes__left__detail">
                <div class="disputes__left__detail__banner">
                    <div>
                        <div>{{detail.memberCount}}</div>
                        <div>调解员数量</div>
                    </div>
                    <div>
                        <div>{{detail.organizationCount}}</div>
                        <div>调解组织数量</div>
                    </div>
                    <div>
                        <div>{{detail.moneyCount}}</div>
                        <div>以案定补金额</div>
                    </div>
                </div>
                <div class="disputes__left__detail__banner">
                    <div>
                        <div>{{detail.perform}}</div>
                        <div>履行</div>
                    </div>
                    <div>
                        <div>{{detail.confirm}}</div>
                        <div>申请司法确认</div>
                    </div>
                    <div>
                        <div>{{detail.regret}}</div>
                        <div>达成协议后反悔上诉</div>
                    </div>
                </div>
                <div>
                    <div class="disputes__left__detail__short">
                        <div>满意率</div>
                        <div>{{detail.pleased}}<span>%</span></div>
                    </div>
                    <div class="disputes__left__detail__short">
                        <div>办结率</div>
                        <div>{{detail.done}}<span>%</span></div>
                    </div>
                </div>
                <div class="disputes__left__detail__vortex">
                    <div>
                        <div>{{vortex.total}}</div>
                        <div>总计</div>
                    </div>
                    <div>
                        <div>{{vortex.input}}</div>
                        <div>录入中</div>
                    </div>
                    <div>
                        <div>{{vortex.assigning}}</div>
                        <div>分派中</div>
                    </div>
                    <div>
                        <div>{{vortex.assigned}}</div>
                        <div>已分配</div>
                    </div>
                    <div>
                        <div>{{vortex.todo}}</div>
                        <div>待办中</div>
                    </div>
                    <div>
                        <div>{{vortex.done}}</div>
                        <div>已办结</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- B. 中间栏 -->
        <div class="disputes__middle">
            <!-- 1. 流光效果 -->
            <LightCube/>
            <!-- 2. 时间段切换标签 -->
            <div class="disputes__middle__tab">
                <span
                    class="disputes__middle__tab__item"
                    :class="{'disputes__middle__tab__item--active': middleTabFlag === 1}"
                    @click="middleTabFlag = 1"
                >昨日</span>
                <span
                    class="disputes__middle__tab__item"
                    :class="{'disputes__middle__tab__item--active': middleTabFlag === 2}"
                    @click="middleTabFlag = 2"
                >本月</span>
                <span
                    class="disputes__middle__tab__item"
                    :class="{'disputes__middle__tab__item--active': middleTabFlag === 3}"
                    @click="middleTabFlag = 3"
                >今年</span>
            </div>
            <!-- 3. 气泡 -->
            <BubbleSet ref="BubbleSet"/>
            <!-- 4. 底部饼图 -->
            <div class="disputes__middle__bottom">
                <div>
                    <div class="disputes__title">案件来源分析</div>
                    <PieGraph :data="pieA"/>
                </div>
                <div>
                    <div class="disputes__title">案件调解主体分析</div>
                    <PieGraph :data="pieB"/>
                </div>
                <div>
                    <div class="disputes__title">任务来源分析</div>
                    <PieGraph :data="pieC"/>
                </div>
            </div>
        </div>
        <!-- C. 右边栏 -->
        <div class="disputes__right">
            <!-- 1. 调解员案件抢办统计 -->
            <div>
                <div class="disputes__title">调解员案件抢办统计</div>
                <div class="disputes__right__tab">
                    <span
                        class="disputes__right__tab__item"
                        :class="{'disputes__right__tab__item--active': rightTabA === 1}"
                        @click="rightTabA = 1"
                    >接办</span>
                    <span
                        class="disputes__right__tab__item"
                        :class="{'disputes__right__tab__item--active': rightTabA === 2}"
                        @click="rightTabA = 2"
                    >办结</span>
                </div>
                <table class="disputes__right__table">
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>案例数（件）</th>
                        <th>占比</th>
                    </tr>
                    <tr
                        v-for="(tableItem, tableIndex) in table"
                        :key="`table_item_${tableIndex}`"
                    >
                        <td>{{tableIndex + 1}}</td>
                        <td>{{tableItem.keyString}}</td>
                        <td>{{tableItem.number}}</td>
                        <td>{{tableItem.value}}</td>
                    </tr>
                </table>
            </div>
            <!-- 2. 涉及人群类型统计 -->
            <div>
                <div class="disputes__title">涉及人群类型统计</div>
                <div class="disputes__right__tab">
                    <span
                        class="disputes__right__tab__item"
                        :class="{'disputes__right__tab__item--active': rightTabB === 1}"
                        @click="rightTabB = 1"
                    >接办</span>
                    <span
                        class="disputes__right__tab__item"
                        :class="{'disputes__right__tab__item--active': rightTabB === 2}"
                        @click="rightTabB = 2"
                    >办结</span>
                </div>
                <BarGraph :data="barGraphData"/>
            </div>
            <!-- 3. 案件类型分布统计 -->
            <div>
                <div class="disputes__title" style="margin-bottom: 15px;">案件类型分布统计</div>
                <div class="disputes__right__tab">
                    <select>
                        <option value="1" selected>全部案件类型</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div
                    class="disputes__right__item"
                    v-for="(barItem, barIndex) in distributionData"
                    :key="`distribution_item_${barIndex}`"
                >
                    <div
                        class="disputes__right__item__bar"
                        :class="`disputes__right__item__bar--length${barItem.rate}`"
                    ></div>
                    <div
                        class="disputes__right__item__text"
                    >
                        <span>{{barItem.keyString}}</span>
                        <span>
                            {{barItem.value}}<span>件</span>&nbsp;/&nbsp;{{barItem.number}}<span>%</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 折线图
import BrokenLineGraph from './BrokenLineGraph/BrokenLineGraph'
// 流光效果
import LightCube from '../GarbageClassification/LightCube/LightCube'
// 气泡
import BubbleSet from './Bubble/BubbleSet'
// 饼图
import PieGraph from './PieGraph/PieGraph'
// 柱状图
import BarGraph from './BarGraph/BarGraph'

export default {
    name: 'Disputes',
    components: {
        BrokenLineGraph,
        LightCube,
        BubbleSet,
        PieGraph,
        BarGraph
    },
    data() {
        return {
            // 涉案数据统计
            caseStatistics: {
                human: 0,
                badge: 0,
                money: 0
            },
            // 矛盾纠纷接办趋势
            trendData: {
                x: [],
                legend: [],
                series: [{
                    name: '接报',
                    data: []
                }, {
                    name: '办结',
                    data: []
                }]
            },
            // 涉案精细化数据统计数据-上方
            detail: {
                // 调解员数量
                memberCount: 0,
                // 调解组织数量
                organizationCount: 0,
                // 以案定补金额
                moneyCount: 0,
                // 履行
                perform: 0,
                // 申请司法确认
                confirm: 0,
                // 达成协议后反悔上诉
                regret: 0,
                // 满意率
                pleased: 0,
                // 办结率
                done: 0
            },
            // 涉案精细化数据统计数据-下方
            vortex: {
                // 总计
                total: 0,
                // 录入中
                input: 0,
                // 分派中
                assigning: 0,
                // 已分配
                assigned: 0,
                // 待办中
                todo: 0,
                // 已办结
                done: 0
            },
            // 日期范围切换标签
            middleTabFlag: 1,
            // 案件来源分析数据
            pieA: [],
            // 案件调解主体分析数据
            pieB: [],
            // 任务来源分析
            pieC: [],
            // 调解员案件抢办统计按钮
            rightTabA: 1,
            // 调解员案件抢办统计数据
            table: [{keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}, {keyString: '', value: '', number: ''}],
            // 涉及人群类型统计按钮
            rightTabB: 1,
            // 涉及人群类型统计数据
            barGraphData: {
                x: [],
                series: [{
                    data: []
                }]
            },
            // 案件类型分布统计
            distributionData: []
        }
    },
    methods: {
        /**
         * @method
         * @desc 获取涉案数据统计
         */
        getCaseStatistics() {
            const request = {
                method: 'get',
                url: '/Contradiction/countPartyPeople'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.caseStatistics = {
                        human: res.data[0] && res.data[0].indicatorValue ? res.data[0].indicatorValue : 0,
                        badge: res.data[1] && res.data[1].indicatorValue ? res.data[1].indicatorValue : 0,
                        money: res.data[2] && res.data[2].indicatorValue ? res.data[2].indicatorValue : 0
                    }
                }
            })
        },
        /**
         * @method
         * @desc 获取矛盾纠纷接办趋势
         */
        getTrendData() {
            const request = {
                method: 'get',
                url: '/Contradiction/receptionTrend'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.trendData.legend = ['接报', '办结']
                    res.data.forEach(item => {
                        this.trendData.x.unshift(item.keyString.replace(/^\d{4}-/g, ''))
                        this.trendData.series[0].data.unshift(item.value)
                        this.trendData.series[1].data.unshift(item.value1)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取涉案精细化数据统计-上方数据
         */
        getDetail() {
            const request = {
                method: 'get',
                url: '/Contradiction/countData'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    let num1 = 0, num2 = 0
                    res.data.forEach(item => {
                        switch(item.keyString) {
                            case '调解员数量':
                                this.detail.memberCount = item.value
                                break
                            case '调解组织数量':
                                this.detail.organizationCount = item.value
                                break
                            case '以案定补金额':
                                this.detail.moneyCount = item.value
                                break
                            case '履行':
                                this.detail.perform = item.value
                                break
                            case '申请司法确认':
                                this.detail.confirm = item.value
                                break
                            case '达成协议后反悔上诉':
                                this.detail.regret = item.value
                                break
                            case '满意率':
                                this.detail.pleased = item.value
                                num1 = item.value
                                break
                            case '办结率':
                                this.detail.done = item.value
                                num2 = item.value
                                break
                        }
                    })
                    let func = _ => {this.increaseNum(num1, num2)}
                    setInterval(func, 15000)
                }
            })
        },
        /**
         * @method
         * @desc 获取涉案精细化数据统计-下方数据
         */
        getVortex() {
            const request = {
                method: 'get',
                url: '/Contradiction/contradictionStatus'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    res.data.forEach(item => {
                        switch(item.keyString) {
                            case '总计':
                                this.vortex.total = item.value
                                break
                            case '录入中':
                                this.vortex.input = item.value
                                break
                            case '分派中':
                                this.vortex.assigning = item.value
                                break
                            case '已分配':
                                this.vortex.assigned = item.value
                                break
                            case '待办中':
                                this.vortex.todo = item.value
                                break
                            case '已办结':
                                this.vortex.done = item.value
                                break
                        }
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取案件来源分析数据
         */
        getPieA() {
            const request = {
                method: 'get',
                url: '/Contradiction/sourceAnalyse'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.pieA = res.data
                }
            })
        },
        /**
         * @method
         * @desc 获取案件调解主体分析数据
         */
        getPieB() {
            const request = {
                method: 'get',
                url: '/Contradiction/mediateAnalyse'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.pieB = res.data
                }
            })
        },
        /**
         * @method
         * @desc 获取任务来源分析数据
         */
        getPieC() {
            const request = {
                method: 'get',
                url: '/Contradiction/taskSourceAnalyse'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.pieC = res.data
                }
            })
        },
        /**
         * @method
         * @desc 获取调解员案件抢办统计
         * @param {Number} id 1接办2办结
         */
        getTable(id) {
            const request = {
                method: 'get',
                url: '/Contradiction/mediatorCount',
                params: {
                    id
                }
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    // 填充数据
                    for(let i = 1; i < 10; i++) {
                        res.data.push({
                            keyString: '',
                            number: '',
                            value: ''
                        })
                    }
                    this.table = res.data.splice(0, 10)
                }
            })
        },
        /**
         * @method
         * @desc 获取涉及人群类型统计
         * @param {Number} id 1接办2办结
         */
        getBarGraph(id) {
            const request = {
                method: 'get',
                url: '/Contradiction/casePeopleCount',
                params: {
                    id
                }
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.barGraphData = {
                        x: [],
                        series: [{
                            data: []
                        }]
                    }
                    res.data.forEach(element => {
                        this.barGraphData.x.push(element.keyString)
                        this.barGraphData.series[0].data.push(element.value)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取案件类型分布统计
         * @param {Number} id 待决定
         */
        getDistribution(id) {
            const request = {
                method: 'get',
                url: '/Contradiction/caseDistributionCount',
                params: {
                    id
                }
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    let max = Number(res.data[0].value)
                    res.data.forEach(item => {
                        item.rate = (100 * Number(item.value) / max).toFixed(0)
                    })
                    this.distributionData = res.data
                }
            })
        },
        /**
         * @method
         * @desc 数字上升
         */
        increaseNum(num1, num2) {
            // 满意率
            this.detail.pleased = 0
            let func1 = _ => {
                this.detail.pleased += 2
                this.$forceUpdate()
                if (this.detail.pleased > num1) {
                    this.detail.pleased = num1
                    clearInterval(id1)
                }
            }
            let id1 = setInterval(func1, 50)
            // 办结率
            this.detail.done = 0
            let func2 = _ => {
                this.detail.done += 2
                this.$forceUpdate()
                if (this.detail.done > num2) {
                    this.detail.done = num2
                    clearInterval(id2)
                }
            }
            let id2 = setInterval(func2, 50)
        }
    },
    mounted() {
        this.getCaseStatistics()
        this.getTrendData()
        this.getDetail()
        this.getVortex()
        this.getPieA()
        this.getPieB()
        this.getPieC()
        this.getTable(1)
        this.getBarGraph(1)
        this.getDistribution(1)
    },
    watch: {
        middleTabFlag(val) {
            this.$refs.BubbleSet.getData(val)
        },
        rightTabA(val) {
            this.getTable(val)
        },
        rightTabB(val) {
            this.getBarGraph(val)
        }
    }
}
</script>

<style lang="scss" src="./Disputes.scss">
