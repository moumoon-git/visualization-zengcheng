<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗-出租屋信息页面
-->

<template>
    <div
        class="rental-info"
    >
        <!-- 1. 统计数据 -->
        <div class="rental-info__header">
            <span>
                <div>{{ data.memberCount || data.memberCount == 0 ? data.memberCount : '-' }}</div>
                <div>居住人数</div>
            </span>
            <span>
                <div>{{ data.liveCount || data.liveCount == 0 ? data.liveCount : '-' }}</div>
                <div>入住人数</div>
            </span>
            <span>
                <div>{{ data.logoutCount || data.logoutCount == 0 ? data.logoutCount : '-' }}</div>
                <div>注销人数</div>
            </span>
        </div>
        <!-- 2. 出租屋信息每项数据 -->
        <div class="rental-info__list">
            <div class="rental-info__list__item">
                <span>出租屋状态</span>
                <span v-if="data.data && data.data.fwzt == 0">注销</span>
                <span v-else-if="data.data && data.data.fwzt == 1">正常</span>
            </div>
            <div class="rental-info__list__item">
                <span>房屋编码</span>
                <span>{{ data.data && data.data.fwbm ? data.data.fwbm : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>标准地址编码</span>
                <span>{{ data.data && data.data.wbfwbh ? data.data.wbfwbh : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房屋地址全址</span>
                <span>{{ data.data && data.data.fwdzqz ? data.data.fwdzqz : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>所属社区代码</span>
                <span>{{ data.data && data.data.sssqdm ? data.data.sssqdm : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>管理联系人姓名</span>
                <span>{{ data.data && data.data.glrxm ? data.data.glrxm : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>管理人身份证号码</span>
                <span>{{ data.data && data.data.glrsfzhm ? data.data.glrsfzhm : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>管理人户籍地</span>
                <span>{{ data.data && data.data.glrhjd ? data.data.glrhjd : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>管理人联系电话</span>
                <span>{{ data.data && data.data.glrlxdh ? data.data.glrlxdh : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房屋类别</span>
                <span>{{ data.data && data.data.fwlb ? data.data.fwlb : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房屋用途</span>
                <span>{{ data.data && data.data.fwyt ? data.data.fwyt : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房屋面积</span>
                <span>{{ data.data && data.data.fwmj ? data.data.fwmj : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房屋类型</span>
                <span v-if="data.data && data.data.fwlx == 'czw'">出租屋</span>
                <span v-else-if="data.data && data.data.fwlx == 'xq'">小区</span>
                <span v-else-if="data.data && data.data.fwlx == 'gy'">公寓</span>
                <span v-else-if="data.data && data.data.fwlx == 'gcss'">工厂宿舍</span>
                <span v-else>-</span>
            </div>
            <div class="rental-info__list__item">
                <span>房东姓名</span>
                <span>{{ data.data && data.data.fdxm ? data.data.fdxm : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房东联系电话</span>
                <span>{{ data.data && data.data.fdlxdh ? data.data.fdlxdh : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房东户籍地</span>
                <span>{{ data.data && data.data.fdhjd ? data.data.fdhjd : '-' }}</span>
            </div>
            <div class="rental-info__list__item">
                <span>房东身份证号码</span>
                <span>{{ data.data && data.data.fdsfzhm ? data.data.fdsfzhm : '-' }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RentalInfo',

    props: {
        // 出租屋id
        id: {
            type: [Number, String]
        }
    },

    data() {
        return {
            data: '', // 出租屋信息数据
        }
    },

    methods: {
        // 后台获取出租屋信息数据
        getData() {
            this.apix(`${window.SITE_CONFIG['baseUrl']}/renting/rentingAddrinfo/info?id=${this.id}`).then(response => {
                if (response.code === 0) {
                    this.data = response.data
                }
            })
        }
    },
    watch: {
        // 选中落点改变，更新数据
        id: {
            immediate: true,
            handler: function() {
                this.getData()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$headerHeight: 90px;
.rental-info {
    width: 100%;
    height: 100%;
    // 统计数据
    &__header {
        display: flex;
        justify-content: center;
        align-items: center;
        // 统计项
        & > span {
            flex-grow: 1;
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            width: 100px;
            height: $headerHeight;
            text-align: center;
            position: relative;
            // 统计项数值
            & > div:first-child {
                font-family: 'DCM';
                font-size: 40px;
                color: #99C9E7;
            }
            // 间隔竖线
            &:not(:last-child):after {
                content: '';
                display: block;
                height: 50px;
                width: 1px;
                background: linear-gradient(to bottom, transparent, white 20% 80%, transparent);
                position: absolute;
                right: -1px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    &__list {
        height: calc(100% - #{$headerHeight});
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 5px;
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: #3B90EE;
            border-radius: 10px;
        }
        &__item {
            color: white;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            position: relative;
            margin: 0 10px 10px 150px;
            font-size: 14px;
            padding: 5px;
            // label
            & > span:first-child {
                position: absolute;
                left: -130px;
                top: 50%;
                transform: translateY(-50%);
                color: #99C9E7;
            }
        }
    }
}
</style>
