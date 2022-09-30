<template>
    <!-- 新增任务界面 -->
    <div
        class="task-management-add-container"
        v-loading="isSubmitting"
    >
        <div class="task-management-add-header">
            <div class="task-management-add-goback el-icon-arrow-left" @click="goBack"></div>
            <div class="task-management-add-title">新增任务</div>
        </div>
        <div class="task-management-add-content">
            <div class="task-management-add-choice-item">
                <label for="addForm-name">任务名称</label>
                <input id="addForm-name" v-model="addForm.name">
            </div>
            <div class="task-management-add-choice-item">
                <label for="addForm-workPlace">任务地点</label>
                <div class="addForm-workPlace-container">
                    <input id="addForm-workPlace" v-model="addForm.workPlace" placeholder="请输入任务地点进行检索或在地图上标记任务点">
                    <span class="addForm-workPlace-button" @click="mapShow">检索</span>
                </div>
            </div>
            <div class="task-management-add-choice-item">
                <label for="addForm-name">任务描述</label>
                <input id="addForm-name" v-model="addForm.remark">
            </div>
            <div class="task-management-add-choice-item">
                <label>任务人员</label>
                <span class="task-management-add-participant-button" @click="participantsDialogShow">添加</span>
                <div class="task-management-add-participant-container">
                    <div
                        class="task-management-add-participant-item"
                        v-for="(man, index) in participantName"
                        :key="index"
                    >
                        {{man.name}}
                        {{man.groupName}}
                        {{man.position}}
                        <div class="task-management-add-participant-item-delete el-icon-circle-close" @click="deleteParticipant(man.id)"></div>
                    </div>
                </div>
            </div>
            <div class="task-management-add-choice-item">
                <label>图片上传</label>
                <div class="task-management-add-file-button" @click="$refs.fileUpload.click()">
                    添加
                    <input class="task-management-add-file-button-inner" ref="fileUpload" type="file" multiple @change="getFile($event)">
                </div>
                <div class="task-management-add-file-preview">
                    <div
                        class="task-management-add-file-preview-item"
                        v-for="(item, index) in addForm.documentList"
                        :key="index"
                    >
                        <img :alt="'upload' + index" :src="hostUrl + item.url"/>
                        <div class="task-management-add-file-preview-cancel el-icon-close" @click="deleteFile(item.url, addForm.documentList)"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-management-add-footer">
            <div class="task-management-add-footer-cancel" @click="formCancel">取消</div>
            <div class="task-management-add-footer-submit" @click="formSubmit">确定</div>
        </div>
        <!-- 定位弹窗 -->
        <location ref="location" :workPlace="addForm.workPlace" @updateLocation="updateLocation"></location>
        <!-- 参与人弹窗 -->
        <linkman-draggable ref="participantsDialog" v-show="showParticipantsDialog" @OnchildByValue="handelLinkdata"></linkman-draggable>
    </div>
</template>

<script>
import location from "./location"
import LinkmanDraggable from "./LinkmanDraggable"

export default {
    name: "taskManagementAdd",
    props: [],
    components: {
        location,
        LinkmanDraggable
    },
    mouted() {},
    methods: {
        /**
         * @method
         * @desc 返回任务管理列表界面
         * @return {null}
         */
        goBack() {
            this.$emit("goBack");
        },

        /**
         * @method
         * @desc 点击显示地图弹窗
         * @return {null}
         */
        mapShow() {
            this.$refs.location.mapDialogVisible = true;
        },

        /**
         * @method
         * @desc 定位弹窗更新的地址赋值到表单中
         * @param {string} address 新的地址
         * @param {string} address 新的纬度
         * @param {string} address 新的经度
         * @return {null}
         */
        updateLocation(address, lng, lat) {
            this.addForm.workPlace = address;
            this.addForm.longitude = lng;
            this.addForm.latitude = lat;
        },

        /**
         * @method
         * @desc 点击显示选择参与人弹窗
         * @return {null}
         */
        participantsDialogShow(){
            this.showParticipantsDialog = true;
            this.$nextTick(()=>{
                this.$refs.participantsDialog.handleAddContacts(
                '/mail/mailgroup/list',
                "请选择",
                );
            })
        },

        /**
         * @method
         * @desc 参与人弹窗返回值处理
         * @param {object} 选择的参与人
         */
        handelLinkdata({linkman}){
            console.log("获取到的联系人：", linkman);
            let that = this;
            for(let item of linkman) {
                that.addForm.participantsManList.push(item.id);
                that.participantName.push({
                    name: item.name,
                    id: item.id,
                    groupName: item.groupName,
                    position: item.position
                });
            }
        },

        /**
         * @method
         * @desc 删除参与人
         * @param {num} id 需要删除的参与人id
         */
        deleteParticipant(id) {
            let self = this;
            // 删除前端显示的参与人
            for(let index in self.participantName) {
                if(self.participantName[index].id == id) {
                    self.participantName.splice(index, 1);
                }
            }
            // 删除待发送列表中的参与人
            for(let index in self.addForm.participantsManList) {
                if(self.addForm.participantsManList[index] == id) {
                    self.addForm.participantsManList.splice(index, 1);
                }
            }
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
                        that.addForm.documentList.push({
                            documentName: res.data.name,
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
         * @desc 表单提交
         * @return {null}
         */
        formSubmit() {
            if (!this.addForm.name) {
                this.$notify.error({
                    message: '任务名称不能为空！'
                })
                return 
            }
            let self = this;
            this.$confirm('确认提交？')
            .then(_ => {
                this.isSubmitting = true;
                console.log("将要提交的表单内容：【\n", self.addForm, "\n】");
                let request = {
                    url: "/work/workSheet/save",
                    method: "post",
                    data: self.addForm,
                    params: {},
                    header: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                self.apix(request)
                .then(
                    res => {
                        console.log("表单新增成功：【\n", res, "\n】");
                        if (res.code === 0) {
                            this.$message.success('新增任务成功');
                            self.formInit();
                            self.goBack();
                        } else {
                            this.$message.error(`新增任务失败，错误信息：${res.msg}`);
                        }
                    }
                )
                .catch(
                    err => {
                        this.$message.error(`新增任务失败，错误信息：${err.msg}`);
                    }
                )
                .finally(() => { this.isSubmitting = false; });
                done();
            })
            .catch(_ => {});
        },

        /**
         * @method
         * @desc 初始化表单
         * @return {null}
         */
        formInit() {
            this.addForm = {
                name: '',
                workPlace: '',
                participantsManList: [],
                documentList: [],
                // 其他默认参数
                workModule: 2,
                workProperty: 2,
                handleTarget: "",
                longitude: "",
                latitude: "",
                isEndtime: "",
                endDate: "",
                endTime: "",
                remark: "",
                contactorId: -1,
                depId: -1,
                mailGroupName: "",
                copyManList: [],
            };
            this.participantName = [];
        },

        /**
         * @method
         * @desc 点击取消按钮，清空编辑栏并返回
         * @return {null}
         */
        formCancel() {
            let self = this;
            this.$confirm('确认取消？将清空编辑内容')
            .then(_ => {
                self.formInit();
                self.goBack();
                done();
            })
            .catch(_ => {});
        }
    },
    data() {
        return {
            /**
             * @var {object}
             * @desc 新增任务的表单内容
             * @property {string} name 任务名称
             * @property {string} workPlace 地点定位
             * @property {array} participantsManList 参与人id数组
             * @property {array} documentList 上传的文件列表
             */
            addForm: {
                name: '',
                workPlace: '',
                participantsManList: [],
                documentList: [],
                // 其他默认参数
                workModule: 2,
                workProperty: 2,
                handleTarget: "",
                longitude: "",
                latitude: "",
                isEndtime: "",
                endDate: "",
                endTime: "",
                remark: "",
                contactorId: -1,
                depId: -1,
                mailGroupName: "",
                copyManList: [],
            },

            /**
             * @var {boolen}
             * @desc 参与人弹窗显示判断
             */
            showParticipantsDialog: false,

            /**
             * @var {array}
             * @desc 前端显示的参与人列表
             */
            participantName: [],

            /**
             * @var {string}
             * @desc 图片所在的主机地址
             */
            hostUrl: window.SITE_CONFIG['cloudUrl'],

            isSubmitting: false,
        }
    }
}
</script>

<style>
    .task-management-add-container {
        background: transparent;
        position: relative;
        height: 700px;
    }
    .task-management-add-header {
        position: relative;
        padding-top: 13px;
        margin-bottom: 18px;
    }
    .task-management-add-goback {
        font-size: 19px;
        cursor: pointer;
        position: absolute;
        left: 25px;
        top: 16px;
    }
    .task-management-add-title {
        font-size: 18px;
        margin: 0 auto;
        color: rgba(0, 242, 255, 1);
        width: 72px;
    }
    .task-management-add-content{
        position: relative;
        height: 570px;
        overflow: auto;
    }
    .task-management-add-choice-item {
        margin-left: 128px;
        margin-bottom: 18px;
        margin-top: 4px;
        position: relative;
    }
    .task-management-add-choice-item label {
        font-size: 16px;
        color: rgba(154, 201, 231, 1);
        position: absolute;
        left: -86px;
        top: 0px;
    }
    #addForm-name,
    .addForm-workPlace-container {
        width: 378px;
        height: 26px;
        background: rgba(4,1,22,0);
        border: 1px solid rgba(50,139,234,1);
        border-radius: 3px;
        outline: none;
        color: white;
        font-size: 16px;
        line-height: 26px;
        padding: 0;
        padding-left: 12px;
        position: relative;
        top: -3px;
    }
    .addForm-workPlace-container {
        display: inline-block;
    }
    #addForm-workPlace {
        position: absolute;
        padding: 0;
        top: 6px;
        width: 330px;
        color: white;
        outline: white;
        border: none;
        background: transparent;
    }
    .addForm-workPlace-button {
        color: rgba(17, 184, 254, 1);
        position: absolute;
        right: 7px;
        top: 0px;
        cursor: pointer;
    }
    .task-management-add-participant-button,
    .task-management-add-file-button {
        background:rgba(4,1,22,0);
        border:1px solid rgba(50,139,234,1);
        border-radius:3px;
        cursor: pointer;
        color: rgba(17, 184, 254, 1);
        font-size: 16px;
        padding: 3px 6px;
    }
    .task-management-add-participant-container {
        width: 392px;
        margin-top: 4px;
    }
    .task-management-add-participant-item {
        border: 1px solid rgba(23, 130, 230, 0.39);
        background: rgba(23, 130, 230, 0.39);
        border-radius: 3px;
        margin-top: 13px;
        color: rgba(154, 201, 231, 1);
        font-size: 16px;
        position: relative;
        height: 36px;
        line-height: 36px;
        padding-left: 14px;
    }
    .task-management-add-participant-item-delete {
        color: white;
        font-size: 20px;
        position: absolute;
        right: 11px;
        top: 8px;
        cursor: pointer;
    }
    .task-management-add-file-button {
        overflow: hidden;
        padding: 0;
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        width: 44px;
        height: 28px;
        position: relative;
        padding: 0;
        text-align: center;
        line-height: 28px;
        top: -3px;
    }
    .task-management-add-file-button-inner {
        position: absolute;
        left: 0px;
        opacity: 0;
        left: 50px;
        top: -10px;
        cursor: pointer;
    }
    .task-management-add-file-preview {
        margin-top: 14px;
        width: 392px;
    }
    .task-management-add-file-preview-item {
        position: relative;
        display: inline-block;
        margin-right: 18px;
        margin-bottom: 18px;
    }
    .task-management-add-file-preview-item img {
        height: 80px;
    }
    .task-management-add-file-preview-cancel{
        color: white;
        width:25px;
        height:26px;
        line-height: 26px;
        text-align: center;
        background:linear-gradient(-40deg,rgba(98,127,236,1),rgba(18,196,200,1));
        border-radius:50%;
        position: absolute;
        right: -9px;
        top: -12px;
    }
    .task-management-add-footer{
        position: absolute;
        bottom: 0px;
        right: 0px;
        padding-bottom: 30px;
        padding-right:25px;
    }
    .task-management-add-footer-cancel,
    .task-management-add-footer-submit {
        background-size: 100% 100%;
        width: 72px;
        height: 37px;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
        display: inline-block;
    }
    .task-management-add-footer-cancel {
        margin-right: 10px;
        background: no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAlCAYAAADhh6/DAAAE7klEQVRoge1azY4kNQy2090j5jASIPEjELsvAAd+DvAyHLnwarwFBy6IA0IgsSdAoAWkFdIu7DDTnQ/FcRInlarunZk0yzDuqanOT3Xsz47juMIfffYF3XY6eesNK+H7eh1E69Dp/I/1J7sLR24FeYaZiFy4g4hjmdnH+tQmHUu7vRNpPaXyQIL86T+OZVB1f/rgoTSvz07vu9OTe5T7RwK4KnsQOQfavHT6uQAEz/Tk15OvA1ahnYh2TLwDYRe+a91W717rdqY8uVjQI//qO48xEp/fvjkTlYGgqpu9VvG6TO1rva+YeAWCtkvdC69/ePIpJQviqGUrdACnFRrpexAeRW9yMTMAEKvJIKuUhgKkwFTjKi8w/JHy7PUxVlkozgNw9ZMBB61xI5m/DXQH0B4qALGYVmtqyTyJGjPOT8kUZS4PwbYfjdpxDU9seW5lsXLm/lzKV7Ygni5Pw/3NgdQqusfrwbTOHdEVMKGvHhlNI0e9aTPr2q7lo5MYjSzzgOXRUpIhydQJRKBYCHUtiOPHPsh2oMY8K3Amg42nVmuJP1geOvyzKfOclU0AOsQcYT6WMVkyjfVcx7QPJTuGjl0N2+V1hnr8VgBVHRZkYwt+uYtrE10k4xuPTx4jj4tcWznpRWVVYlf9vqoAqpBuAN+nAaA8+2/4oDSm8YnzfafClWe1sP3z8kci+vIuDpqhy0fnP5BdxSQ8151fs42oyJgxmWflnjSX4yXZBQ7eagATB9vyY+s71gWzoiUnf/046P9AFz/9UixItW2jZXF71MzZapVSjaQ4iBorspoYRToGJ+tXHjDh0bQXY0lJm2KF2nc5DrqjQhmgGCr1l8KZIHFSx+aTm8YT98Ze4nOuPf+OiZGtBaF8QXXvtVE93ZC2Hb1+o6kd10bS1iU0PFXbp16bAHT22stHE+S/SGJBpy+u7yfnVKUMjMNelE0tO29epxvCYWQ30tl6eP8+p81Emt+otksBoA82p+t7t9oMrkFhmX8vPW5yzWQDqCbfq40oyzjKfDZ9j7nfgA1JOBpHqkOH75pt43MaDEw+6GpUpUSqgToR9wjKU2qS9Oh+f2ayqxh3Vh5u/coMzSbbjkTTpNfC+JW/avqZtzFCey1obudr21pHJ3V7/PqNEjp8trx39HtIKFICRRFpXqg8h9vkeLQwoNlVtJoYSBPLj2sx0FmhKlm6cjZbpH1bjb0QL2nhGMHiDYy/2MmVXuj5oPIr/UWpJL51PWuykuMRMmPkCLpkFakHwFJCLcVCqXyTm9VjOuV9dGO8VD7o2bkobzdM6qB0wBFAM2Mkv2f3Yld5cXDVhNnzZCHXpYNlsct8OhYCc09X/faiX34e3qpaWuLVlu1xmVJWaeL5oBhHbPT4SzDRrSyTXGYMCC1gTutqzxgzeDxx2MNQ4DK1bPZQm825oQoQJo5nhpgcACmDEPAIZ4U2sAAFevNd9zE78roqgGLCNU1qr9lsbM+3D/56dPF9wDi0O+eDFwA72QQhnkYjUCzTaMt65e3HLBh42URxVCMzoiTsvZP63O6FO5Y+kUvynhx5jv1AvNvxRg+MRYDcyj30RBsBIg6HAlReNLF9uvvuye+X34plBevhcCLJ+QASfDxEJfoIv1HecI+eesKhHPoTIIqgAo4PHFX1TkFyos4Inqgz1EV103r7t/uZiOgfp2ar+ju0YF0AAAAASUVORK5CYII=');
    }
    .task-management-add-footer-submit {
        background: no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAlCAYAAADhh6/DAAAFO0lEQVRoge1aUY4cNRB91T07s9nd8JGNQEKKxAU4ABfgg/PwTYBvjpIr5AMhxAWQUMQnErCRkEIIZHdm2oXKLtvVbnfvDGxPFJja7fG47J6qeq6pcnmaPnryHf7rtHz0vrXwcwCPdzV5IS/XLxbcrRs0LXsmEYBGWgYo9Ilc4McxPzGP2xZQPmJ/RmL/ry8U+oxe+/rHX/3wyYMLnFxe7KWLB4gd4dXV8isAvwFYA7gh0A2DrwU/ABtt13HcvN9Uri2BttK+++Ef3Zz4PP/+fit2MHih9pxUrmW43Ap4qe9xqvNOCXTK4BWAlY5dPvrknU8TQBRW2Rou4ETjt6bdqvGOw/q4eBFRx8xM6kKclnReYrA6KqkjMasurdGPVedt8H9/bVS/DYMboyQrBp7KgSMVWDRHQKYpA0QeNfuV0BDn3Re25RT+PENc2oTn8HdoKuSS6pR0VJ0Htlg7ExJ0Bx5Ew/BCRtDssadCUWa50DVdd6ZFmsg9A/NnZ48ZeEaAWkY935Hmdu0fnLzT+DTPbgycaEO0qbKYrFh4qnoQhT97I1lBhXuSZon8DcxAHwIpK4vDGvW/XoXO8T2ZPo152QCgXdyRzZ+50b9a7/k3rr0rWRnMAyzquo5QTd8eQL0JE7aRBT+3PrSR0m2fcWekMpJcNvoYHScXq2d2b96XPYB6SBeA37YCzPneNxGDokwTE8fnDo3L92pnffWnNI+P+6ARur76yw+kLEZEoTzghHC5P4jzYKN84plVTNGaef5SQyqL4utT6pPZVPMuNhlNi2w67qR3ofVPP2cPiqttdsuyMnEfRGYeUurUFbE8NqnErsRcZIrU7PrGTZKOqX5GHkqHNtkLde70PuhImRJAYatUDRljm8QBL24wK9uAeZ2oIntKT/O+Ui9RimEYO+4w2/HId+UY+kGQY9mRhg5YsBo9tU4gmK98OS+Ss3oWYzlI33/vwQFMeHvJe9D5w6UPbBKcLJI2YBcWFnk11K2peB0WhLORLaST91B2ozGdzUmk5Xm+DfIC0BdnD1f/J6fYiyTNfxZvkJRpvGVwyORXSDO/gJzSeHAZ0hVMZ8MHtKN3Fk5MNOARpZhk7Sk2xKQYpA9eGCFTGcceRtX4g/vj2czcFM+gBkdV43btcqiXxnoAVTIPFdnJfkCpRCn4kKeKpczyVLGnb7RHbStjE8YAynOGN1RHrSCbZj1v/jKsp1MtTXNf2cptw7qsZOSNojdp3KhUAOYsleKTLzb6VQWVKzEjDWSFXMzWHrbZlWjCzqJEuq3UKI9OB7FoakN4iM3iHvLHbJhUMgFU7oEGwupJKQvldDadR+kACBkZ6avOvZhTOd+YBnWuYvVN/NQzRnemSy8G7SG03IVGzyHzo+LgYG0WyjLivo1s0hgpnCf1GotB+wD0ttNttiQsbJpf6uMgnfKljVerbVNchP4eo+wfkqZ0KfVu1KZWbY1Xi/i4DBcAMfgcwGu5WU5E9DGSmBvFfZ3Od/EIRB8nkX6ngc3/9KKnk6M/xt0lmc1ekq19DwKDSxD8RaAABGHJzEsCrRh8T54REixiHKePv3m2V6a5frF+9ur59Q9o5JkgdE3jHAgdNXAgFp7zv06FvlRFboeP/cfEIilIaaTM0n7DTlq0zjXCb3W8YUet8MHUej5DLGjhfH8h/a6j89VF98G9y81ZbSc9Sje/b759+cvN1/KAEsCdAOPQCEgdO3Qkz+k13LGAxAJQeoBpThIgGtZWDY3gtOwQgAh8AWShIC2YFSzngZHrxIU5Z9ub5ikA/A2c2cw22HopXwAAAABJRU5ErkJggg==');
    }
</style>