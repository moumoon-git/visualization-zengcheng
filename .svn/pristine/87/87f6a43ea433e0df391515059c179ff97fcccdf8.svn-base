// @author tanjinfeng
// @date 2020-09-11
// @desc 垃圾分类可视化页面
<template>
    <div class="gc__container">
        <!-- A. 左边栏 -->
        <div class="gc__left">
            <!-- 1. 仪表盘数据统计 -->
            <div class="gc__title">垃圾分类点位数量</div>
            <div class="gc__left__dashboard">
                <Dashboard
                    :num = "classificationSiteCount.total"
                    title = "总数"
                    angle = "360"
                />
                <Dashboard
                    :num = "classificationSiteCount.fixed"
                    title = "定时点"
                    :angle = "360 * (classificationSiteCount.fixed / classificationSiteCount.total)"
                />
                <Dashboard
                    :num = "classificationSiteCount.outdated"
                    title = "误时点"
                    :angle = "360 * (classificationSiteCount.outdated / classificationSiteCount.total)"
                />
            </div>
            <!-- 2. 折线图统计 -->
            <div class="gc__title">垃圾回收量（吨）</div>
            <BrokenLineGraph
                height="250px"
                :data="retrieveCount"
            />
            <!-- 3. 横幅统计 -->
            <div class="gc__title">精细化模板</div>
            <div class="gc__left__banner">
                <div
                    class="gc__left__banner__item"
                    v-for="(array, index) in delicacyTemplate"
                    :key="`delicacyTemplate_array_${index}`"
                >
                    <span
                        v-for="(item, item_index) in array"
                        :key="`delicacyTemplate_item_${item_index}`"
                    >
                        <div :class="{ie: isIE}">
                            {{item.value}}
                            <span v-if="index == 2 && item_index !== 2">次</span>
                            <span v-else-if="index == 2 && item_index == 2">%</span>
                            <span v-else-if="index == 3">次</span>
                            <span v-else-if="index == 1">人</span>
                        </div>
                        <div>{{item.keyString}}</div>
                    </span>
                </div>
            </div>
            <!-- 4. 五类图标统计 -->
            <div class="gc__title">监督执法</div>
            <StatisticsWithIcon :data="superviseAndEnforcement"/>
        </div>
        <!-- B. 中间栏 -->
        <div class="gc__middle">
            <!-- 1. 流光方块 -->
            <LightCube/>
            <!-- 2. 上方气泡统计 -->
            <div class="gc__middle__upper">
                <!-- 标题 -->
                <div class="gc__title">
                    分类成效
                </div>
                <!-- 标签切换 -->
                <div class="gc__middle__upper__tab">
                    <span
                        class="gc__middle__upper__tab__item"
                        :class="{'gc__middle__upper__tab__item--active': middleTabFlag === 1}"
                        @click="middleTabFlag = 1"
                    >昨日</span>
                    <span
                        class="gc__middle__upper__tab__item"
                        :class="{'gc__middle__upper__tab__item--active': middleTabFlag === 2}"
                        @click="middleTabFlag = 2"
                    >本月</span>
                    <span
                        class="gc__middle__upper__tab__item"
                        :class="{'gc__middle__upper__tab__item--active': middleTabFlag === 3}"
                        @click="middleTabFlag = 3"
                    >今年</span>
                </div>
                <!-- 浮动气泡 -->
                <BubbleSet
                    :flag="middleTabFlag"
                />
            </div>
            <!-- 3. 下方折线图 -->
            <div class="gc__middle__lower">
                <div class="gc__middle__lower__item">
                    <div class="gc__title">巡查异常趋势</div>
                    <BrokenLineGraph
                        height="300px"
                        :data="inspectUnusualTrend"
                        color="4"
                    />
                </div>
                <div class="gc__middle__lower__item">
                    <div class="gc__title">分类知晓率趋势</div>
                    <BrokenLineGraph
                        height="300px"
                        :data="classificationKnowledgeRate"
                        color="5"
                    />
                </div>
                <div class="gc__middle__lower__item">
                    <div class="gc__title">厨余垃圾精准率趋势</div>
                    <BrokenLineGraph
                        height="300px"
                        :data="foodWasteAccuracyTrend"
                        color="6"
                    />
                </div>
            </div>
        </div>
        <!-- C. 右边栏 -->
        <div class="gc__right">
            <!-- 1. 上方柱状图 -->
            <div class="gc__right__upper">
                <div class="gc__title">绩效评估</div>
                <BarGraph :data="performanceEvaluation"/>
            </div>
            <!-- 2. 下方饼图 -->
            <div class="gc__right__lower">
                <div class="gc__title">物流去向</div>
                <PieGraph :data="logisticsDestination"/>
                <div class="gc__right__lower__detail">
                    <div
                        class="gc__right__lower__detail__item"
                        v-for="(item, index) in logisticsDestination"
                        :key="`logistics_item_${index}`"
                    >
                        <div class="gc__right__lower__detail__item__value">{{(item.value * 100 / logisticsTotalCount).toFixed(2)}}%</div>
                        <div class="gc__right__lower__detail__item__name">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 仪表盘
import Dashboard from './Dashboard/Dashboard.vue'
// 折线图
import BrokenLineGraph from './BrokenLineGraph/BrokenLineGraph.vue'
// 五类图标统计
import StatisticsWithIcon from './StatisticsWithIcon/StatisticsWithIcon.vue'
// 发光方块
import LightCube from './LightCube/LightCube.vue'
// 浮动气泡集合
import BubbleSet from './Bubble/BubbleSet.vue'
// 柱状图
import BarGraph from './BarGraph/BarGraph.vue'
// 饼图
import PieGraph from './PieGraph/PieGraph.vue'

export default {
    name: 'GarbageClassification',
    components: {
        Dashboard,
        BrokenLineGraph,
        StatisticsWithIcon,
        BubbleSet,
        LightCube,
        BarGraph,
        PieGraph
    },
    data() {
        return {
            isIE: false,
            // 当前激活的日期标签
            middleTabFlag: 1,
            // 垃圾分类点位数量
            classificationSiteCount: {
                total: '',
                fixed: '',
                outdated: ''
            },
            // 垃圾回收量
            retrieveCount: {
                x: [],
                legend: [],
                series: [{
                    name: '其他',
                    data: []
                }, {
                    name: '可回收',
                    data: []
                }, {
                    name: '厨余',
                    data: []
                }, {
                    name: '有害',
                    data: []
                }]
            },
            // 精细化模板
            delicacyTemplate: '',
            // 监督执法
            superviseAndEnforcement: [0, 0, 0, 0, 0],
            // 巡查异常趋势
            inspectUnusualTrend: {
                x: [],
                legend: [],
                series: [{
                    name: '巡查异常趋势',
                    data: []
                }]
            },
            // 分类知晓率
            classificationKnowledgeRate: {
                x: [],
                legend: [],
                series: [{
                    name: '分类知晓率趋势',
                    data: []
                }]
            },
            // 厨余垃圾精准率趋势
            foodWasteAccuracyTrend: {
                x: [],
                legend: [],
                series: [{
                    name: '分类知晓率趋势',
                    data: []
                }]
            },
            // 绩效评估
            performanceEvaluation: {
                x: [],
                series: [{
                    data: []
                }]
            },
            // 物流去向
            logisticsDestination: [],
            logisticsTotalCount: 0
        }
    },
    computed: {},
    methods: {
        /**
         * @method
         * @desc 获取【垃圾分类点位数量】
         */
        getClassificationSiteCount() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/point'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.classificationSiteCount = {
                        total: response.data[2].value,
                        fixed: response.data[1].value,
                        outdated: response.data[0].value
                    }
                }
            })
        },
        /**
         * @method
         * @desc 获取【垃圾回收量】
         */
        getRetrieveCount() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageRecoveryCount'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.retrieveCount.legend = ['其他', '可回收', '厨余', '有害']
                    response.data.forEach(element => {
                        this.retrieveCount.x.unshift(`${element.countDate.split('-')[1]}-${element.countDate.split('-')[2]}`)
                        this.retrieveCount.series[0].data.unshift(element.otherWaste)
                        this.retrieveCount.series[1].data.unshift(element.recyclableWaste)
                        this.retrieveCount.series[2].data.unshift(element.foodWaste)
                        this.retrieveCount.series[3].data.unshift(element.harmfulWaste)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取【精细化模板】
         */
        getDelicacyTemplate() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageTemplateCount'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.delicacyTemplate = response.data
                }
            })
        },
        /**
         * @method
         * @desc 获取【监督执法】
         */
        getSuperviseAndEnforcement() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageHandle'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.superviseAndEnforcement = [0, 0, 0, 0, 0]
                    response.data.forEach(element => {
                        switch(element.keyString) {
                            case '黄牌':
                                this.superviseAndEnforcement[0] = element.value
                                break
                            case '红牌':
                                this.superviseAndEnforcement[1] = element.value
                                break
                            case '拒收':
                                this.superviseAndEnforcement[2] = element.value
                                break
                            case '责令整改':
                                this.superviseAndEnforcement[3] = element.value
                                break
                            case '行政处罚':
                                this.superviseAndEnforcement[4] = element.value
                                break
                        }
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取【巡查异常趋势】
         */
        getInspectUnusualTrend() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageInvestigationTrend'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.inspectUnusualTrend.legend = []
                    response.data.forEach(element => {
                        this.inspectUnusualTrend.x.unshift(`${element.keyString.split('-')[1]}-${element.keyString.split('-')[2]}`)
                        this.inspectUnusualTrend.series[0].data.unshift(element.value)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取【分类知晓率】
         */
        getClassificationKnowledgeRate() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageSortknowAcuuracyTrend'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.classificationKnowledgeRate.legend = []
                    response.data.forEach(element => {
                        this.classificationKnowledgeRate.x.unshift(`${element.keyString.split('-')[1]}-${element.keyString.split('-')[2]}`)
                        this.classificationKnowledgeRate.series[0].data.unshift(element.value)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取【厨余垃圾精准率趋势】
         */
        getFoodWasteAccuracyTrend() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageFoodAccuracyTrend'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.foodWasteAccuracyTrend.legend = []
                    response.data.forEach(element => {
                        this.foodWasteAccuracyTrend.x.unshift(`${element.keyString.split('-')[1]}-${element.keyString.split('-')[2]}`)
                        this.foodWasteAccuracyTrend.series[0].data.unshift(element.value)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取【绩效评估】
         */
        getPerformanceEvaluation() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageEvaluation'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    response.data.forEach(element => {
                        this.performanceEvaluation.x.push(element.keyString)
                        this.performanceEvaluation.series[0].data.push(element.value)
                    })
                }
            })
        },
        /**
         * @method
         * @desc 获取【物流去向】
         */
        getLogisticsDestination() {
            const request = {
                method: 'get',
                url: '/garbage/visualization/garbageLogistics'
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    let count = 0
                    response.data.forEach(element => {
                        this.logisticsDestination.push({
                            name: element.keyString,
                            value: element.value
                        })
                        count += Number(element.value)
                    })
                    this.logisticsTotalCount = count
                }
            })
        }
    },
    mounted() {
        this.getClassificationSiteCount()
        this.getRetrieveCount()
        this.getDelicacyTemplate()
        this.getSuperviseAndEnforcement()
        this.getInspectUnusualTrend()
        this.getClassificationKnowledgeRate()
        this.getFoodWasteAccuracyTrend()
        this.getPerformanceEvaluation()
        this.getLogisticsDestination()
        // 判断ie浏览器
        navigator.userAgent.indexOf('Trident') > -1 ? this.isIE = true : null
    },
}
</script>

<style lang="scss" src="./GarbageClassification.scss">
