<template>
  <div class="Echart" ref="echart"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {})
defineExpose({ drawEcharts })
function drawEcharts(type, time, data, cur) {
  let colorStyle = []
  let xData = []
  let yData = []
  switch (type) {
    case 'board':
      colorStyle = echartdata.boardStyle
      break
    case 'farm':
      colorStyle = echartdata.lpStyle
      break
  }

  Echart(time, data, colorStyle, cur)
}
const echartdata = reactive({
  colorStyle: [],
  boardStyle: ['#9FD1FF', '#6996E0', 'rgba(209, 110, 253, 0.2)', 'rgba(78, 125, 211, 0.2)'],
  lpStyle: ['#2BD9FF', '#59FFCE', 'rgba(43, 217, 255, 0.2)', 'rgba(89, 255, 206, 0.2)'],
})
const echart = ref(null)
const Echart = function (xData, yData, colorStyle, cur) {
  let unit = ''
  let eth = ''
  let usd = ''
  let toolunit = ''
  if (cur == 'usd') {
    unit = 'mil'
    usd = '$'
    toolunit = 'mil'
  } else {
    unit = 'eth'
    eth = ' Ξ'
    toolunit = ''
  }
  const myChart = echarts.init(echart.value)
  myChart.clear()
  let yDataShadow = []

  yData.forEach(item => {
    if (item > 0) {
      yDataShadow.push(Number(item - 1))
    } else {
      yDataShadow.push(0)
    }
  })
  let screenW = document.body.clientWidth
  /* 
  let grid = {
      top: "",
      right: "",
      left: "",
      bottom: "",
  }
  let axisLabel= {
          margin:30
      },
  if(screenW>767){
    grid = {
      top: "5%",
      right: "40px",
      left: "55pxpx",
      bottom: "11%",
    }
  }else{

  }*/
  myChart.setOption({
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: '#27282D',
      borderColor: '#27282D',
      formatter: function (params, ticket, callback) {
        var name = params[0].name
        var value = params[0].value
        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00ECA8"></span>'
        return `<span style="color: #B2B2B2;font-size:14px;font-family:D-DIN">${name}</span>
                <br/ >
               <span style="color:#fff;font-size:18px;font-weight:600;font-family:D-DIN-Bold"> ${usd} ${eth} ${value} ${toolunit} </span>
        `
      },
    },
    grid: {
      top: '5%',
      right: '20px',
      left: '95px',
      bottom: '11%',
    },
    xAxis: {
      data: xData,
      boundaryGap: false,
      axisLabel: {
        margin: 20,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      axisLabel: {
        margin: 20,
        formatter: usd + '{value}' + ' ' + unit,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#27282D',
        },
      },
    },
    series: [
      {
        name: 'average',
        type: 'line',
        data: yData,
        smooth: true,
        symbol:
          'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAgBJREFUOE+FU0toE1EUPfdN4kwC8ZOKFiuIiJVSiNSFbly4iOBnEWemDerWutCuhK7sptSNYBYuBD8bF4q01bzUX0ULgt0o1KoEN4pFCwpVixZCnEySeVcSmXSikb7dO797H+9eQoszzCxejzod1VUirCL6l0eHyG2loyB44G5pR8TjswKUAnhNjWOgDKhnwtMyd/qMJ0F9w9ybdfoV4RIBeqsqf4LoqlbVB26nyavd6+YjOdcWrMYJEP8z+rgCruSsyKm6eV/u59o4Gx8IaAsaK8UlqHIJ+rr2v/NYAcmcFXlKpiwNCvAFX+FVXMzdHML32fsAM2JbEug8cRFG2+ZGCDMmpR05THa2OAUSSZ+Zn8jg89S1pmqxrT1IDI4tm0HOj/zz1WRJ5z0B233m1bmDcBbm/nn67vMvEI7FG3hFMzrIzjpvQej20XwmjcLHN01mEmHsycxA06MN/Fd1aQOZ0hkTQNpHF18+xLvrZ5rM7XuPYtuxkUDb/E1a0Y3UK90+hhoPqhdnJ7EwfQuq7CC+M4lN+09CaKFlCdPlrG2cJgyzsBLuDIF3rfTH9UFhFAGjW9o0Xx8SUxa6CKFpAtavEOB5xMcnzGi908Z4mrLUSaxGiainVQCBv3oQ/TnLeODzTYtR26a8LKeYlE3gLoIIEfBJMR5XQ/qNeykqBIN/AxCttprIQKOfAAAAAElFTkSuQmCC',
        symbolSize: 14,
        showSymbol: false,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorStyle[0],
            },
            {
              offset: 1,
              color: colorStyle[1],
            },
          ]),
          //cap: "round",
          width: 6,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorStyle[2],
            },
            {
              offset: 1,
              color: colorStyle[3],
            },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: '#fff',
          },
        },
      },
    ],
  })
}
</script>
<style scoped lang="scss">
.flex {
  display: flex;
}
.Echart {
  margin: 30px auto 0 auto;
  width: 1200px;
  height: 420px;
}
@media only screen and (max-width: 767px) {
  .Echart {
    width: calc(100vw - 40px);
    height: 370px;
    margin-top: 20px;
  }
}
</style>
