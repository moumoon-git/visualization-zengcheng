<template>
    <el-dialog
        title="短信"
        :visible.sync="smsDialogVisible"
        width="50%"
        style="z-index:9999;!important"
        :modal="false"
        :close-on-click-modal="false"
        append-to-body
    >
        <div style="background-color:white;margin-top:15px;padding:15px 15px 7px;">
            <div style="display: flex;margin-bottom:15px;justify-content: space-between">
                <textarea
                    style="height:227px;width:100%;resize:none;outline:none;border:none;border:1px solid rgba(222,222,222,1);"
                    v-model="smsRequest.content"
                    maxlength="500"
                    class="textarea"
                >
                </textarea>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="smsDialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="sendSms" size="small">发 送</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'smsDialog',
    data() {
        return {
            smsDialogVisible: false,
            smsRequest: {
                content: '',
            },

        }
    },
    methods: {
        init(data) {
            this.smsRequest = {
                content: '',
                doDatas: '',
                doSpace: 0,
                doTime: 0,
                doWay: '0',
                eventId: '',
                mailGroup: [],
                messageGroup: [],
                phone: data.mobile1,
                sendWay: 0,
                signature: '',
                type: '',
                userIds: data.id
            }
            this.smsDialogVisible = true
        },
        sendSms() {
            if (this.smsRequest.content == "") {
                this.$message.error("请填写内容")
                return
            } else {
                this.$http({
                    url: this.$http.adornUrl("/message/messageinfor/sendmessage"),
                    method: "post",
                    data: this.$http.adornData(this.smsRequest)
                }).then(
                    data => {
                        if (data && data.data.code == "0") {
                            this.$message({
                                message: "发送成功",
                                type: "success"
                            });
                            this.smsDialogVisible = false
                        } else {
                            this.$message.error("发送失败")
                        }
                    }
                )
            }
        }
    }
}
</script>