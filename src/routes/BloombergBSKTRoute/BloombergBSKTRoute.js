import React, { Component } from 'react'
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  FillContainer,
  Dropdown,
  Menu,
  MenuItem,
  MenuSpacer,
} from '@fc/react-playbook'
import BloombergBSKTGrid from '../../containers/BloombergBSKTGrid'
import Checkbox from '../../components/Checkbox'
// import Grid from '../../components/Grid'
// import * as Columns from '../../columns'
// import PropTypes from 'prop-types'

class BloombergBSKTRoute extends Component {
  state = {
    readOnlyOrder: true,
    submittedOrders: true,
  }

  toggleFilters = filter => () => {
    this.setState(state => ({
      [filter]: !state[filter],
    }))
  }

  render() {
    const { readOnlyOrder, submittedOrders } = this.state
    return (
      <FillContainer>
        <Card>
          <CardHeader>
            <CardTitle>Bloomberg BSKT</CardTitle>
            <div style={{ float: 'right' }}>
              <Dropdown
                icon="gear"
                content={
                  <Menu>
                    <MenuItem onClick={() => {}}>Refresh</MenuItem>
                    <MenuSpacer />
                    <MenuItem>
                      <Checkbox
                        id="submitted-orders"
                        onClick={this.toggleFilters('submittedOrders')}
                        checked={submittedOrders}
                        label="Submitted orders"
                      />
                    </MenuItem>
                    <MenuItem>
                      <Checkbox
                        id="read-only-orders"
                        onClick={this.toggleFilters('readOnlyOrder')}
                        checked={readOnlyOrder}
                        label="Read-only orders"
                      />
                    </MenuItem>
                  </Menu>
                }
              />
            </div>
          </CardHeader>
          <BloombergBSKTGrid
            variables={{
              readOnlyOrder,
              submittedOrders,
            }}
          />
          <CardFooter flexEnd>
            <Button primary type="submit">
              Enter Orders
            </Button>
          </CardFooter>
        </Card>
      </FillContainer>
    )
  }
}

export default BloombergBSKTRoute
