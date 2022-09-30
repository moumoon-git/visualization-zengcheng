<template>
    <!-- 任务管理模块 -->
    <div class="task-management-all-container">
        <!-- 1. 任务管理列表界面 -->
        <div class="task-management-home-container" v-show="displaySwitch==0">
            <!-- 1.1 头部内容：搜索、筛选、新增功能 -->
            <div class="task-management-home-tool">
                <!-- 状态选择 -->
                <div class="task-management-home-select-container">
                    <!-- 边框四角 -->
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <select class="task-management-home-select" v-model="queryList.status" @change="getWorkList">
                        <option disabled>任务状态</option>
                        <option value="" selected>全部</option>
                        <option value="-1">已取消</option>
                        <option value="0">执行中</option>
                        <option value="1">已完成</option>
                    </select>
                </div>
                <!-- 日期选择 -->
                <span class="task-management-date-range-selector-border">
                    <!-- 边框四角 -->
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <el-date-picker
                        class="task-management-date-range-selector"
                        v-model="dateRange"
                        type="daterange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="selectDateRange"
                    >
                    </el-date-picker>
                </span>
                <!-- 关键词搜索 -->
                <span class="task-management-home-tool-search">
                    <input
                        class="task-management-home-tool-search-inner"
                        placeholder="任务名称、地点、姓名、单位"
                        v-model="queryList.search"
                        @change="getWorkList"
                    >
                    <span class="el-icon-search task-management-home-tool-search-button" @click="getWorkList"></span>
                </span>
                <!-- 新增任务按钮 -->
                <div class="task-management-home-tool-add-button" @click="addTaskSwitch">新增任务</div>
            </div>
            <!-- 1.2 任务列表 -->
            <ul
                class="task-management-list-container"
                v-infinite-scroll="loadList"
                style="list-style-type:none;margin-block-start:0em;margin-block-end:0em;padding-inline-start:0px;"
            >
                <!-- 一条任务 -->
                <li
                    class="task-management-single-container"
                    :class="{'task-management-single-container-selected': item.id == selectedWorkId}"
                    v-for="(item, index) in workList"
                    :key="index"
                    @click="selectWork(item.id)"
                >
                    <!-- 边框四角 -->
                    <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                    <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                    <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                    <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                    <!-- 第一行：状态、标题、详情按钮 -->
                    <div class="task-management-single-header">
                        <div class="task-management-single-status-cancel" v-if="item.status==-1">已取消</div>
                        <div class="task-management-single-status-ing" v-if="item.status==0">执行中</div>
                        <div class="task-management-single-status-over" v-if="item.status==1">已完成</div>
                        <div class="task-management-single-title">{{item.name}}</div>
                        <div class="task-management-single-button" @click.stop="showMore(item.id)">详情</div>
                    </div>
                    <div class="task-management-single-remark">{{item.remark}}</div>
                    <div
                        class="task-management-single-participants-list"
                        v-if="
                            item.allContactorList !== []
                            && item.allContactorList !== {}
                            && item.allContactorList !== null
                            && item.allContactorList !== undefined
                        "
                    >
                        <span
                            v-for="(man, index) in item.allContactorList"
                            :key="'man' + index"
                        >
                            <el-tooltip
                                placement="top"
                                v-if="
                                    man.contactorEntity !== []
                                    && man.contactorEntity !== {}
                                    && man.contactorEntity !== null
                                    && man.contactorEntity !== undefined
                                "
                            >
                                <div
                                    slot="content"
                                    class="task-management-single-tooltip-tip"
                                >
                                    <span>
                                        {{man.contactorEntity.name}}
                                        {{man.contactorEntity.groupName}}
                                        {{man.contactorEntity.position}}
                                    </span>
                                    <img @click.stop="calling(man.contactorEntity)" class="task-management-single-tooltip-icon-phone" alt="电话icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAE4klEQVRYha2Yf2iVVRjHv885773v7u5Go1UUq0C2fihUKPmP0R9mEf1T4SVM7ceYWTDDmiIlFDbDsI1orcIyLDLBLb2MIpJhUWOhRpRWNipK0SIkS6Xd3V1333NOnJf3ncdzz3t3kw48nL3nnh+f93me8zzPO8r/HmCGRlV+VjMtrrV5jnlk9XDAKGNcWWP/CwhZIGSNmSAq4fALAjJBzANZ9MwcMMoSaR1uQttQiZAu0zCHuEBkJFSDhmY0pWdMiDUQC4+EGZpxgcgaQWQ1f7JByILwImHWG2kRFgwch5gQZMBIe67tI6Y29G9p3T+a5cv+ZlivJ2UltmyfEFsiEGFpxPW20phLSZrxLE2YMKE22rO8c5xh/TUCnb5C6bCHt+9v4JcMFMQLAAIHiG0WYZwRRGNk9dMqj9t5jjqSomYN0SqwZnNRfNY9KQ7cEmB5mbCyP8NuMEyXirQXSkeWP5Jr5MPReMowL3P4HGDZ3nZY/qrP1gI42VMUw9FmfM2k+A4Ke0c8escAMYG814piQPe5Br47GuOGOCN1UhwJ/1aEBSmFT3Fug/D3fEGsyzXyQ+/5rO3Bs/LITp9d9TWnubE5MgqFVoE3fuXozzXykXvK6r6HSvJ4ZCY7HFSA2EChcDXt8dMb7PBZm554hcSU3uMgp3lHOZ6xvOMYgKMAZo0xagXwW0L6SAQ559EKv5QIc027nmDkD6VpW0rho9vL8i893lMUewDsMfaQ7/vsysE0DUNhaGNR7E8CiJvprGZQCm/CokC9AsLs0RRdHG/0Uh27F0DDQEF0W443re4AoME0DZHCkDZjuobEyIwJFTmksyR/BPBzXx17Mx6fLdUPesG3Hl2UkItwjJN/Y4AndxfE0zNEXTJBbE2YAShYVVIPA2jbkOGL9JyOkhyDwvcbM+xdx3UMN24VqrRhUow68owLguAwjbRE3FaWf7YIPHvYQ++XHjXpeTsmxGMAWlZkeZcjLrgOdEmFRlz+EWtFR8KgX8cFhf09GfZJdD3FXWW18gzDsifqebuZnw551NSR5V2r6/lSRzlhm3Jai3GpWBHM7GipJdfID0DhZL4glut5mzJ84TceNnOFvbcKtWsK5O3z0K+DYHQjgwUBHl87KQ4C4VXXUo4kMBOnWbPa2bcidOtnHcgA/JEfF0v0mtEUXdrns24QZgHINEvs3DohNIxcmuVPTTE80Czx3NYJsS0BRCSBJMGE/RlCZkUD/wrAqfy4uDtePMapYYLA5wfqtGFaua6e33mE4+XLBVa9XhR5B0iYCKvFEdNP4sXlJoXJwXExTy/INfLPd/msRc+bI9Q/8wN1yi6WeoviY67w1gmOHsf1dd4aF4wNEtrZA87mx8VCKIwOpOnD1fV8iVUonbePINwBhX3VAlrSd43LeT0jpcc976rni49z9Oq8cl2AvvYp+cW1QhX1odvr2NUfpEgXUZc9X5Q3zRGqYJjF9BFVDQQJMLHEz0yngD6fvQjCzVBhcvsphNXPwOlNRbn4+mSIiltTK4wtScWO7W/m4YEdPF3Z19yIjM3McWnUFtVAYEfqhOrfWQbYMHGT1lu68gwZ8EkwFRC1gCQBkQVV7dMUxsH2japZI0kwdiVul5mwtFJx8IVqxASwIeLDZ/r3hW0u5yfnf23mZqZPuGBsTVY2AP8ChXtUJKSdmwwAAAAASUVORK5CYII="/>
                                    <img @click.stop="meeting(man.contactorEntity)" class="task-management-single-tooltip-icon-meeting" alt="会议icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAFaElEQVRYha1YbYhUVRh+3nPuzN7ZnRU/clOxtoLcfihihBsbpViQ/RCyMcwiqUz/iCFSWmiIJBgZSUVEYAapJegQBmL/LNFCLEIUi9K1dNXNDLWZdmZn7j0n7uy52zuvd3ZN9sC7995zzz33med93o+7lO8JcBODhnjE3syG0fD+x1oSRwhQls1ZMTeiYEgYn+NgbIPzEQMjgShnjcAYZxD3RgQMB6UZmNjiEYMgdj3ibuJsaGGKaSR6eegsmosj44ZBDQeGuycGknLPee6aGCsRgKp71jYQdcOhhlvAmNEMRPqER2NyWb0316q7c1n92V8KzdE8A1vnylyrrtnNgpGijVmJXuiv99VOECbMCLAShJnLmvWH0TyAJrcuxdjT+UKoIksQ/rBgJIiYkZR7WRMI00cbfL2uFB6FxfcgPMDANAmWtBA/JUVkkmaSwlgzMDV2OgOsPuLhjVxWTwXh7seqdoUDYITFWgmZmGVOSmQmCQhnxYt/8epSeOTeAFt8i2sPBdj4Ytn84u4lmRS9Sshf4LUpSSMe2zhyQSTSzJIWvfaqwuOw6AHQX5sntN0VYtvmvnAbgLKbj6ziIixwFjKWDGfLG4IRycrgr7uqML/N4MvZgT1IA+vsnhQ91a2xGMAOkVuGy9rxtZWake7h4uXWt6Bi9z1cNRdjV59T+sC3GpMd6BiISgBCDEidfmI3KSFWzSKn5qJ3M/r+wxrPhsBtIHQAKMLi0uDmhDtqfy1OC4Ga2uzAKOYL4Tzmuip3mydaAwmoxkYuq98D4VEAZ32DU5MNDpWA8T5Q8i3KfYSsAY41AcU/CRMtYELApIG/my3+qBLIzVfcnnHpUKyoktSMBKJzWb0dhK45Vfv88rL5meeQKwR/u69mvtRnvhtk4b9fWrO3MrqrPbTdC/vNSSdozwlZCSJs5CbiL+chvLxFL+5V2PRcv507r2IuOxA1MFsyevYhD68BuAJgzIKKXbeo35yIAf2qqeXVjHofhAyAUaMNdn78T/gmgJKzsog0o4S66yKqV2E9LPbNq5heKcQIyASD/flC+ELK4vieNK3hrL7jqyUgjM8XwgULK3bpVYVnDqboVpGN60StBAhpfleI3Ym1xOJ8L6Fjf1q1VwntKYszPILaDC5Exy/SasphTbOiG2NtnXuuq1HDVu1R1hbrIDjLF8NlvsXlrWlaOc7gh13FcANbgw2lcO/UAFt3pOmVHoXOVWUzf2pgC8ILdUOJF113flzRdFlLjno0dlNGPzLJ4nSzxcU2g/NvZ/Sss4qa43VbMvpBAoxvcW6cxcn9nur8yFfTGrxvAF2+J5DZNs646VxW7wJhRr4QdtXNt+o9ANpg0e0ipAWE25XFid3FcO2aZr3wlMbTkSsBXKvtT2iPSkm+EHYwEVec1cqEJ6qnYUezvN+u+MCnH5/M6o27i+HrDnQUsm1zq/blpWVzLNbIuox+4icPi6Lo+F2hAxbH88VwFev++nOt+itZjzgzHgMSW9zDhnOq5q9Dnl50zMPnuVY9bUqIT+4x9rfogVOK7jyQogsWpFOw9pLCxGi/b1J0SxXIRixE52WiKAFWz6janMdykGwlEOeZpIQ3WLH3ptWkT9O0GYRO5xabkEVT7rzkKjzcWsUKYjVfCO9jFX0wx0R78drEAamkai2SY6MCyAUasxAwd1VEshtsJ7ibuG7A3MVZ0CyVDwWE72UEoICxUacdCUZ+CfJN5QecBJLEjGxBA1G76jST1APHgLjAFNMHb6aTQMi9ZJQmdnmyubJiE2ILucjRwDVJ/5GwgnUrwA3JjMyKHIwEMRQjSftd19nJY6PPWw6C97J83AgYCSgJ4MAA8C9IEUFPQyqzUAAAAABJRU5ErkJggg==">
                                </div>
                                <div class="task-management-single-tooltip-item">{{man.contactorEntity.name}}</div>
                            </el-tooltip>
                        </span>
                    </div>
                    <div class="task-management-single-footer">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAYAAABVX2cEAAADFElEQVQ4jYWV7WtURxTGf3N3dpe4SbZriEYNJjZoDCIi+l2wH0wJttQvgn5rUapCP4jgyx8g/gGCIiKCL6AolEKkQfBL26hFsC++QLLS2Cw2psnGRJONd+7MyFzX5ObuZvPAgZ1nz3nmnHNnzgj6NVWQBb4BdgAbgDQwBTwF+oCfgSAeJlpP2LlFoce4oJPAUaCh2i5lDAHHW3u9m4UeUylW6NargJ+A7SExJWAMUtMCGYCfgqDBQrOFurn488APgHILKaxheJfJYrgLbOKVYEVekC598rexpARTTZbJ9a4Z9vuyw+FQDGud7lk0m+qfQG6smsBCNI5BwzgUOgS02UPAI+CSoNffguFx7i8rGt/U1KiKl+ucICNAu0TZ/fIfK7LF2tkshvYXMFTntZDjC8kUu9cUgsUquwPchHBnd0QOAJvjTivzhtdbkt1S/qfaErrirDnpg8DFCOfO17nyF/wu6pyZBkbFVtFyYsJkZqyI/uknRV9K2e5FKkvqhBhJaLs8So42JYa8uhltPKOJ2qucNxLnIqaKDUzG+cx0ILyk8j2hFVHTafH1YFemNc47G+zKfFXybHucT79XMx7WFBNGEzXvrfoMZe8PdGb3DHRmk44b6MxmBzqzx1D2Rm5aiXhM2g+eyYRR/cKyO1r/5/+/I78s1YonbgOl5x25Ir5d4frFrKLpzQwi1khp+NXztL4ujCZqaV+x7uU4vPPBt3X4dg2+TTJRYuPwRNijWEwgjL4lPRP0Ai+AjuhO9bMBm4dnKUmJTnikg4Cknp8QMdz6u211QQqj3wL7gF+AVNxrmV913kWRB47gW5yY438H9gI3qgnWwL/Al3+2tBfdEJLCzA3MH4FvgSvhnFkak07oj+aOPOrjXZSeWVDGNWAtcHoJKR/YAzxDz19qKWxFT86EQxL21xBzd/Ne+EvNk1KYii9ky+W6Mb6zipDb7OrcaonMomU8ADZGeNeGUws8o2JUZvYJrsHuZvQDzcBv5YwXTr5IePig1IA7Q07wQvkddRkvCrnU4wE8BLZVe3RDXC6PNeADkPVzWEDl/mQAAAAASUVORK5CYII=" alt="定位icon"/>
                        <span>{{item.workPlace}}</span>
                        <span>{{item.gmtCreate}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 新增任务界面 -->
        <taskManagementAdd v-show="displaySwitch==1" @goBack="displaySwitch=0;queryList.page=1;getWorkList(queryList, workList);"></taskManagementAdd>
        <!-- 任务详情界面 -->
        <taskManagementDetail ref="taskManagementDetail" v-show="displaySwitch==2" @goBack="displaySwitch=0;selectedWorkId=-1" :workDetail="workDetail" :workId="selectedWorkId"></taskManagementDetail>
        <!-- 图片放大弹窗 -->
        <pictureEnlarge ref="pictureEnlarge"></pictureEnlarge>
    </div>
</template>

<script>
import taskManagementAdd from "./add/taskManagementAdd"
import taskManagementDetail from "./detail/taskManagementDetail"
import pictureEnlarge from "../../pictureEnlarge"

export default {
    name: 'taskManagement',
    props: [],
    components: {
        taskManagementAdd,
        taskManagementDetail,
        pictureEnlarge
    },
    mounted() {
        this.getWorkList(this.queryList, this.workList);
        window.displayPicture = this.displayPicture;
    },
    watch: {
        /**
         * @function
         * @desc 列表中选中则获取详情
         */
        selectedWorkId(id) {
            let self = this;
            if(id !== -1 ){
                this.getWorkDetail(id);
            } else {
                this.workDetail = {};
                // self.map.clearMap();
                self.map.remove(self.amapInstances)
                self.amapInstances = []
            }
        },

        /**
         * @function
         * @desc 任务详情数据更新后，画图显示参与人最新的定位
         */
        workDetail() {
            let self = this;
            if(self.displaySwitch == 0 && self.selectedWorkId !== -1) {
                self.drawMapNew();
            }
        }
    },
    methods: {
        /**
         * @method
         * @desc 初始化传递Amap实例
         */
        initMap(map) {
            this.map = map;
            this.$refs.taskManagementDetail.initMap(map);
        },

        /**
         * @method
         * @desc 提交请求queryList，获取工单列表数据，保存在workList
         * @return {null}
         */
        getWorkList() {
            let self = this;
            this.queryList.page = 1
            // console.log("getWorkList()查询条件：【\n", self.queryList, "\n】");
            let request = {
                url: "/work/workSheet/list",
                method: "post",
                data: self.queryList,
                params: {},
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.apix(request)
            .then(
                res => {
                    // console.log("getWorkList()获取工单列表：【\n", res.page.list, "\n】");
                    self.workList = res.page.list;
                },
            )
            .catch(
                err => {
                    console.log("getWorkList()获取工单列表失败！错误信息：【\n", err, "\n】");
                }
            );
        },

        /**
         * @method
         * @description 下拉刷新任务列表
         * @return {null}
         */
        loadList() {
            let self = this;
            // console.log("loadList()查询条件：【\n", self.queryList, "\n】");
            this.queryList.page++;
            let request = {
                url: "/work/workSheet/list",
                method: "post",
                data: self.queryList,
                params: {},
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.apix(request)
            .then(
                res => {
                    // console.log("loadList()获取工单列表：【\n", res.page.list, "\n】");
                    if(res.page.list !== null && res.page.list !== undefined && res.page.list.length > 0) {
                        self.workList.push(...res.page.list);
                    } else {
                        self.queryList.page--;
                        // console.log("loadList()到底了！");
                    }
                },
            )
            .catch(
                err => {
                    console.log("loadList()获取工单列表失败！错误信息：【\n", err, "\n】");
                }
            );
        },

        /**
         * @method
         * @desc 获取指定id的工单详情
         * @param {num} id 工单的id
         * @return {null}
         */
        getWorkDetail(id) {
            let self = this;
            let request = {
                url: "/work/workSheet/info/" + id,
                method: "get",
                params: {},
            };
            this.apix(request)
            .then(
                (res) => {
                    // console.log("获取id=", id,"的工单详情：【\n", res.data, "\n】");
                    self.workDetail = JSON.parse(JSON.stringify(res.data));
                }
            )
            .catch(
                (res) => {
                    console.log("获取id=", id,"的工单详情失败！错误信息：【\n", res, "\n】");
                }
            );
        },

        /**
         * @method
         * @desc 点击切换新增任务弹窗
         * @return {null}
         */
        addTaskSwitch() {
            this.displaySwitch = 1;
        },

        /**
         * @method
         * @desc 点击展开详情
         * @param {num} id 查看详情的工单id
         * @return {null}
         */
        showMore(id) {
            // 触发子组件更新
            this.workDetail={};
            this.getWorkDetail(id);
            // 切换页面
            this.displaySwitch = 2;
            this.selectedWorkId = id;
        },

        /**
         * @method
         * @desc 点击选中工单列表中的工单，地图上显示人员动态信息
         * @param id 点击时的工单的id
         * @return {null}
         */
        selectWork(id) {
            let self = this;
            id == self.selectedWorkId ? self.selectedWorkId = -1 : self.selectedWorkId = id;
            // console.log("selectedWorkId =", self.selectedWorkId);
        },

        /**
         * @method
         * @desc 地图上显示每个参与人最新一条记录的落点
         * @return {null}
         */
        drawMapNew() {
            let self = this;
            // 清除所有定点和路径
            // self.map.clearMap();
            self.map.remove(self.amapInstances);
            self.amapInstances = [];
            // 记录最新的记录
            let latest = 0;
            // 定点集合
            let markerSet = [];
            // 绘制每个人最新记录的定点
            let groupStatus = this.workDetail.groupWorkHandleResponseList;
            for(let man in groupStatus) {
                // 判断记录这个人所有任务中最新的记录
                groupStatus[man][0].id > latest ? latest = groupStatus[man][0].id : null ;
                // 创建一个 Icon
                var manDefaultIcon = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(38, 52),
                    // 图标的取图地址
                    image: 'data:image/png;base64,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',
                    // 图标所用图片大小
                    imageSize: new AMap.Size(38, 52),
                    // 图标取图偏移量
                    imageOffset: new AMap.Pixel(0, 0)
                });
                // 创建一个 Icon
                var manSelectedIcon = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(38, 52),
                    // 图标的取图地址
                    image: 'data:image/png;base64,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',
                    // 图标所用图片大小
                    imageSize: new AMap.Size(38, 52),
                    // 图标取图偏移量
                    imageOffset: new AMap.Pixel(0, 0)
                });
                // 绘制记录落点
                if(groupStatus[man][0].longitude !== null && groupStatus[man][0].longitude !== undefined && groupStatus[man][0].longitude > 0) {
                    console.log("绘制定点：[", groupStatus[man][0].longitude, groupStatus[man][0].latitude, "]");
                    let marker = new AMap.Marker({
                        icon: manDefaultIcon,
                        position: [groupStatus[man][0].longitude, groupStatus[man][0].latitude],
                        map: self.map,
                        offset: new AMap.Pixel(-20,-20)
                    });
                    self.amapInstances.push(marker);
                    // 添加点击事件，打开信息窗体
                    AMap.event.addListener(marker, 'click', openInfo);
                    function openInfo() {
                        // 构建信息窗体中显示的内容
                        let info = [];
                        info.push("<div class='map-card-container'>");
                            info.push('<img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:7px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:7px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">');
                            info.push("<div class='map-card-task-name'>" + self.workDetail.name + "</div>");
                            info.push("<span class='map-card-man-name'>" + groupStatus[man][0].contactorEntity.contactorIdString + "</span>");
                            info.push("<span class='map-card-time'>" + groupStatus[man][0].gmtCreate + "</span>");
                            info.push("<div class='map-card-remark'>" + groupStatus[man][0].remark + "</div>");
                            for(let file of groupStatus[man][0].documentList) {
                                if(self.isImg(file.allUrl) == false) {
                                    info.push("<div class='map-card-file'><a href='" + file.allUrl + "'>" + file.name + "</a></div>");
                                }
                            }
                            for(let file of groupStatus[man][0].documentList) {
                                if(self.isImg(file.allUrl)) {
                                    info.push(`<img class="map-card-img" src="${file.allUrl}" alt="${file.name}" onclick="displayPicture(event)">`);
                                }
                            }
                        info.push("</div>");
                        // 构建信息窗口实例
                        let infoWindow = new AMap.InfoWindow({
                            isCustom: true,
                            content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                            offset: new AMap.Pixel(0, -30)  // 偏移量
                        });
                        self.amapInstances.push(infoWindow);
                        infoWindow.open(self.map, marker.getPosition());
                        // 点击修改图标
                        for(let i in markerSet) {
                            markerSet[i].setIcon(manDefaultIcon);
                        }
                        marker.setIcon(manSelectedIcon);
                        // 移动到中心
                        self.map.panTo(marker.getPosition());
                    }
                    // 最新的记录默认打开信息窗口
                    latest == groupStatus[man][0].id ? marker.emit('click', {target: marker}) : null ;
                    // 记录落点到数组中，用于后续清空
                    markerSet.push(marker);
                }
            }
            // 绘制任务本身的落点
            var taskIcon = new AMap.Icon({
                // 图标尺寸
                size: new AMap.Size(38, 52),
                // 图标的取图地址
                image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAvCAYAAACLx2hbAAAKoUlEQVRYha1ZeWycxRX/zfFdu+tde9dHHGyJIwGRlFQolFAVCGdbWii0KqoAiapSg6UA7R8VEoIApagHPdQWQYr/QKIQKBS1agstLQVVTSiBAOUIUCAHIU4c28mu7b2/Y2aqt147XnvXdoAnPenbmTfv/ebNzHtvZhlm0b8HfoglUieAKwCsB7AKwHIADoASgP0AXgPwHICn1w/eWl2qUqJjBbQCwB0AvgHAWoL+HIDfAPj5+sFbJ44Z0NBdA02F9h7oJ7nvASDE9lIUz6HDAK5ZP7jpnx8b0AcH+mIAHgRw5XQb5xoxpwrX9WFbIQRXYMxAG44oEghCG5Wqi2pgw5gZEwrApnMHb/vJ0gHdeV0jmOE+8sZfAVxEvwXXaE/k0RYv1QAsRkpzTBSSKJTjs4H94NzB2+9oNZQ3/NKNzKB/xqAvYtBoj+XR33UIyVgRzJh5ss1YQCPTNoG+zhHE7DLpI75t28D3v7Y0QMrM8L5DvefAmBtJSXcyh474JJjWDTJLZYkIPaksUl4BNVcZc/+26+5IHxMgwPwYMKw7kUNMlj8SkLnc4U0i5RZIdxdgbloCIF3jD7PL1jLoz6XdCXiiPNP+SXCHO1GbIIPe8Px1m+ad2EZAkZlimK87wkdSFo62fYKcccbBmcoA5oK5gOS8JasdPX12h8zP/F6A9tQD34sAJgEsA/B5ABsAtLcaJqCQFAVMRm1nA/j7ooBs5q92THUqcrSmuymukF+nJfrv/e1bAJ4duuGbPwWwBcAXWo1u42XkET91SUsWQyW1yBL9EpG5GZGJGtqPAjuCyHwFkXmhlQ4eRYix8vFLAuQqvyUYEyGPyGxq2j+L+u9/KEBkblhoYo72k3MBNS5ZqOuNYT3yzacqd8c8XS0vuJh1OsC73uwJspFlItms3+LhvPbGhkjX3abZXMFp8m1xfNbpWtFXGt29OCR9dWS4tKLmkxM8DOa2NS4ZOWaK1azvBmZaS2b0loOxrvi8/ln04obvnMyM/gUjMC108UCNLuwhNTOTEdoGzWZlBwGY7a0DsG041TWwPDf68uz+lzbcyKbqJXMvgIwV+IBu7iEO7F0Y0NFZ/rcVIDeqQsRiUFycTvaH012vANgOYPylDdcvB/SFAE4kWc/3IfwFY8ebiwCamQmVn5c300DTTx+ZQLarHYYx+vmZOjeQUAqp3ORsrzejeQVb01wGpR+H0kGr3GVVfGRGcpBhSGlmHruVKjqHs+BBtFD+e73/6T/sXMRDM19jdS9d0mpqVhiiq5RF4EqEngXNec0rdimEDBcO8XXa0qyx6bGvE5WPb9AKLaTVLgY1PkbaBuBXxwroAIBvAfjT3FL3Y1IWwLX9259s6sY5gOZl978A+C6AX39CoKg6u7T/5af2tRJgxYHNMz/GdzzVSu56APd+TDCUbs7vOPPSHbMbE4MbG4Salh9N6D4AfQBu/ohgaHmu6vjsZTsWE1xoD81QxzmXd0LrHfnXt+5WpckVx4rGSi97ILF63QtLkW3poY7zrqCr8sUALjMw/Yrponfauv+UXt3WZqrlnqWCkeme/7mr1qYMzIMMbAgA7YtnGoLMLGp66+g47wqq9H6njdkQmcgJlNrlq+j9Csx7+uQ19wEiu6Sbhh1725xy2iM0lnSQLm3Mt0l3q2qyYVMDSAG4zcCsVkaNhlplQ63GI63zgVIlbXQl0JEvhw/2xof23g1jYq08Y4TcU1yz9nbpxcEZ92wh4pLzNouLtMVFRjDRw8DeBnBXYnDj5PS42R6iAn1QG7MyUGpfJQo/LIfhvlLo75/0K0M5v3jwcLVwqGyx3uopJ11UXHP6IRjQhR5zWQs7nFy3bk8x4aZpDI0lHaXQHyKdpJtskC2yWRzYvGyuh+J1MMlQqyFfB8OVKByrREGuGPr5vF8tBVBqWXfPtZZlnWWMCSOtst67uzuT+/ae2eAZLsLxM9a+aDozNmPMCsNw+8jY6MM2hEg6bjxhOUlP2mlPWt0Ot5dbXPRzxvIABhKDG0vTHqJnj57IRGOBDkfLYThaCv3RsXLh8P5CLvtB4fB4pqvzEinlmcYYFWp1xFfh4bETj9teSKVfmOUhc+SE4/9WTMX3kgzJSinXZbo6v0g6SBfpJN1kg2yRTbJdx1BbMspVl2ljcpHW2UCpbFUFucOVwvjB0sTErsnR/HuTYxXPdi4wtVLLVCOtSoFSRV9F+V2rT3qy5Hivwhgc6ez681hf95vURzIkS2M827mQdJAu0km6yQbZIptkm8qd4sDmNB37syhUaKiSMroY6LBQCoPiuF8u7y9my+/mRipjftFoYzg/+u5B8UEbQ08HRr+7ZuVj/XsO7ho69fjXHFNb/hkZBtTGvp0bDrqdRO2oe9KyEpZbdIQs2EYUyTaHFISFPNRbK82MCQ1MEGkdhloFlSgMJ/1qNFqZ1LvHR8JqGDyPqYTmcMZcybknOY85wnKF58nhT614g76pjfpIhk29O4LGkg7SRTpJN9kgW9oYn2zX41IvAarWEyd9M8E444xxzhiTnNcSakza7L4dz2wOtdrFwJglZMoWMu1KK+NKqzNm2Rli+qY26iMZkg21ep/Gko5aoOQ1/TUbovZVs8vrGHxxyxlfpll8ycAUI62JK6GJqkobXxkVAUz7OjR7ciPh1v3vPLeu72TlWfZKwXlGcOFIzuOSizZLyHYCYkuL4kwnA/zxSumJW5595J4Pc6NhbzwlTmnvtU5IZtzeWHs85bgpTzppW8iMLUQXZzwD4GFZf8Id4RBJmyMVCjUZl04p42lfGa1pFh1uLBgrF8LRcj6689nHnkgn2v549afPPa0rnlzlCqtXMN6G2qbShWJQOXS4lH/n0Te27swVCyrjJNiq3l6nO9Zm9cZS9vJ4ezzjxZNx6SRtQTatFNmu33Rel/VMfA9n7EeCo+AKq2IM3T/oqYtxR0ir3YlVjou3++N+OcoH1agQVNXTO195K9TRzkBHJlBTSdAWgtlcMotL1ue0i1PbltlJ25UdTkwmbc9JO3Ev5XiJpO1mYtLpdIXVJTg6OWPknVsSgxvVdHLdSjWuZPLK2lsJLSiDsLiwPGm5ScctFQO/WolCvxT5UTWKokCHFI+0NqahZqFdYXHBbW4JV0oZl470pOUkbMeNSyfuSSvlCCvjCqvHFqJXMkmHakticONWzMn299NOl0xeBQHBGGh/xCwuE560im2WW66qsBppHVRVGCqtldJGaegZULXNCs4FZ0JwLlxhWZJz2xWW6whZ02UL0UF7zOKiWzJJKePRxODGB6ZBzL3sU8c7ksmbOBcnCBa1SSZSkRF5R1glT9sVSrD140pvIcrUspnRUyGBjg04AxOcMWlxQenDtbjwapufiaTkPC2ZzPDalQ63JwY3NtRJzV4l6BZ6DWfsSptZX5XMpDXUpNIoKKPKyuiqgaFTWHucMQYNxTotNQOTgjOLgTmCcVcwERMcbRwiRce9fnH4PYDKXONNn0nqgg8BeIwzdj6HvFgKrNRGhBqqqo2pGs7o7kOvZ0rXKztOWOjFDpCMGZuCI4dwOWNU7O0C8DiAfwFoeW9qBWiaaOA/6kyKV3PI1WC1u3t3/V8h20BQXRQwMJoIBVoq6OkaRY8JVPMQL/6vEID/A4RbcB8XLfSYAAAAAElFTkSuQmCC',
                // 图标所用图片大小
                imageSize: new AMap.Size(38, 52),
                // 图标取图偏移量
                imageOffset: new AMap.Pixel(0, 0)
            });
            if(self.workDetail.longitude) {
                let taskMarker = new AMap.Marker({
                    icon: taskIcon,
                    position: [self.workDetail.longitude, self.workDetail.latitude],
                    map: self.map,
                    offset: new AMap.Pixel(-20,-20)
                });
                self.amapInstances.push(taskMarker);
                // 添加文本标注
                 taskMarker.setLabel({
                    offset: new AMap.Pixel(0, 10),  //设置文本标注偏移量
                    content: `<div class="map-task-container">
                                <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                                <div class="map-task-title">
                                    ${self.workDetail.name}
                                </div>
                                <div class="map-task-location">
                                    ${self.workDetail.workPlace}
                                </div>
                             </div>`, //设置文本标注内容
                    direction: 'bottom' //设置文本标注方位
                });
                self.map.panTo(taskMarker.getPosition());
            } 
        },

        /**
         * @method
         * @desc 判断链接文件是图片还是文档
         * @param {string} url 文件的url
         * @return {boolen} 是图片则返回true
         */
        isImg(url) {
            let res = url.slice(-4);
            if(res == '.png' || res == '.jpg' || res == 'jpeg' || res == '.gif' || res == '.bmp') {
                return true;
            }
            return false;
        },

        /**
         * @method
         * @desc 日期选择的时候赋值到queryList
         */
        selectDateRange() {
            this.queryList.startTime = this.dateRange ? this.dateRange[0] : '';
            this.queryList.endTime = this.dateRange ? this.dateRange[1] : '';
            this.getWorkList();
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

        /**
         * @method
         * @desc 点击显示放大图片弹窗
         * @param {string} url 图片的地址
         */
        displayPicture(event) {
            this.$refs.pictureEnlarge.init(event.srcElement.getAttribute('src'));
        },

        clearMap() {
            this.map.remove(this.amapInstances)
        }
    },
    data() {
        return {
            /**
             * @var {object}
             * @desc AMap实例
             */
            map: '',

            /**
             * @var {num}
             * @desc 界面切换：任务管理列表（0），新增任务界面（1），工单详情（2）
             */
            displaySwitch: 0,

            /**
             * @var {object}
             * @desc 请求参数
             * @property {num} page 返回页数
             * @property {num} limit 每页数据量
             * @property {array} groupIds 查询的组别id集合：测试组数据(-1)
             * @property {string} startTime 开始时间
             * @property {string} endTime 结束时间
             * @property {string} module 工单模块：任务管理（2）
             * @property {string} property 工单属性：任务管理（2）
             * @property {num} stats 工单状态：已取消（-1），处置中（0），已处置（1）
             * @property {string} type 工单类型：自定义工单（0），巡查工单（1）
             * @property {string} search 搜索关键词
             */
            queryList: {
                page: 1,
                limit: 10,
                groupIds: [
                    -1
                ],
                startTime: '',
                endTime: '',
                module: '',
                property: '',
                status: '',
                type: '',
                search: ''
            },

            /**
             * @var {array}
             * @desc 查询返回的工单列表
             */
            workList: [],

            /**
             * @var {object}
             * @desc 选中工单的详情
             */
            workDetail: {},

            /**
             * @var {num}
             * @desc 工单列表中被点击选中的工单id，未选中（-1）
             */
            selectedWorkId: -1,

            /**
             * @var {array}
             * @desc elementui日期选择器的数据，查询人员列表的请求数据
             * @desc dateRange[0]: startTime
             * @desc dateRange[1]: endTime
             */
            dateRange: [],

            // icon & infoWindow
            amapInstances: []
        }
    },
}
</script>

<style>
    .task-management-all-container {
        color: white;
    }
    .task-management-home-tool {
        position: relative;
        height: 80px;
    }
    .task-management-home-select-container{
        height: 26px;
        width: 86px;
        border: solid 1px rgba(63,146,254,1);
        background:rgba(6,44,93,1);
        position: absolute;
        left: 10px;
        top: 13px;
    }
    .task-management-home-select {
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
    .task-management-home-select option {
        text-align: center;
        background: rgba(11, 30, 75, 1);
    }
    .task-management-date-range-selector-border {
        position: absolute;
        left: 106px;
        top: 13px;
        border: solid 1px rgba(63,146,254,1);
        display: inline-block;
        width: 210px;
        height: 26px;
    }
    .task-management-home-tool /deep/.task-management-date-range-selector,
    .task-management-home-tool /deep/.task-management-date-range-selector {
        font-size: 14px;
        font-weight: 400;
        height: 26px;
        width: 210px;
        color: rgba(0,242,255,1);
        background: transparent;
        border: none;
        line-height: 26px;
        
    }
    .task-management-date-range-selector /deep/.el-range__icon,
    .task-management-date-range-selector /deep/.el-range__close-icon,
    .task-management-date-range-selector /deep/.el-range-separator {
        line-height: 26px;
        color: white;
        height: 26px;
        padding: 0px;
    }
    .task-management-date-range-selector /deep/.el-range-separator{
        padding-right:5px;
    }
    .task-management-date-range-selector /deep/.el-range-input {
        width: 80px;
        background: transparent;
        color: white;
        margin-top: 2px;
    }
    .task-management-home-tool-search {
        width: 240px;
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
        left: 326px;
        top: 13px;
    }
    .task-management-home-tool-search-inner {
        background: transparent;
        border: none;
        outline: none;
        width: 200px;
        height: 28px;
        line-height: 28px;
        color: white;
        padding: 0;
        padding-left: 11px;
    }
    .task-management-home-tool-search-button {
        color: rgba(107, 137, 249, 1);
        cursor: pointer;
        display: inline-block;
        width: 14px;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
    }
    .task-management-home-tool-add-button {
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
    .task-management-list-container {
        height: 610px;
        overflow: auto;
        background: transparent;
        margin-top: 10px;
    }
    .task-management-list-container::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 3px;
    }
    .task-management-list-container::-webkit-scrollbar-thumb {
        background: #518ce5;
        border-radius: 6px;
    }
    .task-management-single-container {
        margin-left: 28px;
        margin-bottom: 19px;
        width: 525px;
        background: rgba(24, 81, 154, 0.36);
        border: 1px solid rgba(0, 0, 0, 0.2);
        position: relative;
    }
    .task-management-single-container-selected {
        background: rgba(24, 81, 154, 0.58);
        border: 1px solid rgba(27, 216, 250, 1);
    }
    .task-management-single-header {
        position: relative;
        height: 40px;
    }
    .task-management-single-status-cancel {
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
    .task-management-single-status-ing {
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
    .task-management-single-status-over {
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
    .task-management-single-title {
        position: absolute;
        top: 11px;
        left: 71px;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: rgba(0, 242, 255, 1);
        font-weight: bold;
    }
    .task-management-single-button {
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
    .task-management-single-remark {
        margin-left: 17px;
        margin-right: 26px;
    }
    .task-management-single-footer {
        line-height: 14px;
        height: 14px;
        font-size: 14px;
        color: rgba(179, 208, 249, 1);
        position: relative;
        margin-top: 16px;
        margin-bottom: 13px;
        padding-left: 46px;
    }
    .task-management-single-footer>img {
        position: absolute;
        left: 21px;
        top: -7px;
    }
    .task-management-single-footer>span:nth-child(2) {
        width: 330px;
        display: inline-block;
        text-overflow:ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .task-management-single-footer>span:last-child {
        position: absolute;
        right: 9px;
    }
    .task-management-single-participants-list {
        margin-left: 19px;
        margin-top: 9px;
    }
    .task-management-single-tooltip-item {
        margin-right: 10px;
        width:74px;
        height:24px;
        display: inline-block;
        line-height: 24px;
        text-align: center;
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
    }
    .task-management-single-tooltip-item:hover {
        background-size: 100% 100%;
        background-image: url('data:image/png;base64,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');
    }
    .task-management-single-tooltip-tip {
        font-size: 14px;
        min-width: 150px;
        text-align: center;
        width: auto;
        height: 20px;
        white-space: nowrap;
    }
    .task-management-single-tooltip-tip>span {
        position: relative;
        left: 0px;
        top: -18px;
    }
    .task-management-single-tooltip-tip>img {
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