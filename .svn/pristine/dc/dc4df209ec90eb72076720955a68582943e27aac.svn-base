<template>
    <div
        class="bubble"
        :class="{'bubble--small': type === 'small', 'bubble--medium': type === 'medium', 'bubble--large': type === 'large', ie: isIE}"
    >
        <div
            class="bubble__inner"
            ref="bubble"
        >
            <div class="bubble__statistics">
                <!-- 百分比 -->
                <span
                    class="percentage"
                    v-if="data.percentage || data.percentage == 0"
                >
                    <!-- 趋势箭头 -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="10px"
                        v-if="data.trend == 'up'"
                    >
                        <defs>
                            <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="20%" stop-color="#A921F7"/>
                                <stop offset="100%" stop-color="#1CC5FF"/>
                            </linearGradient>
                        </defs>
                        <polygon points="0,12 12,12 6,0" fill="url(#linear)"/>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="10px"
                        v-else-if="data.trend == 'down'"
                    >
                        <defs>
                            <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="20%" stop-color="#A921F7"/>
                                <stop offset="100%" stop-color="#1CC5FF"/>
                            </linearGradient>
                        </defs>
                        <polygon points="0,0 12,0 6,10" fill="url(#linear)"/>
                    </svg>
                    <span>{{data.percentage}}</span>
                    <span>%</span>
                </span>
                <!-- 吨数 -->
                <span
                    class="ton" 
                    v-if="data.number || data.number == 0"
                >
                    <!-- 趋势箭头 -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="10px"
                        v-if="data.trend == 'up'"
                    >
                        <polygon points="0,12 12,12 6,0" fill="url(#linear)"/>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="10px"
                        v-else-if="data.trend == 'down'"
                    >
                        <polygon points="0,0 12,0 6,10" fill="url(#linear)"/>
                    </svg>
                    <span>{{data.number}}</span>
                    <span>吨</span>
                </span>
            </div>
            <div class="bubble__title">{{data.title}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bubble',
    props: {
        data: {
            type: Object,
            required: true,
            default: () => ({
                trend: '',
                percentage: '--',
                number: '--',
                title: '垃圾分类'
            })
        },
        type: {
            type: String,
            default: 'medium'
        }
    },
    data() {
        return {
            isIE: false
        }
    },
    mounted() {
        // 随机时间后开始动画
        this.$refs.bubble.style=`animation-delay: ${Math.random() * 3}s;`
        // 判断ie浏览器
        navigator.userAgent.indexOf('Trident') > -1 ? this.isIE = true : null
    }
}
</script>

<style lang="scss" scoped>
// 统计数据每10s翻页
@keyframes page_turn {
    90% {transform: scaleY(1) translate(-50%, 0);}
    95% {transform: scaleY(0) translate(-50%, 0);}
    100% {transform: scaleY(1) translate(-50%, 0);}
}
// 0-10s显示，10-20s隐藏
@keyframes flash_ton {
    0% {opacity: 1;}
    47.49% {opacity: 1;}
    47.5% {opacity: 0;}
    97.49% {opacity: 0;}
    97.5% {opacity: 1;}
    100% {opacity: 1;}
}
// 0-10s隐藏，10-20s显示
@keyframes flash_percentage {
    0% {opacity: 0;}
    47.49% {opacity: 0;}
    47.5% {opacity: 1;}
    97.49% {opacity: 1;}
    97.5% {opacity: 0;}
    100% {opacity: 0;}
}
// 上下浮动
@keyframes upside_down {
    0% {
        top: 0;
        opacity: 1;
    }
    50% {
        top: 5px;
        opacity: 0.7;
    }
    100% {
        top: 0;
        opacity: 1;
    }
}
.bubble {
    width: 115px;
    height: 115px;
    border: 1px solid transparent;
    position: absolute;
    user-select: none;
    // 上下浮动效果
    &__inner {
        width: 100%;
        height: 100%;
        position: relative;
        background: no-repeat center/100% 100% url('../img/bubble.png');
        animation: 3s infinite upside_down;
    }
    // 统计数据
    &__statistics {
        height: 36px;
        font-family: 'DCM';
        font-weight: bold;
        font-size: 10px;
        text-align: center;
        white-space: nowrap;
        // 定位绝对居中
        position: absolute;
        left: 50%;
        top: 16px;
        transform: translate(-50%, 0);
        .percentage,
        .ton {
            // 渐变字体
            color: #A921F7;
            background: linear-gradient(0deg, #1CC5FF 0%, #A921F7 70%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            // 定位绝对居中
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translate(-50%, 0);
        }
        // 数字
        .percentage > span,
        .ton > span {
            font-size: 36px;
        }
        // 单位
        .percentage > span:last-child,
        .ton > span:last-child {
            font-size: 25px;
            font-weight: normal;
        }
    }
    // 标题
    &__title {
        color: white;
        font-size: 16px;
        font-weight: bold;
        font-family: 'SourceHanSansCN-Regular';
        text-align: center;
        white-space: nowrap;
        // 定位绝对居中
        position: absolute;
        left: 50%;
        top: 55px;
        transform: translate(-50%, 0);
    }
}
// 小气泡
.bubble--small {
    width: 95px;
    height: 95px;
    .bubble__statistics {
        top: 10px;
        .percentage,
        .ton {
            top: -5px;
            // 渐变字体
            color: #E0C3FC;
            background: linear-gradient(0deg, #E0C3FC 0%, #8EC5FC 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        // 数字
        .percentage > span,
        .ton > span {
            font-size: 29px;
        }
        // 单位
        .percentage > span:last-child,
        .ton > span:last-child {
            font-size: 22px;
        }
    }
    .bubble__title {
        font-size: 13px;
        top: 45px;
    }
}
// 中气泡
.bubble--medium {
    .bubble__statistics {
        // 翻页
        animation: 10s infinite linear page_turn;
        // 切换显示
        .percentage {
            animation: 20s infinite linear flash_percentage;
        }
        .ton {
            animation: 20s infinite linear flash_ton;
        }
    }
}
// 大气泡
.bubble--large {
    width: 180px;
    height: 180px;
    .bubble__inner {
        background-image: url('../img/bubble--large.png');
    }
    .bubble__statistics {
        top: 50px;
        .percentage,
        .ton {
            top: -20px;
            // 渐变字体
            color: #2AF598;
            background: linear-gradient(0deg, #2AF598 0%, #009EFD 70%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        // 数字
        .percentage > span,
        .ton > span {
            font-size: 47px;
        }
        // 单位
        .percentage > span:last-child,
        .ton > span:last-child {
            font-size: 32px;
        }
    }
    .bubble__title {
        font-size: 20px;
        top: 100px;
    }
}
.ie {
    .ton {
        background: transparent !important;
    }
}
</style>