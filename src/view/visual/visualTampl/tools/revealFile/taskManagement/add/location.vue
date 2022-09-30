<template>
    <el-dialog
        :modal="false"
        class="locationDialog"
        :showClose="false"
        :visible.sync="mapDialogVisible"
        width="843.34px"
        append-to-body>
        <div slot="title" class="dialog-title">
            <span class="title-text">我的位置</span>
            <span class="title-cancel-button el-icon-close" @click="mapDialogVisible=false"></span>
        </div>
        
        <div class="container">
            <div class="search-box">
                <input
                    v-model="searchKey"
                    type="search"
                    id="search"
                    @change="searchByHand"
                >
                <!-- <button @click="searchByHand">搜索</button> -->
                <button @click="mapSubmit">确定</button>
                <!-- <div class="tip-box" id="searchTip"></div> -->
            </div>
            <!--
                amap-manager： 地图管理对象
                vid：地图容器节点的ID
                zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
                center： 地图中心点坐标值
                plugin：地图使用的插件
                events： 事件
            -->
            <el-amap class="amap-box"
                :amap-manager="amapManager"
                :vid="'amap-vue'"
                :zoom="zoom"
                :plugin="plugin"
                :center="center"
                :events="events"
            >
                <!-- 标记 -->
                <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
            </el-amap>
        </div>
        <div class="tip-box" id="searchTip"></div>
    </el-dialog>
</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
let amapManager = new AMapManager()
export default {
    props: [
        'workPlace'
    ],
    watch: {
        mapDialogVisible(val) {
            this.searchKey = this.workPlace;
            this.address = this.workPlace;
        }
    },
    methods: {
        mapSubmit() {
            // console.log("地点更新!");
            this.$emit("updateLocation", this.searchKey, this.lng, this.lat);
            this.mapDialogVisible = false;
        },
        initSearch() {
            let vm = this;
            let map = this.amapManager.getMap();
            AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
                var poiPicker = new PoiPicker({
                    input: 'search',
                    placeSearchOptions: {
                        map: map,
                        pageSize: 10
                    },
                    suggestContainer: 'searchTip',
                    searchResultsContainer: 'searchTip'
                });
                vm.poiPicker = poiPicker;
                // console.log(poiPicker, "ppppppoi");
                // 监听poi选中信息
                poiPicker.on('poiPicked', function (poiResult) {
                    // console.log(poiResult)
                    let source = poiResult.source
                    let poi = poiResult.item
                    if (source !== 'search') {
                        poiPicker.searchByKeyword(poi.name)
                    } else {
                        poiPicker.clearSearchResults()
                        vm.markers = []
                        let lng = poi.location.lng
                        let lat = poi.location.lat
                        let address = poi.cityname + poi.adname + poi.name
                        vm.center = [lng, lat]
                        vm.markers.push([lng, lat])
                        vm.lng = lng
                        vm.lat = lat
                        vm.address = address
                        vm.searchKey = address
                    }
                })
            })
        },
        searchByHand() {
            if(this.searchKey !== '') {
                this.poiPicker.searchByKeyword(this.searchKey);
            }
        }
    },
    data() {
        let self = this;
        return {
            // 弹窗是否显示
            mapDialogVisible: false,
            // 地址
            address: null,
            // 搜索关键词
            searchKey: '',
            amapManager,
            // 标记点数组
            markers: [],
            // 搜索选项
            searchOption: {
                city: '全国',
                citylimit: true
            },
            // 地图中点
            // center: [117.127998, 36.681641],
            center: [113.824713,23.286085],
            // 地图缩放等级
            zoom: 17,
            // 经纬度
            lng: 0,
            lat: 0,
            loaded: false,
            events: {
                init() {
                    lazyAMapApiLoaderInstance.load().then(
                        () => {
                            self.initSearch();
                        }
                    );
                },
                // 点击获取地址的数据
                click(e) {
                    // 点击获取坐标
                    self.markers = [];
                    let {lng, lat} = e.lnglat;
                    self.lng = lng;
                    self.lat = lat;
                    self.center = [lng, lat];
                    self.markers.push([lng, lat]);
                    // 经纬度坐标转地址，通过高德SDK完成
                    let geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: 'all'
                    })
                    geocoder.getAddress([lng, lat], function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                            // console.log("地址转换成功：",result.regeocode.formattedAddress)
                            self.address = result.regeocode.formattedAddress
                            self.searchKey = result.regeocode.formattedAddress
                            self.$nextTick()
                        }
                        }
                    })
                },
            },
            // 一些工具插件
            plugin: [
                {
                    // 定位
                    pName: 'Geolocation',
                    events: {
                        init (o) {
                            // o是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    // 设置经度
                                    self.lng = result.position.lng
                                    // 设置维度
                                    self.lat = result.position.lat
                                    // 设置坐标
                                    self.center = [self.lng, self.lat]
                                    self.markers.push([self.lng, self.lat])
                                    // load
                                    self.loaded = true
                                    // 页面渲染好后
                                    self.$nextTick()
                                }
                            })
                        }
                    }
                },
                {
                    // 搜索
                    pName: 'PlaceSearch',
                    events: {
                        init (instance) {
                        // console.log(instance)
                        }
                    }
                },
                {
                    // 工具栏
                    pName: 'ToolBar',
                    events: {
                        init (instance) {
                            // console.log(instance);
                        }
                    }
                },
            ]
        }
    }
}
</script>

<style>
    .locationDialog /deep/.el-dialog {
        background: transparent;
    }
    .locationDialog /deep/.el-dialog__header,
    .locationDialog /deep/.el-dialog__body {
        background: rgba(10, 29, 81, 0.7);
        border: 1px solid rgba(59, 135, 227, 1);
    }
    .locationDialog /deep/.el-dialog__header {
        border-bottom: none;
        color: rgba(0, 242, 255, 1);
        font-size: 18px;
    }
    .locationDialog /deep/.el-dialog__body {
        border-top: none;
    }
    .title-cancel-button {
        color: #ADB6C2;
        float: right;
        display: inline-block;
        width: 28px;
        height: 28px;
        font-size: 20px;
        line-height: 28px;
        cursor: pointer;
        text-align: right;
        padding-right: 0;
        font-weight: bold;
    }
    .container {
    height: 500px;
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0); */
    border: 1px solid #999;
    }
    .search-box {
    position: absolute;
    z-index: 5;
    width: 60%;
    left: 21px;
    top: 50px;
    height: 30px;
    }
    .search-box input {
    float: left;
    width: 80%;
    height: 100%;
    border: 1px solid #30ccc1;
    padding: 0 8px;
    outline: none;
    }
    .search-box button {
    float: left;
    width: 20%;
    height: 100%;
    background: #30ccc1;
    border: 1px solid #30ccc1;
    color: #fff;
    outline: none;
    cursor:pointer;
    }
    .tip-box {
    width: 100%;
    max-height:260px;
    /* position: absolute; */
    /* top: 30px; */
    overflow-y: auto;
    background-color: #fff;
    }
    .tip-box .amap_lib_placeSearch_list,
    .tip-box .amap_lib_placeSearch .poibox .poi-info p {
        color: black;
    }
</style>

