<template>
    <div class="bubble-set">
        <Bubble
            class="bubble--large-1"
            type="large"
            :data="data_1[0]"
        />
        <Bubble
            class="bubble--mid-1"
            :data="data_1[1]"
        />
        <Bubble
            class="bubble--mid-2"
            :data="data_1[2]"
        />
        <Bubble
            class="bubble--mid-3"
            :data="data_1[3]"
        />
        <Bubble
            class="bubble--mid-4"
            :data="data_1[4]"
        />
        <Bubble
            class="bubble--small-1"
            type="small"
            :data="{percentage: data_2[0], title: '生活垃圾回收利用率'}"
        />
        <Bubble
            class="bubble--small-2"
            type="small"
            :data="{percentage: data_2[1], title: '厨余垃圾精准率'}"
        />
        <Bubble
            class="bubble--small-3"
            type="small"
            :data="{percentage: data_2[2], title: '绿化垃圾粉碎率'}"
        />
        <Bubble
            class="bubble--small-4"
            type="small"
            :data="{number: data_2[3], title: '大件垃圾回收处理'}"
        />
        <Bubble
            class="bubble--small-5"
            type="small"
            :data="{percentage: data_2[4], title: '分类实效率'}"
        />
        <Bubble
            class="bubble--small-6"
            type="small"
            :data="{percentage: data_2[5], title: '撤桶率'}"
        />
    </div>
</template>

<script>
import Bubble from './Bubble.vue'
export default {
    name: 'BubbleSet',
    components: {
        Bubble
    },
    props: {
        flag: {
            type: [Number, String],
            default: 1
        }
    },
    data() {
        return {
            data_1: [{
                number: 0,
                title: '回收总量'
            }, {
                number: 0,
                percentage: 0,
                title: '可回收垃圾',
                trend: 'down'
            }, {
                number: 0,
                percentage: 0,
                title: '餐余垃圾',
                trend: 'down'
            }, {
                number: 0,
                percentage: 0,
                title: '有害垃圾',
                trend: 'down'
            }, {
                number: 0,
                percentage: 0,
                title: '其他垃圾',
                trend: 'down'
            }, ],
            data_2: [0, 0, 0, 0, 0, 0]
        }
    },
    methods: {
        /**
         * @method
         * @desc 获取【分类成效】
         */
        getClassificationResult() {
            let request = {
                method: 'get',
                url: `/garbage/visualization/garbageClassifyCount/${this.flag}`
            }
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    response.data.forEach(element => {
                        switch(element.keyString) {
                            case '回收总量':
                                this.data_1[0] = {
                                    number: Math.abs(element.value),
                                    title: '回收总量'
                                }
                                break
                            case '可回收垃圾':
                                this.data_1[1] = {
                                    number: Math.abs(element.value),
                                    percentage: Math.abs(element.number),
                                    trend: element.number < 0 ? 'down' : 'up',
                                    title: '可回收垃圾'
                                }
                                break
                            case '餐余垃圾':
                                this.data_1[2] = {
                                    number: Math.abs(element.value),
                                    percentage: Math.abs(element.number),
                                    trend: element.number < 0 ? 'down' : 'up',
                                    title: '餐余垃圾'
                                }
                                break
                            case '有害垃圾':
                                this.data_1[3] = {
                                    number: Math.abs(element.value),
                                    percentage: Math.abs(element.number),
                                    trend: element.number < 0 ? 'down' : 'up',
                                    title: '有害垃圾'
                                }
                                break
                            case '其他垃圾':
                                this.data_1[4] = {
                                    number: Math.abs(element.value),
                                    percentage: Math.abs(element.number),
                                    trend: element.number < 0 ? 'down' : 'up',
                                    title: '其他垃圾'
                                }
                                break
                        }
                    })
                }
            })
            request.url = `/garbage/visualization/garbageRatioCount/${this.flag}`
            this.apix(request)
            .then(response => {
                if(response.code == 0) {
                    this.data_2 = [0, 0, 0, 0, 0, 0]
                    response.data.forEach(element => {
                        switch(element.keyString) {
                            case '生活垃圾回收利用率':
                                this.data_2[0] = element.value
                                break
                            case '厨余垃圾精准率':
                                this.data_2[1] = element.value
                                break
                            case '绿化垃圾粉碎率':
                                this.data_2[2] = element.value
                                break
                            case '大件垃圾回收处':
                                this.data_2[3] = element.value
                                break
                            case '分类实效率':
                                this.data_2[4] = element.value
                                break
                            case '撤桶率':
                                this.data_2[5] = element.value
                                break
                        }
                    })
                }
            })
        }
    },
    mounted() {
        this.getClassificationResult()
    },
    watch: {
        flag: function() {
            this.getClassificationResult()
        }
    }
}
</script>

<style lang="scss" scoped>
.bubble-set {
    .bubble--large-1 {
        left: 354px;
    }
    .bubble--mid-1 {
        left: 70px;
        top: 280px;
    }
    .bubble--mid-2 {
        left: 200px;
        top: 150px;
    }
    .bubble--mid-3 {
        right: 170px;
        top: 150px;
    }
    .bubble--mid-4 {
        right: 40px;
        top: 280px;
    }
    @for $i from 1 through 6 {
        .bubble--small-#{$i} {
            bottom: 0;
            left: #{150 * ($i - 1) + 20}px;
        }
    }
}
</style>