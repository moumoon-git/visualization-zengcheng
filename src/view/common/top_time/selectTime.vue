/**
 * @author tanjinfeng
 * @date 2020-10-16
 * @desc 时间范围选择组件重构
 */
<template>
    <div class="select-time-utility">
        <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="——"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :clearable="false"
            unlink-panels
            :picker-options="{
                shortcuts: [
                    {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一季度',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }"
            @change="handleChange"
        />
    </div>
</template>

<script>
    export default {
        name: 'selectTime',
        data() {
            return{
                value: ''
            }
        },
        methods:{
            /**
             * @method
             * @desc 初始化日期，起始日期为当月第一天，结束日期为当天，日期格式yyyy-MM-dd
             */
            init() {
                const date = new Date()
                const startTime = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-01`
                const endTime = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`
                this.value = [startTime, endTime]
                // 更新
                this.$store.commit('startTime', `${startTime} 00:00:00`)
                this.$store.commit('endTime', `${endTime} 23:59:59`)
            },
            /**
             * @method
             * @desc 日期范围选择变化，更新startTime和endTime
             * @param {Array} range [startTime, endTime]
             */
            handleChange (range) {
                this.$store.commit('startTime', `${range[0]} 00:00:00`)
                this.$store.commit('endTime', `${range[1]} 23:59:59`)
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
.select-time-utility {
    width: 247px;
    height: 38px;
    background: no-repeat center/100% 100% url("../../../assets/images/date.png");
    overflow: hidden;
    /deep/ .el-input__inner {
        background: transparent;
        border: none;
        // 分隔线
        .el-range-separator {
            width: 18px;
            padding: 0;
            margin: 0;
            overflow: hidden;
            color: #5B9DDF;
        }
        // 输入框
        .el-range-input{
            background: transparent;
            width: 98px;
            font-family: 'numStyle';
            color: white;
            font-size: 20px;
        }
    }
}
</style>
