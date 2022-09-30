<template>
    <div>
        <el-dialog
            class="picture-dialog"
            :visible.sync="visible"
            :show-close="false"
            append-to-body
            center>
            <img class="picture-enlarge" :src="url" alt>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'pictureEnlarge',
    data() {
        return {
            visible: false,
            url: ''
        }
    },
    methods: {
        init(url) {
            this.url = url
            this.visible = true
        }
    }
}
</script>

<style>

.picture-dialog /deep/.el-dialog {
    width: 0px;
    height: 0px;
}
.picture-enlarge{
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100vw;
    max-height: 100vh;
}
</style>