<!--
 * @author tanjinfeng
 * @date 2020-10-28
 * @description 出租屋弹窗-房间信息页面
-->

<template>
    <div class="room-info">
        <!-- 1. 顶部统计数据 -->
        <div class="room-info__header">
            <span>
                <div>{{ data.roomCount || data.roomCount == 0 ? data.roomCount : '-' }}</div>
                <div>房间数</div>
            </span>
            <span>
                <div>{{ data.normalStatus || data.normalStatus == 0 ? data.normalStatus : '-' }}</div>
                <div>正常状态</div>
            </span>
            <span>
                <div>{{ data.logoutStatus || data.logoutStatus == 0 ? data.logoutStatus : '-' }}</div>
                <div>注销状态</div>
            </span>
        </div>
        <!-- 2. 房间数据列表 -->
        <div class="room-info__list">
            <div
                class="room-info__list__item"
                v-for="(item, index) in data.data"
                :key="`room_info_item_${index}`"
                @click="$emit('show-detail', { id: item.id, num: item.fjh })"
            >
                <div>{{ item.fjh ? item.fjh : '-' }}</div>
                <div v-if="item.fjhzt == 0">已注销</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RoomInfo',

    props: {
        // 房屋编码
        fwbm: {
            type: [Number, String]
        }
    },

    data() {
        return {
            data: '', // 列表数据
        }
    },
    methods: {
        // 请求房屋信息数据
        getData() {
            this.apix(`${window.SITE_CONFIG['baseUrl']}/renting/rentingAddrroomInfo/list?fwbm=${this.fwbm}`).then(response => {
                if (response.code === 0) {
                    this.data = {...response.data}
                }
            })
        },
    },

    watch: {
        // 选中落点改变，请求数据
        fwbm: {
            immediate: true,
            handler: function() {
                this.getData()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.room-info {
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
            height: 90px;
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

    // 房间列表
    &__list {
        width: 100%;
        height: 635px;
        padding: 0 5px;
        
        // 滚动条
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
            border: 1px solid rgba(24, 81, 154, 0.36);
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 5px;
            width: 100px;
            height: 100px;
            font-size: 20px;
            text-align: center;
            color: #00F2FF;
            background: rgba(24, 81, 154, 0.36);
            cursor: pointer;
            position: relative;
            &:hover {
                border-color: rgba(27, 216, 250, 0.58);
            }

            // 已注销
            & > div:nth-child(2) {
                display: inline-block;
                font-size: 14px;
                color: white;
                background: #F66E6E;
                border-radius: 3px;
                padding: 0 5px;
            }

            // 四角
            @mixin corner {
                content: '';
                display: block;
                position: absolute;
                width: 6px;
                height: 7px;
                background: no-repeat center/100% 100% transparent;
            }
            &:before {
                @include corner;
                top: -1px;
                left: -1px;
                background-image: url('../img/corner_tl.png');
            }
            &:after {
                @include corner;
                top: -1px;
                right: -1px;
                background-image: url('../img/corner_tr.png');
            }
            & > div:first-child:before {
                @include corner;
                bottom: -1px;
                left: -1px;
                background-image: url('../img/corner_bl.png');
            }
            & > div:first-child:after {
                @include corner;
                bottom: -1px;
                right: -1px;
                background-image: url('../img/corner_br.png');
            }
        }
    }
}
</style>
