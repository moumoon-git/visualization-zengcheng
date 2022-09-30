<template>
    <div>
        <el-dialog
            title="查看附件"
            :visible.sync="visible"
            :destroy-on-close="true"
            append-to-body
            :modal="false"
        >
            <span v-if="type === 'other'">抱歉！文件类型不支持预览</span>
            <viewer v-else-if="type === 'img'">
                <img
                    :src="host + url"
                    alt
                    height="100"
                    style="cursor:zoom-in"
                >
            </viewer>
            <iframe
                v-else-if="type === 'pdf'"
                :src="host + url"
                width="100%"
                height="750px"
                frameborder="1"
            ></iframe>
            <iframe
                v-else-if="type === 'office'"
                :src="'https://view.officeapps.live.com/op/view.aspx?src='+ host + url"
                width="100%"
                height="750px"
                frameborder="1"
            ></iframe>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'FilePreviewDialog',
    data() {
        return {
            visible: false,
            url: '',
            host: window.SITE_CONFIG['cloudUrl'] + '/',
            type: 'other'
        }
    },
    methods: {
        init(url) {
            this.url = url
            this.type = this.fileType(url)
            this.visible = true
        },
        fileType(url) {
            if(
                url.indexOf('.png') > -1 ||
                url.indexOf('.jpg') > -1 ||
                url.indexOf('.jpeg') > -1
            ) {
                return 'img'
            } else if (url.indexOf('.pdf') > -1) {
                return 'pdf'
            } else if (
                url.indexOf('.doc') > -1 ||
                url.indexOf('.docx') > -1 ||
                url.indexOf('.xls') > -1 ||
                url.indexOf('.xlsx') > -1
            ) {
                return 'office'
            } else {
                return 'other'
            }
        }
    }
}
</script>