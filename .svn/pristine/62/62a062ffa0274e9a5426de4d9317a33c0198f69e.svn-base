<template>
    <div class="pie-graph">
        <div class="pie-graph__container" ref="container"></div>
        <div
            class="pie-graph__count"
            :class="{
                color_0: colorFlag == 0,
                color_1: colorFlag == 1,
                color_2: colorFlag == 2,
                color_3: colorFlag == 3,
                color_4: colorFlag == 4,
                color_5: colorFlag == 5,
                color_6: colorFlag == 6,
                color_7: colorFlag == 7,
                color_8: colorFlag == 8,
                color_9: colorFlag == 9
            }"
        >{{count}}</div>
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
            colorFlag: 1
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
                    {offset: 0, color: '#049EFF'},
                    {offset: 1, color: '#1086FA'}
                ]
            )
            const gradientColor_1 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#A4E548'},
                    {offset: 1, color: '#8AEA63'}
                ]
            )
            const gradientColor_2 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FCD85C'},
                    {offset: 1, color: '#FCCC6B'}
                ]
            )
            const gradientColor_3 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#84DAFF'},
                    {offset: 1, color: '#53BFF9'}
                ]
            )
            const gradientColor_4 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#E4998B'},
                    {offset: 1, color: '#FF8D79'}
                ]
            )
            const gradientColor_5 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#D144C9'},
                    {offset: 1, color: '#EE8BFF'}
                ]
            )
            const gradientColor_6 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#4482EB'},
                    {offset: 1, color: '#5BD4FD'}
                ]
            )
            const gradientColor_7 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FE660B'},
                    {offset: 1, color: '#FE983E'}
                ]
            )
            const gradientColor_8 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#46D0ED'},
                    {offset: 1, color: '#82FFCD'}
                ]
            )
            const gradientColor_9 = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#FEB00A'},
                    {offset: 1, color: '#FFD076'}
                ]
            )
            
            const color = [gradientColor_0, gradientColor_1, gradientColor_2, gradientColor_3, gradientColor_4, gradientColor_5, gradientColor_6, gradientColor_7, gradientColor_8, gradientColor_9]
            const textColor = ['#049EFF', '#A4E548', '#FCD85C', '#84DAFF', '#E4998B', '#D144C9', '#4482EB', '#FE660B', '#46D0ED', '#FEB00A']
            
            let seriesData = []
            for(let i = 0; i < this.data.length; i++) {
                seriesData.push({
                    value: this.data[i].value,
                    name: this.data[i].name,
                    label: {
                        color: textColor[i],
                        // label不显示名字，显示数值
                        formatter: '{c}'
                    },
                    labelLine: {
                        lineStyle: {
                            color: textColor[i]
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
                        this.count = item.value
                        this.colorFlag = item.dataIndex
                    }
                },
                itemStyle: {
                    opacity: 0.7
                },
                series: [{
                    type: 'pie',
                    center: ['40%', '50%'],
                    radius: ['50%', '80%'],
                    data: seriesData
                }]
            }
            PieGraph.setOption(option)
        }
    },
    mounted() {
        this.initialize()
        // 每15秒重新渲染，触发动画
        setInterval(()=>{
            this.initialize()
            this.count = ''
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
.pie-graph {
    width: 100%;
    position: relative;
    &__container {
        width: 100%;
        height: 310px;
    }
    &__count {
        font-size: 80px;
        font-family: 'DCM';
        font-weight: bold;
        text-align: center;
        width: 140px;
        height: 80px;
        line-height: 80px;
        position: absolute;
        top: calc(50% - 40px);
        left: calc(40% - 70px);
        &.color_0 {color: #049EFF}
        &.color_1 {color: #A4E548}
        &.color_2 {color: #FCD85C}
        &.color_3 {color: #84DAFF}
        &.color_4 {color: #E4998B}
        &.color_5 {color: #D144C9}
        &.color_6 {color: #4482EB}
        &.color_7 {color: #FE660B}
        &.color_8 {color: #46D0ED}
        &.color_9 {color: #FEB00A}
    }
}

</style>