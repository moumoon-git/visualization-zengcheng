<template>
    <div class="brokenLine_wrap">
      <div class="echarts2" :id="iDName"></div>
    </div>
</template>

<script>
    export default {
        name: "brokenLine",
        data () {
          return {
              iDName:''
          }
        },
      methods:{
          init (eleName,data) {
            const _that = this
            _that.iDName = eleName
            setTimeout(()=>{
              _that.draLine(data)
              // console.log(data)
            })
          },
          draLine (obj) {
            // data 的数据
            // let obj = {
            //   legendData:[],
            //   xAxisData:[],
            //   seriesData:[]
            // }
            let ele = this.$echarts.init(document.getElementById(this.iDName))
            let option = {
              tooltip: {
                trigger: "axis",
                backgroundColor:'raba(0,0,0,0)',
                formatter: function(params, ticket, callback) {
                  // console.log(params, "");
                  let res = `<div style="position: relative;padding: 5px;top: -50px;">`
                  params.forEach(ele=>{
                    res += `<div style="display: flex;align-items: center;position: relative;">
                             <div style="width:6px;height: 6px;margin-right:8px;margin-left: 8px;border-radius: 50%;background: ${ele.color}"></div>
                             <div>${ele.seriesName}：${ele.value} </div>
                           </div>`;
                  })
                  res += `<img style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: -1;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAxCAYAAAAoVNwtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAyLTA0VDE4OjAxOjA2KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMi0wNFQxODoyNzo0NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMi0wNFQxODoyNzo0NSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGYwMzg4Mi02OTQ2LWJl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" alt="">`
                  return res;
                },
                extraCssText: "z-index:4"
              },
              legend: {
                icon:'roundRect',
                x:'right',
                y: '8px',
                textStyle: {
                  color: '#D9E1ED'
                },
                data: obj.legendData
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: true,
                data: obj.xAxisData,
                axisLabel: {
                  rotate:40,
                  interval:0,
                },
                axisLine:{
                  show:false, //隐藏坐标轴
                  lineStyle:{
                    color:'#2C5CA9',  //坐标轴的颜色
                  },
                },
                axisTick:{
                  show:false, //隐藏坐标轴的刻度
                },
              },
              yAxis: {
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: ['rgba(130,171,205,0.2)'],
                    width: 1,
                    type: 'solid'
                  }
                },
                axisLabel: {
                  textStyle:{
                    color:'#2C5CA9',  //坐标的字体颜色
                  },
                },
                axisLine:{
                  show:false, //隐藏坐标轴
                  lineStyle:{
                    color:'#00eeff',  //坐标轴的颜色
                  },
                },
                axisTick:{
                  show:false, //隐藏坐标轴的刻度
                },
              },
              series: obj.seriesData
            };
            ele.setOption(option);
          }
      },
      mounted() {

      }
    }
</script>

<style scoped>
.brokenLine_wrap{
  width: 100%;
  height: 100%;
}
.echarts2{
  width: 100%;
  height: 100%;
}
</style>
