<template>
    <div
        class="StatisticsWithIcon"
        :class="{ie: isIE}"
    >
        <span>
            <img src="../img/yellow_card.png" alt="">
            <span class="gradient_orange">{{data[0] != null && data[0] != undefined ? data[0] : '--'}}</span>
            <div>黄牌数</div>
        </span>
        <span>
            <img src="../img/red_card.png" alt="">
            <span class="gradient_red">{{data[1] != null && data[1] != undefined ? data[1] : '--'}}</span>
            <div>红牌数</div>
        </span>
        <span>
            <img src="../img/refuse.png" alt="">
            <span class="gradient_blue">{{data[2] != null && data[2] != undefined ? data[2] : '--'}}</span>
            <div>拒收拒运数</div>
        </span>
        <br>
        <span>
            <img src="../img/rectify.png" alt="">
            <span class="gradient_green">{{data[3] != null && data[3] != undefined ? data[3] : '--'}}</span>
            <div>责令整改数</div>
        </span>
        <span>
            <img src="../img/punishment.png" alt="">
            <span class="gradient_blue">{{data[4] != null && data[4] != undefined ? data[4] : '--'}}</span>
            <div>行政处罚数</div>
        </span>
    </div>
</template>

<script>
export default {
    name: 'StatisticsWithIcon',
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isIE: false
        }
    },
    mounted() {
        // 判断ie浏览器
        navigator.userAgent.indexOf('Trident') > -1 ? this.isIE = true : null
    }
}
</script>

<style lang="scss" scoped>
// 图标翻牌旋转
@keyframes flip {
    0% {transform: rotateY(0deg);}
    10% {transform: rotateY(90deg)}
    20% {transform: rotateY(0deg)}
}
.StatisticsWithIcon {
    font-size: 0;
    padding: 12px 0 0 5px;
    & > span {
        font-size: 0;
        display: inline-block;
        margin: 0 0 25px 45px;
        // 图标
        & > img {
            width: 43px;
            height: 43px;
            animation: flip 15s linear infinite;
        }
        // 统计数
        & > span {
            color: white;
            font-size: 48px;
            font-family: 'DCM';
            line-height: 43px;
            position: relative;
            bottom: 4px;
            padding: 0 0 0 13px;
            color: transparent;
            &.gradient_orange {
                color:  #E87267;
                background: linear-gradient(-45deg, #E87267 0.78125%, #F1BF60 100%);
                -webkit-background-clip: text;
            }
            &.gradient_red {
                color: #A6C0FE;
                background: linear-gradient(-45deg, #A6C0FE 0%, #F68084 100%);
                -webkit-background-clip: text;
            }
            &.gradient_blue {
                color: #9A8FF5;
                background: linear-gradient(-45deg, #9A8FF5 0.78125%, #79DDEE 100%);
                -webkit-background-clip: text;
            }
            &.gradient_green {
                color: #51AAE6;
                background: linear-gradient(-45deg, #51AAE6 0.78125%, #77E6AF 100%);
                -webkit-background-clip: text;
            }
        }
        // 标题
        & > div {
            text-align: center;
            color: white;
            font-size: 16px;
            font-family: 'SourceHanSansCN-Regular';
        }
    }
}
.ie {
    .gradient_orange,
    .gradient_red,
    .gradient_blue,
    .gradient_green {
        background: transparent !important;
    }
}
</style>