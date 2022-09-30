/**
 * @author tanjinfeng
 * @date 2020-10-20
 * @desc 学校查看详情弹窗
 */

<template>
    <transition name="fade">
        <div
            class="school-detail-dialog"
            v-if="visible"
        >
            <div class="school-detail-dialog__modal" @click="visible = false"></div>
            <div class="school-detail-dialog__title">
                <span>查看详情</span>
                <span @click="visible = false">×</span>
            </div>
            <div class="school-detail-dialog__context">
                <div>
                    上报时间：
                    <span>{{formData.gmtCreate ? formData.gmtCreate : '暂无数据'}}</span>
                </div>
                <div>
                    事件类型：
                    <span>{{formData.eventTypeName ? formData.eventTypeName : '暂无数据'}}</span>
                </div>
                <div>
                    地点：
                    <span>{{formData.platformName ? formData.platformName : '暂无数据'}}</span>
                </div>
                <div>
                    事件描述：
                    <span class="desc_css">{{formData.eventDescription}}</span>
                </div>
                <div style="display:flex;">
                    <div>事件图片：</div>
                    <viewer>
                        <img :src="formData.imageUrl" alt="暂无图片" height="80">
                    </viewer>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'SchoolDetailDialog',
    data() {
        return {
            visible: false,
            formData: {}
        }
    },
    methods: {
        /**
         * @method
         * @desc 弹窗初始化
         * @param detail 学校的详情
         */
        init(detail) {
            this.visible = true
            this.formData = detail
        }
    }
}
</script>

<style scoped lang="scss">
.school-detail-dialog {
    display: block;
    width: 400px;
    background: rgba(3, 28, 58, .8);
    border: 2px solid #1BD8FA;
    color: white;
    font-size: 14px;
    // 中间定位
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    // 遮罩
    &__modal {
        position: fixed;
        left: -100vw;
        top: -100vh;
        background: rgba(0, 0, 0, 0.25);
        width: 300vw;
        height: 300vh;
        z-index: -1;
    }
    // 弹窗标题
    &__title {
        text-align: left;
        padding: 10px;
        line-height: 1;
        font-size: 18px;
        font-weight: bold;
        & > span:last-child {
            float: right;
            cursor: pointer;
            &:hover {
                color: #99c9e7;
            }
        }
    }
    // 第一行
    &__context {
        margin: 0 10px 10px;
        padding: 10px;
        background: rgba(24, 81, 154, .58);
        & > div {
            font-weight: bold;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            & > span {
                font-weight: normal;
            }
        }
        img {
            cursor: zoom-in;
            margin: 10px 10px 0 0;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>