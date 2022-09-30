<template>
    <div class="bar-graph" ref="container"></div>
</template>

<script>
const echarts = require('echarts')
export default {
    name: 'BarGraph',
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        initialize() {
            // 初始化echart
            const BarGraph = echarts.init(this.$refs.container)
            // 清除内容，用于重复初始动画
            BarGraph.clear()
            // 调色盘配置
            const gradientBlue = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#4489E6'},
                    {offset: 1, color: '#64C8CA'}
                ]
            )

            let series = []
            this.data.series.forEach(element => {
                series.push(Object.assign(
                    {
                        type: 'bar',
                        roundCap: true,
                        barWidth: 14,
                        barGap: 36,
                        itemStyle: {
                            color: gradientBlue,
                            barBorderRadius: 7
                        }
                    },
                    element
                ))
            })

            const option = {
                // 动画持续时间（ms）
                animationDuration: 3000,
                grid: {
                    top: 20,
                    height: 230,
                    show: true,
                    backgroundColor: 'rgba(80, 159, 248, .06)',
                    borderColor: 'transparent'
                },
                // 鼠标悬停框
                tooltip: {
                    trigger: 'axis',
                    extraCssText: 'background: linear-gradient(-120deg, rgba(28, 197, 255, 1), rgba(125, 30, 255, 1));'
                },
                xAxis: {
                    // data: [
                    //     '西街',
                    //     '左竹园',
                    //     '濂泉西',
                    //     '先烈东横路',
                    //     '新一街',
                    //     '永福正街',
                    //     '水荫四横路'
                    // ],
                    data: this.data.x,
                    // 标签
                    axisLabel: {
                        // 完整显示
                        interval: 0,
                        // 旋转
                        rotate: 45,
                        color: '#62849F',
                        fontSize: 12,
                        margin: 20,
                        // 换行处理
                        formatter:function(val){
                            let result = []
                            for (let i = 0; i < val.length; i+= 7) {
                                result.push(val.substring(i, i + 7))
                            }
                            return result.join("\n")
                        }
                    },
                    // 轴线
                    axisLine: {
                        show: false,
                    },
                    // 刻度
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisLine: {
                        show: false,
                    },
                    // 刻度
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#168EEF',
                        fontSize: 16,
                        margin: 20
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#1A1C55'
                        }
                    }
                },
                series
            }
            BarGraph.setOption(option)
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
                this.initialize()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.bar-graph {
    width: 100%;
    height: 340px;
}
</style>