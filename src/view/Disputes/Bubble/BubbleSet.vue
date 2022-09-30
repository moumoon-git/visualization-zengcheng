<template>
    <div class="bubble-set">
        <div class="bubble-set__top">
            <Bubble size="large" :data="list[0]"/>
            <Bubble :data="list[1]"/>
            <Bubble :data="list[2]"/>
            <Bubble :data="list[3]"/>
            <Bubble :data="list[4]"/>
        </div>
        <div class="bubble-set__bottom bubble-set__bottom-a">
            <Bubble size="small" :data="list[5]"/>
            <Bubble size="small" :data="list[6]"/>
            <Bubble size="small" :data="list[7]"/>
            <Bubble size="small" :data="list[8]"/>
            <Bubble size="small" :data="list[9]"/>
            <Bubble size="small" :data="list[10]"/>
            <Bubble size="small" :data="list[11]"/>
            <Bubble size="small" :data="list[12]"/>
        </div>
        <div class="bubble-set__bottom bubble-set__bottom-b">
            <Bubble size="small" :data="list[13]"/>
            <Bubble size="small" :data="list[14]"/>
            <Bubble size="small" :data="list[15]"/>
            <Bubble size="small" :data="list[16]"/>
            <Bubble size="small" :data="list[17]"/>
            <Bubble size="small" :data="list[18]"/>
            <Bubble size="small" :data="list[19]"/>
            <Bubble size="small" :data="list[20]"/>
        </div>
    </div>
</template>

<script>
import Bubble from './Bubble'

export default {
    name: 'BubbleSet',
    components: {
        Bubble
    },
    data() {
        return {
            list: []
        }
    },
    methods: {
        /**
         * @method
         * @desc 获取气泡数据
         * @param {Number} id 1日2月3年
         */
        getData(id) {
            const request = {
                method: 'get',
                url: '/Contradiction/contradictionTypeCount',
                params: {
                    id
                }
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.list = []
                    res.data.forEach(item => {
                        this.list.push({
                            number: Number(item.value) + Number(item.value1),
                            rate: item.number,
                            done: item.value,
                            todo: item.value1,
                            title: item.keyString
                        })
                    })
                }
            })
        }
    },
    mounted() {
        this.getData(1)
    }
}
</script>

<style lang="scss" scoped>
@keyframes fade-show-a {
    0% {opacity: 1;}
    45% {opacity: 1;}
    50% {opacity: 0;}
    100% {opacity: 0;}
}
@keyframes fade-show-b {
    0% {opacity: 0;}
    50% {opacity: 0;}
    55% {opacity: 1;}
    100% {opacity: 1;}
}
.bubble-set {
    width: 100%;
    height: 630px;
    position: relative;
    &__top {
        & > * {
            position: absolute;
        }
        & > .bubble:nth-child(1) {
            left: 433px;
            top: 28px;
        }
        & > .bubble:nth-child(2) {
            left: 260px;
            top: 140px;
        }
        & > .bubble:nth-child(3) {
            right: 240px;
            top: 140px;
        }
        & > .bubble:nth-child(4) {
            left: 100px;
            top: 270px;
        }
        & > .bubble:nth-child(5) {
            right: 80px;
            top: 270px;
        }
    }
    &__bottom {
        position: absolute;
        bottom: 10px;
        left: 0;
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-left: 10px;
        transition: opacity 1.5s;
    }
    &__bottom-a {
        animation: fade-show-a infinite 30s;
    }
    &__bottom-b {
        animation: fade-show-b infinite 30s;
    }
}
</style>
