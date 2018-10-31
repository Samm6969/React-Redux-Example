import React, { Component } from 'react'
import { reactify } from '@sencha/ext-react'

import data from './data'
import renderWhenReady from '../../hoc/renderWhenReady'
// import NameRenderer from './NameRenderer'

const Grid = reactify('Grid')
const Column = reactify('Column')

@renderWhenReady
class ExtJSGridRoute extends Component {
  store = Ext.create('Ext.data.Store', { data })

  render() {
    return (
      <Grid
        height={500}
        width={500}
        store={this.store}
        features={[{ ftype: 'summary', dock: 'bottom' }]}
      >
        <Column
          text="Name"
          dataIndex="name"
          width={250}
          locked
          renderer={value => <span style={{ color: 'red' }}>{value}</span>}
        />
        <Column text="Stock Price">
          <Column
            text="Price"
            dataIndex="price"
            width={75}
            locked
            formatter="formatter"
            summaryType="sum"
            summaryFormatter="usMoney"
          />
          <Column text="Change" dataIndex="priceChange" width={80} />
          <Column text="% Change" dataIndex="priceChangePct" width={100} />
        </Column>
        <Column text="Email" dataIndex="email" width={200} />
      </Grid>
    )
  }
}

export default ExtJSGridRoute
