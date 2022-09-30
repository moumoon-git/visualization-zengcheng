<template>
    <div
        class="bubble"
        :class="{'bubble--small': size === 'small', 'bubble--large': size === 'large'}"
    >
        <div class="bubble__main" ref="bubble">
            <div class="bubble__main__statistics">
                <span class="bubble__main__statistics__number">{{data.number || data.number == 0 ? data.number : '--'}}</span>
                <span class="bubble__main__statistics__rate" v-if="size !== 'large'">{{data.rate ? data.rate : '--'}}<span>%</span></span>
            </div>
            <div class="bubble__main__left">
                <div>办结</div>
                <div>{{data.done ? data.done : '--'}}</div>
            </div>
            <div class="bubble__main__right">
                <div>待办</div>
                <div>{{data.todo ? data.todo : '--'}}</div>
            </div>
            <div class="bubble__title">{{data.title ? data.title : '气泡标题'}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bubble',
    props: {
        size: {
            type: String
        },
        data: {
            type: Object,
            default: _ => ({
                number: '--',
                rate: '--',
                done: '--',
                todo: '--',
                title: '气泡标题'
            })
        }
    },
    mounted() {
        // 随机时间后开始动画
        this.$refs.bubble.style=`animation-delay: ${Math.random() * 3}s;`
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
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    // 气泡
    &__main {
        position: relative;
        width: 117px;
        height: 117px;
        background: no-repeat center/100% 100% url('../img/bubble.png');
        animation: 3s infinite upside_down;
        // 顶部统计数字
        &__statistics {
            color: #7D1EFF;
            height: 40px;
            width: 40px;
            line-height: 40px;
            font-size: 36px;
            font-family: 'DCM';
            font-weight: bold;
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translate(-50%, 0);
            &__number,
            &__rate {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, 0);
                // 渐变色
                background: -webkit-linear-gradient(90deg, #1CC5FF 0%, #7D1EFF 55%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                & > span {font-size: 28px;}
            }
            // 翻页
            animation: 10s infinite linear page_turn;
            // 切换显示
            &__number {
                animation: 20s infinite linear flash_percentage;
            }
            &__rate {
                animation: 20s infinite linear flash_ton;
            }
        }
        // 办结和待办
        &__left,
        &__right {
            color: rgba(153, 201, 231, 1);
            font-size: 14px;
            display: inline-block;
            width: 50px;
            position: absolute;
            top: 50px;
        }
        &__left {
            left: 5px;
        }
        &__right {
            right: 5px;
        }
    }
    // 底部标题
    &__title {
        color: white;
        font-weight: bold;
        font-size: 16px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 100%);
        white-space: nowrap;
    }
}

// 小气泡
.bubble--small {
    .bubble__main {
        width: 94px;
        height: 94px;
        animation: unset;
        &__statistics {
            color: #E0C3FC;
            font-size: 28px;
            top: 5px;
            &__number,
            &__rate {
                background: -webkit-linear-gradient(90deg, #E0C3FC 0%, #8EC5FC 55%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                & > span {font-size: 19px;}
            }
        }
        &__left,
        &__right {
            font-size: 12px;
            top: 40px;
            width: 40px;
            
        }
        &__left {
            left: 5px;
        }
        &__right {
            right: 5px;
        }
    }
    .bubble__title {
        font-size: 14px;
    }
}

// 大气泡
.bubble--large {
    .bubble__main {
        width: 182px;
        height: 182px;
        &__statistics {
            color: #2AF598;
            font-size: 45px;
            width: 45px;
            height: 45px;
            line-height: 45px;
            top: 25px;
            animation: unset;
            &__number,
            &__rate {
                animation: unset;
                background: -webkit-linear-gradient(90deg, #2AF598 0%, #009EFD 55%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                & > span {font-size: 36px;}
            }
        }
        &__left,
        &__right {
            font-size: 18px;
            top: 82px;
            width: 80px;
            
        }
        &__left {
            left: 10px;
        }
        &__right {
            right: 10px;
        }
    }
    .bubble__title {
        font-size: 20px;
    }
}
</style>