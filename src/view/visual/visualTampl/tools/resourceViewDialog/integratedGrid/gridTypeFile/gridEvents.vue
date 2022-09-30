<template>
    <!-- 任务管理模块 -->
    <div class="grid-events-all-container">
        <!-- 1. 任务管理列表界面 -->
        <div class="grid-events-home-container">
            <!-- 1.1 头部内容：搜索、筛选、新增功能 -->
            <div class="grid-events-home-tool">
                <!-- 关键词搜索 -->
                <span class="grid-events-home-tool-search">
                    <input
                        class="grid-events-home-tool-search-inner"
                        placeholder="请输入事件名称"
                        v-model="queryList.search"
                        @change="getGridEvents"
                    >
                    <span class="el-icon-search grid-events-home-tool-search-button" @click="getGridEvents"></span>
                </span>
                <!-- 新增任务按钮 -->
            </div>
            <!-- 1.2 任务列表 -->
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="padding-left:10px;color:rgba(0, 242, 255, 1)">全选</el-checkbox>
            <el-checkbox-group
                class="grid-events-list-container"
                style="list-style-type:none;margin-block-start:0em;margin-block-end:0em;padding-inline-start:0px;"
                v-model="checkedEvents" 
                @change="handleCheckedEventSChange"
            >
            <div style="margin: 15px 0;"></div>
                <!-- 一条任务 -->
                <li
                    class="grid-events-single-container"
                    :class="{'grid-events-single-container-selected': item.id == selectedEventId}"
                    v-for="(item, index) in gridEventsList"
                    :key="index"
                    @click.stop="selectEvent(item)"
                    
                >   
                    <div @click.stop="">
                        <el-checkbox :label="item.id" class="grid-events-single-checkbox">&nbsp;</el-checkbox>
                    </div>
                    <!-- 边框四角 -->
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <!-- 第一行：状态、标题、详情按钮 -->
                    <div class="grid-events-single-header">
                        <div class="grid-events-single-title">{{item.eventTypeName}}</div>
                        <div class="grid-events-single-button" @click.stop="showMore(item.id)">详情</div>
                    </div>
                    <div class="grid-events-single-remark">{{item.remark}}</div>
                    <div
                        class="grid-events-single-participants-list"
                    >
                     
                        <div class="grid-events-single-tooltip-item">{{item.eventName}}</div>
                    </div>
                </li>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
    name: 'integratedGrid',
    props: [],
    async mounted() {
        await this.getGridEvents(this.queryList, this.gridEventsList);
        window.displayPicture = this.displayPicture;

        setTimeout(()=>{
            if (this.$parent.checkComprehensive) {
                this.checkGridEvents(this.$parent.checkComprehensive)
            }
        },300)
        bus.$on("gridCheck",(item)=>{
            this.checkGridEvents(item.flag)
        })
    },
    methods: {
        checkGridEvents(status){
            this.checkedEvents = status&&this.gridEventsList.length>0?this.gridEventsList.map(v=>{return v.id}):[]
            this.isIndeterminate = false;
            this.checkAll = status&&this.gridEventsList.length>0?true:false;
        },
        /**
         * @method
         * @desc 初始化传递Amap实例
         */
        initMap(map) {
            this.map = map;
        },

        /**
         * @method
         * @desc 提交请求queryList，获取工单列表数据，保存在gridEventsList
         * @return {null}
         */
        getGridEvents() {
            let self = this;
            this.queryList.page = 1
            // console.log("getGridEvents()查询条件：【\n", self.queryList, "\n】");
            let data = {
                url: '/network/networkEvents/list',
                method: 'POST',
                data: {
                    limit: 100000,
                    page: 1,
                    search: this.queryList.search,
                    status: '',
                    platformId: '',
                    startTime: '',
                    endTime: '',
                },
            };
            data.header = {
            "Content-Type": "application/json",
            };
            this.apix(data)
            .then(
                res => {
                    // console.log("getGridEvents()获取工单列表：【\n", res.page.list, "\n】");
                    self.gridEventsList = res.data.list;
                    
                },
            )
            .catch(
                err => {
                    console.log("getGridEvents()获取工单列表失败！错误信息：【\n", err, "\n】");
                }
            );
        },

        /**
         * @method
         * @desc 点击展开详情
         * @param {num} id 查看详情的工单id
         * @return {null}
         */
        showMore(id) {
            bus.$emit("getGridEventDetail",id)
        },
        /**
         * @method
         * @desc 点击选中工单列表中的工单，地图上显示人员动态信息
         * @param id 点击时的工单的id
         * @return {null}
         */
        selectEvent(item) {
            let self = this;
            item.id == self.selectedEventId ? self.selectedEventId = -1 : self.selectedEventId = item.id;
            if ((self.checkedEvents.find(v=> v == item.id))&&(item.id == self.selectedEventId)) {
                self.map.setCenter([item.longitude, item.latitude])
            }
            
            // console.log("selectedEventId =", self.selectedEventId);
        },

        /**
         * @method
         * @desc 点击按钮拨打电话
         * @param {object} man 需要拨打的人的对象
         */
        calling(man) {
            console.log("正在拨打【", man, "】的电话...");
            this.callPhone(man);
        },

        /**
         * @method
         * @desc 点击按钮邀请会议
         * @param {object} man 需要邀请的人的对象
         */
        meeting(man) {
            console.log("正在邀请【", man, "】参加会议...");
            this.createMeeting(man);
        },
        handleCheckAllChange(val) {
            this.checkedEvents = val ? this.gridEventsList.map(v=>{return v.id}) : [];
            this.isIndeterminate = false;
            bus.$emit("gridEvent",this.checkedEvents)
        },
        handleCheckedEventSChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.gridEventsList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.gridEventsList.length;
            bus.$emit("gridEvent",this.checkedEvents)
        },
    },
    data() {
        return {
            /**
             * @var {object}
             * @desc AMap实例
             */
            map: '',

            /**
             * @var {object}
             * @desc 请求参数
             * @property {string} search 搜索关键词
             */
            queryList: {
                search: ''
            },

            /**
             * @var {array}
             * @desc 查询返回的工单列表
             */
            gridEventsList: [],

            /**
             * @var {num}
             * @desc 工单列表中被点击选中的工单id，未选中（-1）
             */
            selectedEventId: -1,
            checkAll: false,
            checkedEvents: [],
            isIndeterminate: false
        }
    },
    destroyed(){
        bus.$off("gridCheck")
    }
}
</script>

<style scoped>
    .grid-events-all-container {
        color: white;
    }
    .grid-events-home-tool {
        position: relative;
        height: 80px;
    }
    .grid-events-home-select-container{
        height: 26px;
        width: 86px;
        border: solid 1px rgba(63,146,254,1);
        background:rgba(6,44,93,1);
        position: absolute;
        left: 10px;
        top: 13px;
    }
    .grid-events-home-select {
        font-size: 14px;
        font-weight: 400;
        height: 26px;
        color: rgba(0,242,255,1);
        background: transparent;
        outline: none;
        line-height: 26px;
        border: none;
        width: 86px;
        text-align: center;
        text-align-last: center;
    }
    .grid-events-home-select option {
        text-align: center;
        background: rgba(11, 30, 75, 1);
    }
    .grid-events-date-range-selector-border {
        position: absolute;
        left: 106px;
        top: 13px;
        border: solid 1px rgba(63,146,254,1);
        display: inline-block;
        width: 210px;
        height: 26px;
    }
    .grid-events-home-tool /deep/.grid-events-date-range-selector,
    .grid-events-home-tool /deep/.grid-events-date-range-selector {
        font-size: 14px;
        font-weight: 400;
        height: 26px;
        width: 210px;
        color: rgba(0,242,255,1);
        background: transparent;
        border: none;
        line-height: 26px;
        
    }
    .grid-events-date-range-selector /deep/.el-range__icon,
    .grid-events-date-range-selector /deep/.el-range__close-icon,
    .grid-events-date-range-selector /deep/.el-range-separator {
        line-height: 26px;
        color: white;
        height: 26px;
        padding: 0px;
    }
    .grid-events-date-range-selector /deep/.el-range-separator{
        padding-right:5px;
    }
    .grid-events-date-range-selector /deep/.el-range-input {
        width: 80px;
        background: transparent;
        color: white;
        margin-top: 2px;
    }
    .grid-events-home-tool-search {
        width: 95%;
        height: 28px;
        border: 1px solid rgba(63,146,254,1);
        border-radius: 3px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: transparent;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,242,255,1);
        outline: none;
        display: inline-block;
        position: absolute;
        left: 2.5%;
        top: 13px;
    }
    .grid-events-home-tool-search-inner {
        background: transparent;
        border: none;
        outline: none;
        width: 93%;
        height: 28px;
        line-height: 28px;
        color: white;
        padding: 0;
        padding-left: 11px;
    }
    .grid-events-home-tool-search-button {
        color: rgba(107, 137, 249, 1);
        cursor: pointer;
        display: inline-block;
        width: 14px;
        height: 14px;
        line-height: 14px;
        line-height: 29px;
        font-size: 14px;
        padding-right: 10px;
        float: right;
    }
    .grid-events-home-tool-add-button {
        color: rgba(0, 242, 255, 1);
        font-weight: bold;
        cursor: pointer;
        width: 87px;
        height: 28px;
        line-height: 26px;
        font-size: 16px;
        text-align: center;
        position: absolute;
        right: 11px;
        top: 50px;
        background-size: 100% 100%;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAAAcCAYAAAAKnhNwAAAETElEQVRoge1ay44cNRQ9x65+ZIaQkRAhIgkSEkv4AJbwAXwBP4jEjg9gg8SGJStAQjzFRAGCGJLMdJcPcpXtcrnc3UQTCXVpTo/Hj3K55x5f33ttD9//9Evc4MWwfPhm7P8AwOcA3tk3QAPgLQA//PNoCRqBBEDAGJ8LML7sUnuXZ/36XH0ZCL+OHOp+ALEv+4oLbY54+s1vXd3eOQEXNjwgnILY6tPq9dX3tPbtJjT/eHG+/ATAXwCeAnhWpOc+EXwuyJcvfSJ5KWlD8ErQBsDmjfcu2mPn+PzrVzwvDcGloAXJpaQVAJ/WBFeC1gBuAe2qz3EScp9O12ebj5Zn9nFOMgK5keBEJICrkDyJWwBtSC6kMG+zRJQtyhpl3wY+bFi7JqS4jmlM97yDScwwERU7qlz8yrgkCUnM2mdHdCYvyUSFRjwMRjJXNjKjbiA5vnNAMzk1unPV4ioq8h/EQLISwQhk7x1NCq6Bc/B0u+FJVY9qn1zb8+Zc20tN7gbNZktFvTQZHFVnEVpUtDUnpG4qYr3KwYjkvEOtc5VE9vY5lmeBKM50lXIXT3sU7NsRyQqfQ22pv18UO5bRXKAUNFfk7z8jHzbiats+AvBBIpl+R8HJy8NSKGZ1Uu9t1yyo9XKMtJWM8vYCciI/M87CxozY/vnEb6d/mdjkG7xcXP3062CT5X2cRraFnXYHbe5Mgw9BwgzmWqs0gfNyfFGuaBbz9kx+FpyFbfnAT5ONDKpu6OMXl561Iz2dYswvXg6yJXSKODyL8g9NsVCYUjMaozTclfbS7sbd3j4HeYzI5apBua8r+SheyTcj9bF2oTf+uyZmDgQPmkrEoKCigelIoR5h1DYjN3j5aFa3T+4DOMtGTucX0eYKg2NLs6tkoxRney4hXAhnFR0YxbgJ8VwwHI4hyM5Sm8sAwCxP1p/Zxi5irJe+J3jK/2AKWORzwMGzm4jC+QM7zMVrk/d2dC7aNXKKmk8I10FT55bqKrvuV8QUwoWYeDIww2ooowcFKzF87+wii6HOFDEkM4rBfKB0fOWhWpMNXFv23GFn41cyn5zZHHsG5eFgmKuCZQRPLjeqR52RrGIxTBjOd4Hxj9gVQx8titV56HRyB09TkjOVL1+Y96n89ZFf11VvlfKL1NNwORgRL0ldcYFqswvEMs0JNfmi7E1IPipbhlvs7iY73lg7N3DbhClYLG9vPqTBJQ02NPJpS3Iby/7kjkYtjc/RGuO6HH1bS8L553M4w7j77oXppHGwEowcLRysc6ZRi0ZC49skLODYSLRqtVBfXshhSauH4da/J9k29vGd+7gFYmE8UexI87kD5TyJanXx7MnVdx3ZdG2m3a74FwH3v7N0ffRX/ISBYAlYwefOisZzZkk0EBr4HGpgYEEt6NB4pXUOvwP4ApFkGnPv1Qfm3p4/7SsAH5/eXf/89/kfx0HTNdAFSTYPKfLF+YI6BOBfjIkTFNhF42wAAAAASUVORK5CYII=");
    }
    .grid-events-list-container {
        height: 610px;
        overflow: auto;
        background: transparent;
        margin-top: 10px;
    }
    .grid-events-list-container::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 3px;
    }
    .grid-events-list-container::-webkit-scrollbar-thumb {
        background: #518ce5;
        border-radius: 6px;
    }
    .grid-events-single-container {
        margin-left: 28px;
        margin-bottom: 19px;
        width: 525px;
        background: rgba(24, 81, 154, 0.36);
        border: 1px solid rgba(0, 0, 0, 0.2);
        position: relative;
        font-size: 13px;
    }
    .grid-events-single-container-selected {
        background: rgba(24, 81, 154, 0.58);
        border: 1px solid rgba(27, 216, 250, 1);
    }
    .grid-events-single-header {
        position: relative;
        height: 40px;
    }
    .grid-events-single-status-cancel {
        position: absolute;
        width:49px;
        height:20px;
        background:linear-gradient(0deg,rgba(196,194,199,1),rgba(186,185,187,1));
        border-radius:3px;
        top: 11px;
        left: 15px;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
    }
    .grid-events-single-status-ing {
        position: absolute;
        width:49px;
        height:20px;
        background:linear-gradient(0deg,rgba(62,155,236,1),rgba(20,208,218,1));
        border-radius:3px;
        top: 11px;
        left: 15px;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
    }
    .grid-events-single-status-over {
        position: absolute;
        width:49px;
        height:20px;
        background:linear-gradient(0deg,rgba(40,190,199,1),rgba(49,228,159,1));
        border-radius:3px;
        top: 11px;
        left: 15px;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
    }
    .grid-events-single-checkbox{
        position: absolute;
        top: 11px;
        left: 10px;
    }
    .grid-events-all-container >>> .el-checkbox__inner{
        border: 1px solid #0091ff;
        border-radius: 3px;
        width: 22px;
        height: 22px;
        background-color: transparent;
    }
    .grid-events-all-container >>> .el-checkbox__inner::after{
        border: 5px solid #0091ff;
        border-left: 0;
        border-top: 0;
        height: 12px;
        left: 6px;
    }
    .grid-events-all-container >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
        top: 8px;
    }
    input::-webkit-input-placeholder{
        color:rgba(0, 242, 255, 1);
    }
    .grid-events-single-title {
        position: absolute;
        top: 11px;
        left: 41px;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color: rgba(0, 242, 255, 1);
        font-weight: inherit !important;
    }
    .grid-events-single-button {
        position: absolute;
        top: 11px;
        right: 16px;
        width:40px;
        height:20px;
        border:1px solid rgba(23,146,252,1);
        border-radius:3px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
    .grid-events-single-remark {
        margin-left: 17px;
        margin-right: 26px;
    }
    .grid-events-single-footer {
        line-height: 14px;
        height: 14px;
        font-size: 14px;
        color: rgba(179, 208, 249, 1);
        position: relative;
        margin-top: 16px;
        margin-bottom: 13px;
        padding-left: 10px;
    }
    .grid-events-single-footer>img {
        position: absolute;
        left: 21px;
        top: -7px;
    }
    .grid-events-single-footer>span:nth-child(2) {
        width: 330px;
        display: inline-block;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .grid-events-single-footer>span:last-child {
        position: inherit;
        right: inherit;
    }
    .grid-events-single-participants-list {
        margin: 9px 0 9px 10px;
    }
    .grid-events-single-tooltip-item {
        margin-right: 10px;
        width:74px;
        height:24px;
        display: inline-block;
        line-height: 24px;
        text-align: center;
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
    }
    .grid-events-single-tooltip-item:hover {
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
    }
    .grid-events-single-tooltip-tip {
        font-size: 14px;
        min-width: 150px;
        text-align: center;
        width: auto;
        height: 20px;
        white-space: nowrap;
    }
    .grid-events-single-tooltip-tip>span {
        position: relative;
        left: 0px;
        top: -18px;
    }
    .grid-events-single-tooltip-tip>img {
        cursor: pointer;
        position: relative;
        top: -8px;
    }
    .map-task-container {
        padding: 5px 26px;
        background: rgba(6, 44, 93, 0.7);
        border: 1px solid rgba(0, 0, 0, 0.2);
        position: relative;
    }
    .map-task-title {
        color: rgba(0, 242, 255, 1);
        text-align: center;
        font-size: 16px;
    }
    .map-task-location {
        margin-top: 5px;
        color: white;
        text-align: center;
        font-size: 14px;
    }
</style>