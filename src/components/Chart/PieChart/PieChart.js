import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import exporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash'
import { pieColors } from '../../../containers/Portfolio/constants'

export default class PieChart extends Component {
  pieChartRef = React.createRef()

  static propTypes = {
    miniSize: PropTypes.bool,
    chartTitle: PropTypes.string,
    chartSubTitle: PropTypes.string,
    pieColors: PropTypes.arrayOf(PropTypes.string),
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }),
    dataSeries: PropTypes.arrayOf(PropTypes.object),
  }

  componentWillMount() {
    if (Highcharts.win) {
      exporting(Highcharts)
    }
  }

  componentDidMount() {
    this.chart = this.pieChartRef.current.chart
  }

  exportChart = () => {
    this.chart.exportChart()
  }

  getExpandedOptionConfig = (
    pieColor,
    seriesByFundGraphData,
    chartSubTitle = '',
    history,
    title,
  ) => {
    const expandedChartOptions = {
      chart: { credits: false, height: 500 },
      title: { text: title, style: { fontSize: '14px', fontWeight: 'bold' } },
      subtitle: { text: chartSubTitle, useHTML: true },
      tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}',
        style: { fontWeight: 'bold', fontSize: '11px' },
      },
      colors: pieColors,
      series: [
        {
          data: [...seriesByFundGraphData],
          type: 'pie',
        },
      ],
      legend: {
        enabled: true,
        borderWidth: 1,
        itemStyle: { fontSize: '11px', fontWeight: 'normal' },
      },
      exporting: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          slicedOffset: 0,
          cursor: 'pointer',
          animation: true,
          size: '80%',
          events: {
            click({ point }) {
              const loc = {
                pathname: '/transparency/detail',
                state: { name: point.shortName },
              }
              history.push(loc)
            },
          },
          dataLabels: {
            enabled: true,
            overflow: 'none',
            crop: false,
            distance: 40,
            format:
              '<span style="max-width: 180px; float: left; font-weight: normal ;text-overflow: ellipsis; overflow: hidden; text-align: right;"; >{point.shortName}: {point.y}%</span>',
          },
          showInLegend: !_.isEmpty(seriesByFundGraphData),
        },
      },
    }

    return expandedChartOptions
  }

  getMinOptionsConfig = (
    pColors,
    seriesByFundGraphData,
    chartTitle,
    history,
  ) => {
    const minChartOptions = {
      chart: {
        credits: false,
        height: 200,
      },
      title: {
        text: chartTitle,
        style: { fontSize: '11px' },
      },
      subtitle: {
        text: '',
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      colors: pColors,
      responsive: {
        rules: [{ condition: { maxHeight: 100, maxWidth: 100 } }],
      },
      series: [
        {
          data: [...seriesByFundGraphData],
          type: 'pie',
        },
      ],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          slicedOffset: 0,
          cursor: 'pointer',
          animation: true,
          dataLabels: {
            enabled: false,
          },
          events: {
            click() {
              this.chart.update({
                chart: { credits: false, height: 500 },
                title: {
                  style: { fontSize: '14px', fontWeight: 'bold' },
                },
                tooltip: {
                  headerFormat: '',
                  pointFormat: '{point.name}',
                  style: { fontWeight: 'bold', fontSize: '11px' },
                },
                legend: {
                  enabled: true,
                  borderWidth: 1,
                  itemStyle: { fontSize: '11px', fontWeight: 'normal' },
                },
                exporting: {
                  enabled: true,
                },
                plotOptions: {
                  pie: {
                    size: '80%',
                    events: {
                      click({ point }) {
                        const loc = {
                          pathname: '/transparency/detail',
                          state: { name: point.shortName },
                        }
                        history.push(loc)
                      },
                    },
                    dataLabels: {
                      enabled: true,
                      overflow: 'none',
                      crop: false,
                      distance: 40,
                      format:
                        '<span style="max-width: 180px; float: left; font-weight: normal ;text-overflow: ellipsis; overflow: hidden; text-align: right;"; >{point.shortName}: {point.y}%</span>',
                    },
                    showInLegend: true,
                  },
                },
              })
            },
          },
        },
      },
    }

    return minChartOptions
  }

  bigChart = () => {
    const {
      dataSeries,
      pieColors: pColors,
      history,
      chartTitle,
      chartSubTitle,
    } = this.props
    if (this.chart) {
      const data = this.getExpandedOptionConfig(
        pColors,
        dataSeries,
        chartSubTitle,
        history,
        chartTitle,
      )
      this.chart.update(data)
    }
  }

  smallChart = () => {
    const { dataSeries } = this.props
    if (this.chart) {
      this.chart.update(this.getMinOptionsConfig(pieColors, dataSeries))
      this.chart.setTitle({ style: { fontSize: '11px' } })
      this.chart.setSize(150, 150, true)
    }
  }

  render() {
    const {
      history,
      miniSize,
      dataSeries,
      pieColors: pColors,
      chartTitle,
      chartSubTitle,
    } = this.props

    let config = []
    if (miniSize) {
      config = this.getMinOptionsConfig(
        pColors,
        dataSeries,
        chartTitle,
        history,
      )
    } else {
      config = this.getExpandedOptionConfig(
        pColors,
        dataSeries,
        chartSubTitle,
        history,
        chartTitle,
      )
    }
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="chart"
          options={config}
          ref={this.pieChartRef}
        />
      </div>
    )
  }
}
