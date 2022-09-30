<template>
    <div class="pie-graph">
        <div class="pie-graph__container" ref="container"></div>
        <div class="pie-graph__count">{{count}}<span v-show="count">%</span></div>
        <div class="pie-graph__board">
            <div
                class="pie-graph__board__item"
                :class="`color_${index}`"
                v-for="(item, index) in data"
                :key="`board_item_${index}`"
            >
                {{item.keyString}}
            </div>
        </div>
    </div>
</template>

<script>
const echarts = require('echarts')
export default {
    name: 'PieGraph',
    props: {
        data: {
            type: Array
        }
    },
    data() {
        return {
            count: '',
            colorFlag: 1,
            currentActive: 0
        }
    },
    methods: {
        initialize() {
            // 初始化echart
            const PieGraph = echarts.init(this.$refs.container)
            // 清除内容，用于重复初始动画
            PieGraph.clear()
            // 调色盘配置
            const gradientColor_0 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FF0F6F'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_1 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#3F99E2'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_2 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#DD6A50'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_3 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FFD748'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_4 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#12EBB0'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_5 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#2EE6F6'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_6 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#C335EF'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_7 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FE660B'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_8 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#46D0ED'},
                    {offset: 1, color: '#333333'}
                ]
            )
            const gradientColor_9 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FEB00A'},
                    {offset: 1, color: '#333333'}
                ]
            )
            
            const color = [gradientColor_0, gradientColor_1, gradientColor_2, gradientColor_3, gradientColor_4, gradientColor_5, gradientColor_6, gradientColor_7, gradientColor_8, gradientColor_9]
            const textColor = ['#FF0F6F', '#3F99E2', '#DD6A50', '#FFD748', '#12EBB0', '#2EE6F6', '#C335EF', '#FE660B', '#46D0ED', '#FEB00A']
            
            let seriesData = []
            for(let i = 0; i < this.data.length; i++) {
                seriesData.push({
                    value: this.data[i].value,
                    name: this.data[i].keyString,
                    label: {
                        show: false,
                        color: textColor[i],
                        fontSize: 14,
                        formatter: [
                            '{c}{a|件}',
                            '{b|{b}}'
                        ].join('\n'),
                        rich: {
                            a: {
                                fontSize: 10,
                                color: textColor[i]
                            },
                            b: {
                                fontSize: 10,
                                color: '#FFFFFF'
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                        lineStyle: {
                            color: textColor[i]
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: true
                        }
                    }
                })
            }
            
            const option = {
                color,
                label: {
                    show: true,
                    fontSize: 23,
                    fontFamily: 'DCM'
                },
                tooltip: {
                    formatter: item => {
                        this.count = Number(item.percent).toFixed(1)
                        this.colorFlag = item.dataIndex
                    }
                },
                itemStyle: {
                    opacity: 0.7
                },
                series: [{
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['45%', '75%'],
                    avoidLabelOverlap: false,
                    label: {
                        position: 'outer',
                        alignTo: 'labelLine',
                        margin: 10
                    },
                    data: seriesData
                }]
            }
            PieGraph.setOption(option)
            PieGraph.dispatchAction({type: 'highlight',seriesIndex: 0, dataIndex: this.currentActive})
            PieGraph.on('mouseover', v => {
                if (v.dataIndex != this.currentActive) {
                    PieGraph.dispatchAction({type: 'downplay',seriesIndex: 0, dataIndex: this.currentActive})
                }
                this.currentActive = v.dataIndex
            })
            PieGraph.on('mouseout', v => {
                PieGraph.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: this.currentActive})
            })
        }
    },
    mounted() {
        this.initialize()
        // 每15秒重新渲染，触发动画
        setInterval(()=>{
            this.initialize()
        }, 15000)
    },
    watch: {
        data: {
            deep: true,
            handler: function() {
                let count = 0
                this.data.forEach(e => {
                    count += Number(e.value)
                })
                this.count = (100 * Number(this.data[0].value) / count).toFixed(1)
                this.initialize()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.pie-graph {
    width: 100%;
    height: 320px;
    position: relative;
    &__container {
        width: 100%;
        height: 200px;
    }
    &__count {
        font-size: 39px;
        font-family: 'DCM';
        font-weight: bold;
        text-align: center;
        width: 80px;
        height: 80px;
        line-height: 80px;
        position: absolute;
        top: 60px;
        left: calc(50% - 40px);
        color: #99C9E7;
        & > span {
            font-size: 22px;
        }
    }
    &__board {
        background: linear-gradient(to right,  rgba(72, 159, 248, 0.2),  transparent 80%);
        height: 107px;
        margin: 5px 5px 10px;
        overflow: auto;
        font-size: 0;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        &__item {
            color: #9AC9E7;
            font-size: 14px;
            display: inline-block;
            height: 33px;
            line-height: 33px;
            position: relative;
            padding-left: 30px;
            &::before {
                content: '';
                display: inline-block;
                position: absolute;
                left: 5px;
                top: 7px;
                height: 16px;
                width: 16px;
                border: 2px solid #9AC9E7;
                border-radius: 18px;
            }
            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                left: 12px;
                top: 14px;
                width: 6px;
                height: 6px;
                background: #9AC9E7;
                border-radius: 5px;
            }
        }
        .color_0 {
            &::before {border-color: #FF0F6F}
            &::after {background-color: #FF0F6F}
        }
        .color_1 {
            &::before {border-color: #3F99E2}
            &::after {background-color: #3F99E2}
        }
        .color_2 {
            &::before {border-color: #DD6A50}
            &::after {background-color: #DD6A50}
        }
        .color_3 {
            &::before {border-color: #FFD748}
            &::after {background-color: #FFD748}
        }
        .color_4 {
            &::before {border-color: #12EBB0}
            &::after {background-color: #12EBB0}
        }
        .color_5 {
            &::before {border-color: #2EE6F6}
            &::after {background-color: #2EE6F6}
        }
        .color_6 {
            &::before {border-color: #C335EF}
            &::after {background-color: #C335EF}
        }
    }
}

</style>