<template>
    <div class="broken-line-graph" ref="container"></div>
</template>

<script>
const echarts = require('echarts')
export default {
    name: 'BrokenLineGraph',
    props: {
        height: {
            type: String,
            default: '250px'
        },
        data: {
            type: Object
        },
        color: {
            type: [String, Number]
        }
    },
    data() {
        return {

        }
    },
    methods: {
        /**
         * @method
         * @desc 渲染折线图
         */
        initialize() {
            // 初始化echart
            const BrokenLineGraph = echarts.init(this.$refs.container)
            // 清除内容，用于重复初始动画
            BrokenLineGraph.clear()
            // 调色盘配置
            const gradientColor_0 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#FF8D79'},
                    {offset: 1, color: '#E4998B'}
                ]
            )
            const gradientColor_1 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#e69853'},
                    {offset: 1, color: '#e59360'}
                ]
            )
            const gradientColor_2 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#e16170'},
                    {offset: 1, color: '#e16484'}
                ]
            )
            const gradientColor_3 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#00c6fb'},
                    {offset: 1, color: '#005bea'}
                ]
            )
            const gradientColor_4 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#7cddbb'},
                    {offset: 1, color: '#7dcde0'}
                ]
            )
            const gradientColor_5 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#933ff6'},
                    {offset: 1, color: '#9b3eff'}
                ]
            )
            const gradientColor_6 = new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#FF5C7E'},
                    {offset: 1, color: '#FF74B3'}
                ]
            )
            const color = [gradientColor_0, gradientColor_1, gradientColor_2, gradientColor_3, gradientColor_4, gradientColor_5, gradientColor_6]
            // 标注区域数据
            let markAreaData = []
            for(let i = 0; i <= this.data.x.length; i++) {
                markAreaData.push([{xAxis: i}, {xAxis: i + 2}])
            }
            // 显示的数据
            let series = []
            this.data.series.forEach(element => {
                series.push(Object.assign(
                    {},
                    element,
                    {
                        type: 'line',
                        // 折线平滑
                        smooth: true,
                        // 点标记形状
                        symbol: 'circle',
                        // 点标记大小
                        symbolSize: 6,
                        // 标注区域
                        markArea: {
                            data: markAreaData,
                            // 默认透明
                            itemStyle: {
                                color: 'transparent'
                            },
                            // 鼠标移入显示颜色
                            emphasis: {
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: 'transparent'},
                                            {offset: 1, color: 'rgba(63, 127, 214, .4)'}
                                        ]
                                    )
                                }
                            }
                        }
                    }
                ))
            })
            // 渲染数据配置
            const option = {
                color: this.color ? [color[this.color]] : color,
                // 动画持续时间（ms）
                animationDuration: 3000,
                // 坐标轴
                grid: {
                    right: 0,
                    left: '80px'
                },
                // 鼠标悬停框
                tooltip: {
                    trigger: 'axis',
                    extraCssText: 'background: linear-gradient(-120deg, rgba(28, 197, 255, 1), rgba(125, 30, 255, 1));'
                },
                // 图例
                legend: {
                    data: this.data.legend,
                    right: '0',
                    top: '0',
                    textStyle: {
                        color: '#D9E1ED',
                        fontSize: 14
                    },
                    icon: 'roundRect'
                },
                // x轴
                xAxis: {
                    // x轴显示的数据
                    data: this.data.x,
                    // 标签文字样式
                    axisLabel: {
                        // 完整显示
                        interval: 0,
                        // 旋转
                        rotate: 30,
                        // 颜色
                        color: '#325476',
                        // 字号
                        fontSize: 12,
                        // 间隔
                        margin: 20
                    },
                    // 隐藏轴线
                    axisLine: {show: false},
                    // 隐藏刻度
                    axisTick: {show: false}
                },
                // y轴
                yAxis: {
                    // 隐藏轴线
                    axisLine: {show: false},
                    // 隐藏刻度
                    axisTick: {show: false},
                    // 标签样式
                    axisLabel: {
                        color: '#325476',
                        fontSize: 16,
                        margin: 20
                    },
                    // 分割线
                    splitLine: {lineStyle: {color: '#1A1C55'}}
                },
                // 显示的数据
                series
            }
            BrokenLineGraph.setOption(option)
        }
    },
    mounted() {
        this.$refs.container.style.height = this.height
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
                this.initialize()
            }
        }
    }
}
</script>