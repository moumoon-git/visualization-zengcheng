<template>
    <!-- 任务管理模块 -->
    <div class="grid-distribution-all-container">
        <!-- 1. 任务管理列表界面 -->
        <div class="grid-distribution-home-container">
            <!-- 1.1 头部内容：搜索、筛选、新增功能 -->
            <div class="grid-distribution-home-tool">
                <!-- 关键词搜索 -->
                <span class="grid-distribution-home-tool-search">
                    <input
                        class="grid-distribution-home-tool-search-inner"
                        placeholder="请输入网格名称、负责人"
                        v-model="queryList.search"
                        @change="getGridDistribution"
                    >
                    <span class="el-icon-search grid-distribution-home-tool-search-button" @click="getGridDistribution"></span>
                </span>
                <!-- 新增任务按钮 -->
            </div>
            <!-- 1.2 任务列表 -->
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="padding-left:10px;color:rgba(0, 242, 255, 1)">全选</el-checkbox>
            <el-checkbox-group
                class="grid-distribution-list-container"
                style="list-style-type:none;margin-block-start:0em;margin-block-end:0em;padding-inline-start:0px;"
                v-model="checkedDistributions" 
                @change="checkedDistributionsChange"
            >
            <div style="margin: 15px 0;"></div>
                <!-- 一条任务 -->
                <li
                    class="grid-distribution-single-container"
                    :class="{'grid-distribution-single-container-selected': item.id == selectedDistributionId}"
                    v-for="(item, index) in gridDistributionList"
                    :key="index"
                    @click.stop="selectDistribution(item)"
                >   
                    <div @click.stop="">
                        <el-checkbox :label="item.id" class="grid-distribution-single-checkbox">&nbsp;</el-checkbox>
                    </div>
                    <!-- 边框四角 -->
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <!-- 第一行：状态、标题、详情按钮 -->
                    <div class="grid-distribution-single-header">
                        <div class="grid-distribution-single-title">{{item.gridName}}</div>
                        <div class="grid-distribution-single-button" @click.stop="showMore(item.id)">详情</div>
                    </div>
                    <div class="grid-distribution-single-remark">{{item.areaRange}}</div>
                    <div
                        class="grid-distribution-single-participants-list"
                        v-if="
                            item.principal !== []
                            && item.principal !== {}
                            && item.principal !== null
                            && item.principal !== undefined
                        "
                    >
                        <span
                            v-for="(man, index) in item.principal"
                            :key="'man' + index"
                        >
                            <el-tooltip
                                placement="top"
                            >
                                <div
                                    slot="content"
                                    class="grid-distribution-single-tooltip-tip"
                                >
                                    <span>
                                        {{man.name}}
                                        {{man.groupName}}
                                        {{man.position}}
                                    </span>
                                    <img @click.stop="calling(man)" class="grid-distribution-single-tooltip-icon-phone" alt="电话icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="/>
                                    <img @click.stop="meeting(man)" class="grid-distribution-single-tooltip-icon-meeting" alt="会议icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg==">
                                </div>
                                <div class="grid-distribution-single-tooltip-item">{{man.name}}</div>
                            </el-tooltip>
                        </span>
                    </div>
                </li>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
    name: 'gridDistribution',
    props: ["overlayersList"],
    mounted() {
        this.getGridDistribution(this.queryList, this.gridDistributionList);
        window.displayPicture = this.displayPicture;
        setTimeout(()=>{
            if (this.gridDistributionList.length>0) {
                let checkedDistributions = []
                this.gridDistributionList.map(v=>{
                    this.overlayersList.map(item=>{
                        if (v.id == item.text.getExtData().id && item.obj.getVisible()) {
                            checkedDistributions.push(v.id)
                        }
                    })
                })
                this.checkedDistributions = this.$parent.checkComprehensive?checkedDistributions:[]
    
                this.isIndeterminate = this.$parent.checkComprehensive?0<this.checkedDistributions.length&&this.checkedDistributions.length<this.gridDistributionList.length:false;
                this.checkAll = this.$parent.checkComprehensive?this.checkedDistributions.length==this.gridDistributionList.length:false;
            }else{
                this.isIndeterminate = false
                this.checkAll = false
            }
        },800)
        bus.$on("gridCheck",(item)=>{
            if (this.gridDistributionList.length>0) {
                this.checkedDistributions = item.flag?this.gridDistributionList.map(v=>v.id):[]
                this.isIndeterminate = false;
                this.checkAll = item.flag?true:false;
            }
        })

        bus.$on("updateWorkList",(data)=>{
            this.getGridDistribution(this.queryList, this.gridDistributionList);
            setTimeout(()=>{
                let checkedDistributions = []
                this.gridDistributionList.map(v=>{
                    data.map(item=>{
                        if (v.id == item.text.getExtData().id && item.obj.getVisible()) {
                            checkedDistributions.push(v.id)
                        }
                    })
                })
                this.checkedDistributions = checkedDistributions
                this.isIndeterminate = 0<this.checkedDistributions.length&&this.checkedDistributions.length<this.gridDistributionList.length;
                this.checkAll = this.checkedDistributions.length==this.gridDistributionList.length;
            },800)
        })

        bus.$on("closeDistribution",(id)=>{
            if (id) {
                let distributions = this.checkedDistributions
                distributions = distributions.filter(v=>v.id!=id);
                this.checkGridDistributions(distributions,this.gridDistributionList)
                this.checkedDistributions = distributions
            }else{
                this.checkedDistributions = []
                this.isIndeterminate = false;
                this.checkAll = false;
            }
        })
        
        
    },
    watch: {
        /**
         * @function
         * @desc 列表中选中则获取详情
         */
        // selectedDistributionId(id) {
        //     let self = this;
        //     if(id !== -1 ){
        //         this.getWorkDetail(id);
        //     } else {
        //         this.workDetail = {};
        //         // self.map.clearMap();
        //         self.map.remove(self.amapInstances)
        //         self.amapInstances = []
        //     }
        // },

    },
    methods: {
        checkGridDistributions(checkData,allData){
            this.isIndeterminate = 0<checkData.length&&checkData.length<allData.length;
            this.checkAll = checkData.length==allData.length;
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
         * @desc 提交请求queryList，获取工单列表数据，保存在workList
         * @return {null}
         */
        getGridDistribution() {
            let self = this;
            let request = {
                url: "/visuallayer/searchVisualLayer",
                method: "get",
                params:{search:self.queryList.search}
            };
            this.apix(request)
            .then(
                res => {
                    // console.log("getGridDistribution()获取工单列表：【\n", res.page.list, "\n】");
                    if (res.data&&res.data.length>0) {
                        self.gridDistributionList = res.data[0].filter(v=>v.options);
                    }else{
                        self.gridDistributionList = []
                    }
                },
            )
            .catch(
                err => {
                    console.log("getGridDistribution()获取工单列表失败！错误信息：【\n", err, "\n】");
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
            bus.$emit("getGridEventsDetail",id)
        },

        /**
         * @method
         * @desc 点击选中工单列表中的工单，地图上显示人员动态信息
         * @param id 点击时的工单的id
         * @return {null}
         */
        selectDistribution(item) {
            let self = this;
            item.id == self.selectedDistributionId ? self.selectedDistributionId = -1 : self.selectedDistributionId = item.id;
            let getLngLat = JSON.parse(item.remark)
            if ((self.checkedDistributions.find(v=> v == item.id))&&(item.id == self.selectedDistributionId)) {
                self.map.setCenter([getLngLat.longitude, getLngLat.latitude])
            }
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
            this.checkedDistributions = val ? this.gridDistributionList.map(v=>v.id) : [];
            this.isIndeterminate = false;
            bus.$emit("gridDistribution",this.checkedDistributions)
        },
        checkedDistributionsChange(value) {
            this.checkGridDistributions(value,this.gridDistributionList.map(v=>v.id))
            bus.$emit("gridDistribution",this.checkedDistributions)
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
            gridDistributionList: [],

            /**
             * @var {num}
             * @desc 工单列表中被点击选中的工单id，未选中（-1）
             */
            selectedDistributionId: -1,
            checkAll: false,
            checkedDistributions: [],
            isIndeterminate: false
        }
    },
    destroyed(){
        bus.$off("gridCheck")
    }
}
</script>

<style scoped>
    .grid-distribution-all-container {
        color: white;
    }
    .grid-distribution-home-tool {
        position: relative;
        height: 80px;
    }
    .grid-distribution-home-select-container{
        height: 26px;
        width: 86px;
        border: solid 1px rgba(63,146,254,1);
        background:rgba(6,44,93,1);
        position: absolute;
        left: 10px;
        top: 13px;
    }
    .grid-distribution-home-select {
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
    .grid-distribution-home-select option {
        text-align: center;
        background: rgba(11, 30, 75, 1);
    }
    .grid-distribution-date-range-selector-border {
        position: absolute;
        left: 106px;
        top: 13px;
        border: solid 1px rgba(63,146,254,1);
        display: inline-block;
        width: 210px;
        height: 26px;
    }
    .grid-distribution-home-tool /deep/.grid-distribution-date-range-selector,
    .grid-distribution-home-tool /deep/.grid-distribution-date-range-selector {
        font-size: 14px;
        font-weight: 400;
        height: 26px;
        width: 210px;
        color: rgba(0,242,255,1);
        background: transparent;
        border: none;
        line-height: 26px;
        
    }
    .grid-distribution-date-range-selector /deep/.el-range__icon,
    .grid-distribution-date-range-selector /deep/.el-range__close-icon,
    .grid-distribution-date-range-selector /deep/.el-range-separator {
        line-height: 26px;
        color: white;
        height: 26px;
        padding: 0px;
    }
    .grid-distribution-date-range-selector /deep/.el-range-separator{
        padding-right:5px;
    }
    .grid-distribution-date-range-selector /deep/.el-range-input {
        width: 80px;
        background: transparent;
        color: white;
        margin-top: 2px;
    }
    .grid-distribution-home-tool-search {
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
    .grid-distribution-home-tool-search-inner {
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
    .grid-distribution-home-tool-search-button {
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
    .grid-distribution-home-tool-add-button {
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
    .grid-distribution-list-container {
        height: 610px;
        overflow: auto;
        background: transparent;
        margin-top: 10px;
    }
    .grid-distribution-list-container::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 3px;
    }
    .grid-distribution-list-container::-webkit-scrollbar-thumb {
        background: #518ce5;
        border-radius: 6px;
    }
    .grid-distribution-single-container {
        margin-left: 28px;
        margin-bottom: 19px;
        width: 525px;
        background: rgba(24, 81, 154, 0.36);
        border: 1px solid rgba(0, 0, 0, 0.2);
        position: relative;
        font-size: 13px;
    }
    .grid-distribution-single-container-selected {
        background: rgba(24, 81, 154, 0.58);
        border: 1px solid rgba(27, 216, 250, 1);
    }
    .grid-distribution-single-header {
        position: relative;
        height: 40px;
    }
    .grid-distribution-single-status-cancel {
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
    .grid-distribution-single-status-ing {
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
    .grid-distribution-single-status-over {
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
    .grid-distribution-single-checkbox{
        position: absolute;
        top: 11px;
        left: 10px;
    }
    .grid-distribution-all-container >>> .el-checkbox__inner{
        border: 1px solid #0091ff;
        border-radius: 3px;
        width: 22px;
        height: 22px;
        background-color: transparent;
    }
    .grid-distribution-all-container >>> .el-checkbox__inner::after{
        border: 5px solid #0091ff;
        border-left: 0;
        border-top: 0;
        height: 12px;
        left: 6px;
    }
    .grid-distribution-all-container >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
        top: 8px;
    }
    input::-webkit-input-placeholder{
        color:rgba(0, 242, 255, 1);
    }
    .grid-distribution-single-title {
        position: absolute;
        top: 11px;
        left: 41px;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color: rgba(0, 242, 255, 1);
        font-weight: inherit !important;
    }
    .grid-distribution-single-button {
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
    .grid-distribution-single-remark {
        margin-left: 17px;
        margin-right: 26px;
    }
    .grid-distribution-single-footer {
        line-height: 14px;
        height: 14px;
        font-size: 14px;
        color: rgba(179, 208, 249, 1);
        position: relative;
        margin-top: 16px;
        margin-bottom: 13px;
        padding-left: 10px;
    }
    .grid-distribution-single-footer>img {
        position: absolute;
        left: 21px;
        top: -7px;
    }
    .grid-distribution-single-footer>span:nth-child(2) {
        width: 330px;
        display: inline-block;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .grid-distribution-single-footer>span:last-child {
        position: inherit;
        right: inherit;
    }
    .grid-distribution-single-participants-list {
        margin: 9px 0 9px 10px;
    }
    .grid-distribution-single-tooltip-item {
        margin-right: 10px;
        width:74px;
        height:24px;
        display: inline-block;
        line-height: 24px;
        text-align: center;
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
    }
    .grid-distribution-single-tooltip-item:hover {
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
    }
    .grid-distribution-single-tooltip-tip {
        font-size: 14px;
        min-width: 150px;
        text-align: center;
        width: auto;
        height: 20px;
        white-space: nowrap;
    }
    .grid-distribution-single-tooltip-tip>span {
        position: relative;
        left: 0px;
        top: -18px;
    }
    .grid-distribution-single-tooltip-tip>img {
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