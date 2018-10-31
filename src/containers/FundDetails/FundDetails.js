import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LoadingIndicator } from '@fc/react-playbook'
import gql from 'graphql-tag'
// import _ from 'lodash'

import withQuery from '../../hoc/withQuery'
import ValueField from '../../components/ValueField'
import TableOfContentsChapter from '../../components/TableOfContents/TableOfContentsChapter'

const query = gql`
  query FundDetailsQuery($id: ID!) {
    node(id: $id) {
      ... on Fund {
        fundId
        name
      }
    }
  }
`
@withQuery({
  query,
})
class FundDetails extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    variables: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    node: PropTypes.shape({
      name: PropTypes.string.isRequired,
      fundId: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool,
  }

  render() {
    const { isLoading, node } = this.props
    if (isLoading) {
      return (
        <div>
          <LoadingIndicator />
        </div>
      )
    }
    const { name, fundId } = node
    return (
      <div>
        {name}
        <TableOfContentsChapter name="Details">
          <div>
            <ValueField value={name} label="Fund Short Name" inline />
            <ValueField value={fundId} label="Fund ID" inline />
          </div>
        </TableOfContentsChapter>
      </div>
    )
  }
}

export default FundDetails
