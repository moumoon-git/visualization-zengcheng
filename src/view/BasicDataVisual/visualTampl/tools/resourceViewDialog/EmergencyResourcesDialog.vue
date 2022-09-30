<template>
    <div>
        <el-dialog
            class="emergency-resources-dialog"
            :modal="false"
            width="300px"
            :visible.sync="visible"
            :title="title"
        >
            <div
                class="emergency-resources-dialog__inner"
                v-loading="loading"
                v-infinite-scroll="scrollLoad"
            >
                <div
                    class="emergency-resources-dialog__item"
                    v-for="(item, index) in data"
                    :key="`emergency_resources_item_${index}`"
                    @click="getDetail(item.id)"
                >
                    {{item.name}}
                </div>
                <div
                    class="emergency-resources-dialog__empty"
                    v-if="data.length === 0"
                >暂无数据</div>
            </div>
        </el-dialog>
        <resourceArticle ref="article"></resourceArticle>
    </div>
</template>

<script>
import resourceArticle from "./yjwz"
export default {
    name: 'EmergencyResourcesDialog',
    components: {
        resourceArticle
    },
    data() {
        return {
            visible: false,
            title: '',
            data: [],
            loading: false,
            // 1：左边搜索全部物资列表（无分页）
            // 2：右边搜索仓库（有分页）
            type: 1,
            page: 1,
            totalPage: 1,
            id: '',
        }
    },
    methods: {
        init(arr) {
            this.type = 1
            this.title = arr[0].resoureArticleStorehouse.name + '物资列表'
            this.data = arr
            this.visible = true
        },

        /**
         * @description 根据仓库数据获取仓库列表
         * @param { Object } store 仓库数据
         */
        initStore(store) {
            this.page = 1
            this.totalPage = 1
            this.type = 2
            this.id = store.id
            this.title = store.name + '物资列表'
            this.loading = true
            this.visible = true

            // 请求物资列表数据
            const request = {
                method: 'post',
                url: '/resoure/resourearticle/list',
                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
                data: {
                    resoureArticleStorehouseId: store.id,
                    page: 1,
                    limit: 10,
                    endTime: '',
                    startTime: '',
                    search: '',
                }
            }
            this.apix(request)
                .then(res => {
                    if (res.code === 0) {
                        this.totalPage = res.page.totalPage
                        this.data = [...res.page.list]
                    }
                })
                .finally(() => {
                    this.loading = false
                })
        },

        scrollLoad() {
            if (this.type === 2 && this.page < this.totalPage) {
                this.page += 1
                this.loading = true
                const request = {
                    method: 'post',
                    url: '/resoure/resourearticle/list',
                    headers: {
                        'content-type': 'application/json;charset=UTF-8'
                    },
                    data: {
                        resoureArticleStorehouseId: this.id,
                        page: this.page,
                        limit: 10,
                        endTime: '',
                        startTime: '',
                        search: '',
                    }
                }
                this.apix(request)
                    .then(res => {
                        if (res.code === 0) {
                            this.data.push(...res.page.list)
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },

        getDetail(id) {
            this.loading = true
            const request = {
                url: `/resoure/resourearticle/info/${id}`,
                method: 'get'
            }
            this.apix(request).then(res => {
                if (res.code == 0) {
                    this.loading = false
                    this.$refs.article.init(res)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.emergency-resources-dialog {
    &__inner {
        height: 400px;
        overflow: auto;
        &::-webkit-scrollbar {
            background: transparent;
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: #3B75DE;
            border-radius: 5px;
        }
    }

    &__item {
        cursor: pointer;
        color: white;
        padding: 3px 20px;
        &:hover {
            color: white;
            background: linear-gradient(to right, #1782E6, transparent);
        }
    }

    &__empty {
        text-align: center;
        color: white;
    }

    /deep/ .el-dialog {
        background: rgba(10, 29, 81, .8);
        border: 1px solid #3B75DE;
        padding: 0;
        color: white;
        &__title {
            color: #0EF3FE;
            font-size: 16px;
            font-weight: bold;
            text-shadow: 0 0 5px #0EF3FE;
        }
        &__body {
            padding: 0;
        }
    }
}
</style>
