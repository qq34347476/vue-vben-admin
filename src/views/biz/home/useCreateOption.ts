/*
 * @LastEditTime: 2022-08-29 11:17:32
 * @Description:
 */
import { ref, Ref } from 'vue';
import { useECharts } from '/@/hooks/web/useECharts';
import { getUserContribution } from '/@/api/biz/home/index';
export function useCreatOption() {
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  // 获取图表数据
  async function getEchartData() {
    const { knowledgeCount, pageCount, questionCount } = await getUserContribution();
    setOptions({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 'middle',
        formatter: function (name) {
          if (name === '页面') {
            return name + ' ' + pageCount;
          } else if (name === '知识库') {
            return name + ' ' + knowledgeCount;
          } else {
            return name + ' ' + questionCount;
          }
        },
        textStyle: {
          fontSize: 14,
        },
      },
      series: [
        {
          color: ['#5ab1ef', '#b6a2de', '#67e0e3'],
          name: '数据统计',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: pageCount, name: '页面' },
            { value: knowledgeCount, name: '知识库' },
            { value: questionCount, name: '问答' },
          ],
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 100;
          },
        },
      ],
    });
  }
  return {
    chartRef,
    getEchartData,
  };
}
