import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cx from 'classnames'
import { Card, FillContainer } from '@fc/react-playbook'
import FlexColumnLayout from '../../components/FlexColumnLayout'
import PieChart from '../../components/Chart/PieChart'
import { pieColors } from './constants'
import fundData from './fundData'
import s from './Portfolio.scss'

class Portfolio extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }),
  }

  render() {
    const seriesDataByFund = _.get(fundData, 'series')
    const totalByFund = _.get(fundData, 'totalMarketValue')
    const chartTitle = 'Market Value By Fund'

    const seriesByFundGraphData = []
    seriesDataByFund.map(item => {
      const itemObj = {
        name: item.longName,
        y: item.floatValue,
        shortName: item.name,
        ...item,
      }
      return seriesByFundGraphData.push(itemObj)
    })

    const standardChartSubtitle = '( All Values in USD Equivalent )'
    const chartSubTitle = `<b>Total Market Value:</b> ${totalByFund} ${standardChartSubtitle}`

    return (
      <FillContainer>
        <FlexColumnLayout>
          <Card className={cx(s.gridCard)}>
            <PieChart
              miniSize={false}
              pieColors={pieColors}
              chartTitle={chartTitle}
              chartSubTitle={chartSubTitle}
              dataSeries={seriesByFundGraphData}
              {...this.props}
            />
          </Card>
        </FlexColumnLayout>
      </FillContainer>
    )
  }
}

export default Portfolio
