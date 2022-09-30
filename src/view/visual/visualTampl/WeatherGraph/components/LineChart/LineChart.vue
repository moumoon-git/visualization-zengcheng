<template>
  <div id="echartId" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'Echart',
  props: {
    xData: {
      type: Array,
      default: () => [],
    },
    yData: { type: Array, default: () => [] },
    unit: {
      type: String,
      default: '',
    },
  },
  watch: {
    yData: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.drawLine();
        } 
      },
      deep: true,
      immediate: true,
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  methods: {
    drawLine() {
      let chart = this.$echarts.init(document.getElementById('echartId'));
      this.$nextTick(() => {
        chart.resize();
      });
      // 判断数据来源显示几条线
      const getSeries = (yData) => {
        console.log(this.yData);
        let series = [];
        const seriesObj = {
          smooth: false, // 改成曲线
          data: yData,
          type: 'line',
          lineStyle: {
            color: '#00EFCC',
          },
          label: {
            // normal: {
            show: true, // 折线上的文字是否显示
            position: 'top',
            color: '#fff',
            formatter: '{c0}' + '°C',
            // }
          },
          symbolSize: 7,
          itemStyle: {
            normal: {
              color: '#00EFCC',
              borderWidth: 1,
              opacity: 1, // 默认圆点是否显示
            },
            emphasis: {
              borderWidth: 1,
              // shadowBlur: 10,
              label: {
                show: true,
              },
              color: '#00EFCC',
              // shadowColor: '#32C5FF',
              opacity: 1,
            },
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'transparent',
                  },
                  {
                    offset: 1,
                    color: 'transparent',
                  },
                ],
                global: false,
              },
            },
          },
        };
        yData.forEach((item, index) => {
          seriesObj.data = [...item];
          let label = { ...seriesObj.label };
          if (index === 0) {
            label.position = 'insideTop';
          } else {
            label.position = 'top';
          }
          seriesObj.label = { ...label };
          series.push({ ...seriesObj });
          console.log('series: ', series);
        });

        return series;
      };
      let option = {
        grid: {
          // show: true,
          // width: '85%',
          // height: '65%',
          left: '15%',
          // top: '15%',
        },
        tooltip: {
          show: false,
          trigger: 'axis',
          z: 2,
          backgroundColor: '#062b66',
          borderColor: '#062b66',
          formatter: '{b0}: {c0}',
          valueFormatter: (value) => `${value}单位`,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          axisPointer: {
            lineStyle: {
              color: '#00EFCC',
              type: 'solid',
            },
            z: 1,
          },
        },
        xAxis: {
          type: 'category',
          data: this.xData,
          show: false, // 是否显示 x 轴。
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#25343C'],
              fontFamily: 'DIN',
            },
          },
          nameTextStyle: {
            color: ['#25343C'],
            fontFamily: 'DIN',
          },

          axisLine: {
            show: false, // 去除刻度线
            lineStyle: {
              color: '#fff',
              fontFamily: 'DIN',
            },
          },
          axisTick: {
            show: false, // 去除轴线
          },
          // splitNumber: 50,
          axisLabel: {
            // interval: 0,
            show: true,
            textStyle: {
              padding: [15, 0, 0, 0], // 更改坐文字间距
              fontSize: 12, // 更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          type: 'value',
          show: false, // 是否显示 y 轴。
          // name: unit,
          nameTextStyle: {
            color: ['#fff'],
            fontFamily: 'DIN',
            fontSize: 12,
          },
          splitLine: {
            show: false, // 去除分割线
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#25343C'],
              fontFamily: 'DIN',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              fontFamily: 'DIN',
            },
          },
          axisLabel: {
            show: true,
            formatter: '{value}' + this.unit,
            textStyle: {
              padding: [0, 5, 0, 0], // 更改坐文字间距
              fontSize: 12, // 更改坐标轴文字大小
            },
          },
        },
        dataZoom: [
          //  用于区域缩放
          {
            show: false,
            type: 'slider', //slider表示有滑动块的，inside表示内置的 (slider配合show使用可以不允许缩放)
            // 用这两个可以调整两点直接间距
            // end: 25,                                 //数据窗口范围的结束百分比,表示70%（表示视图显示的width占总体试图宽度的大小）
            endValue: 6, //数据窗口范围的结束数值。（表示视图显示几个x轴刻度值）
          },
        ],
        series: getSeries(this.yData),
      };
      window.addEventListener('resize', function () {
        chart.resize();
      });
      chart.setOption(option, true);
    },
  },
};
</script>

<style>
</style>