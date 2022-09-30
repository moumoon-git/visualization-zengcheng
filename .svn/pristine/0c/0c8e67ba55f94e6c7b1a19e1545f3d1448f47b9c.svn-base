<template>
    <div>
        <canvas class="gc-dashboard" ref='dashboard'></canvas>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    props: {
        num: {
            type: [Number, String],
            default: 0
        },
        title: {
            type: String,
            default: '仪表盘'
        },
        angle: {
            type: [Number, String],
            default: 0
        }
    },
    methods: {
        /**
         * @method
         * @desc 绘制仪表盘
         * @param {Number} num 仪表盘显示读数
         * @param {String} title 仪表盘显示文字
         * @param {Number} angle 仪表盘角度
         */
        drawDashboard(num, title, angle) {
            const canvas = this.$refs.dashboard
            const context = canvas.getContext('2d')
            // 画布宽高
            const canvasWidth = 200
            const canvasHeight = 200
            canvas.width = canvasWidth
            canvas.height = canvasHeight
            // 加载仪表盘
            const dashboard = new Image()
            dashboard.src = require('../img/dashboard.png')
            // 加载仪表盘指示点
            const dot = new Image()
            dot.src = require('../img/dashboard_dot.png')
            // 文字居中
            context.textAlign = 'center'
            // 渲染中的角度
            let currentAngle = 0
            const render = () => {
                // 清除画布
                context.clearRect(0, 0, canvasWidth, canvasHeight)
                // 绘制仪表盘
                context.drawImage(dashboard, 5, 5, 190, 190)
                // 绘制数字
                context.font = '72px "DCM"'
                context.fillStyle = '#458BE9'
                context.fillText(num, canvasWidth/2 - 2, canvasHeight/2 + 4)
                // 绘制标题
                context.font = '32px "Microsoft YaHei", "PingFang SC"'
                context.fillStyle = '#FFFFFF'
                context.fillText(title, canvasWidth/2, canvasHeight/2 + 50)
                // 绘制圆弧
                context.strokeStyle = '#B9E3FC'
                context.lineWidth = 6
                context.beginPath()
                context.arc(canvasWidth/2, canvasHeight/2, 91, 90 * Math.PI/180, (90 + currentAngle) * Math.PI/180)
                context.stroke()
                context.closePath()
                // 绘制仪表盘指示点
                context.save()
                context.translate(canvasWidth/2, canvasHeight/2)
                context.rotate(currentAngle * Math.PI/180)
                context.drawImage(dot, -10, 78, 22, 22)
                context.restore()
                if (currentAngle < angle) {
                    requestAnimationFrame(render)
                    currentAngle + 2 > angle ? currentAngle = angle : currentAngle += 2
                }
            }
            dashboard.onload = () => {
                requestAnimationFrame(render)
            }
        }
    },
    mounted() {
        this.drawDashboard(this.num, this.title, this.angle)
        // 每15秒重新渲染，触发动画
        setInterval(() => {
            this.drawDashboard(this.num, this.title, this.angle)
        }, 15000)
    },
    watch: {
        num: {
            deep: true,
            handler: function() {
                this.drawDashboard(this.num, this.title, this.angle)
            }
        }
    }
}
</script>

<style lang="scss">
.gc-dashboard {
    width: 100px;
}
</style>