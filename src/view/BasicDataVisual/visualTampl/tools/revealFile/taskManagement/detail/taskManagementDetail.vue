<template>
    <!-- 任务详情界面 -->
    <div class="task-management-detail-container">
        <div class="task-management-add-header">
            <div class="task-management-add-goback el-icon-arrow-left" @click="goBack"></div>
            <div class="task-management-add-title">任务详情</div>
            <!-- 状态变更 -->
            <div class="task-management-detail-select-container">
                <!-- 边框四角 -->
                <img style="position:absolute;top:-1px;left:-1px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
                <img style="position:absolute;top:-1px;right:-1px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
                <img style="position:absolute;bottom:-1px;left:-1px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
                <img style="position:absolute;bottom:-1px;right:-1px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
                <select class="task-management-detail-select" v-model="statusUpdateForm.responseType" @change="changeStatus">
                    <option value="0">执行中</option>
                    <option value="1">已完成</option>
                    <option value="-1">已取消</option>
                </select>
            </div>
            <!-- 状态变更弹窗 -->
            <el-dialog
                :modal="false"
                :visible.sync="showStatusDialog"
                :before-close="handleClose"
                class="status-change-dialog"
                :show-close="false"
            >
                <!-- 标题 -->
                <span class="status-change-dialog-title" slot="title" v-if="statusUpdateForm.responseType==1">确认完成任务<div class="status-change-dialog-close el-icon-circle-close" @click="handleClose"></div></span>
                <span class="status-change-dialog-title" slot="title" v-if="statusUpdateForm.responseType==-1">确认取消任务<div class="status-change-dialog-close el-icon-circle-close" @click="handleClose"></div></span>
                <span class="status-change-dialog-title" slot="title" v-if="statusUpdateForm.responseType==0">确认重启任务<div class="status-change-dialog-close el-icon-circle-close" @click="handleClose"></div></span>
                <!-- 说明 -->
                <textarea v-model="statusUpdateForm.remark" placeholder="请输入任务状态变更说明"></textarea>
                <!-- 文件上传 -->
                <div class="status-change-dialog-file">
                    <div class="task-management-add-choice-item">
                        <div class="task-management-add-file-button" @click="$refs.statusFileUpload.click()">
                            <input class="task-management-add-file-button-inner" ref="statusFileUpload" type="file" multiple @change="getFile($event)">
                        </div>
                        <div class="task-management-add-file-button status-change-dialog-file-img" @click="$refs.statusImgUpload.click()">
                            <input class="task-management-add-file-button-inner" ref="statusImgUpload" type="file" multiple @change="getFile($event)" accept="image/*">
                        </div>
                        <div class="task-management-add-file-preview">
                            <span
                                v-for="(item, index) in statusUpdateForm.documentList"
                                :key="item.url"
                            >
                                <span
                                    class="task-management-add-file-preview-item"
                                     v-if="isImg(item.url)"
                                >
                                    <img :alt="'sc' + index" :src="hostUrl + item.url"/>
                                    <div class="task-management-add-file-preview-cancel el-icon-close" @click="deleteFile(item.url, statusUpdateForm.documentList)" style="cursor:pointer;"></div>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div
                        class="status-change-dialog-file-preview-file"
                        v-for="item in statusUpdateForm.documentList"
                        :key="'doc' + item.url"
                    >
                        <div v-if="!isImg(item.url)" class="status-change-dialog-file-preview-file-item">
                            <a :href="hostUrl + item.url">{{item.name}}</a>
                            <span style="cursor:pointer" class="el-icon-close" @click="deleteFile(item.url, statusUpdateForm.documentList)"></span>
                        </div>
                    </div>
                    <!-- 提交按钮 -->
                    <div class="status-change-submit task-management-add-footer-submit" @click="statusUpdateSubmit">提交</div>
                </div>
            </el-dialog>
        </div>
        <!-- 任务详情 -->
        <div class="task-management-detail-summary-border">
            <img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII=">
            <img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg==">
            <img style="position:absolute;bottom:0px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII=">
            <img style="position:absolute;bottom:0px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">
            <div class="task-management-detail-summary-container">
                <div class="task-management-detail-summary-item">
                    <label>任务名称：</label>
                    <div>{{workDetail.name}}</div>
                </div>
                <div class="task-management-detail-summary-item">
                    <label>任务地点：</label>
                    <div>{{workDetail.workPlace}}</div>
                </div>
                <div class="task-management-detail-summary-item">
                    <label>任务说明：</label>
                    <div>{{workDetail.remark}}</div>
                </div>
                <div class="task-management-detail-summary-preview">
                    <div class="task-management-detail-summary-preview-file">
                        <div v-for="item in workDetail.documentList" :key="'detail_file' + item.url">
                            <a v-if="!isImg(item.allUrl)" :href="item.allUrl">{{item.documentName}}</a>
                        </div>
                    </div>
                    <div  class="task-management-detail-summary-preview-img">
                        <span v-for="item in workDetail.documentList" :key="'detail_img' + item.url">
                            <img v-if="isImg(item.allUrl)" :src="item.allUrl" :alt="item.documentName" :onclick="`displayPicture(event)`">
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 状态记录 -->
        <div class="task-management-detail-status-header">执行状况</div>
        <div class="task-management-detail-participants">
            <span
                class="task-management-detail-participants-tab"
                :class="{'task-management-detail-participants-tab-selected': selectedManId == -1}"
                @click="drawMapAll">全部</span>
            <!-- 所有可选人名 -->
            <span
                v-for="(man,index) in workDetail.groupWorkHandleResponseList"
                :key="index"
                class="task-management-detail-participants-tab"
                :class="{'task-management-detail-participants-tab-selected': man[0].id == selectedManId}"
                @click="drawMap(man)"
            >
                {{man[0].contactorEntity.contactorIdString}}
            </span>
        </div>
        <div class="task-management-detail-status-container">
            <!-- 选中的人的所有记录 -->
            <div class="task-management-detail-moment-container">
                <div
                    class="task-management-detail-moment"
                    :class="{'current-user': item.userId == loginUser.userId}"
                    v-for="item in statusMoment"
                    :key="item.id"
                >
                    <div class="moment-avatar">
                        {{item.contactorEntity.contactorIdString.slice(-2)}}
                        <div v-if="item.userId==null || item.userId==''">负责人</div>
                        <div v-else>管理员</div>
                    </div>
                    <div class="moment-content-header">
                        <span class="moment-content-name">{{item.contactorEntity.contactorIdString}}</span>
                        <span class="moment-content-time">{{item.gmtCreate}}</span>
                    </div>
                    <div class="moment-content-container" v-if="item.responseType!=='3'">
                        <div class="moment-content-title">
                            <span class="moment-content-title-dot"></span>
                            <span v-if="item.responseType==-1">已取消（停用）工单</span>
                            <span v-if="item.responseType==0">处置中（重启）工单</span>
                            <span v-if="item.responseType==1">已处置（完成）工单</span>
                            <span v-if="item.responseType==2">处置工单</span>
                        </div>
                        <div class="moment-content-remark">{{item.remark}}</div>
                        <div class="moment-content-file">
                            <div v-for="file in item.documentList" :key="'momentFile'+file.url">
                                <a v-if="!isImg(file.allUrl)" :href="file.allUrl">{{file.name}}</a>
                            </div>
                        </div>
                        <div class="moment-content-img">
                            <span v-for="file in item.documentList" :key="'momentImg'+file.url">
                                <img v-if="isImg(file.allUrl)" :src="file.allUrl" :alt="file.name" :onclick="`displayPicture(event)`"/>
                            </span>
                        </div>
                        <div class="moment-content-footer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAYAAABVX2cEAAADFElEQVQ4jYWV7WtURxTGf3N3dpe4SbZriEYNJjZoDCIi+l2wH0wJttQvgn5rUapCP4jgyx8g/gGCIiKCL6AolEKkQfBL26hFsC++QLLS2Cw2psnGRJONd+7MyFzX5ObuZvPAgZ1nz3nmnHNnzgj6NVWQBb4BdgAbgDQwBTwF+oCfgSAeJlpP2LlFoce4oJPAUaCh2i5lDAHHW3u9m4UeUylW6NargJ+A7SExJWAMUtMCGYCfgqDBQrOFurn488APgHILKaxheJfJYrgLbOKVYEVekC598rexpARTTZbJ9a4Z9vuyw+FQDGud7lk0m+qfQG6smsBCNI5BwzgUOgS02UPAI+CSoNffguFx7i8rGt/U1KiKl+ucICNAu0TZ/fIfK7LF2tkshvYXMFTntZDjC8kUu9cUgsUquwPchHBnd0QOAJvjTivzhtdbkt1S/qfaErrirDnpg8DFCOfO17nyF/wu6pyZBkbFVtFyYsJkZqyI/uknRV9K2e5FKkvqhBhJaLs8So42JYa8uhltPKOJ2qucNxLnIqaKDUzG+cx0ILyk8j2hFVHTafH1YFemNc47G+zKfFXybHucT79XMx7WFBNGEzXvrfoMZe8PdGb3DHRmk44b6MxmBzqzx1D2Rm5aiXhM2g+eyYRR/cKyO1r/5/+/I78s1YonbgOl5x25Ir5d4frFrKLpzQwi1khp+NXztL4ujCZqaV+x7uU4vPPBt3X4dg2+TTJRYuPwRNijWEwgjL4lPRP0Ai+AjuhO9bMBm4dnKUmJTnikg4Cknp8QMdz6u211QQqj3wL7gF+AVNxrmV913kWRB47gW5yY438H9gI3qgnWwL/Al3+2tBfdEJLCzA3MH4FvgSvhnFkak07oj+aOPOrjXZSeWVDGNWAtcHoJKR/YAzxDz19qKWxFT86EQxL21xBzd/Ne+EvNk1KYii9ky+W6Mb6zipDb7OrcaonMomU8ADZGeNeGUws8o2JUZvYJrsHuZvQDzcBv5YwXTr5IePig1IA7Q07wQvkddRkvCrnU4wE8BLZVe3RDXC6PNeADkPVzWEDl/mQAAAAASUVORK5CYII=" alt="定位icon"/>
                            <span>{{item.workPlace}}</span>
                        </div>
                    </div>
                    <!-- 回复工单 -->
                    <div class="moment-content-container" v-if="item.responseType=='3'">
                        <div class="moment-content-title moment-content-response">
                            <span class="moment-content-title-dot"></span>
                            <span v-if="item.handleResponseEntity.responseType==-1">已取消（停用）工单</span>
                            <span v-if="item.handleResponseEntity.responseType==0">处置中（重启）工单</span>
                            <span v-if="item.handleResponseEntity.responseType==1">已处置（完成）工单</span>
                            <span v-if="item.handleResponseEntity.responseType==2">处置工单</span>
                            <span v-if="item.handleResponseEntity.responseType==3">回复工单</span>
                            <span class="moment-content-response-time">{{item.handleResponseEntity.gmtCreate}}</span>
                        </div>
                        <div class="moment-content-remark moment-content-response">{{item.handleResponseEntity.remark}}</div>
                        <div class="moment-content-response-key">回复工单</div>
                        <div class="moment-content-remark">{{item.remark}}</div>
                        <div class="moment-content-file">
                            <div v-for="file in item.documentList" :key="'momentFile'+file.url">
                                <a v-if="!isImg(file.allUrl)" :href="file.allUrl">{{file.name}}</a>
                            </div>
                        </div>
                        <div class="moment-content-img">
                            <span v-for="file in item.documentList" :key="'momentImg'+file.url">
                                <img v-if="isImg(file.allUrl)" :src="file.allUrl" :alt="file.name" :onclick="`displayPicture(event)`"/>
                            </span>
                        </div>
                        <div class="moment-content-footer">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAYAAABVX2cEAAADFElEQVQ4jYWV7WtURxTGf3N3dpe4SbZriEYNJjZoDCIi+l2wH0wJttQvgn5rUapCP4jgyx8g/gGCIiKCL6AolEKkQfBL26hFsC++QLLS2Cw2psnGRJONd+7MyFzX5ObuZvPAgZ1nz3nmnHNnzgj6NVWQBb4BdgAbgDQwBTwF+oCfgSAeJlpP2LlFoce4oJPAUaCh2i5lDAHHW3u9m4UeUylW6NargJ+A7SExJWAMUtMCGYCfgqDBQrOFurn488APgHILKaxheJfJYrgLbOKVYEVekC598rexpARTTZbJ9a4Z9vuyw+FQDGud7lk0m+qfQG6smsBCNI5BwzgUOgS02UPAI+CSoNffguFx7i8rGt/U1KiKl+ucICNAu0TZ/fIfK7LF2tkshvYXMFTntZDjC8kUu9cUgsUquwPchHBnd0QOAJvjTivzhtdbkt1S/qfaErrirDnpg8DFCOfO17nyF/wu6pyZBkbFVtFyYsJkZqyI/uknRV9K2e5FKkvqhBhJaLs8So42JYa8uhltPKOJ2qucNxLnIqaKDUzG+cx0ILyk8j2hFVHTafH1YFemNc47G+zKfFXybHucT79XMx7WFBNGEzXvrfoMZe8PdGb3DHRmk44b6MxmBzqzx1D2Rm5aiXhM2g+eyYRR/cKyO1r/5/+/I78s1YonbgOl5x25Ir5d4frFrKLpzQwi1khp+NXztL4ujCZqaV+x7uU4vPPBt3X4dg2+TTJRYuPwRNijWEwgjL4lPRP0Ai+AjuhO9bMBm4dnKUmJTnikg4Cknp8QMdz6u211QQqj3wL7gF+AVNxrmV913kWRB47gW5yY438H9gI3qgnWwL/Al3+2tBfdEJLCzA3MH4FvgSvhnFkak07oj+aOPOrjXZSeWVDGNWAtcHoJKR/YAzxDz19qKWxFT86EQxL21xBzd/Ne+EvNk1KYii9ky+W6Mb6zipDb7OrcaonMomU8ADZGeNeGUws8o2JUZvYJrsHuZvQDzcBv5YwXTr5IePig1IA7Q07wQvkddRkvCrnU4wE8BLZVe3RDXC6PNeADkPVzWEDl/mQAAAAASUVORK5CYII=" alt="定位icon"/>
                            <span>{{item.workPlace}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "taskManagementDetail",

    props: [
        // 工单id
        "workId",
        // 工单详情信息
        "workDetail"
    ],

    components: {
    },

    mounted() {
        this.getUserInfo();
    },

    watch: {
        /**
         * @watch
         * @desc workDetail变更时，初始化赋值，并画图
         */
        workDetail(val) {
            this.statusUpdateForm.workId = val.id;
            this.statusUpdateForm.responseType = val.status;
            if(this.$parent.displaySwitch == 2) {
                this.drawMapAll();
            }
            
        }
    },
    methods: {
        /**
         * @method
         * @desc 获取当前登陆用户信息
         */
        getUserInfo() {
            let self = this;
            let request = {
                url: '/sys/user/info',
                method: 'get',
                params:{},
            };
            this.apix(request)
            .then((res)=>{
                // console.log("getUserInfo()获取到当前登陆用户信息：【\n", res.user, "\n】");
                self.loginUser = res.user;
            })
            .catch((err)=>{
                console.log("getUserInfo()获取当前登陆用户信息失败！错误信息：【\n", err, "\n】")
            })
        },

        /**
         * @method
         * @desc 返回任务管理列表界面
         * @return {null}
         */
        goBack() {
            // 清空地图
            this.map.clearMap();
            this.selectedManId = -1;
            this.$emit("goBack");
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
         * @desc  状态值变更时弹窗
         */
        changeStatus() {
            this.showStatusDialog = true;
        },

        /**
         * @method
         * @desc 弹窗关闭前确认，重置状态变更的值
         */
        handleClose(done) {
            let self = this;
            this.$confirm('确认关闭？')
            .then(_ => {
                self.statusUpdateForm.responseType = self.workDetail.status;
                self.showStatusDialog = false;
                done();
            })
            .catch(_ => {});
        },

        /**
         * @method
         * @desc 文件上传，返回文件在服务器中保存地址
         * @param {object} event input事件
         * @return {null}
         */
        getFile(event) {
            let that = this;
            // 上传的文件列表
            let fileList = event.target.files;
            for(let file of fileList) {
                // 每次上传1个文件，返回一条url
                let formData = new FormData();
                formData.append("file", file);
                let request = {
                    url: "/upload/emergencyHandleProcessFile",
                    method: "post",
                    data: formData,
                    params: {},
                    header: {
                        'Content-Type': 'multipart/form-data;charset=UTF-8'
                    }
                };
                that.apix(request)
                .then(
                    res => {
                        console.log("上传成功：【\n", res, "\n】");
                        that.statusUpdateForm.documentList.push({
                            name: res.data.name,
                            url: res.data.url,
                        });
                        // 清空input值，防止重复上传时不触发change事件
                        event.srcElement.value='';
                    }
                )
                .catch(
                    err => {
                        console.log("上传失败：【\n", err, "\n】");
                    }
                );
            }
        },
        
        /**
         * @method
         * @desc 删除文件
         * @param {string} url 文件的url
         * @param {array} list 保存的文件列表
         * @return {null}
         */
        deleteFile(url, list) {
            let that = this;
            for(let index in list) {
                if(list[index].url == url) {
                    list.splice(index, 1);
                }
            }
        },

        /**
         * @method
         * @desc 状态变更表单提交
         */
        statusUpdateSubmit() {
            // console.log("将要提交的状态变更表单：", this.statusUpdateForm);
            let self = this;
            let token = self.$cookie.get("token");
            let header = {
                token: token
            };
            this.$confirm('确认提交？')
            .then(_ => {
                self.workDetail.status = self.statusUpdateForm.responseType;
                let request = {
                    url: "/work/workSheet/updateStatus",
                    method: "post",
                    data: self.statusUpdateForm,
                    params: {},
                    header: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                self.apix(request)
                .then(
                    res => {
                        // console.log("状态修改成功", res);
                        // 清空并刷新
                        self.statusUpdateForm.remark = '';
                        self.statusUpdateForm.documentList = [];
                        self.showStatusDialog = false;
                        self.$parent.getWorkList();
                        self.$parent.getWorkDetail(self.workId);
                    }
                )
                .catch(
                    err => {
                        console.log("状态更新失败", err);
                    }
                )
                done();
            })
            .catch(_ => {});
        },

        /**
         * @method
         * @desc 在图上画出定点、路径、信息框
         * @param {array} man 一个参与人的所有记录信息集合
         * @return {null}
         */
        drawMap(man) {
            let self = this;
            // 选中全部
            self.selectedManId = man[0].id;
            // 需要显示的状态记录
            self.statusMoment = man;
            // 清除所有定点和路径
            self.map.clearMap();
            this.markers = [];
            // 定点集合
            let markerSet = [];
            // 路径点集合
            let polylinePath = [];
            // 对每条记录进行处理
            for(let index = man.length - 1; index >= 0; index--) {
                if(man[index].longitude!==null && man[index].longitude!=='') {
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
                    if(man[index].longitude !== null && man[index].longitude !== undefined && man[index].longitude > 0) {
                        console.log("绘制定点：[", man[index].longitude, man[index].latitude, "]");
                        let marker = new AMap.Marker({
                            icon: manDefaultIcon,
                            position: [man[index].longitude, man[index].latitude],
                            map: self.map,
                            offset: new AMap.Pixel(-20,-20)
                        });
                        // 记录落点为路径点
                        polylinePath.push(new AMap.LngLat(man[index].longitude, man[index].latitude));
                        // 添加点击事件，打开信息窗体
                        AMap.event.addListener(marker, 'click', openInfo);
                        function openInfo() {
                            // 构建信息窗体中显示的内容
                            let info = [];
                            info.push("<div class='map-card-container'>");
                                info.push('<img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:7px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:7px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">');
                                info.push("<div class='map-card-task-name'>" + self.workDetail.name + "</div>");
                                info.push("<span class='map-card-man-name'>" + man[index].contactorEntity.contactorIdString + "</span>");
                                info.push("<span class='map-card-time'>" + man[index].gmtCreate + "</span>");
                                info.push("<div class='map-card-remark'>" + man[index].remark + "</div>");
                                for(let file of man[index].documentList) {
                                    if(self.isImg(file.allUrl) == false) {
                                        info.push("<div class='map-card-file'><a href='" + file.allUrl + "'>" + file.name + "</a></div>");
                                    }
                                }
                                for(let file of man[index].documentList) {
                                    if(self.isImg(file.allUrl)) {
                                        // info.push("<img class='map-card-img' src='" + file.allUrl + "' alt='" + file.name + "'>");
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
                            infoWindow.open(self.map, marker.getPosition());
                            // 点击修改图标
                            for(let i in markerSet) {
                                markerSet[i].setIcon(manDefaultIcon);
                            }
                            marker.setIcon(manSelectedIcon);
                            // 移动到中心
                            self.map.panTo(marker.getPosition());
                        }
                        // 发送点击事件，让信息窗口默认打开，因为是倒序执行，所以是最新的信息
                        marker.emit('click', {target: marker});
                        // 记录落点到数组中，用于后续清空
                        markerSet.push(marker);
                    }
                }
            }
            // 绘制路径
            let polyline = new AMap.Polyline({
                path: polylinePath,
                map: self.map,
                strokeColor: "#2CAAEC"
            });
            // 绘制任务本身的落点
            var taskIcon = new AMap.Icon({
                // 图标尺寸
                size: new AMap.Size(38, 52),
                // 图标的取图地址
                image: 'data:image/png;base64,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',
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
         * @desc 点击全部，地图上显示所有记录落点
         * @return {null}
         */
        drawMapAll() {
            let self = this;
            // 选中全部
            self.selectedManId = -1;
            // 需要显示的状态记录
            self.statusMoment = self.workDetail.handleResponseEntities;
            // 清除所有定点和路径
            self.map.clearMap();
            this.markers = [];
            // 定点集合
            let markerSet = [];
            // 对每条记录进行处理
            let item = self.workDetail.handleResponseEntities;
            for (let index = item.length - 1; index >= 0; index--) {
                if(item[index].longitude!==null && item[index].longitude!=='' ) {
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
                    if(item[index].longitude !== null && item[index].longitude !== undefined && item[index].longitude > 0) {
                        console.log("绘制定点：[", item[index].longitude, item[index].latitude, "]");
                        let marker = new AMap.Marker({
                            icon: manDefaultIcon,
                            position: [item[index].longitude, item[index].latitude],
                            map: self.map,
                            offset: new AMap.Pixel(-20,-20)
                        });
                        // 添加点击事件，打开信息窗体
                        AMap.event.addListener(marker, 'click', openInfo);
                        function openInfo() {
                            // 构建信息窗体中显示的内容
                            let info = [];
                            info.push("<div class='map-card-container'>");
                                info.push('<img style="position:absolute;top:0px;left:0px;" alt="左上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+Pj/DAMWAJL4z8DAYIIuB5NgRJdgwmYM+RKuGKIMDAwAEyIJIJYLnZkAAAAASUVORK5CYII="><img style="position:absolute;top:0px;right:0px;" alt="右上角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJUlEQVQImWNk+Pj/DAMWAJIwxiJ+BiSBTcN/JmyiIEAtCQYGVwDMhgjr5uIz+QAAAABJRU5ErkJggg=="><img style="position:absolute;bottom:7px;left:0px;" alt="左下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAMklEQVQImWNg+Ph/JsPH/yAaBTMyfPz/n4GBgZEBDTChC8AA6RIsULoDm0QFhnIGBgYAnE4QOXsX1d8AAAAASUVORK5CYII="><img style="position:absolute;bottom:7px;right:0px;" alt="右下角" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKUlEQVQImWNk+PifAQuYiUviPxM2URAgXYKFgYGhA5sEyPJyDFEGBgYAltEIdYBSCZgAAAAASUVORK5CYII=">');
                                info.push("<div class='map-card-task-name'>" + self.workDetail.name + "</div>");
                                info.push("<span class='map-card-man-name'>" + item[index].contactorEntity.contactorIdString + "</span>");
                                info.push("<span class='map-card-time'>" + item[index].gmtCreate + "</span>");
                                info.push("<div class='map-card-remark'>" + item[index].remark + "</div>");
                                for(let file of item[index].documentList) {
                                    if(self.isImg(file.allUrl) == false) {
                                        info.push("<div class='map-card-file'><a href='" + file.allUrl + "'>" + file.name + "</a></div>");
                                    }
                                }
                                for(let file of item[index].documentList) {
                                    if(self.isImg(file.allUrl)) {
                                        // info.push("<img class='map-card-img' src='" + file.allUrl + "' alt='" + file.name + "'>");
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
                            infoWindow.open(self.map, marker.getPosition());
                            // 点击修改图标
                            for(let i in markerSet) {
                                markerSet[i].setIcon(manDefaultIcon);
                            }
                            marker.setIcon(manSelectedIcon);
                            // 移动到中心
                            self.map.panTo(marker.getPosition());
                        }
                        // 发送点击事件，让信息窗口默认打开，因为是倒序执行，所以是最新的信息
                        marker.emit('click', {target: marker});
                        // 记录落点到数组中，用于后续清空
                        markerSet.push(marker);
                    }
                }
            }
            // 绘制任务本身的落点
            var taskIcon = new AMap.Icon({
                // 图标尺寸
                size: new AMap.Size(38, 52),
                // 图标的取图地址
                image: 'data:image/png;base64,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',
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
    },

    data() {
        return {
            /**
             * @var {object}
             * @desc 当前登陆用户信息
             */
            loginUser: {},

            /**
             * @var {boolean}
             * @des 状态变更弹窗是否显示
             */
            showStatusDialog: false,

            /**
             * @var {object}
             * @des 状态变更时发送的内容
             * @property {string} workPlace 地点定位，PC端固定为【增城区智慧治理综合管理平台】
             * @property {string} remark 说明的内容
             * @property {string} responseType 修改的状态值
             * @property {array} documentList 文件列表
             * @property {string} workId 变更状态的工单的id
             */
            statusUpdateForm: {
                workPlace: '增城区智慧治理综合管理平台',
                remark: '',
                responseType: '',
                documentList: [],
                workId: '',
                // 其他默认参数
                handleResponseId: 0,
                longitude: 0,
                latitude: 0,
            },

            /**
             * @var {string}
             * @desc 图片所在的主机地址
             */
            hostUrl: window.SITE_CONFIG['cloudUrl'],

            /**
             * @var {object}
             * @desc AMap实例
             */
            map: '',

            /**
             * @var {array}
             * @desc 需要显示的状态记录的集合
             */
            statusMoment: [],

            /**
             * @var {array}
             * @desc 当前绘制的定点的集合
             */
            markers: [],

            /**
             * @var {num}
             * @desc 选中的参与人标签
             */
            selectedManId: -1,
        }
    }
}
</script>

<style>
    .task-management-detail-container {
        background: transparent;
    }
    .task-management-detail-select-container {
        position: absolute;
        right: 26px;
        top: 12px;
        height: 26px;
        width: 86px;
        border: solid 1px rgba(63,146,254,1);
        background:rgba(6,44,93,1);
    }
    .task-management-detail-select {
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
    .task-management-detail-select option {
        text-align: center;
        background: rgba(11, 30, 75, 1);
    }
    .task-management-add-header /deep/.el-dialog {
        background: transparent;
        width: 566px;
    }
    .status-change-dialog /deep/.el-dialog__body,
    .status-change-dialog /deep/.el-dialog__header{
        background: rgba(10, 29, 81, 0.7);
        padding: 0 31px;
        position: relative;
        border: 1px solid rgba(59, 135, 227, 1);
    }
    .status-change-dialog /deep/.el-dialog__header {
        text-align: center;
        padding-top: 19px;
        padding-bottom: 9px;
        border-bottom: none;
    }
    .status-change-dialog-title {
        color: rgba(0, 242, 255, 1);
        font-size: 18px;
        text-align: center;
    }
    .status-change-dialog-close {
        color: white;
        font-size: 20px;
        position: absolute;
        right: 21px;
        top: 9px;
        cursor: pointer;
    }
    .status-change-dialog /deep/.el-dialog__body {
        border-top: none;
    }
    .status-change-dialog textarea {
        width: 465px;
        height: 119px;
        background: rgba(23, 130, 230, 0.29);
        resize: none;
        outline: none;
        font-size: 16px;
        color: white;
        border: none;
        padding: 14px 18px;
    }
    .status-change-dialog-file .task-management-add-file-preview {
        left: -128px;
        position: relative;
        width: 501px;
    }
    .status-change-dialog-file .task-management-add-file-button{
        border: none;
        width: 24px;
        height: 32px;
        left: -128px;
        background: no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAABaklEQVRIieXWMU9VMRjG8R/EicGwAA5GhDjxLVgxBowIMcAoiR+BBAdnFmUCFkYmWIyLqysywkSIyACDC4kDEbimSc/NDZ5723s4A5Fnak/evv+2T9/29Kx8azzGOzxFjzyd4ws+p6J7sYiRLpIHPcQbvE4FPsBwbG/hMCP5ckv7Ja6x3QlQzPwY+xmAQqd4hFdoYKcsqLeLhDe1id34bRpTdQOusNoCmcFknYCgywj5HvuzeFEnoIB8wl7sh9P1vE5AAfnYApnDhHiKqmq4ZNxXhMIdxDx+VwH8iMkXMmJnq2zRWoQ0MmL7q65gKREzVlR8XSa3VdkK3mI8MS5cE++DiSlA2QpGMiY2hL6MuNIVfMBo4vo+w6+qgAsc5AzO0Z01uZ0K85uqanI7/WN+VZPbqTB/oBPgfpmcrOjbmpys6NuanKzo/8Pk4mV6gj815W2+1wEQXqhn8Xejbv0MW7SBo8w3thudYP0vwr5EmgBnQVEAAAAASUVORK5CYII=');
    }
    .status-change-dialog-file {
        margin-bottom: 80px;
    }
    .status-change-dialog-file .status-change-dialog-file-img {
        width: 28px;
        height: 26px;
        position: relative;
        bottom: 3px;
        left: -111px;
        background: no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAYAAACkVDyJAAACG0lEQVRIib3Wy4uNcRgH8M+MkUTRKKFOjWYhZWEzWcg1Smzs5E5yK4lcspeSiYjUrFhZ0Cys/AFEFjREcgkZtyhhwriM0a+eqdec9z3jzDjnW2/neX+/5/d8z3P9vQ3tV/sFmtQWvwRJK3ZiWo0JX+NsI7bVgUxwbE8elmLhPJ7XiKwFmxJXNm8v8ahGhE1lwn/AVMzEF9xBb0XmEWIhtmBUmHmHI3g/2GzjEDxtWIKGCjoTsDnIPqMPk7GuWg9XYG3IzbhYoDcdo4NoD+aGtzPylIs8XJYhS1iJOQW6H+I3ebg6wptdH5JwKTaEfBe3Qt6RaaEsXuB25mxryJf/hXBR5CPhHk6k6YBXGIN9GJ9j5xQ68RhdOIabeYTZHM7D/JAf4Dh+xHsiPhzFsBtH8Ttz9mcQdubYLfRwQVTjQ7Tje2bvDc4gTfpZWFNgbxIO4Rz2hu5fFT74nzyJcOQ1bVdU6iosjzF4LbOfimU9xsZ7Wzxvw4kywmcRqm9F4YhCaImK3Rq5/Rjy7ND5hOuRopTvKfGUEV7A1wpkA+iIyZ8q9kD04LjYuxGXQE9EY3H0c/PA4WwO+3PNl6M3CirNzIlB1hOVejpkUQNXYhhcyiOsBmlWnozmTuV/sKgN4qbPzWG1uI9d1R4arofDRt0JsyEtxcSvBUpZwu5Y2FgHB7tTSFNfpU+4WiNxdCQPn2J/3GeVbvaRIPV4H/wB78FriPq9u80AAAAASUVORK5CYII=');
    }
    .status-change-dialog-file-preview-file {
        margin-top: -18px;
        margin-bottom: 18px;
    }
    .status-change-dialog-file-preview-file-item {
        color: white;
    }
    .status-change-dialog-file-preview-file-item a {
        color: #1BA6FF;
        font-size: 14px;
    }
    .status-change-submit {
        color: rgba(17, 184, 254, 1);
        font-size: 16px;
        right: 31px;
        bottom: 20px;
        position: absolute;
    }
    .task-management-detail-summary-border{
        width: 527px;
        height: 196px;
        margin: 0 auto;
        position: relative;
    }
    .task-management-detail-summary-container {
        border:1px solid rgba(0, 0, 0, 0.2);
        width: 525px;
        height: 194px;
        background: rgba(24, 81, 154, 0.36);
        margin: 0 auto;
        position: relative;
        overflow: auto;
    }
    .task-management-detail-summary-container::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        background-color: transparent;
    }
    .task-management-detail-summary-container::-webkit-scrollbar-thumb {
        background-color: #518ce5;
        border-radius: 6px;
    }
    .task-management-detail-summary-preview-img img{
        height: 80px;
        margin-right: 8px;
        margin-bottom: 11px;
    }
    .task-management-detail-summary-item {
        position: relative;
        width: 400px;
        min-height: 22px;
        font-size: 16px;
        left: 104px;
        margin-top: 15px;
    }
    .task-management-detail-summary-item label {
        color:rgba(153, 201, 231, 1);
        position: absolute;
        left: -87px;
    }
    .task-management-detail-summary-preview {
        margin-top: 13px;
        margin-left: 18px;
    }
    .task-management-detail-summary-preview a {
        color: #1BA6FF;
        font-size: 14px;
    }
    .task-management-detail-summary-preview-file {
        margin-bottom: 11px;
    }
    .task-management-detail-status-header {
        text-align: center;
        font-size: 18px;
        color:rgba(0, 242, 255, 1);
        margin-top: 23px;
        margin-bottom: 16px;
    }
    .task-management-detail-participants {
        width: 525px;
        margin: 0 auto;
    }
    .task-management-detail-participants-tab {
        display: inline-block;
        width: 74px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        background-image: url("data:image/png;base64,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");
    }
    .task-management-detail-participants-tab-selected {
        background-image: url("data:image/png;base64,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");
    }
    .task-management-detail-moment-container {
        overflow: auto;
        height: 347px;
        margin: 0 auto;
    }
    .task-management-detail-moment-container::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 3px;
    }
    .task-management-detail-moment-container::-webkit-scrollbar-thumb {
        background: #518ce5;
        border-radius: 6px;
    }
    .task-management-detail-moment {
        position: relative;
    }
    .moment-content-container {
        width: 431px;
        background:rgba(34,57,153,0.36);
        border:1px solid rgba(0, 0, 0, 0.2);
        border-radius:3px 12px 12px 12px;
        margin-left: 82px;
        padding: 14px 19px;
    }
    .current-user .moment-content-container {
        margin-left: auto;
        margin-right: 72px;
        border-radius:12px 3px 12px 12px;
    }
    .moment-avatar {
        font-size: 16px;
        width:52px;
        height:53px;
        line-height: 53px;
        background:linear-gradient(0deg,rgba(72,198,239,1),rgba(111,134,214,1));
        border-radius:50%;
        position: absolute;
        left: 22px;
        top: 17px;
        text-align: center;
    }
    .current-user .moment-avatar {
        background:linear-gradient(0deg,rgba(42,245,152,1),rgba(32,201,175,1));
        left: auto;
        right: 11px;
    }
    .moment-avatar div {
        position: absolute;
        left: -3px;
        bottom: -20px;
        width:58px;
        height:26px;
        line-height: 26px;;
        background:rgba(42, 55, 63, 0.85);
        opacity:0.85;
        border-radius:3px;
    }
    .moment-content-header {
        margin-left: 82px;
    }
    .moment-content-name {
        font-size: 16px;
        line-height: 41px;
    }
    .current-user .moment-content-name {
        display: none;
    }
    .moment-content-time {
        font-size: 14px;
        color: rgba(179, 208, 249, 1);
        line-height: 41px;
    }
    .current-user .moment-content-time {
        position: relative;
        right: -280px;
    }
    .moment-content-title {
        font-size: 18px;
        color: rgba(0, 242, 255, 1);
        font-weight: bold;
    }
    .moment-content-title-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(0, 242, 255, 1);
        position: relative;
        bottom: 1px;
    }
    .moment-content-response-time{
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height: 41px;
        position: relative;
        bottom: 1px;
        margin-left: 10px;
    }
    .moment-content-response-key {
        color: rgba(0, 242, 255, 1);
    }
    .moment-content-remark {
        font-size: 16px;
        margin: 10px 0;
    }
    .moment-content-file {
        margin-bottom: 10px;
    }
    .moment-content-file a {
        color: #1BA6FF;
        font-size: 14px;
    }
    .moment-content-img img{
        height: 80px;
        margin-right: 8px;
        margin-bottom: 11px;
    }
    .moment-content-footer {
        line-height: 14px;
        height: 14px;
        font-size: 14px;
        color: rgba(179, 208, 249, 1);
        position: relative;
        padding-left: 24px;
    }
    .moment-content-footer>img {
        position: absolute;
        left: 0px;
        top: -7px;
    }
    .moment-content-response {
        color: rgba(153, 153, 153, 1);
    }
    .moment-content-response .moment-content-title-dot {
        background: rgba(153, 153, 153, 1);
    }
</style>