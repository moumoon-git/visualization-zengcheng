<template>
    <div>
        <canvas class="gc-light-cube" ref="light"></canvas>
    </div>
</template>

<script>
export default {
    name: 'LightCube',
    methods: {
        /**
         * @method
         * @desc 初始化canvas动画
         */
        initialize() {
            // 获取画布引用
            const canvas = this.$refs.light
            const context = canvas.getContext('2d')
            // 设置画布宽高
            const canvasWidth = 720
            const canvasHeight = 500
            canvas.width = canvasWidth
            canvas.height = canvasHeight
            // 设置流光样式
            context.fillStyle = 'white'
            context.shadowColor = '#A5FBFD'
            context.shadowBlur = 5
            const lightRadius = 6

            // 绘制流光（竖直）
            let y_1 = 177
            let direction_1 = 'down'
            const drawLight_1 = () => {
                context.beginPath()
                context.arc(356, y_1, lightRadius, 0, 2 * Math.PI)
                context.fill()
                context.closePath()
                if (direction_1 == 'down') {
                    y_1 < 400 ? y_1 += 2 : direction_1 = 'up'
                } else if (direction_1 == 'up') {
                    y_1 > 177 ? y_1 -= 2 : direction_1 = 'down'
                }
            }
            // 绘制流光（顶层）
            let y_2 = 0
            let direction_2 = 'right-down'
            const drawLight_2 = () => {
                context.save()
                switch(direction_2) {
                    case 'right-down':
                        context.translate(162, 104)
                        context.rotate(-70 * Math.PI/180)
                        break
                    case 'right-up':
                        context.translate(356, 177)
                        context.rotate(250 * Math.PI/180)
                        break
                    case 'left-up':
                        context.translate(548, 102)
                        context.rotate(109.5 * Math.PI/180)
                        break
                    case 'left-down':
                        context.translate(355, 31)
                        context.rotate(69.5 * Math.PI/180)
                        break
                }
                context.beginPath()
                if(y_2 <= 200) {
                    context.arc(0, y_2, lightRadius, 0, 2 * Math.PI)
                    y_2 += 2
                } else {
                    y_2 = 0
                    direction_2 == 'right-down' ? direction_2 = 'right-up' :
                    direction_2 == 'right-up' ? direction_2 = 'left-up' :
                    direction_2 == 'left-up' ? direction_2 = 'left-down' : direction_2 = 'right-down'
                }
                context.fill()
                context.closePath()
                context.restore()
            }
            // 绘制流光（中层）
            let y_3 = 0
            let direction_3 = 'right-down'
            const drawLight_3 = () => {
                context.save()
                switch(direction_3) {
                    case 'right-down':
                        context.translate(555, 168)
                        context.rotate(-70 * Math.PI/180)
                        break
                    case 'left-down':
                        context.translate(655, 205)
                        context.rotate(69.5 * Math.PI/180)
                        break
                    case 'left-up':
                        context.translate(356, 316)
                        context.rotate(110.5 * Math.PI/180)
                        break
                    case 'right-up':
                        context.translate(63, 205)
                        context.rotate(-110 * Math.PI/180)
                        break
                }
                context.beginPath()
                let limit = 100
                direction_3 == 'left-down' || direction_3 == 'left-up' ? limit = 320 : null
                if(y_3 <= limit) {
                    context.arc(0, y_3, lightRadius, 0, 2 * Math.PI)
                    y_3 += 2
                } else {
                    y_3 = 0
                    direction_3 == 'right-down' ? direction_3 = 'left-down' :
                    direction_3 == 'left-down' ? direction_3 = 'left-up' :
                    direction_3 == 'left-up' ? direction_3 = 'right-up' : direction_3 = 'right-down'
                }
                context.fill()
                context.closePath()
                context.restore()
            }
            // 逐帧渲染所有流光
            const render = () => {
                // 只显示canvas上原图像的重叠部分
                context.globalCompositeOperation = 'destination-in'
                // 设置绘制透明度
                context.globalAlpha = 0.97
                // 将原图像变透明
                context.fillRect(0, 0, canvasWidth, canvasHeight)
                // 图片组合方式恢复为默认
                context.globalCompositeOperation = 'source-over'
                drawLight_1()
                drawLight_2()
                drawLight_3()
                requestAnimationFrame(render)
            }
            requestAnimationFrame(render)
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>

<style lang="scss">
.gc-light-cube {
    width: 360px;
    position: absolute;
    left: calc(50% - 165px);
    top: 281px;
}
</style>
