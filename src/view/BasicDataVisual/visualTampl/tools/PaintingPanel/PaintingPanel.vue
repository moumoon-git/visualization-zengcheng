<!--
  @author tanjinfeng
  @date 2020-11-28
  @description 地图图层绘制自定义标注面板（新）
-->
<template>
  <div class="painting-panel">
    <div class="painting-panel__main">
      <!-- 第一排按钮 -->
      <div>
        <!-- 距离测量按钮 -->
        <el-tooltip
          content="距离测量"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--distance"
            @click="measure('distance')"
          ></div>
        </el-tooltip>

        <!-- 面积测量按钮 -->
        <el-tooltip
          content="面积测量"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--area"
            @click="measure('area')"
          ></div>
        </el-tooltip>

        <!-- 保存图层按钮 -->
        <el-tooltip
          content="保存当前图层"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--save"
            @click="save"
          ></div>
        </el-tooltip>

        <!-- 清空图层按钮 -->
        <el-tooltip
          content="清空当前图层"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--clear"
            @click="confirmClear"
          ></div>
        </el-tooltip>

        <!-- 图层记录按钮 -->
        <el-tooltip
          content="图层记录"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--record"
            @click="showHistory = !showHistory"
          ></div>
        </el-tooltip>
      </div>

      <!-- 第二排按钮 -->
      <div>
        <!-- 定点面板切换按钮 -->
        <el-tooltip
          content="定点"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--marker"
            @click="showMarker = !showMarker"
          ></div>
        </el-tooltip>

        <!-- 绘制折线按钮 -->
        <el-tooltip
          content="折线"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--polyline"
            @click="$refs.PaintingPanelOverlayEditDialog.open('polyline')"
          ></div>
        </el-tooltip>

        <!-- 绘制圆形按钮 -->
        <el-tooltip
          content="圆形"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--circle"
            @click="$refs.PaintingPanelOverlayEditDialog.open('circle')"
          ></div>
        </el-tooltip>

        <!-- 绘制矩形按钮 -->
        <el-tooltip
          content="矩形"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--rectangle"
            @click="$refs.PaintingPanelOverlayEditDialog.open('rectangle')"
          ></div>
        </el-tooltip>

        <!-- 绘制多边形按钮 -->
        <el-tooltip
          content="多边形"
          placement="top"
          effect="dark"
          :enterable="false"
        >
          <div
            class="painting-panel__main__icon painting-panel__main__icon--polygon"
            @click="$refs.PaintingPanelOverlayEditDialog.open('polygon')"
          ></div>
        </el-tooltip>
      </div>
    </div>

    <!-- 定点面板 -->
    <PaintingPanelMarker
      ref="PaintingPanelMarker"
      :visible="showMarker"
      @marker-click="$refs.PaintingPanelMarkerEditDialog.open($event)"
    />

    <!-- 图层历史面板 -->
    <PaintingPanelOverlayHistory
      ref="PaintingPanelOverlayHistory"
      :visible="showHistory"
      :list="dataList"
      @select-record="reDraw"
      @refresh="getData"
    />

    <!-- 覆盖物编辑弹窗 -->
    <PaintingPanelOverlayEditDialog
      ref="PaintingPanelOverlayEditDialog"
      @confirm="draw"
      @update="update"
    />

    <!-- marker编辑弹窗 -->
    <PaintingPanelMarkerEditDialog
      ref="PaintingPanelMarkerEditDialog"
      @confirm="drawMarker"
      @update="updateMarker"
    />
  </div>
</template>

<script>
import PaintingPanelOverlayEditDialog from './PaintingPanelOverlayEditDialog'
import PaintingPanelOverlayHistory from './PaintingPanelOverlayHistory'
import PaintingPanelMarker from './PaintingPanelMarker'
import PaintingPanelMarkerEditDialog from './PaintingPanelMarkerEditDialog'

export default {
  name: 'PaintingPanel',

  components: {
    PaintingPanelOverlayEditDialog,
    PaintingPanelOverlayHistory,
    PaintingPanelMarker,
    PaintingPanelMarkerEditDialog
  },

  props: {
    // 高德地图实例
    map: {
      required: true
    },

    // 面板是否生效
    isActive: {
      required: true,
      type: Boolean
    }
  },

  data() {
    return {
      dataList: [],
      // 高德地图默认的鼠标样式
      originalCursor: '',
      // 绘制的覆盖物列表
      overlays: [],
      // 画图工具
      mouseTool: '',
      // 正在生效的覆盖物编辑器实例
      editor: '',
      // 右键菜单实例
      contextMenu: '',
      // 被右键点击的覆盖物
      rightClickObj: '',
      // 被右键点击的覆盖物文字
      rightClickObjText: '',
      // marker右键菜单实例
      markerContextMenu: '',
      // 被右键点击的marker
      rightClickMarker: '',
      // 是否展示历史记录
      showHistory: false,
      // 是否展示落点
      showMarker: false,
      // 当前正在编辑中的marker
      edittingMarker: '',
      // 绘制的marker
      markers: [],
      // 是否限制保存
      saveLimit: false,
    }
  },

  watch: {
    // 地图初始化结束，请求数据并渲染
    map: {
      handler: function(map) {
        if (!!map) {
          // 保存默认的指针样式
          this.originalCursor = this.map.getDefaultCursor()

          // 请求后台图层记录数据
          this.getData().then(() => {
            // 绘制最新的一条记录图层
            if (Array.isArray(this.dataList) && this.dataList.length > 0) {
              this.reDraw(this.dataList[0])
            }
          })
        }
      }
    },

    // 图层工具关闭同时关闭编辑器
    isActive: function (isActive) {
      if (!isActive) {
        // 关闭编辑器
        if (!!this.editor) {
          this.editor.instance.close()
          this.editor.obj.setDraggable(false)
          this.editor.text.setDraggable(false)
          this.editor = null
        }
        if (!!this.edittingMarker) {
          this.edittingMarker.setDraggable(false)
          this.edittingMarker.setCursor('pointer')
          this.edittingMarker = null
        }
        this.showHistory = false
        this.showMarker = false
      }
    }
  },

  mounted() {
    this.initContextMenu()
  },

  methods: {
    /**
     * @description 初始化右键菜单
     */
    initContextMenu() {
      // 1. 创建并保存右键菜单实例
      const contextMenu = new AMap.ContextMenu()
      this.contextMenu = contextMenu
      const markerContextMenu = new AMap.ContextMenu()
      this.markerContextMenu = markerContextMenu

      // 2. 编辑选项
      contextMenu.addItem(
        '编辑',
        () => {
          this.$refs.PaintingPanelOverlayEditDialog
            .edit(
              this.rightClickObjText.getText(),
              this.rightClickObjText.getTitle(),
              this.rightClickObj.getOptions().fillColor,
              this.rightClickObj.getOptions().strokeWeight,
              this.rightClickObj.getOptions().fillOpacity,
              this.rightClickObj.CLASS_NAME,
              this.rightClickObj.getOptions().strokeColor,
            )
        },
        0
      )

      markerContextMenu.addItem(
        '编辑',
        () => {
          this.$refs.PaintingPanelMarkerEditDialog
            .edit(
              this.rightClickMarker.getLabel().content,
              this.rightClickMarker.getTitle()
            )
        },
        0
      )

      // 3. 删除选项
      contextMenu.addItem(
        '删除',
        () => {
          this.map.remove(this.rightClickObj)
          this.map.remove(this.rightClickObjText)
          this.overlays.splice(this.overlays.findIndex(e => Object.is(e.obj, this.rightClickObj)), 1)
        },
        1
      )

      markerContextMenu.addItem(
        '删除',
        () => {
          this.map.remove(this.rightClickMarker)
          this.markers.splice(this.markers.findIndex(marker => Object.is(marker.obj, this.rightClickMarker)), 1)
        },
        1
      )
    },

    /**
     * @description 绘制对应类型的覆盖物
     * @param { String } text 文字标注
     * @param { String } title 文字标注悬浮说明
     * @param { String } color 覆盖物颜色
     * @param { Number } weight 覆盖物边缘线粗细程度
     * @param { Number } opacity 覆盖物填充透明度
     * @param { String } type 绘制覆盖物的类型（'circle'、'rectangle'、'polyline'、'polygon'）
     */
    draw({
      text,
      title,
      color,
      weight,
      opacity,
      type,
      lineColor
    }) {
      // 1. 关闭上一次的画图工具
      if (this.mouseTool) {
        this.mouseTool.close()
      }

      // 2. 修改鼠标指针样式
      this.map.setDefaultCursor(`url(${ require('./img/cursor.png') }) 16 21, pointer`)

      // 3. 实例化高德地图画图工具并保存
      const mouseTool = new AMap.MouseTool(this.map)
      this.mouseTool = mouseTool

      // 4. 绘制对应类型的覆盖物
      const options = {
        fillColor: color,
        fillOpacity: opacity,
        strokeColor: lineColor,
        strokeWeight: weight,
        strokeOpacity: 0.8,
      }
      switch (type) {
        case 'circle': {
          this.$message('请在地图上按下鼠标左键并拖动（松开左键结束绘制）')
          mouseTool.circle(options)
          break
        }

        case 'rectangle': {
          this.$message('请在地图上按下鼠标左键并拖动（松开左键结束绘制）')
          mouseTool.rectangle(options)
          break
        }

        case 'polyline': {
          this.$message('请在地图上点击鼠标左键选点（至少点2次，双击左键结束绘制）')
          mouseTool.polyline(options)
          break
        }

        case 'polygon': {
          this.$message('请在地图上点击鼠标左键选点(至少点3次，双击左键结束绘制)')
          mouseTool.polygon(options)
          break
        }
      }

      // 5. 绘制结束回调
      mouseTool.on('draw', ({ obj }) => {
        this.$message({
          message: '绘制完成，鼠标双击【图形/路径/标签】可以编辑大小和移动',
          type: 'success'
        })
        // 5.1 关闭画图工具，还原鼠标指针样式
        mouseTool.close()
        this.map.setDefaultCursor(this.originalCursor)

        // 5.2 创建文本标注
        const textMarker = new AMap.Text({
          text,
          title,
          map: this.map,
          position: obj.getBounds().getCenter(),
          anchor: 'bottom-center'
        })
        textMarker.setStyle({
          color,
          'background': 'rgba(255, 255, 255, 0.8)',
          'border': '0',
          'border-radius': '100px',
          'padding': '5px 10px',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': '"SourceHanSansCN-Regular"',
          'box-shadow': '0 0 5px #666666'
        })

        // 5.3 mouseTool所绘制的矩形实际上是多边形，无法应用矩形编辑器，需要转换成矩形
        if (type === 'rectangle') {
          const bounds = obj.getBounds()
          this.map.remove(obj)
          obj = new AMap.Rectangle(Object.assign(
            {
              bounds,
              map: this.map
            },
            options
          ))
        }

        // 5.4 为覆盖物绑定点击事件
        this.bindEvent(obj, textMarker, type)
      })
    },

    /**
     * @description 为覆盖物绑定点击事件
     * @param { Object } obj 图形覆盖物
     * @param { Object } text 文本覆盖物
     * @param { String } type 覆盖物类型
     */
    bindEvent(obj, text, type) {
      // 1. 鼠标左键双击：开启编辑功能
      const dblclickCallback = event => {
        if (this.isActive) {
          // 1.1 有覆盖物处在编辑状态，退出编辑状态，并清空保存的状态
          if (!!this.editor) {
            this.editor.instance.close()
            this.editor.obj.setDraggable(false)
            this.editor.text.setDraggable(false)
            if (Object.is(this.editor.obj, obj)) {
              this.editor = null
              // 覆盖物是自身，则不创建新的编辑
              return
            }
            this.editor = null
          }

          // 1.2 新建对应类型的编辑器
          let editor = ''
          switch (type) {
            case 'circle': {
              editor = new AMap.CircleEditor(this.map, obj)
              break
            }

            case 'rectangle': {
              editor = new AMap.RectangleEditor(this.map, obj)
              break
            }

            case 'polygon':
            case 'polyline': {
              editor = new AMap.PolyEditor(this.map, obj)
              break
            }
          }

          // 1.3 打开编辑器并保存状态
          editor.open()
          obj.setDraggable(true)
          text.setDraggable(true)
          this.editor = {
            obj,
            text,
            instance: editor
          }
        }
      }
      obj.on('dblclick', dblclickCallback)
      text.on('dblclick', dblclickCallback)

      // 2. 鼠标右键单击：打开菜单
      const rightclickCallback = event => {
        if (this.isActive) {
          // 关闭编辑器
          if (!!this.editor) {
            this.editor.instance.close()
            this.editor.obj.setDraggable(false)
            this.editor.text.setDraggable(false)
            this.editor = null
          }

          // 打开菜单
          this.rightClickObj = obj
          this.rightClickObjText = text
          this.contextMenu.open(this.map, event.lnglat)
        }
      }
      obj.on('rightclick', rightclickCallback)
      text.on('rightclick', rightclickCallback)

      // 3. 保存覆盖物和文本
      this.overlays.push({ obj, text })
    },

    /**
     * @description 更新覆盖物设置
     * @param {String} text 文字标注
     * @param {String} title 文字标注悬浮说明
     * @param {String} color 填充颜色
     * @param {Number} weight 覆盖物边缘线粗细程度
     * @param {Number} opacity 覆盖物填充透明度
     * @param {String} lineColor 边线颜色
     */
    update({
      text,
      title,
      color,
      weight,
      opacity,
      lineColor
    }) {
      // 文字标注设置
      this.rightClickObjText.setText(text)
      this.rightClickObjText.setTitle(title)
      this.rightClickObjText.setStyle({
        color
      })

      // 覆盖物设置
      this.rightClickObj.setOptions({
        fillColor: color,
        fillOpacity: opacity,
        strokeColor: lineColor,
        strokeWeight: weight,
        strokeOpacity: 0.8,
      })
    },

    /**
     * @description 点击绘制对应marker
     * @param { Number } index 图标类型下标
     * @param { String } text 文字标注
     * @param { String } title 悬浮说明
     */
    drawMarker({
      index,
      title,
      text
    }) {
      // 1. 关闭上一次的画图工具
      if (this.mouseTool) {
        this.mouseTool.close()
      }

      // 2. 修改鼠标指针样式
      this.map.setDefaultCursor(`url(${ require(`./img/marker-${ index }.png`) }) 34 34, pointer`)

      // 3. 实例化高德地图画图工具并保存
      const mouseTool = new AMap.MouseTool(this.map)
      this.mouseTool = mouseTool

      // 4. 创建并绘制marker
      this.$message('请在地图上点击鼠标左键绘制定点')
      const icon = new AMap.Icon({
        image: require(`./img/marker-${ index }.png`),
        size: new AMap.Size(68, 68),
      })
      mouseTool.marker({
        icon,
        title,
        offset: new AMap.Pixel(-34, -34),
        label: {
          content: text,
          direction: 'bottom'
        }
      })

      // 5. 绘制结束的回调
      mouseTool.on('draw', ({ obj }) => {
        this.$message({
          message: '绘制完成，鼠标左键双击定点后，可以按下鼠标左键拖动定点',
          type: 'success'
        })
        // 5.1 关闭画图工具，还原鼠标指针样式
        mouseTool.close()
        this.map.setDefaultCursor(this.originalCursor)

        // 5.2 绑定双击事件，进入可拖动状态
        obj.on('dblclick', event => {
          if (this.isActive) {
            if (!!this.edittingMarker) {
              this.edittingMarker.setDraggable(false)
              this.edittingMarker.setCursor('pointer')
              // 再次点击关闭状态
              if (Object.is(this.edittingMarker, obj)) {
                this.edittingMarker = null
                return
              }
              this.edittingMarker = null
            }

            obj.setDraggable(true)
            obj.setCursor('move')
            this.edittingMarker = obj
          }
        })

        // 5.3 绑定右键事件，打开菜单
        obj.on('rightclick', event => {
          if (this.isActive) {
            // 关闭marker编辑
            if (!!this.edittingMarker) {
              this.edittingMarker.setDraggable(false)
              this.edittingMarker.setCursor('pointer')
              this.edittingMarker = null
            }

            // 打开菜单
            this.rightClickMarker = obj
            this.markerContextMenu.open(this.map, event.lnglat)
          }
        })

        // 5.4 保存marker
        this.markers.push({ obj, index })
      })
    },

    /**
     * @description 更新marker设置
     * @param {String} text 文字标注
     * @param {String} title 悬浮说明
     */
    updateMarker({
      text,
      title
    }) {
      this.rightClickMarker.setTitle(title)
      this.rightClickMarker.setLabel({ content: text })
    },

    /**
     * @description 测量工具
     * @param { String } type 测量工具类型
     */
    measure(type) {
      // 1. 关闭上一次的画图工具
      if (this.mouseTool) {
        this.mouseTool.close()
      }

      // 2. 修改鼠标指针样式
      this.map.setDefaultCursor(`url(${ require('./img/ruler.png') }) 2 2, pointer`)

      // 3. 实例化高德地图画图工具并保存
      const mouseTool = new AMap.MouseTool(this.map)
      this.mouseTool = mouseTool

      // 4. 开始测量
      switch (type) {
        case 'distance': {
          this.$message('请在地图上点击鼠标左键选点(至少点2次，双击左键结束绘制)')
          mouseTool.rule()
          break
        }

        case 'area': {
          this.$message('请在地图上点击鼠标左键选点(至少点3次，双击左键结束绘制，右键点击删除)')
          mouseTool.measureArea()
          break
        }
      }

      // 5. 绘制结束回调
      mouseTool.on('draw', ({ obj }) => {
        // 关闭画图工具，还原鼠标指针样式
        mouseTool.close()
        this.map.setDefaultCursor(this.originalCursor)

        // 删除面积测量
        if (type === 'area') {
          obj.on('rightclick', event => {
            mouseTool.close(true)
          })
        }
      })
    },

    /**
     * @description 保存当前图层数据
     */
    save() {
      // 限制按键频率
      if (!this.saveLimit) {
        // 需要保存的数据
        let data = []
        // 遍历所有的覆盖物，处理数据
        this.overlays.forEach(overlay => {
          const options = overlay.obj.getOptions()
          // 一个覆盖物的所有参数
          let item = {
            // 覆盖物类型
            type: '',
            // 覆盖物空间参数
            lnglat: '',
            // 覆盖物样式
            options: JSON.stringify({
              strokeColor: options.strokeColor,
              strokeOpacity: options.strokeOpacity,
              strokeWeight: options.strokeWeight,
              fillColor: options.fillColor,
              fillOpacity: options.fillOpacity,
              strokeStyle: options.strokeStyle
            }),
            // 文字标注参数
            remark: JSON.stringify({
              text: overlay.text.getText(),
              title: overlay.text.getTitle(),
              longitude: overlay.text.getPosition().getLng(),
              latitude: overlay.text.getPosition().getLat()
            })
          }

          // 按照覆盖物类型设置空间参数
          switch(overlay.obj.CLASS_NAME) {
            case 'AMap.Rectangle': {
              item.type = 'rectangle'
              item.lnglat = JSON.stringify({
                southWest: overlay.obj.getBounds().getSouthWest(),
                northEast: overlay.obj.getBounds().getNorthEast()
              })
              break
            }

            case 'AMap.Circle': {
              item.type = 'circle'
              item.lnglat = JSON.stringify({
                longitude: overlay.obj.getCenter().getLng(),
                latitude: overlay.obj.getCenter().getLat(),
                radius: overlay.obj.getRadius()
              })
              break
            }

            case 'AMap.Polygon': {
              item.type = 'polygon'
              item.lnglat = JSON.stringify({
                path: overlay.obj.getPath().map(e => ({
                  lng: e.getLng(),
                  lat: e.getLat()
                }))
              })
              break
            }

            case 'AMap.Polyline': {
              item.type = 'polyline'
              item.lnglat = JSON.stringify({
                path: overlay.obj.getPath().map(e => ({
                  lng: e.getLng(),
                  lat: e.getLat()
                }))
              })
              break
            }
          }

          data.push(item)
        })

        // 遍历所有的marker，处理数据
        this.markers.forEach(marker => {
          const item = {
            type: 'marker',
            lnglat: JSON.stringify({
              longitude: marker.obj.getPosition().getLng(),
              latitude: marker.obj.getPosition().getLat()
            }),
            options: String(marker.index),
            remark: JSON.stringify({
              text: marker.obj.getLabel().content,
              title: marker.obj.getTitle()
            })
          }
          data.push(item)
        })
        // 发送post请求
        const request = {
          url: '/visuallayer/save',
          method: 'post',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          data: {
            visualLayerList: data
          }
        }
        this.apix(request)
          .then(response => {
            if (response.code === 0) {
              this.$message({
              message: '保存成功！',
              type: 'success'
            })
              this.getData()
            } else {
              this.$message.error(`保存失败！请重试！错误信息：${ response.msg }`)
            }
          })
          .finally(() => {
            this.saveLimit = false
          })
      }
    },

    /**
     * @description 请求后台图层历史数据
     */
    getData() {
      const request = {
        method: 'get',
        url: '/visuallayer/searchVisualLayer',
      }
      return new Promise(resolve => {
        this.apix(request).then(response => {
          if (response.code === 0) {
            this.dataList = response.data
            resolve()
          }
        })
      })
    },

    /**
     * @description 重新绘制图层记录数据
     * @param { Array } record 一次记录
     */
    reDraw(record) {
      // 清除当前覆盖物
      this.clear()

      // 遍历每一个覆盖物，重新绘制
      record.forEach(data => {
        // 绘制覆盖物
        let reDrawOverlay
        switch (data.type) {
          case 'rectangle': {
            reDrawOverlay = new AMap.Rectangle(Object.assign(
              {
                map: this.map,
                bounds: new AMap.Bounds(JSON.parse(data.lnglat).southWest, JSON.parse(data.lnglat).northEast)
              },
              JSON.parse(data.options)
            ))
            break
          }

          case 'circle': {
            reDrawOverlay = new AMap.Circle(Object.assign(
              {
                map: this.map,
                center: new AMap.LngLat(JSON.parse(data.lnglat).longitude, JSON.parse(data.lnglat).latitude),
                radius: JSON.parse(data.lnglat).radius
              },
              JSON.parse(data.options)
            ))
            break
          }

          case 'polygon': {
            reDrawOverlay = new AMap.Polygon(Object.assign(
              {
                map: this.map,
                path: JSON.parse(data.lnglat).path.map(e => new AMap.LngLat(e.lng, e.lat))
              },
              JSON.parse(data.options)
            ))
            break
          }

          case 'polyline': {
            reDrawOverlay = new AMap.Polyline(Object.assign(
              {
                map: this.map,
                path: JSON.parse(data.lnglat).path.map(e => new AMap.LngLat(e.lng, e.lat))
              },
              JSON.parse(data.options)
            ))
            break
          }

          case 'marker': {
            // 创建marker
            const icon = new AMap.Icon({
              image: require(`./img/marker-${ data.options }.png`),
              size: new AMap.Size(68, 68),
            })
            const marker = new AMap.Marker({
              icon,
              map: this.map,
              position: new AMap.LngLat(JSON.parse(data.lnglat).longitude, JSON.parse(data.lnglat).latitude),
              offset: new AMap.Pixel(-34, -34),
              title: JSON.parse(data.remark).title,
              label: {
                content: JSON.parse(data.remark).text,
                direction: 'bottom'
              }
            })
            // 绑定事件
            marker.on('dblclick', event => {
              if (this.isActive) {
                if (!!this.edittingMarker) {
                  this.edittingMarker.setDraggable(false)
                  this.edittingMarker.setCursor('pointer')
                  // 再次点击关闭状态
                  if (Object.is(this.edittingMarker, marker)) {
                    this.edittingMarker = null
                    return
                  }
                  this.edittingMarker = null
                }

                marker.setDraggable(true)
                marker.setCursor('move')
                this.edittingMarker = marker
              }
            })

            // 5.3 绑定右键事件，打开菜单
            marker.on('rightclick', event => {
              if (this.isActive) {
                // 关闭marker编辑
                if (!!this.edittingMarker) {
                  this.edittingMarker.setDraggable(false)
                  this.edittingMarker.setCursor('pointer')
                  this.edittingMarker = null
                }

                // 打开菜单
                this.rightClickMarker = marker
                this.markerContextMenu.open(this.map, event.lnglat)
              }
            })

            // 保存marker
            this.markers.push({
              obj: marker,
              index: parseInt(data.options, 10)
            })
            // 进入下一次forEach迭代
            return
          }
        }

        // 绘制文本标注
        const reDrawText = new AMap.Text({
          text: JSON.parse(data.remark).text,
          title: JSON.parse(data.remark).title,
          map: this.map,
          position: new AMap.LngLat(JSON.parse(data.remark).longitude, JSON.parse(data.remark).latitude),
          anchor: 'bottom-center'
        })
        reDrawText.setStyle({
          color: reDrawOverlay.getOptions().fillColor,
          'background': 'rgba(255, 255, 255, 0.8)',
          'border': '0',
          'border-radius': '100px',
          'padding': '5px 10px',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': '"SourceHanSansCN-Regular"',
          'box-shadow': '0 0 5px #666666'
        })

        // 绑定点击事件
        this.bindEvent(reDrawOverlay, reDrawText, data.type)
      })
    },

    /**
     * @description 清空当前图层数据
     */
    clear() {
      // 清除当前覆盖物
      this.overlays.forEach(overlay => {
        this.map.remove(overlay.obj)
        this.map.remove(overlay.text)
      })
      this.overlays = []
      this.markers.forEach(marker => {
        this.map.remove(marker.obj)
      })
      this.markers = []
    },

    /**
     * @description 提示是否清空图层
     */
    confirmClear() {
      this.$confirm(
        '未保存的图层修改将会丢失, 是否确定清空当前图层?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.clear()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.painting-panel {
  position: absolute;
  top: 90px;
  left: 100px;
  border: 1px solid #1D5ABF;
  width: 270px;
  max-height: 500px;
  font-family: 'SourceHanSansCN-Regular';
  background: no-repeat top/100% url('./img/background.png');
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  // 四角
  @mixin corner {
    content: '';
    display: block;
    position: absolute;
    width: 6px;
    height: 7px;
    background: no-repeat center/100% 100% transparent;
  }

  &__main:before {
    @include corner;
    top: -1px;
    left: -1px;
    background-image: url('./img/corner_tl.png');
  }

  &__main:after {
    @include corner;
    top: -1px;
    right: -1px;
    background-image: url('./img/corner_tr.png');
  }

  &:before {
    @include corner;
    bottom: -1px;
    left: -1px;
    background-image: url('./img/corner_bl.png');
  }

  &:after {
    @include corner;
    bottom: -1px;
    right: -1px;
    background-image: url('./img/corner_br.png');
  }

  &__main {
    border: 1px solid #0D79FF;
    background: rgba(13, 121, 255, 0.3);
    text-align: center;
    user-select: none;

    &__icon {
      margin: 5px 10px;
      display: inline-block;
      width: 30px;
      height: 30px;
      cursor: pointer;
      background: no-repeat center/100% 100% transparent;

      &:active {
        position: relative;
        top: 1px;
      }

      &--marker {
        background-image: url('./img/marker.png');
      }

      &--circle {
        background-image: url('./img/circle.png');
        background-size: 90%;
      }

      &--rectangle {
        background-image: url('./img/rectangle.png');
      }

      &--polyline {
        background-image: url('./img/polyline.png');
        background-size: 90%;
      }

      &--polygon {
        background-image: url('./img/polygon.png');
        background-size: 110%;
      }

      &--clear {
        background-image: url('./img/clear.png');
        background-size: 110%;
      }

      &--save {
        background-image: url('./img/save.png');
      }

      &--distance {
        background-image: url('./img/distance.png');
        background-size: 110%;
      }

      &--area {
        background-image: url('./img/area.png');
      }

      &--record {
        background-image: url('./img/record.png');
        background-size: 90%;
      }
    }
  }
}
</style>
